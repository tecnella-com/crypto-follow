
/**
 * @module user-interface-data
 * @description Contains the data flow (the locastorage handler)
 * functions for the module __user interface__
 * @author Tecnella
 * @author Vladimir Cusatti
 */

 /**
 * @function updateHideConfig
 * @description update the state of the switch "hide config"
 */
function updateHideConfig(cryptoFollowLastConfig) {
    if (typeof cryptoFollowLastConfig !== "undefined") {
        if (cryptoFollowLastConfig.barConfig.hideMode) {
            const switchBtn = $("#switchHide");
            switchBtn.prop("checked", true);
        }
    }
}
/**
 * @function getCryptoFollowLastConfigFromLocalStorage
 * @description get __cryptoFollowConfig__ from local storage and save it in
 * __cryptoFollowLastConfig__
 */
function getCryptoFollowLastConfigFromLocalStorage() {
    try {
        chrome.storage.sync.get(["cryptoFollowConfig"], function (item) {
            if (item.cryptoFollowConfig != null) {
                cryptoFollowLastConfig = JSON.parse(item.cryptoFollowConfig);
                for (const vendorIndex in cryptoFollowLastConfig.vendor) {
                    // eslint-disable-next-line max-len
                    if (Object.prototype.hasOwnProperty.call(cryptoFollowLastConfig.vendor, vendorIndex)) {
                        // eslint-disable-next-line max-len
                        for (const symbolIndex in cryptoFollowLastConfig.vendor[vendorIndex].symbol) {
                            // eslint-disable-next-line max-len
                            if (Object.prototype.hasOwnProperty.call(cryptoFollowLastConfig.vendor[vendorIndex].symbol, symbolIndex)) {
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
                }
                updateHideConfig(cryptoFollowLastConfig);
            }
        });
    } catch (error) {
        console.error(`Error in getCryptoFollowLastConfigFromLocalStorage ${error}`);
    }
}

/**
 * @function setConfigOnLocalStorage
 * @description set [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 * in the localStorage.
 * @param {JSON} cryptoFollowConfigForUpdate The config to set in localStorage
 */
function setConfigOnLocalStorage(cryptoFollowConfigForUpdate) {
    try {
        chrome.storage.sync.set(
            { cryptoFollowConfig: JSON.stringify(cryptoFollowConfigForUpdate) },
            function () { }
        );
    } catch (error) {
        console.error(`Error in setConfigOnLocalStorage ${error}`);
    }
}
