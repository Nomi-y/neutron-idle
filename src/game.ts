import { TabManager } from './tabManager';
import { Generator } from './generator';
import { NotificationSystem } from './notifications';
import { formatNumber } from './utils';
import { generatorConfig } from './config/generatorConfig';

import Decimal from 'decimal.js';
import { Upgrade } from './upgrades';
import { IUpgrade, UpgradeType } from './interfaces';
import { getLickMessage } from './config/Lick';
import { prestige, prestigeUpgrades } from './config/prestigeConf';
import { PrestigeUpgrade } from './prestige';
import { settings } from './config/settings';

const GAME_SPEED = settings.dev.DEV_MODE ? settings.dev.DEV_GAME_SPEED : 1
const infinity308: Decimal = new Decimal(Infinity)

class Game {
    // 1/hz -> Update Framerate
    private readonly UPDATE_INTERVAL: number = 50
    private lastTickTime: number = 0;

    // Regular currency
    private points: Decimal = new Decimal(10);
    private pointsPerSecond: Decimal = new Decimal(0);
    private totalPoints: Decimal = new Decimal(10)

    // Isotopes + their upgrades
    private generators: Generator[] = [];
    private upgrades: Upgrade[] = []

    // ????
    private lickCounter: number = 0
    private lastLick: number = -1

    // Tab UI
    private tabManager: TabManager;

    // Dont tick if paused
    private paused: boolean = false

    // Prestige currency + upgrades
    private neutronStars = {
        amount: new Decimal(0),
        multiplier: new Decimal(1),
        prestiged: false,
    }
    private radiationAbsorbed: Decimal = new Decimal(0)
    private radiationFactor: Decimal = new Decimal(0.8)
    private prestigeUpgrades: PrestigeUpgrade[] = []


    constructor() {
        this.tabManager = new TabManager();
        this.initializeGenerators();
        this.initializePrestige()
        this.initializePrestigeUpgrades()
        this.updateUI();

        this.startGameLoop()
    }


    private startGameLoop(): void {
        this.lastTickTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(currentTime: number): void {
        let generatorsChanged = false;
        let upgradesChanged = false

        this.generators.forEach(g => {
            const shouldBeUnlocked = g.getCost().lte(this.points);
            if (g.unlocked !== shouldBeUnlocked) {
                g.unlocked = shouldBeUnlocked;
                generatorsChanged = true;
            }
            const upArray: Upgrade[] = [g.Upgrades.production, g.Upgrades.decay, g.Upgrades.cost] as Upgrade[]
            upArray.forEach(up => {
                const shouldBeUnlocked2 = up.getCost().lte(g.amount)
                if (up.unlocked !== shouldBeUnlocked2) {
                    up.unlocked = shouldBeUnlocked2
                    upgradesChanged = true
                }
            })
            if (g.lickable && currentTime - this.lastLick >= 3_000 && g.lickOnCooldown) {
                g.lickOnCooldown = false
                generatorsChanged = true
            }
        });

        if (generatorsChanged) {
            this.renderGenerators();
        }

        if (upgradesChanged) {
            this.renderUpgrades()
        }


        const timeSinceLastUpdate = currentTime - this.lastTickTime;
        if (timeSinceLastUpdate >= this.UPDATE_INTERVAL && !this.paused) {
            this.lastTickTime = currentTime;
            this.updateResources(timeSinceLastUpdate);
            this.updateUI();
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private initializePrestige(): void {
        document.getElementById('prestige-button')!.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prestigeNeutronStars()
        })
    }

    private initializePrestigeUpgrades(): void {
        this.prestigeUpgrades = prestigeUpgrades.map(config =>
            new PrestigeUpgrade(
                config.id,
                config.name,
                config.description,
                config.effectDescription,
                new Decimal(config.baseCost),
                new Decimal(config.costMult),
                new Decimal(config.costAdd),
                new Decimal(config.baseEffect),
                new Decimal(config.effectMult)
            )
        )
        this.renderPrestigeUpgrades()
    }

    private renderPrestigeUpgrades(): void {
        PrestigeUpgrade.renderPrestigeUpgrades(this.prestigeUpgrades)
    }


    private updateResources(deltaTime: number): void {
        const deltaSeconds = new Decimal(deltaTime).dividedBy(1000);
        let totalProduction = new Decimal(0);

        for (const generator of this.generators) {
            if (generator.amount.gt(0)) {
                totalProduction = totalProduction.plus(generator.getProduction().times(GAME_SPEED));
            }
        }

        this.points = this.points.plus(totalProduction.times(deltaSeconds));
        this.totalPoints = this.totalPoints.plus(totalProduction.times(deltaSeconds))
        this.pointsPerSecond = totalProduction;
    }

    private prestigeNeutronStars(): void {
        if (!this.points.gte(prestige.NSthreshhold)) return

        this.paused = true

        if (!this.neutronStars.prestiged) this.neutronStars.prestiged = true

        this.neutronStars.amount = this.neutronStars.amount.plus(
            prestige.getNeutronStarAmount(this.points)
        )

        this.radiationAbsorbed = this.radiationAbsorbed.plus(this.totalPoints.ln().times(this.radiationFactor))

        this.points = new Decimal(10)

        this.initializeGenerators()
        this.updateUI()

        this.renderGenerators()
        this.renderUpgrades()
        this.paused = false
    }

    private renderUpgrades(): void {
        Upgrade.renderUpgradeList(this.upgrades)
        Upgrade.setupUpgradeBuyButtons(
            (upID, type) => this.buyUpgrade(upID, type),
            (upID, type) => this.buyUpgradeMax(upID, type),
        )
    }

    private buyUpgrade(id: string, type: UpgradeType): void {

        const generator = this.generators.find(g => g.id === id);
        if (!generator) return;

        const upgrade: Upgrade = generator.Upgrades[type] as Upgrade
        const cost = upgrade.getCost();
        if (generator.amount.gte(cost)) {
            upgrade.amount = upgrade.amount.plus(1)
            generator.amount = generator.amount.minus(cost)
            this.updateUI()
            this.renderUpgrades()
            this.renderGenerators()
        }
    }

    private buyUpgradeMax(id: string, type: UpgradeType): void {
        const generator = this.generators.find(g => g.id === id);
        if (!generator) return;
        const upgrade = generator.Upgrades[type] as Upgrade

        let amountToBuy = new Decimal(0);
        let totalCost = new Decimal(0);
        let currentAmount = upgrade.amount
        let canBuyMore = true;

        while (canBuyMore) {
            const nextCost = new Decimal(upgrade.baseCost).plus(upgrade.costAdd.times(upgrade.amount))
                .times(new Decimal(upgrade.costMult).pow(currentAmount.plus(amountToBuy))).floor()

            if (generator.amount.gte(totalCost.plus(nextCost))) {
                totalCost = totalCost.plus(nextCost);
                amountToBuy = amountToBuy.plus(1);
            } else {
                canBuyMore = false;
            }

            if (amountToBuy.gt(1000000)) {
                canBuyMore = false;
            }
        }

        if (amountToBuy.gt(0)) {
            generator.amount = generator.amount.minus(totalCost);
            upgrade.amount = upgrade.amount.plus(amountToBuy)
            this.updatePointsPerSecond();
            this.updateUI();
            this.renderGenerators()
        }
    }

    private initializeGenerators(): void {
        this.generators = generatorConfig.map(config =>
            new Generator(
                config.id,
                config.name,
                config.shortName,
                config.description,
                {
                    base: new Decimal(config.cost.base),
                    baseMult: Decimal(config.cost.baseMult),
                    multInterval: Decimal(config.cost.multInterval),
                },
                new Decimal(config.baseProduction),
                new Decimal(config.decayRate),
                new Decimal(config.productionMult),
                {
                    production: Upgrade.createUpgrade(config.id, config.Upgrades.production as IUpgrade, config.Upgrades.production.effect.type),
                    decay: Upgrade.createUpgrade(config.id, config.Upgrades.decay as IUpgrade, config.Upgrades.decay.effect.type),
                    cost: Upgrade.createUpgrade(config.id, config.Upgrades.cost as IUpgrade, config.Upgrades.cost.effect.type)
                },
                config.lickable,
            )
        );
        this.upgrades = this.generators.flatMap(gen =>
            Object.values(gen.Upgrades) as Upgrade[]
        )
        this.updateUI()
        this.renderGenerators();
        this.renderUpgrades()
    }

    private renderGenerators(): void {
        Generator.renderGeneratorList(this.generators);
        Generator.setupGeneratorBuyButtons(
            (generatorId) => this.buyGenerator(generatorId),
            (generatorId) => this.buyGeneratorMax(generatorId),
            (generatorId) => this.lickIsotope(generatorId)
        );
    }

    private lickIsotope(generatorID: string): void {
        const generator = this.generators.find(g => g.id === generatorID)
        if (!generator) return
        this.lickCounter++
        generator.lickOnCooldown = true
        generator.amount = generator.amount.minus(1)
        this.lastLick = performance.now()
        if (this.lickCounter % 5 === 0) {
            NotificationSystem.showNotification(getLickMessage(this.lickCounter))
        }
        this.updateUI()
        this.renderGenerators()
    }

    private buyGenerator(generatorId: string): void {
        const generator = this.generators.find(g => g.id === generatorId);
        if (!generator) return;

        const cost = generator.getCost();
        if (this.points.gte(cost)) {
            this.points = this.points.minus(cost);
            generator.amount = generator.amount.plus(1);
            this.updatePointsPerSecond();
            this.updateUI();
            this.renderGenerators();
        }
    }

    private buyGeneratorMax(generatorId: string): void {
        const generator = this.generators.find(g => g.id === generatorId);
        if (!generator || this.points.lte(0)) return;

        let amountToBuy = new Decimal(0);
        let totalCost = new Decimal(0);
        let currentAmount = generator.amount;
        let canBuyMore = true;
        const maxIterations = 1_000_000;

        while (canBuyMore) {
            const nextAmount = currentAmount.plus(amountToBuy);
            const nextCost = generator.getCostFor(nextAmount);

            if (this.points.gte(totalCost.plus(nextCost))) {
                totalCost = totalCost.plus(nextCost);
                amountToBuy = amountToBuy.plus(1);
            } else {
                canBuyMore = false;
            }

            if (amountToBuy.gte(maxIterations)) {
                canBuyMore = false;
            }
        }

        if (amountToBuy.gt(0)) {
            this.points = this.points.minus(totalCost);
            generator.amount = generator.amount.plus(amountToBuy);
            this.updatePointsPerSecond();
            this.updateUI();
            this.renderGenerators();
        }
    }

    private updatePointsPerSecond(): void {
        this.pointsPerSecond = this.generators.reduce(
            (sum, gen) => sum.plus(gen.getProduction()),
            new Decimal(0)
        );
    }

    private updateUI(): void {
        document.getElementById('points')!.textContent = formatNumber(this.points, 2, true);
        document.getElementById('points-per-second')!.textContent = `${formatNumber(this.pointsPerSecond, 2, true)}/sec ${this.devGameSpeedDisplay()}`;

        if (this.points.greaterThan(prestige.NSthreshhold) || this.neutronStars.prestiged) {
            document.getElementById('neutron-stars')?.classList.remove('hidden')
            document.getElementById('prestige-tab-button')?.classList.remove('hidden')
            document.getElementById('prestige-button')!.textContent = `Prestige for ${formatNumber(prestige.getNeutronStarAmount(this.points))} Neutron Star${prestige.getNeutronStarAmount(this.points).equals(1) ? "" : "s"}`
            document.getElementById('prestige-points')!.textContent = `${formatNumber(this.neutronStars.amount, 2)}`
        }
    }

    private devGameSpeedDisplay(): string {
        return settings.dev.DEV_MODE ? `[x${GAME_SPEED} DEV]` : ""
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
