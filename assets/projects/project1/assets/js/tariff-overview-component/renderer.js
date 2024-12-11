"use strict";
// Plaats hier alle functies die ervoor zorgen dat de geschikte tariefplannen op de "You've selected the following plans" pagina tevoorschijn komen
// Dit zijn "render" functies, dus boordevol DOM manipulatie

let _finalTargets = {};

function renderFullOverview(container, tariffs) {
    const selectionContainer = document.querySelector(container);
    selectionContainer.innerHTML = "";

    for (const [, value] of Object.entries(tariffs)) {
        let monthlyPrice;
        if (value.type === "electricity") {
            monthlyPrice = calculateMonthlyPrice(value.pricePerkWh, estimatedElectricityKWh);
        } else {
            monthlyPrice = calculateMonthlyPrice(value.pricePerkWh, estimatedHeatKwH);
        }
        value.monthlyPrice = monthlyPrice;

        renderItem(value);
    }
}

function renderItem(values) {
    document.querySelector("#selection tbody").insertAdjacentHTML("beforeend", `
        <tr data-planname="${values.name}">
            <td>${nameToDisplayName(values.name)}</td>
            <td>${values.type}</td>
            <td>€ ${values.monthlyPrice} / month</td>
            <td><button>Choose this one instead</button></td>
        </tr>
    `);
}

function replaceTariff(tariff) {
    // Redo
}

function renderTariff(tariff, container) {
    const targetContainer = document.querySelector(container);

    targetContainer.insertAdjacentHTML("beforeend", `
        <article data-plantype="${tariff.type}" data-planname="${tariff.name}">
            <h3>${nameToDisplayName(tariff.name)}</h3>
            <p>€ ${tariff.monthlyPrice} / month</p>
        </article>
    `);
}

function handleTariffChange(e) {
    replaceTariff(e.target.parentElement.parentElement.dataset.planname);
}