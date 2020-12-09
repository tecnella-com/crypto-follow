
/**
 * Contains localstorage data handler functions for the background process
 * @module background-process-data
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @function setDataOnLocalStorage
 * @description set a json in a var message in localstorage
 * @param {JSON} message
 */
function setDataOnLocalStorage(message) {
    try {
        chrome.storage.sync.set({ message: JSON.stringify(message) }, function () {
        });
    } catch (error) {
        console.error(`Error in setDataOnLocalStorage, error: ${error}`);
    }
}

/**
 * @function onInstalling
 * @description chrome.runtime.onInstalling use this callBack function
 */
function onInstalling() {
    setTheDefaultConfig();
}
/**
 * @function getConfigFromLocalStorage
 * @description get config
 * [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 * form localstorage, holding last oneTimeFetch
 */
function getConfigFromLocalStorage() {
    try {
        const backUpOldConfig = cryptoFollowConfig;
        chrome.storage.sync.get(["cryptoFollowConfig"], function (item) {
            if (item.cryptoFollowConfig != null) {
                cryptoFollowConfig = JSON.parse(item.cryptoFollowConfig);
                for (const key in cryptoFollowConfig.vendor) {
                    if (cryptoFollowConfig.vendor[key].oneTimeFetch != null) {
                        // eslint-disable-next-line max-len
                        cryptoFollowConfig.vendor[key].oneTimeFetch = backUpOldConfig.vendor[key].oneTimeFetch;
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Error in getConfigFromLocalStorage function: ${error}`);
    }
}
