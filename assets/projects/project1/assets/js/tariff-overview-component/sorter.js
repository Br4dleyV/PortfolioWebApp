"use strict";

// Gebruik deze file om de sorteerfunctionaliteit te waarborgen. Opgelet: er is hier ook een event handler aanwezig

const _sortingTariffs = [..._tariffs];

function handleSortOverview(e) {

    const sortBy = document.querySelector("#filter").value;
    const direction = document.querySelector("#direction").value;

    sortOverview(_tariffs, sortBy, direction);
}

function sortOverview(tariffs, sortby, direction) {
    document.querySelector("#selection tbody").innerHTML = "";

    if (sortby === "monthlyPrice") {
        _sortingTariffs.sort((a, b) => a[sortby] - b[sortby]);
    } else {
        _sortingTariffs.sort((a, b) => a[sortby].localeCompare(b[sortby]));
    }

    if (direction === "desc") {
        _sortingTariffs.reverse();
    }

    _sortingTariffs.forEach(tariff => {
        renderItem(tariff);
    });
}
