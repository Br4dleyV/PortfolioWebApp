"use strict";


// De verantwoordelijkheid van deze file is het afhandelen van de tariff matcher events ("Tariff overview" pagina)

function processSelection(e) {
    const targetElement = e.target.closest("article");
    const targetContractType = targetElement.dataset.plantype;

    const selectedElement = document.querySelector(`#tariff-overview [data-plantype="${targetContractType}"].selected`);

    // If there's already an item selected with the same type
    if (selectedElement) {
        // If they clicked on the same element that's already selected
        if (selectedElement === targetElement) {
            // Then unselect it
            selectTariff(selectedElement, false);
        } else {
            // If it is a different one of the same type,
            // Deselect currently selected, and select target
            selectTariff(selectedElement, false);
            selectTariff(targetElement, true);
        }
    } else {
        // If there's no item of the same type already selected,
        // Select it
        selectTariff(targetElement, true);
    }
}

function handleTariffClick(e) {
    if (e.target.nodeName === "A") {
        showHidePopup(e.target);
    } else if (e.target.nodeName === "BUTTON" || e.target.closest("article")) {
        processSelection(e);
    } else {
        // You can add other things in the future too
    }
}

function processConfirmation(e) {
    e.preventDefault();

    document.querySelector("#confirmation .region").textContent = _data.postcode;

    let totalMonthlyPrice = 0;

    const confirmationPlanContainer = document.querySelector("#confirmation .flexcontainer");
    for (const [, value] of Object.entries(_finalTargets)) {
        const vat = calculateVAT(value.monthlyPrice, _data.vatpercentage);

        confirmationPlanContainer.insertAdjacentHTML("beforeend", `
            <article>
                <h3>${nameToDisplayName(value.name)}</h3>
                <p>€ ${value.monthlyPrice} / month  (+ € ${vat} VAT)</p>
            </article>
        `);

        totalMonthlyPrice += Number(value.monthlyPrice) + Number(vat);
    }

    document.querySelector("#confirmation .total-monthly").textContent = `€ ${formatNumber(totalMonthlyPrice, 2)} / month`;

    // Go to last page
    navigate("", "#confirmation");
}

function continueToFinalOverview(e) {
    e.preventDefault();

    if (anyTariffSelected()) {
        renderFinalSelection("#selection .selected-tariff", _currentTariffs);
        renderFullOverview("#selection table tbody ", _tariffs);
        navigate("", "#selection");
    } else {
        displayNotification("You don't have any tariffs selected! Please select one to continue.");
    }
}

function anyTariffSelected() {
    for (const [, value] of Object.entries(_currentTariffs)) {
        if (value.selected) {
            return true;
        }
    }

    return false;
}

