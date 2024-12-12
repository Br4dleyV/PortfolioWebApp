"use strict";
// Navigatie en alle events behorend tot de eerste twee "configuratie" stappen horen hier.

const _data = {};

// Navigates to next or previous steps
function navigate(e, target){
    // First hide all steps
    const steps = document.querySelectorAll(".step");
    steps.forEach(step => {
        step.classList.add("hidden");
    });

    if (e) {
        e.preventDefault();
        // Show the correct step
        const targetStep = document.querySelector(`#${e.target.dataset.target}`);
        targetStep.classList.remove("hidden");
    } else {
        const targetStep = document.querySelector(target);
        targetStep.classList.remove("hidden");
    }
}

// Displays the percentage of the renewability slider above it
function displayRenewabilityPercentage(e) {
    const rangeLabel = document.querySelector(".range");
    rangeLabel.textContent = `${e.target.value}%`;
}

// Gets the form data and saves it in the _data variable
function getGeneralInformation(e){
    e.preventDefault();

    // Get general information and save to _data table
    _data.postcode = document.querySelector("#postcode").value;
    _data.vatpercentage = getRadiobuttonInfo("form input[name='vatpercentage']");
    _data.contracttype = getCheckboxInfo("form input[name='contracttype']");
}

function calculateOptimalTariff(e){
    e.preventDefault();

    // Get personal preferences and save to _data table
    _data.renewability = document.querySelector("#renewability").value;
    _data.compatibility = getCheckboxInfo("form input[name='amenities']");
    _data.peopleInHousehold = document.querySelector("#amount-of-people").value;
    _data.propertytype = getRadiobuttonInfo("form input[name='propertytype']");
    _data.insulation = getRadiobuttonInfo("form input[name='insulation']");

    // Get the optimal plans for the users choices
    const plans = getOptimalPlans(_data.contracttype, _data.renewability, _data.compatibility);

    if (plans) {
        // Get estimated kwh
        _data.estimatedElectricityKWh = calculateAverageElectricityConsumption(_data.peopleInHousehold);
        _data.estimatedHeatKwH = calculateAverageHeatConsumption(_data.insulation, _data.propertytype, _data.peopleInHousehold);
        renderConsumptionEstimates();

        // Render those choices
        renderTariffs(plans, "#tariff-overview .flexcontainer");

        // Navigate to next step
        navigate("", "#tariff-overview");
    } else {
        displayNotification("No matching plans were found! Please change your preferences and try again!");
    }
}