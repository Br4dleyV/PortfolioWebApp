"use strict";



const _config = {
    electricalConsumption: {
        baseConsumption: 1794,
        regressiveConsumption: 1758
    },
    heatConsumption: {
        basicHeatConsumptionDetachedHouse: 13784.3,
        personalConsumptionFactor: 2272.1,
        noInsulationPenalty: 8531.9,
        neighbourInsulationModifiers: {
            apartment:  4961.9 ,
            terracedHouse:  3327.6,
            semiDetached: 2299.4,
            detachedHouse: 0
        },
        residenceTypeModifiers: {
            apartment:  9693.0,
            terracedHouse:  6501.7,
            semiDetached: 4492.0,
            detachedHouse: 0
        }
    }
};