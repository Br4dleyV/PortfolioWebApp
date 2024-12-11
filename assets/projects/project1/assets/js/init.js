"use strict";

document.addEventListener("DOMContentLoaded", init);
function init() {

    // Get all navigate next and previous buttons and add event listeners
    const navigatePageButtons = document.querySelectorAll("[data-target]");
    navigatePageButtons.forEach(button => {
        button.addEventListener("click", navigate);
    });

    // Displays the percentage above the renewability slider
    document.querySelector("#renewability").addEventListener("input", displayRenewabilityPercentage);
    // Show/hide details for plans in tariff overview
    document.querySelector("#tariff-overview .flexcontainer").addEventListener("click", showHidePopup);
    // Listen for sorting by ascending/descending
    document.querySelector("#direction").addEventListener("change", handleSortOverview);
    // Listen for sorting by name/type
    document.querySelector("#filter").addEventListener("change", handleSortOverview);
    // Listen for clicks on the last overview tab
    document.querySelector("#selection tbody").addEventListener("click", handleTariffChange);

    // Save general information
    document.querySelector("#general-information button").addEventListener("click", getGeneralInformation);
    // Save personal preferences and match optimal tariffs
    document.querySelector("#user-information").addEventListener("submit", calculateOptimalTariff);
    // Selecting plans in tariff overview
    document.querySelector("#tariff-overview .flexcontainer").addEventListener("click", handleTariffClick);
    // Continuing to final overview
    document.querySelector("#tariff-overview .next").addEventListener("click", continueToFinalOverview);
    // Listen for confirmation on final page
    document.querySelector("#selection .next").addEventListener("click", processConfirmation);
}