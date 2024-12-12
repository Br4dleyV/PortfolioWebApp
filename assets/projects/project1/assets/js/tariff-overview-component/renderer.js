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
            monthlyPrice = calculateMonthlyPrice(value.pricePerkWh, _data.estimatedElectricityKWh);
        } else {
            monthlyPrice = calculateMonthlyPrice(value.pricePerkWh, _data.estimatedHeatKwH);
        }
        value.monthlyPrice = monthlyPrice;
        renderItem(value);
    }
}

function renderItem(values) {
    // Get true or false if user chose the type of contract
    const showButton = !!_data.contracttype.includes(values.type);

    // Add to html, and depending on showButton, show/hide button
    document.querySelector("#selection tbody").insertAdjacentHTML("beforeend", `
        <tr data-planname="${values.name}">
            <td>${nameToDisplayName(values.name)}</td>
            <td>${values.type}</td>
            <td>€ ${values.monthlyPrice} / month</td>
            <td>${showButton ? "<button>Choose this one instead</button>" : ""}</td>
        </tr>
    `);
}

function replaceTariff(target) {
    let targetTariff;
    _tariffs.forEach(tariff => {
        if (tariff.name === target) {
            targetTariff = tariff;
        }
    });

    let itemOfSameType = false;
    for (const [key, value] of Object.entries(_finalTargets)) {
        if (value.type === targetTariff.type) {
            delete _finalTargets[key];
            itemOfSameType = true;
        }
    }
    if (itemOfSameType) {
        _finalTargets[target] = targetTariff;
        renderList(_finalTargets, "#selection .selected-tariff");
    } else {
        // The item that was clicked on is not of the same type
        console.log("No item of same type!");
    }
}

function renderList(list, container) {
    const targetContainer = document.querySelector(container);
    targetContainer.innerHTML = "";

    for (const [, value] of Object.entries(list)) {
        targetContainer.insertAdjacentHTML("beforeend", `
        <article data-plantype="${value.type}" data-planname="${value.name}">
            <h3>${nameToDisplayName(value.name)}</h3>
            <p>€ ${value.monthlyPrice} / month</p>
        </article>
    `);
    }
}

function handleTariffChange(e) {
    replaceTariff(e.target.parentElement.parentElement.dataset.planname);
}