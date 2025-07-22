import Decimal from "decimal.js";
export interface IGenerator {
    id: string
    name: string
    shortName: string
    description: string
    baseCost: Decimal | number
    costMult: Decimal | number
    baseProduction: Decimal | number
    decayRate: Decimal | number
    decayMult: Decimal | number
    productionMult: Decimal | number
    amount?: Decimal | number
    unlocked?: boolean
    canAfford?: boolean
    lickable?: boolean // DO NOT
    Upgrades: {
        production: IUConfig;
        decay: IUConfig;
        cost: IUConfig;
    }
    getCost(): Decimal
    getProduction(): Decimal
}

export interface IGConfig
    extends Pick<IGenerator, Exclude<keyof IGenerator, 'getCost' | 'getProduction'>>,
    Partial<Pick<IGenerator, 'getCost' | 'getProduction'>> { }

export interface IUpgrade {
    id: string
    genID: string
    name: string
    description: string
    baseCost: Decimal | number
    costMult: Decimal | number
    costAdd: Decimal | number
    effect: {
        type: UpgradeType
        value: Decimal | number
        isMultiplicative: boolean
    }
    amount?: Decimal | number
    unlocked?: boolean
    canAfford?: boolean

    getCost(): Decimal
    getBonus(): Decimal
}

export interface IUConfig
    extends Pick<IUpgrade, Exclude<keyof IUpgrade, 'getCost' | 'getBonus'>>,
    Partial<Pick<IUpgrade, 'getCost' | 'getBonus'>> { }

export type UpgradeType = "production" | "decay" | "cost"

export interface IPrestigeUpgrade {
    id: string
    name: string
    description: string
    baseCost: Decimal | number
    costMult: Decimal | number
    costAdd: Decimal | number
    baseEffect: Decimal | number
    effectMult: Decimal | number
    amount?: Decimal

    getCost(): Decimal
    getBonus(): Decimal
}

export interface IPUConfig
    extends Pick<IPrestigeUpgrade, Exclude<keyof IPrestigeUpgrade, 'getCost' | 'getBonus'>>,
    Partial<Pick<IPrestigeUpgrade, 'getCost' | 'getBonus'>> { }

export enum Notation {
    SCIENTIFIC,
    STANDARD
}
