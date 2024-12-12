"use strict";

// Stupid magic number sonar error
const monthsInAYear = 12;

function calculateMonthlyPrice(pricePerkWh, estimatedkWh) {
    return formatNumber((pricePerkWh * estimatedkWh) / monthsInAYear, 2);
}

function calculateVAT(price, vatPercentage) {
    return formatNumber((price * vatPercentage) / 100, 2);
}