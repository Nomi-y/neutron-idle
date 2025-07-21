import Decimal from 'decimal.js';
import { formatNumber } from './utils';
import { IUpgrade, UpgradeType } from './interfaces';


export class Upgrade implements IUpgrade {
    constructor(
        public id: string,
        public genID: string,
        public name: string,
        public description: string,
        public baseCost: Decimal,
        public costMult: Decimal,
        public costAdd: Decimal,
        public effect: {
            type: UpgradeType,
            value: Decimal,
            isMultiplicative: boolean
        },
        public generator: string,
        public amount: Decimal = new Decimal(0),
        public unlocked: boolean,
        public canAfford: boolean
    ) { }

    getCost(): Decimal {
        return new Decimal(this.baseCost.plus(this.costAdd.times(this.amount)).times(this.costMult.pow(this.amount))).floor()
    }

    getBonus(): Decimal {
        return new Decimal(this.effect.isMultiplicative ? this.effect.value.pow(this.amount) : this.effect.value.times(this.amount))
    }

    static createUpgrade(gen: string, up: IUpgrade, type: UpgradeType): Upgrade {
        return new Upgrade(
            up.id,
            up.genID,
            up.name,
            up.description,
            new Decimal(up.baseCost),
            new Decimal(up.costMult),
            new Decimal(up.costAdd),
            {
                type: type,
                value: new Decimal(up.effect.value),
                isMultiplicative: up.effect.isMultiplicative

            },
            gen,
            up.amount = new Decimal(0),

            up.unlocked = false,
            up.canAfford = false
        )
    }

    static renderUpgradeList(upgrades: Upgrade[]): void {
        const container = document.getElementById('upgrade-list');
        if (!container) return;

        container.innerHTML = '';

        upgrades.forEach(up => {
            const element = document.createElement('div');
            element.className = 'upgrade';
            element.innerHTML = `
            <div class="upgrade-stats">
                <div class="upgrade-name">${up.name}</div>
                <div class="upgrade-description">${up.description}</div>
                <div class="upgrade-amount">Owned: ${up.amount}</div>
                <div class="upgrade-bonus">Total: ${up.effect.isMultiplicative ? "" : up.getBonus().gt(0) ? "+" : ""}${formatNumber(up.getBonus(), 2)}${up.effect.isMultiplicative ? "x" : ""}</div>
            </div>
            <div class="upgrade-buttons">
                <button class="buy-button buy-single" 
                        data-upgrade="${up.generator}" 
                        data-upgrade-type="${up.effect.type}"
                        ${!up.unlocked ? 'disabled' : ''}>
                    Buy (${formatNumber(up.getCost(), 2)} ${up.genID})
                </button>
                <button class="buy-button buy-max" 
                        data-upgrade="${up.generator}" 
                        data-upgrade-type="${up.effect.type}"
                        ${!up.unlocked ? 'disabled' : ''}>
                    Buy Max
                </button>
            </div>
        `;
            container.appendChild(element);
        });
    }

    static setupUpgradeBuyButtons(
        buyCallback: (upgradeId: string, type: UpgradeType) => void,
        buyMaxCallback: (upgradeId: string, type: UpgradeType) => void
    ): void {
        document.querySelectorAll<HTMLElement>('.buy-single[data-upgrade]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = button.getAttribute('data-upgrade');
                const type = button.getAttribute('data-upgrade-type') as UpgradeType;
                if (id && type && ["production", "decay", "cost"].includes(type)) {
                    buyCallback(id, type);
                }
            });
        });

        document.querySelectorAll<HTMLElement>('.buy-max[data-upgrade]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = button.getAttribute('data-upgrade');
                const type = button.getAttribute('data-upgrade-type') as UpgradeType;
                if (id && type && ["production", "decay", "cost"].includes(type)) {
                    buyMaxCallback(id, type);
                }
            });
        });
    }
}


