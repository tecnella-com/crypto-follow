
/**
 * @description Contains the listeners and the main code for the __content-script__ process
 * @module content-script-main
 * @author Tecnella
 * @author Vladimir Cusatti
 */
/**
 * @namespace instanceTheBar
 * @description instance the bar
 */
bar = createCryptoFollowBar();

/**
 * @namespace mainCode
 * @description main code on content script get config, get data saved and set a interval to redo
 */
getDataToShowFromLocalStorage();
getConfigFromLocalStorage();
totalConfiguredItems = calculateTotalConfiguredElements();
setInterval(() => {
    getConfigFromLocalStorage();
    getDataToShowFromLocalStorage();
    updateTheBar(dataToShow);
}, respawnTime);

/* ***************** listeners ***************************** */
/**
 * @namespace doubleClickListener
 * @descriptionhide the bar at double click on them
 * @fires hideTheBarTemporarily
 */
bar.ondblclick = () => {
    hideTheBarTemporarily();
};

//# Resumen del archivo
//# - Ver como priorizar este archivo para no tener que agregar la Z en el nombre 
//# - Cambiar el nombre del archivo a content-script-setup