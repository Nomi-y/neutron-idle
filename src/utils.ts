import { Notation } from './interfaces';
import Decimal from 'decimal.js';

export function formatNumber(
    num: Decimal,
    decimals: number = 2,
    roundSmall: boolean = false,
    notation: Notation = Notation.STANDARD
): string {
    if (num.isZero()) return '0'
    const isNegative = num.isNegative();
    num = num.abs();

    if (roundSmall && num.lt(1000)) {
        return (isNegative ? '-' : '') + num.floor().toFixed(0);
    }

    if (num.lt(0.001)) {
        return (isNegative ? '-' : '') + num.toFixed(decimals);
    }

    let formatted: string;

    if (num.lt(1000)) {
        if (num.isInt() || roundSmall) {
            return num.toFixed(0);
        } else {
            return num.toFixed(decimals)
        }
    }

    switch (notation) {
        case Notation.SCIENTIFIC:
            formatted = num.toExponential(decimals);
            break;

        case Notation.STANDARD:

            const suffixes = [
                '', 'K', 'M', 'B', 'T',
                'Qa', 'Qi', 'Sx', 'Sp', 'Oc',
                'No', 'Dc', 'UDc', 'DDc', 'TDc',
                'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc',
                'NvDc', 'Vg', 'UVg', 'DVg', 'TVg',
                'QaVg', 'QiVg', 'SxVg', 'SpVg', 'OcVg',
                'NvVg', 'Tg'
            ];

            const log10 = bigLog10(num);
            const tier = log10.div(3).floor();
            const suffix = tier.lt(suffixes.length)
                ? suffixes[tier.toNumber()]
                : `e${tier.times(3)}`;
            const scaled = num.div(new Decimal(10).pow(tier.times(3)));

            formatted = scaled.toFixed(decimals) + suffix;
            break;
    }

    return isNegative ? `-${formatted}` : formatted;
}


function bigLog10(num: Decimal): Decimal {
    if (num.lte(0)) return new Decimal(0);
    const s = num.toString();
    const exp = s.includes('e') ? parseInt(s.split('e')[1]) : 0;
    const mantissa = new Decimal(s.replace(/e.*/, ''));
    return new Decimal(Math.log10(mantissa.toNumber()) + exp);
}
