"use strict";

function calculateAverageElectricityConsumption(peopleInHousehold){
    return _config.electricalConsumption.baseConsumption + (_config.electricalConsumption.regressiveConsumption * Math.log(peopleInHousehold));
}

function calculateAverageHeatConsumption(insulation,propertyType,peopleInHousehold) {
    return _config.heatConsumption.basicHeatConsumptionDetachedHouse - getResidentialBonus(propertyType) + getInsulationPenalty(insulation,propertyType) + (_config.heatConsumption.personalConsumptionFactor * Math.log(peopleInHousehold));
}

function getInsulationPenalty(insulation,propertyType){
    if (insulation === "true") {
        return 0;
    } else {
        return _config.heatConsumption.noInsulationPenalty - _config.heatConsumption.neighbourInsulationModifiers[propertyType];
    }
}

function getResidentialBonus(propertyType) {
    return _config.heatConsumption.residenceTypeModifiers[propertyType];
}