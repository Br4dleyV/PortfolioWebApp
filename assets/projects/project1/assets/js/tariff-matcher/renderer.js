"use strict";

// Plaats hier alle functies die ervoor zorgen dat de geschikte tariefplannen op de "Tariff overview" pagina tevoorschijn komen
// Dit zijn "render" functies, dus boordevol DOM manipulatie

let _currentTariffs = {};

function renderTariffs(matchingTariffs, container, renderDetail) {
    const tariffOverviewContainer = document.querySelector(container);
    tariffOverviewContainer.innerHTML = ""; // Clear current plans if there are any still in there
    _currentTariffs = matchingTariffs; // Save correct plans to table

    // Go through all optimal tariffs to render them individually using insertAdjacentHTML
    for (const [, value] of Object.entries(matchingTariffs)) {
        // Calculate the monthly price for the contract and insert article into container
        value.monthlyPrice = (value.type === "electricity") ? calculateMonthlyPrice(value.pricePerkWh, _data.estimatedElectricityKWh) : calculateMonthlyPrice(value.pricePerkWh, _data.estimatedHeatKwH);
        tariffOverviewContainer.insertAdjacentHTML("beforeend", `
            <article data-planname="${value.name}" data-plantype="${value.type}">
                <h3>${nameToDisplayName(value.name)}</h3><a href="#">view details</a>
                <p>€ ${value.monthlyPrice} / month</p>
                <button>Choose plan</button>
                <div class="details hidden">
                    <a href="#">close</a>
                    <dl>
                        <dt>Price per kWh:</dt><dd>€ ${value.pricePerkWh} / kWh</dd>
                        <dt>Renewable energy percentage:</dt><dd>${value.minimalRenewableEnergy}%</dd>
                        <dt>Compatible with:</dt><dd>${value.compatibility || "none"}</dd>
                    </dl>
                </div>
            </article>
        `);
    }
}

function showHidePopup(target) {
    if (target.parentElement) {
        target.closest("article").querySelector(".details").classList.toggle("hidden");
    }
}

function renderConsumptionEstimates() {
    // Set labels based on estimated consumption of values in tariff overview
    document.querySelector(".electricityEstimate span").textContent = `${formatNumber(_data.estimatedElectricityKWh, 2)} kWh`;
    document.querySelector(".gasEstimate span").textContent = `${formatNumber(_data.estimatedHeatKwH, 2)} kWh`;
}

function renderFinalSelection(container, tariffs) {
    // Clear last selection
    const selectionContainer = document.querySelector(container);
    selectionContainer.innerHTML = "";
    _finalTargets = {};

    for (const [key, value] of Object.entries(tariffs)) {
        if (value.selected) {
            _finalTargets[key] = value;
        }
    }

    renderList(_finalTargets, container);
}

function selectTariff(element, bool) {
    if (bool) {
        element.classList.add("selected");
    } else {
        element.classList.remove("selected");
    }

    _currentTariffs[element.dataset.planname].selected = bool;
}