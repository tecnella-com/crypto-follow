
/**
 * Contains functions to handle the bar for the content script process
 * @module content-script-general-functions
 * @author Tecnella
 * @author Vladimir Cusatti
 */
/**
 * @function createSymbolContainer
 * @description create an element and sub-elements inside the bar
 * with an id number as id="symbol${idNum}"
 * @param {Number} idNum number used in ${idNum}
 */
function createSymbolContainer(idNum) {
    const element = {
        symbol: "loading",
        priceChangePercent: "loading",
        lastPrice: "loading"
    };
    const container = document.createElement("div");
    bar.append(container);
    container.id = `element${idNum}`;
    container.classList = "element-container";

    const row1 = document.createElement("div");
    container.append(row1);
    row1.classList = "row-cf text-center";

    const symbol = document.createElement("span");
    row1.append(symbol);
    symbol.id = `symbol${idNum}`;
    symbol.innerText = element.symbol;

    const row2 = document.createElement("div");
    container.append(row2);
    row2.classList = "row-cf text-center";

    const leftDiv = document.createElement("span");
    row2.append(leftDiv);
    leftDiv.classList = "left-column-border-right text-center";

    const price = document.createElement("span");
    leftDiv.append(price);
    price.id = `price${idNum}`;
    price.innerText = element.lastPrice;

    const rightDiv = document.createElement("span");
    row2.append(rightDiv);
    rightDiv.classList = "right-column-border-left text-center";

    const priceChangePercent = document.createElement("span");
    rightDiv.append(priceChangePercent);
    priceChangePercent.id = `variation${idNum}`;
    priceChangePercent.innerText = `${element.priceChangePercent}%`;

}
/**
 * @function setColorByChange
 * @description the element change the color to green (represent an up movement)
 * or change the color to red (represent a down movement).
 * @param {Number} value any number is accepted but a float is expected
 * @param {Object} element the DOM object to apply the color
 */
function setColorByChange(value, element) {
    if (value > 0.001) {
        element.classList.add("positiveColor");
    } else {
        element.classList.remove("positiveColor");
    }
    if (value < -0.001) {
        element.classList.add("negativeColor");
    } else {
        element.classList.remove("negativeColor");
    }  
}
/**
 * @function glowColor
 * @description Temporary glow color.
 * @param {String} nameClass can be downColor, upColor or holdColor
 * @param {Object} element the element to apply the glowColor
 */
function glowColor(nameClass, element) {
    element.classList.add(nameClass);
    setTimeout(() => {
        element.classList.remove(nameClass);
    }, 500);
}
/**
 * @function setTemporaryColorByChange
 * @description call
 * [glowColor]{@link module:content-script-general-functions~glowColor}
 * to change the color to red, to green, or to gray.
 * @param {Number} lastPrice the price in memory.
 * @param {Number} updatedPrice the new price recived.
 * @param {Object} element the DOM object like price or change percent.
 */

function setTemporaryColorByChange(lastPrice, updatedPrice, element) {
    if (lastPrice > updatedPrice) {
        glowColor("downColor", element);
    } else if (lastPrice < updatedPrice) {
        glowColor("upColor", element);
    } else {
        glowColor("holdColor", element);
    }
}
/**
 * @function updateElementsContents
 * @description Update the exists elements, and changing the color with
 * [setColorByChange]{@link module:content-script-general-functions~setColorByChange} and
 * [setTemporaryColorByChange]{@link module:content-script-general-functions~setTemporaryColorByChange}.
 * @param {JSON} data is like
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}.
 */
function updateElementsContents(data) {
    for (const item in data.data) {
        if (Object.prototype.hasOwnProperty.call(data.data, item)) {
            const element = {
                symbol: data.data[item].symbol,
                priceChangePercent: data.data[item].priceChangePercent,
                lastPrice: data.data[item].lastPrice
            };
            const symbol = document.getElementById(`symbol${item}`);
            const price = document.getElementById(`price${item}`);
            const changePercente = document.getElementById(`variation${item}`);

            symbol.innerText = element.symbol;
            price.innerText = element.lastPrice;
            changePercente.innerText = `${element.priceChangePercent}%`;
            setColorByChange(parseFloat(data.data[item].priceChangePercent), changePercente);
            // set Temporary Color By Change on price
            try {
                // Price
                setTemporaryColorByChange(lastData.data[item].lastPrice,
                    data.data[item].lastPrice, price);
            } catch (error) {
                console.error(`Error in updateElementsContents Price: ${error}`);
            }
            try {
                // set Temporary Color By Change on ChangePercent
                setTemporaryColorByChange(lastData.data[item].priceChangePercent,
                    data.data[item].priceChangePercent, changePercente);
            } catch (error) {
                console.error(`Error in updateElementsContents ChangePercent: ${error}`);
            }
        }
    }
}

/**
 * @function recreateBar
 * @description Clean the bar and fill its as many elements as
 * [totalConfiguredItems]{@link module:content-script-setup~totalConfiguredItems}.
 * @param {Number} totalConfiguredItems Elements number to be a create.
 */
function recreateBar(totalConfiguredItems) {
    bar.innerHTML = "";
    for (let index = 0; index < totalConfiguredItems; index += 1) {
        createSymbolContainer(index);
    }
}
/**
 * @function calculateTotalConfiguredElements
 * @description search in
 * [cryptoFollowConfig]{@link module:content-script-setup~cryptoFollowConfig}
 * how many symbols are in each vendor.
 * @returns {Number} the sum of all symbols in the vendor configuration.
 */
function calculateTotalConfiguredElements() {
    let count = 0;
    for (const key in cryptoFollowConfig.vendor) {
        if (Object.prototype.hasOwnProperty.call(cryptoFollowConfig.vendor, key)) {
            count += cryptoFollowConfig.vendor[key].symbol.length;
        }
    }
    return count;
}
/**
 * @function updateTheBar
 * @description Update the bar with an element number as
 * [totalConfiguredItems]{@link module:content-script-setup~totalConfiguredItems}.
 * Save the data in lastData.
 * @param {JSON} data is like
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}.
 * @property {Number} countOfElmentsInData items Number obtained from vendors
 * received from the local storage.
 * @see [setDataOnLocalStorage]{@link module:background-process-data~setDataOnLocalStorage}
 * @property {Number} totalConfiguredItems items Number obtained from the configuration.
 * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
function updateTheBar(data) {
    const countOfElmentsInData = data.data.length;
    totalConfiguredItems = calculateTotalConfiguredElements();
    const element = document.getElementById("symbol1");

    if (typeof (element) === "undefined" || element === null) {
        recreateBar(totalConfiguredItems);
    }
    if (totalConfiguredItems !== countOfElmentsInData) {
        recreateBar(totalConfiguredItems);
    }

    try {
        updateElementsContents(data);
    } catch (error) {
        console.error(`Error in updateElementsContents: ${error}`);
    }

    lastData = data;
}

/**
 * @function hideTheBarTemporarily
 * @description Hide the bar temporarily and respawn at five seconds.
 * @event
 */
function hideTheBarTemporarily() {
    bar.style.setProperty("display", "none", "important");
    setTimeout(() => {
        bar.style.setProperty("display", "block", "important");
    }, respawnTime);
}

/**
 * @function createCryptoFollowBar
 * @description create the bar on top of the __documentBody__ container.
 * @param {Object} documentBody the container of the web page body.
 */
function createCryptoFollowBar(documentBody = document.body) {
    documentBody.insertAdjacentHTML(
        "beforeBegin",
        `
    <div id="cryptoFollowBar" title="Double click to hide the bar" class="text-center mainBar " ; 
    '></div>`
    );
    return document.getElementById("cryptoFollowBar");
}

