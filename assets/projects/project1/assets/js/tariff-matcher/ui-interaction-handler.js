"use strict";


// De verantwoordelijkheid van deze file is het afhandelen van de tariff matcher events ("Tariff overview" pagina)

function processSelection(e) {
    const targetElement = e.target.parentElement;
    const targetContractType = targetElement.dataset.plantype;

    const selectedElement = document.querySelector(`#tariff-overview [data-plantype="${targetContractType}"].selected`);

    // If there's already an item selected with the same type
    if (selectedElement) {
        // If they clicked on the same element that's already selected
        if (selectedElement === targetElement) {
            // Then unselect it
            selectedElement.classList.remove("selected");
            _currentTariffs[selectedElement.dataset.planname].selected = false;
        } else {
            // If it is a different one of the same type,
            // Deselect currently selected, and select target
            selectedElement.classList.remove("selected");
            _currentTariffs[selectedElement.dataset.planname].selected = false;

            targetElement.classList.add("selected");
            _currentTariffs[targetElement.dataset.planname].selected = true;
        }
    }
    // If there's no item of the same type already selected,
    else {
        // Select it
        _currentTariffs[targetElement.dataset.planname].selected = true;
        targetElement.classList.add("selected");
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
    if (anyTariffSelected()) {
        renderFinalSelection("#selection .selected-tariff", _currentTariffs);
        renderFullOverview("#selection table tbody ", _tariffs);
        navigate("", "#selection");
    } else {
        console.log("No tariff selected");
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

function handleTariffClick(e) {
    if (e.target.nodeName === "BUTTON") {
        processSelection(e);
    } else if (e.target.nodeName === "A") {
        showHidePopup(e.target);
    }
}