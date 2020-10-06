
/**
 * Contains the get functions for the __content-script__ process.
 * @module content-script-getters
 * @author Tecnella
 * @author Vladimir Cusatti
 */
/**
 * @function getConfigFromLocalStorage
 * @description Get
 * [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig} From Local Storage
 */
function getConfigFromLocalStorage() {
    try {
        const backUpOldConfig = cryptoFollowConfig;
        chrome.storage.sync.get(["cryptoFollowConfig"], function (item) {
            if (item.cryptoFollowConfig !== null) {
                cryptoFollowConfig = JSON.parse(item.cryptoFollowConfig);
                for (const key in cryptoFollowConfig.vendor) {
                    if (Object.prototype.hasOwnProperty.call(cryptoFollowConfig.vendor, key)) {
                        if (cryptoFollowConfig.vendor[key].oneTimeFetch !== null) {
                            cryptoFollowConfig.vendor[key].oneTimeFetch = backUpOldConfig.vendor[key].oneTimeFetch;
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Error in getConfigFromLocalStorage ${error}`);
    }
}
/**
 * @function getDataToShowFromLocalStorage
 * @description Get the vendors data From Local Storage and save them in
 * [dataToShow]{@link module:content-script-setup~dataToShow} as JSON
 */
function getDataToShowFromLocalStorage() {
    try {
        chrome.storage.sync.get(["message"], function (item) {
            if (item.message != null) {
                dataToShow = JSON.parse(item.message);
            }
        });
    } catch (error) {
        console.error(`Error in getDataToShowFromLocalStorage: ${error}`);
    }
}