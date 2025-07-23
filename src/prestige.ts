import { formatNumber } from './utils';
import Decimal from 'decimal.js';
import { IPrestigeUpgrade } from './interfaces';

export class PrestigeUpgrade implements IPrestigeUpgrade {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public effectDescription: string,
        public baseCost: Decimal,
        public costMult: Decimal,
        public costAdd: Decimal,
        public baseEffect: Decimal,
        public effectMult: Decimal,
        public amount: Decimal = new Decimal(0),
        public maxAmount: Decimal = new Decimal(2)
    ) { }

    getCost(): Decimal {
        return new Decimal(this.baseCost.plus(this.costAdd.times(this.amount)).times(this.costMult.pow(this.amount))).floor()
    }

    getBonus(): Decimal {
        return new Decimal(this.baseEffect.times(this.amount).times(this.effectMult))
    }

    isMaxed(): boolean {
        return !this.maxAmount.greaterThan(this.amount)
    }

    static renderPrestigeUpgrades(upgrades: PrestigeUpgrade[]): void {
        const container = document.getElementById('prestige-upgrade-list');
        if (!container) return
        container.innerHTML = ''
        upgrades.forEach(u => {
            const element = document.createElement('div');
            element.className = 'prestige-upgrade'
            element.innerHTML = `
                <button class="prestige-upgrade-button ${u.isMaxed() ? 'bought' : ''}" data-prestige="${u.id}">
                    <div class="prestige-upgrade-name">${u.name}</div>
                    <div class="prestige-upgrade-effect-description">${u.effectDescription}</div>
                    <div class="prestige-upgrade-description">${u.description}</div>
                    <div class="prestige-upgrade-cost">${u.getCost()} NS</div>
                </button>
            `
            container.appendChild(element)
        })
    }

    static setupPrestigeUpgradeBuyButtons(
        buyCallback: (id: string) => void
    ): void {
        document.querySelectorAll('.prestige-upgrade-button[data-prestige]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const prestigeId = button.getAttribute('data-prestige');
                if (prestigeId) {
                    buyCallback(prestigeId);
                }
            });
        })
    }
}
