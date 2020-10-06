
/**
 * @module user-interface-utils
 * @description Contains the functions used to config the bar with the user interface.
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @function fillVendorsWithAvailablesPairs
 * @description Create the buttons relate to the vendors (associate to the accordions),
 * then fill the vendor with the symbols associate and its respective checkbox.
 * @see [symbolsAvailables]{@link module:user-interface-setup~symbolsAvailables}
 */
function fillVendorsWithAvailablesPairs() {
    $(".bodyContainer").html($(".searchbox")[0]);
    for (const key in symbolsAvailables.vendor) {
        if (Object.prototype.hasOwnProperty.call(symbolsAvailables.vendor, key)) {
            const button = document.createElement("button");
            button.classList = "accordion";
            button.innerHTML = symbolsAvailables.vendor[key].name;
            const div = document.createElement("div");
            div.classList = "panel-cf row-cf";
            div.id = `accordion-${key}`;
            $(".bodyContainer").append(button);
            $(".bodyContainer").append(div);
            for (const item in symbolsAvailables.vendor[key].symbol) {
                if (Object.prototype.hasOwnProperty.call(symbolsAvailables.vendor[key].symbol,
                    item)) {
                    const li = document.createElement("li");
                    li.classList = "left-column-border-right searchable";
                    li.innerHTML = symbolsAvailables.vendor[key].symbol[item];
                    const checkbox = document.createElement("input");
                    checkbox.classList = "right-column-border-left checkbox";
                    checkbox.type = "checkbox";
                    checkbox.name = `${key}-${String(
                        symbolsAvailables.vendor[key].symbol[item]
                    )
                        .replace(":", "")
                        .replace(".", "")}`;
                    checkbox.id = `checkbox-${key}-${String(
                        symbolsAvailables.vendor[key].symbol[item]
                    )
                        .replace(":", "")
                        .replace(".", "")}`;
                    $(`#accordion-${key}`).append(li);
                    $(`#accordion-${key}`).append(checkbox);
                }
            }
        }
    }
}

/**
 * @function searchBoxLogic
 * @event searchBoxLogic
 * @description hide all pairs, then show only the pairs matched with the search box value.
 * @param {Object} searchBox the search box element reference,
 * an object with "id=searchbox" expected.
 */
function searchBoxLogic(searchBox) {
    const search = searchBox.val();
    if (search !== "") {
        // open all accordion
        const accordions = $(".bodyContainer .accordion");
        for (let key = 0; key < accordions.length; key += 1) {
            if (accordions[key].classList.contains("active-cf") === false) {
                accordions[key].classList.add("active-cf");
                const panel = accordions[key].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }
            }
        }
        // hide all serchable item
        const searchableItems = $(".searchable");
        for (let key = 0; key < searchableItems.length; key += 1) {
            $(searchableItems[key]).hide();
            $(searchableItems[key])
                .next()
                .hide();
            // if match the element
            if (
                String($(searchableItems[key]).html())
                    .toLowerCase()
                    .indexOf(search) !== -1
                    || String($(searchableItems[key]).html())
                        .toUpperCase()
                        .indexOf(search) !== -1
            ) {
                $(searchableItems[key]).show();
                $(searchableItems[key])
                    .next()
                    .show();
            }
        }
    } else {
        // close all accordion
        const accordions = $(".bodyContainer .accordion");
        for (let key = 0; key < accordions.length; key++) {
            if (accordions[key].classList.contains("active-cf") === true) {
                accordions[key].classList.remove("active-cf");
                const panel = accordions[key].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }
            }
        }
        // hide all serchable item
        const searchableItems = $(".searchable");
        for (let key = 0; key < searchableItems.length; key += 1) {
            $(searchableItems[key]).show();
            $(searchableItems[key])
                .next()
                .show();
        }
    }
}
/**
 * @function resetDefaultOnButtonClick
 * @event resetDefaultOnButtonClick
 * @description Call
 * [setConfigOnLocalStorage]{@link module:user-interface-data~setConfigOnLocalStorage}
 * and refresh the user interface.
 * @param {Event} e
 */
function resetDefaultOnButtonClick(e) {
    setConfigOnLocalStorage(cryptoFollowDefaultConfig);
    location.reload();
}
/**
 * @function saveLikeAvailableSymbolToShow
 * @description check for all available symbol and save the match.
 * @param {event} e the event source.
 */
function saveLikeAvailableSymbolToShow(e) {
    let vendorIndex = String(e.target.id).replace("checkbox-", "");
    vendorIndex = vendorIndex.substring(0, vendorIndex.indexOf("-"));
    for (const symbolIndex in symbolsAvailables.vendor[vendorIndex]
        .symbol) {
        if (
            String(e.target.id)
                .replace("checkbox-", "")
                .replace("-", "")
                .replace(vendorIndex, "")
                === String(
                    symbolsAvailables.vendor[vendorIndex].symbol[symbolIndex]
                )
                    .replace(":", "")
                    .replace(".", "")
        ) {
            const newElementIndex = cryptoFollowLastConfig.vendor[vendorIndex].symbol.length;
            cryptoFollowLastConfig.vendor[vendorIndex].symbol[
                newElementIndex
            ] = symbolsAvailables.vendor[vendorIndex].symbol[symbolIndex];
            break;
        }
    }
}
/**
 * @function removeFromAvailableSymbolToShow
 * @description check for all available symbol saved and remove the match.
 * @param {event} e the event source.
 */
function removeFromAvailableSymbolToShow(e) {
    try {
        let vendorIndex = String(e.target.id).replace("checkbox-", "");
        vendorIndex = vendorIndex.substring(0, vendorIndex.indexOf("-"));
        for (const symbolIndex in cryptoFollowLastConfig.vendor[vendorIndex]
            .symbol) {
            if (
                String(e.target.id)
                    .replace("checkbox-", "")
                    .replace("-", "")
                    .replace(vendorIndex, "")
                === String(
                    cryptoFollowLastConfig.vendor[vendorIndex].symbol[
                        symbolIndex
                    ]
                )
                    .replace(":", "")
                    .replace(".", "")
            ) {
                delete cryptoFollowLastConfig.vendor[vendorIndex].symbol[
                    symbolIndex
                ];
                cryptoFollowLastConfig.vendor[vendorIndex].symbol.sort();
                cryptoFollowLastConfig.vendor[vendorIndex].symbol.pop();
            }
        }
    } catch (error) {
        console.error(`Error in removeFromAvailableSymbolToShow: ${error}`);
    }
}

/**
 * @function saveOrRemoveAssociatePair
 * @event saveOrRemoveAssociatePair
 * @description when the user clicks on the checkbox, save the associate pair
 * if it is checked or else remove the associate pair from.
 * [cryptoFollowLastConfig]{@link module:user-interface-setup~cryptoFollowLastConfig}
 * @param {Event} e used to know e.target.
 */
function saveOrRemoveAssociatePair(e) {
    if ($(e.target).prop("checked")) {
        saveLikeAvailableSymbolToShow(e);
    } else {
        removeFromAvailableSymbolToShow(e);
    }
    setConfigOnLocalStorage(cryptoFollowLastConfig);
}
/**
 * @function showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 * @event showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 * @description toggle the text panel container.
 * @param {Event} e used to know e.target.
 */
function showOrHideTheVendorSymbolsPanelByMaxHeightUpdating(e) {
    e.target.classList.toggle("active-cf");
    const panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
}