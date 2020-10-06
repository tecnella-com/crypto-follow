/**
 * Contains all functions config the bar by user interface
 * @module userInterfaceFunctions
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/** 
 * @function getCryptoFollowLastConfigFromLocalStorage
 * @description get the last config saved in local storage
 */
function getCryptoFollowLastConfigFromLocalStorage() {
    try {
        chrome.storage.sync.get(["cryptoFollowConfig"], item => {
            //console.log("cryptoFollowConfig",item.cryptoFollowConfig);
            if (item.cryptoFollowConfig != null) {
                cryptoFollowLastConfig = JSON.parse(item.cryptoFollowConfig);
                console.log("config update", cryptoFollowLastConfig);
                for (const vendorIndex in cryptoFollowLastConfig.vendor) {
                    for (const symbolIndex in cryptoFollowLastConfig.vendor[
                        vendorIndex
                    ].symbol) {
                        $(
                            `#checkbox-${vendorIndex}-${String(
                                cryptoFollowLastConfig.vendor[vendorIndex]
                                    .symbol[symbolIndex]
                            )
                                .replace(":", "")
                                .replace(".", "")}`
                        ).prop("checked", true);
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function fillVendorsWithAvailablesPairs
 * @description Create the vendors buttons (associate to the accordions), then fill the vendor with the symbols associate and its respective checkbox
 */
function fillVendorsWithAvailablesPairs() {
    $(".bodyContainer").html($(".searchbox")[0]);
    for (const key in availablesSymbols.vendor) {
        $(".bodyContainer").append(`
    <button class="accordion">${availablesSymbols.vendor[key].name}</button>
    <div class="panel-cf row-cf" id="accordion-${key}">      
    </div>`);

        for (const item in availablesSymbols.vendor[key].symbol) {
            $(`#accordion-${key}`).append(`
      <li class="left-column-border-right searchable" >${
    availablesSymbols.vendor[key].symbol[item]
}</li>
      <input class="right-column-border-left checkbox" type="checkbox" name="${key}-${String(
    availablesSymbols.vendor[key].symbol[item]
)
    .replace(":", "")
    .replace(".", "")}" id="checkbox-${key}-${String(
    availablesSymbols.vendor[key].symbol[item]
)
    .replace(":", "")
    .replace(".", "")}">
      `);
        }
    }
}

/**
 * @function setConfigOnLocalStorage
 * @description set [cryptoFollowConfig]{@link module:declarationsAndConfig~cryptoFollowConfig} localStorage with a json.
 * @param {JSON} cryptoFollowConfigForUpdate The config to set in localStorage
 */
function setConfigOnLocalStorage(cryptoFollowConfigForUpdate) {
    try {
        //console.log("Puting on localStorage cryptoFollowConfigForUpdate",JSON.stringify(cryptoFollowConfig));
        chrome.storage.sync.set(
            { cryptoFollowConfig: JSON.stringify(cryptoFollowConfigForUpdate) },
            () => {
                try {
                    console.log(
                        "localstorage was update with",
                        cryptoFollowConfigForUpdate
                    );
                } catch (error) {
                    console.log("Error on sync, error: " + error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}
/**
 * @function searchBoxLogic
 * @event searchBoxLogic
 * @description Trigger at keyup and on search prop, show only the PAR matched with the searchBox value.
 * @param {Object} searchBox the search box element identified by the id=searchbox
 */
function searchBoxLogic(searchBox) {
    let search = searchBox.val();
    if (search != "") {
        //open all accordion
        let accordions = $(".accordion");
        for (let key = 0; key < accordions.length; key++) {
            if (accordions[key].classList.contains("active-cf") == false) {
                accordions[key].classList.add("active-cf");
                let panel = accordions[key].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
        //hide all serchable item
        let searchableItems = $(".searchable");
        for (let key = 0; key < searchableItems.length; key++) {
            $(searchableItems[key]).hide();
            $(searchableItems[key])
                .next()
                .hide();
            if (
                String($(searchableItems[key]).html())
                    .toLowerCase()
                    .indexOf(search) != -1 ||
                String($(searchableItems[key]).html())
                    .toUpperCase()
                    .indexOf(search) != -1
            ) {
                $(searchableItems[key]).show();
                $(searchableItems[key])
                    .next()
                    .show();
            }
        }
    } else {
        //close all accordion
        let accordions = $(".accordion");
        for (let key = 0; key < accordions.length; key++) {
            if (accordions[key].classList.contains("active-cf") == true) {
                accordions[key].classList.remove("active-cf");
                let panel = accordions[key].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
        //hide all serchable item
        let searchableItems = $(".searchable");
        for (let key = 0; key < searchableItems.length; key++) {
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
 * @description Call {@link setConfigOnLocalStorage } and refresh the user interface
 * @param {Event} e
 */
function resetDefaultOnButtonClick(e) {
    setConfigOnLocalStorage(cryptoFollowDefaultConfig);
    location.reload();
}
/**
 * @function checkAndSaveLikeAvailablesymbolToShow
 * @description check for all availables symbol and save it to show it
 * @param {event} e the event source
 */
function checkAndSaveLikeAvailablesymbolToShow(e) {
    let vendorIndex = String(e.target.id).replace("checkbox-", "");
    vendorIndex = vendorIndex.substring(0, vendorIndex.indexOf("-"));
    for (const symbolIndex in availablesSymbols.vendor[vendorIndex]
        .symbol) {
        if (
            String(e.target.id)
                .replace("checkbox-", "")
                .replace("-", "")
                .replace(vendorIndex, "") ==
            String(
                availablesSymbols.vendor[vendorIndex].symbol[symbolIndex]
            )
                .replace(":", "")
                .replace(".", "")
        ) {
            let newElementIndex =
                cryptoFollowLastConfig.vendor[vendorIndex].symbol.length;
            cryptoFollowLastConfig.vendor[vendorIndex].symbol[
                newElementIndex
            ] = availablesSymbols.vendor[vendorIndex].symbol[symbolIndex];
            break;
        }
    }
};
/**
 * @function checkAndRemoveFromAvailablesymbolToShow
 * @description check for all availables symbol to show and remove it
 * @param {event} e the event source
 */
function checkAndRemoveFromAvailablesymbolToShow(e) {
    //check if exist delete
    try {
        let vendorIndex = String(e.target.id).replace("checkbox-", "");
        vendorIndex = vendorIndex.substring(0, vendorIndex.indexOf("-"));
        for (const symbolIndex in cryptoFollowLastConfig.vendor[vendorIndex]
            .symbol) {
            if (
                String(e.target.id)
                    .replace("checkbox-", "")
                    .replace("-", "")
                    .replace(vendorIndex, "") ==
                String(
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
        console.log("check if exits error:" + error);
    }
    //check if don't exist do noithig
};
/**
 * @function onCheckBoxClick
 * @event onCheckBoxClick
 * @description verify the prop checked of the event target, then search its symbol name, then add its to {@link cryptoFollowLastConfig}
 * @param {Event} e used to know e.target
 */
function onCheckBoxClick(e) {
    if ($(e.target).prop("checked")) {
        console.log("is checked");
        checkAndSaveLikeAvailablesymbolToShow(e);
    } else {
        console.log("is unchecked");
        checkAndRemoveFromAvailablesymbolToShow(e);
    }
    console.log(cryptoFollowLastConfig);
    setConfigOnLocalStorage(cryptoFollowLastConfig);
}
/**
 * @function showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 * @event showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 * @description toggle the class "active-cf" of the event target, then show/hide the next element (the text panel container)
 * @param {Event} e used to know e.target
 */
function showOrHideTheVendorSymbolsPanelByMaxHeightUpdating(e) {
    console.log("objetos:", this, e.target);
    e.target.classList.toggle("active-cf");
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}
