
/**
 * @module background-process-main
 * @description Contains the listeners and the main code for the background process
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/* *********** listeners ************************ */

/**
 *  @namespace onInstallingResetConfig
 * @description On installing the extension reset to the default configuration.
 */
chrome.runtime.onInstalled.addListener(onInstallingResetConfig());

/* ****** main code on load ******* */
/**
 * @namespace mainCode
 * @description the main code in the background process
 * and interval setting for recurrent execution.
 */
getFromVendors();
setInterval(() => {
    setDataOnLocalStorage(dataRequestedFromVendors);
    getConfigFromLocalStorage();
    checkForUpdate();
}, timeForLocalRefresh);
