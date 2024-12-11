"use strict";


const _tariffs = [
    {
        name: "optimal-electricity",
        type: "electricity",
        pricePerkWh: 1,
        minimalRenewableEnergy: 80,
        compatibility: ["electric vehicle","solar panels"]
    },
    {
        name: "optimal-gas",
        type: "gas",
        pricePerkWh: 0.8,
        minimalRenewableEnergy: 20
    },
    {
        name: "generous-electricity",
        type: "electricity",
        pricePerkWh: 1.2,
        minimalRenewableEnergy: 20,
        compatibility: ["electric vehicle"]
    },
    {
        name: "generous-gas",
        type: "gas",
        pricePerkWh: 3,
        minimalRenewableEnergy: 40
    },
    {
        name: "mediocre-electricity",
        type: "electricity",
        pricePerkWh: 0.8,
        minimalRenewableEnergy: 10,
        compatibility: ["solar panels"]
    },
    {
        name: "mediocre-gas",
        type: "gas",
        pricePerkWh: 1.5,
        minimalRenewableEnergy: 30
    }
];