"use strict";

// De verantwoordelijkheid van deze file is het vinden van de meest optimale plannen voor jou, gebaseerd op de input.
// Splits echter de inhoud van getOptimalPlans() op in meerdere functies, anders zal deze niet lees- en onderhoudbaar zijn
// Dit is "programmalogica", dus géén DOM manipulaties hier

// Gets the optimal plans according to the users choices
function getOptimalPlans(types,minimalRenewableEnergy,compatibility) {
    const optimalPlans = {};

    _tariffs.forEach(tariff => {
        // Check if tariff is the type and minimal renewability the user wants
        if (types.includes(tariff.type) && tariff.minimalRenewableEnergy >= minimalRenewableEnergy) {
            // Check if tariff has plans (to further filter electricity contracts)
            if (tariff.compatibility) {
                // Check if compatibilities are the same as the user chose
                if (compatibility.toString() === tariff.compatibility.toString()) {
                    // Here it's an optimal electricity contract, so save it to optimalPlans
                    optimalPlans[tariff.name] = tariff;
                }
            // Here it's an optimal gas contract, so save it to optimalPlans
            } else {
                optimalPlans[tariff.name] = tariff;
            }
        }
    });

    return optimalPlans;
}