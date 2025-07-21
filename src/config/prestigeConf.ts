import Decimal from "decimal.js"
export const prestige = {
    NSthreshhold: new Decimal(100_0),
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
