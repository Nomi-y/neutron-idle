import Decimal from "decimal.js"
import { IPUConfig } from "../interfaces"

export const prestige = {
    NSthreshhold: new Decimal(1E+13),
    NSexponent: new Decimal(0.5),

    getNeutronStarAmount(num: Decimal): Decimal {
        return new Decimal(num.dividedBy(this.NSthreshhold)
            .pow(this.NSexponent)).floor()
    },

    setNSExponent(num: number) {
        if (num >= 1) {
            this.NSexponent = new Decimal(0.999_999)
        } else if (num <= 0) {
            this.NSexponent = new Decimal(0.000_001)
        } else {
            this.NSexponent = new Decimal(num)
        }
    }
}

export const prestigeUpgrades: IPUConfig[] = [
    {
        id: "hello",
        name: "world",
        description: "balls",
        effectDescription: "increases balls by 2%",
        baseCost: 1,
        costMult: 1,
        costAdd: 1,
        baseEffect: 1,
        effectMult: 1
    },
]

