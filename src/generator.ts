import { IGenerator, IUpgrade, UpgradeType } from './interfaces';
import { Upgrade } from './upgrades';
import { formatNumber } from './utils';
import Decimal from 'decimal.js';

const ONE = new Decimal(1)

export class Generator implements IGenerator {
    constructor(
        public id: string,
        public name: string,
        public shortName: string,
        public description: string,
        public cost: {
            base: Decimal,
            baseMult: Decimal,
            multInterval: Decimal
        },
        public baseProduction: Decimal,
        public decayRate: Decimal,
        public productionMult: Decimal,
        public Upgrades: {
            production: IUpgrade,
            decay: IUpgrade,
            cost: IUpgrade,
        },
        public lickable?: boolean,
        public lickOnCooldown?: boolean,
        public amount: Decimal = new Decimal(0),
        public unlocked: boolean = false,
        public canAfford: boolean = false,
    ) { }

    getCost(): Decimal {
        return new Decimal(this.cost.base
            .plus(this.cost.base.times(this.amount))
            .times(this.getCostMult()))
            .ceil()
    }

    getCostFor(amount: Decimal): Decimal {
        return new Decimal(this.cost.base
            .plus(this.cost.base.times(amount))
            .times(this.getCostMultFor(amount)))
            .ceil()
    }

    getCostMult(): Decimal {
        const intervalsCompleted = this.amount.plus(1).div(this.cost.multInterval).floor();

        return new Decimal(this.cost.baseMult.pow(intervalsCompleted))
            .minus(this.getUpgradeEffect('cost'));
    }

    getCostMultFor(amount: Decimal) {
        const intervalsCompleted = amount.plus(1).div(this.cost.multInterval).floor();

        return new Decimal(this.cost.baseMult.pow(intervalsCompleted))
            .minus(this.getUpgradeEffect('cost'));
    }

    getBaseProduction(): Decimal {
        return new Decimal(this.baseProduction)
            .times(this.productionMult.times(this.Upgrades.production.getBonus()))
            .times(this.decayRate.plus(this.Upgrades.decay.getBonus()))
    }

    getProduction(): Decimal {
        return new Decimal(this.baseProduction)
            .times(this.amount)
            .times(this.productionMult.times(this.Upgrades.production.getBonus()))
            .times(this.decayRate.plus(this.Upgrades.decay.getBonus()))
    }

    buyUpgrade(type: UpgradeType): void {
        const cost = this.getUpgradeCost(type)
        if (this.amount.gte(cost)) {
            this.amount = this.amount.minus(cost)
            const up: Upgrade = this.Upgrades[type] as Upgrade
            up.amount = up.amount.plus(1)
            switch (type) {
                case 'production':
                    this.baseProduction = up.effect.isMultiplicative ?
                        this.baseProduction.plus(up.effect.value.times(up.amount)) :
                        this.baseProduction.times(up.effect.value.times(up.amount))
                    break
                case 'decay':

                    this.decayRate = up.effect.isMultiplicative ?
                        this.decayRate.plus(up.effect.value.times(up.amount)) :
                        this.decayRate.times(up.effect.value.times(up.amount))
                    break
            }
        }
    }

    getUpgradeCost(type: UpgradeType): Decimal {
        const up: Upgrade = this.Upgrades[type] as Upgrade
        return new Decimal(up.baseCost).plus(up.costAdd.times(up.amount)).times(up.costMult.pow(up.amount))
    }

    getUpgradeEffect(type: UpgradeType): Decimal {
        const up = this.Upgrades[type] as Upgrade
        return up.effect.value.times(up.amount)
    }

    static renderGeneratorList(generators: Generator[]): void {
        const container = document.getElementById('generator-list');
        if (!container) return;

        container.innerHTML = '';

        generators.forEach(gen => {
            const element = document.createElement('div');

            element.className = 'generator';
            element.innerHTML = `
            <div class="generator-name">${gen.name}</div>
            <div class="generator-description">${gen.description}</div>
            <div class="generator-stats">
                <div class="generator-amount">Owned: ${gen.amount}</div>
                <div class="generator-production">Production: ${formatNumber(gen.amount.gte(1) ? gen.getProduction() : gen.getBaseProduction(), 2, true)}/sec</div>
            </div>
            <div class="generator-buttons">
                <button ${gen.amount.lte(0) || gen.lickOnCooldown ? 'disabled' : ''} data-generator="${gen.id}" class="buy-button buy-lick ${gen.lickable ? '' : 'hidden'}">Lick</button>
                <button class="buy-button buy-single" data-generator="${gen.id}" ${!gen.unlocked ? 'disabled' : ''}>
                    Buy (${formatNumber(gen.getCost(), 2, true)})
                </button>
                <button class="buy-button buy-max" data-generator="${gen.id}" ${!gen.unlocked ? 'disabled' : ''}>
                    Buy Max
                </button>
            </div>
        `;
            container.appendChild(element);
        });
    }

    static setupGeneratorBuyButtons(
        buyCallback: (generatorId: string) => void,
        buyMaxCallback: (generatorId: string) => void,
        lickCallback: (generatorId: string) => void,
    ): void {
        document.querySelectorAll('.buy-single[data-generator]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const generatorId = button.getAttribute('data-generator');
                if (generatorId) {
                    buyCallback(generatorId);
                }
            });
        });

        document.querySelectorAll('.buy-max[data-generator]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const generatorId = button.getAttribute('data-generator');
                if (generatorId) {
                    buyMaxCallback(generatorId);
                }
            });
        });
        document.querySelectorAll('.buy-lick[data-generator]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation()
                const generatorId = button.getAttribute('data-generator');
                if (generatorId) {
                    lickCallback(generatorId)

                }
            })
        })
    }
}
