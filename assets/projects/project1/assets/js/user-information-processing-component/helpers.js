"use strict";

// Plaats hier generische helper (utility) functies die ter ondersteuning dienen van de component die de gebruikersinformatie opvraagt

function getCheckboxInfo(selector){
    const values = [];

    document.querySelectorAll(selector).forEach(checkbox => {
        if (checkbox.checked) {
            values.push(checkbox.value);
        }
    });

    return values;
}

function getRadiobuttonInfo(selector){
    let selectedValue = "";

    document.querySelectorAll(selector).forEach(radiobutton => {
        if (radiobutton.checked) {
            selectedValue = radiobutton.value;
        }
    });

    return selectedValue;
}

function nameToDisplayName(name){
    return name.replace("-", " ");
}

function formatNumber(number, decimalPoints) {
    return (Math.round(number * 100) / 100).toFixed(decimalPoints);
}