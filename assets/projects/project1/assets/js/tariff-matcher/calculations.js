"use strict";

function calculateMonthlyPrice(pricePerkWh, estimatedkWh) {
    return formatNumber((pricePerkWh * estimatedkWh) / 12, 2);
}

function calculateVAT(price, vatPercentage) {
    return formatNumber((price * vatPercentage) / 100, 2);
}