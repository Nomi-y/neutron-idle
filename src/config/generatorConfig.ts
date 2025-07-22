import { IGConfig } from "../interfaces";

export const generatorConfig: IGConfig[] = [
    {
        id: "hydrogen-3",
        name: "Hydrogen-3",
        shortName: "H-3",
        description: "Glows brighter than your future.",
        baseCost: 10,
        costMult: 1.15,
        baseProduction: 1,
        decayRate: 1.0,
        decayMult: 1.0,
        productionMult: 1.0,
        Upgrades: {
            production: {
                id: "tritium-prod",
                genID: "H-3",
                name: "Deuterium Boost",
                description: "Base production ×1.1",
                baseCost: 20,
                costMult: 1.05,
                costAdd: 5,
                effect: { type: "production", value: 1.1, isMultiplicative: true }
            },
            decay: {
                id: "tritium-decay",
                genID: "H-3",
                name: "Glowsticks",
                description: "+0.2 decay rate",
                baseCost: 30,
                costMult: 1.005,
                costAdd: 10,
                effect: { type: "decay", value: 0.2, isMultiplicative: false }
            },
            cost: {
                id: "tritium-cost",
                genID: "H-3",
                name: "Bulk Purchase",
                description: "Cost multiplier -0.03",
                baseCost: 140,
                costMult: 1.3,
                costAdd: 10,
                effect: { type: "cost", value: -0.03, isMultiplicative: false }
            }
        }
    },
    {
        id: "carbon-14",
        name: "Carbon-14",
        shortName: "C-14",
        description: "Guaranteed fresh… for 5,730 years.",
        baseCost: 100,
        costMult: 1.18,
        baseProduction: 1.5,
        decayRate: 0.9,
        decayMult: 1.05,
        productionMult: 1.15,
        Upgrades: {
            production: {
                id: "carbon-prod-1",
                genID: "C-14",
                name: "Fossil Fuel Catalysis",
                description: "Base production ×1.25",
                baseCost: 30,
                costMult: 1.1,
                costAdd: 20,
                effect: {
                    type: "production",
                    value: 1.25,
                    isMultiplicative: true
                }
            },
            decay: {
                id: "carbon-decay-1",
                genID: "C-14",
                name: "Diamond Lattice",
                description: "+0.15 decay rate",
                baseCost: 45,
                costMult: 1.08,
                costAdd: 15,
                effect: {
                    type: "decay",
                    value: 0.15,
                    isMultiplicative: false
                }
            },
            cost: {
                id: "carbon-cost-1",
                genID: "C-14",
                name: "Radiocarbon Dating",
                description: "Cost multiplier -0.04",
                baseCost: 210,
                costMult: 1.2,
                costAdd: 25,
                effect: {
                    type: "cost",
                    value: -0.04,
                    isMultiplicative: false
                }
            }
        }
    },
    {
        id: "phosphorus-32",
        name: "Phosphorus-32",
        shortName: "P-32",
        description: "Lab Safety Note: The 'do not lick' sticker is there for a REASON.",
        baseCost: 1_200,
        costMult: 1.22,
        baseProduction: 4,
        decayRate: 0.8,
        decayMult: 1.1,
        productionMult: 1.35,
        lickable: true,
        Upgrades: {
            production: {
                id: "phosphorus-prod",
                genID: "P-32",
                name: "Nightlight Mode",
                description: "Base production ×1.4",
                baseCost: 100,
                costMult: 1.12,
                costAdd: 50,
                effect: { type: "production", value: 1.4, isMultiplicative: true }
            },
            decay: {
                id: "phosphorus-decay",
                genID: "P-32",
                name: "Lick Test Approved",
                description: "+0.3 decay rate",
                baseCost: 150,
                costMult: 1.08,
                costAdd: 30,
                effect: { type: "decay", value: 0.3, isMultiplicative: false }
            },
            cost: {
                id: "phosphorus-cost",
                genID: "P-32",
                name: "Bulk Hazard",
                description: "Cost multiplier -0.05",
                baseCost: 700,
                costMult: 1.15,
                costAdd: 60,
                effect: { type: "cost", value: -0.05, isMultiplicative: false }
            }
        }
    },
    {
        id: "potassium-40",
        name: "Potassium-40",
        shortName: "K-40",
        description: "Yes, bananas have this. No, that doesn't make it 'organic'.",
        baseCost: 15_000,
        costMult: 1.25,
        baseProduction: 12,
        decayRate: 0.7,
        decayMult: 1.12,
        productionMult: 1.75,
        Upgrades: {
            production: {
                id: "potassium-prod",
                genID: "K-40",
                name: "Banana Bundle",
                description: "Base production ×1.35",
                baseCost: 150,
                costMult: 1.18,
                costAdd: 25,
                effect: { type: "production", value: 1.35, isMultiplicative: true }
            },
            decay: {
                id: "potassium-decay",
                genID: "K-40",
                name: "Half-Life Diet",
                description: "+0.25 decay rate",
                baseCost: 225,
                costMult: 1.15,
                costAdd: 35,
                effect: { type: "decay", value: 0.25, isMultiplicative: false }
            },
            cost: {
                id: "potassium-cost",
                genID: "K-40",
                name: "Nuclear Groceries",
                description: "Cost multiplier -0.06",
                baseCost: 1050,
                costMult: 1.25,
                costAdd: 100,
                effect: { type: "cost", value: -0.06, isMultiplicative: false }
            }
        }
    },
    {
        id: "cobalt-60",
        name: "Cobalt-60",
        shortName: "Co-60",
        description: "Sterilizes food… and also you.",
        baseCost: 150_000,
        costMult: 1.28,
        baseProduction: 40,
        decayRate: 0.6,
        decayMult: 1.15,
        productionMult: 2.2,
        Upgrades: {
            production: {
                id: "cobalt-prod",
                genID: "Co-60",
                name: "Gamma Gourmet",
                description: "Base production ×1.5",
                baseCost: 250,
                costMult: 1.2,
                costAdd: 40,
                effect: { type: "production", value: 1.5, isMultiplicative: true }
            },
            decay: {
                id: "cobalt-decay",
                genID: "Co-60",
                name: "Radiation Spa",
                description: "+0.35 decay rate",
                baseCost: 375,
                costMult: 1.15,
                costAdd: 55,
                effect: { type: "decay", value: 0.35, isMultiplicative: false }
            },
            cost: {
                id: "cobalt-cost",
                genID: "Co-60",
                name: "Bulk Irradiation",
                description: "Cost multiplier -0.07",
                baseCost: 1750,
                costMult: 1.3,
                costAdd: 150,
                effect: { type: "cost", value: -0.07, isMultiplicative: false }
            }
        }
    },
    {
        id: "iodine-131",
        name: "Iodine-131",
        shortName: "I-131",
        description: "Not a snack. (Stop licking the lab equipment.)",
        baseCost: 1_200_000,
        costMult: 1.3,
        baseProduction: 150,
        decayRate: 0.5,
        decayMult: 1.18,
        productionMult: 3.0,
        Upgrades: {
            production: {
                id: "iodine-prod",
                genID: "I-131",
                name: "Thyroid Turbo",
                description: "Base production ×1.45",
                baseCost: 500,
                costMult: 1.22,
                costAdd: 75,
                effect: { type: "production", value: 1.45, isMultiplicative: true }
            },
            decay: {
                id: "iodine-decay",
                genID: "I-131",
                name: "Nuclear Meds",
                description: "+0.4 decay rate",
                baseCost: 750,
                costMult: 1.18,
                costAdd: 90,
                effect: { type: "decay", value: 0.4, isMultiplicative: false }
            },
            cost: {
                id: "iodine-cost",
                genID: "I-131",
                name: "Hospice Discount",
                description: "Cost multiplier -0.08",
                baseCost: 3500,
                costMult: 1.35,
                costAdd: 200,
                effect: { type: "cost", value: -0.08, isMultiplicative: false }
            }
        }
    },
    {
        id: "cesium-137",
        name: "Cesium-137",
        shortName: "Ce-137",
        description: "Now with 100% more ionizing radiation!",
        baseCost: 10_000_000,
        costMult: 1.35,
        baseProduction: 600,
        decayRate: 0.4,
        decayMult: 1.22,
        productionMult: 4.5,
        Upgrades: {
            production: {
                id: "cesium-prod",
                genID: "Cs-137",
                name: "Fallout Farming",
                description: "Base production ×1.5",
                baseCost: 700,
                costMult: 1.25,
                costAdd: 100,
                effect: { type: "production", value: 1.5, isMultiplicative: true }
            },
            decay: {
                id: "cesium-decay",
                genID: "Cs-137",
                name: "Meltdown Mode",
                description: "+0.5 decay rate",
                baseCost: 1050,
                costMult: 1.2,
                costAdd: 120,
                effect: { type: "decay", value: 0.5, isMultiplicative: false }
            },
            cost: {
                id: "cesium-cost",
                genID: "Cs-137",
                name: "Containment Sale",
                description: "Cost multiplier -0.1",
                baseCost: 4900,
                costMult: 1.4,
                costAdd: 250,
                effect: { type: "cost", value: -0.1, isMultiplicative: false }
            }
        }
    },
    {
        id: "strontium-90",
        name: "Strontium-90",
        shortName: "Sr-90",
        description: "We made one gram last year. Why do you have twenty?",
        baseCost: 90_000_000,
        costMult: 1.38,
        baseProduction: 3_000,
        decayRate: 0.3,
        decayMult: 1.25,
        productionMult: 6.5,
        Upgrades: {
            production: {
                id: "strontium-prod",
                genID: "Sr-90",
                name: "Calcium Cruncher",
                description: "Base production ×1.6",
                baseCost: 1500,
                costMult: 1.3,
                costAdd: 200,
                effect: { type: "production", value: 1.6, isMultiplicative: true }
            },
            decay: {
                id: "strontium-decay",
                genID: "Sr-90",
                name: "Brittle Bones Boost",
                description: "+0.6 decay rate",
                baseCost: 2250,
                costMult: 1.25,
                costAdd: 300,
                effect: { type: "decay", value: 0.6, isMultiplicative: false }
            },
            cost: {
                id: "strontium-cost",
                genID: "Sr-90",
                name: "Osteoporosis Discount",
                description: "Cost multiplier -0.12",
                baseCost: 10500,
                costMult: 1.45,
                costAdd: 500,
                effect: { type: "cost", value: -0.12, isMultiplicative: false }
            }
        }
    },
    {
        id: "radium-226",
        name: "Radium-226",
        shortName: "Ra-226",
        description: "We stopped restocking this in 1925. How do you keep finding more?",
        baseCost: 800_000_000,
        costMult: 1.42,
        baseProduction: 15_000,
        decayRate: 0.2,
        decayMult: 1.3,
        productionMult: 9.0,
        Upgrades: {
            production: {
                id: "radium-prod",
                genID: "Ra-226",
                name: "Watch Dial Overdrive",
                description: "Base production ×1.8",
                baseCost: 2500,
                costMult: 1.35,
                costAdd: 400,
                effect: { type: "production", value: 1.8, isMultiplicative: true }
            },
            decay: {
                id: "radium-decay",
                genID: "Ra-226",
                name: "Jawbone Jolt",
                description: "+0.8 decay rate",
                baseCost: 3750,
                costMult: 1.3,
                costAdd: 600,
                effect: { type: "decay", value: 0.8, isMultiplicative: false }
            },
            cost: {
                id: "radium-cost",
                genID: "Ra-226",
                name: "Undertaker's Bundle",
                description: "Cost multiplier -0.15",
                baseCost: 17500,
                costMult: 1.5,
                costAdd: 1000,
                effect: { type: "cost", value: -0.15, isMultiplicative: false }
            }
        }
    },
    {
        id: "plutonium-239",
        name: "Plutonium-239",
        shortName: "Pu-239",
        description: "The IAEA is asking questions.",
        baseCost: 7_000_000_000,
        costMult: 1.45,
        baseProduction: 80_000,
        decayRate: 0.15,
        decayMult: 1.35,
        productionMult: 12.0,
        Upgrades: {
            production: {
                id: "plutonium-prod",
                genID: "Pu-239",
                name: "Breeder Reactor",
                description: "Base production ×2.0",
                baseCost: 5500,
                costMult: 1.4,
                costAdd: 1000,
                effect: { type: "production", value: 2.0, isMultiplicative: true }
            },
            decay: {
                id: "plutonium-decay",
                genID: "Pu-239",
                name: "Critical Mass",
                description: "+1.0 decay rate",
                baseCost: 11000,
                costMult: 1.35,
                costAdd: 1500,
                effect: { type: "decay", value: 1.0, isMultiplicative: false }
            },
            cost: {
                id: "plutonium-cost",
                genID: "Pu-239",
                name: "Black Market Contacts",
                description: "Cost multiplier -0.2",
                baseCost: 55000,
                costMult: 1.6,
                costAdd: 5000,
                effect: { type: "cost", value: -0.2, isMultiplicative: false }
            }
        }
    },
    // Tier 6 - Super Late Game
    {
        id: "californium-252",
        name: "Californium-252",
        shortName: "Cf-252",
        description: "Maybe don't transport this in your backpack?",
        baseCost: 70_000_000_000,
        costMult: 1.5,
        baseProduction: 500_000,
        decayRate: 0.1,
        decayMult: 1.4,
        productionMult: 18.0,
        Upgrades: {
            production: {
                id: "californium-prod",
                genID: "Cf-252",
                name: "Neutron Spam",
                description: "Base production ×2.2",
                baseCost: 10000,
                costMult: 1.45,
                costAdd: 2000,
                effect: { type: "production", value: 2.2, isMultiplicative: true }
            },
            decay: {
                id: "californium-decay",
                genID: "Cf-252",
                name: "Spontaneous Fission",
                description: "+1.2 decay rate",
                baseCost: 20000,
                costMult: 1.4,
                costAdd: 3000,
                effect: { type: "decay", value: 1.2, isMultiplicative: false }
            },
            cost: {
                id: "californium-cost",
                genID: "Cf-252",
                name: "Illicit Enrichment",
                description: "Cost multiplier -0.25",
                baseCost: 100000,
                costMult: 1.7,
                costAdd: 10000,
                effect: { type: "cost", value: -0.25, isMultiplicative: false }
            }
        }
    },
    {
        id: "einsteinium-253",
        name: "Einsteinium-253",
        shortName: "Es-253",
        description: "When you absolutely need to outshine the sun.",
        baseCost: 500_000_000_000,
        costMult: 1.55,
        baseProduction: 3_000_000,
        decayRate: 0.05,
        decayMult: 1.45,
        productionMult: 25.0,
        Upgrades: {
            production: {
                id: "einsteinium-prod",
                genID: "Es-253",
                name: "Relativity Breaker",
                description: "Base production ×3.0",
                baseCost: 25000,
                costMult: 1.5,
                costAdd: 5000,
                effect: { type: "production", value: 3.0, isMultiplicative: true }
            },
            decay: {
                id: "einsteinium-decay",
                genID: "Es-253",
                name: "Time Dilation",
                description: "+2.0 decay rate",
                baseCost: 75000,
                costMult: 1.45,
                costAdd: 10000,
                effect: { type: "decay", value: 2.0, isMultiplicative: false }
            },
            cost: {
                id: "einsteinium-cost",
                genID: "Es-253",
                name: "Theoretical Pricing",
                description: "Cost multiplier -0.5",
                baseCost: 500000,
                costMult: 2.0,
                costAdd: 50000,
                effect: { type: "cost", value: -0.5, isMultiplicative: false }
            }
        }
    },
    {
        id: "oganesson-294",
        name: "Oganesson-294",
        shortName: "Og-294",
        description: "Exists for 0.69ms - just long enough to say 'Nice'.",
        baseCost: 10_000_000_000_000,
        costMult: 1.8,
        baseProduction: 50_000_000,
        decayRate: 0.01,
        decayMult: 1.6,
        productionMult: 50.0,
        Upgrades: {
            production: {
                id: "oganesson-prod",
                genID: "Og-294",
                name: "Quantum Overclock",
                description: "Base production ×5.0",
                baseCost: 100000,
                costMult: 1.8,
                costAdd: 25000,
                effect: { type: "production", value: 5.0, isMultiplicative: true }
            },
            decay: {
                id: "oganesson-decay",
                genID: "Og-294",
                name: "Big Bang Mode",
                description: "+5.0 decay rate",
                baseCost: 500000,
                costMult: 1.7,
                costAdd: 100000,
                effect: { type: "decay", value: 5.0, isMultiplicative: false }
            },
            cost: {
                id: "oganesson-cost",
                genID: "Og-294",
                name: "Reality Discount",
                description: "Cost multiplier -1.0",
                baseCost: 5000000,
                costMult: 3.0,
                costAdd: 500000,
                effect: { type: "cost", value: -1.0, isMultiplicative: false }
            }
        }
    }
];
