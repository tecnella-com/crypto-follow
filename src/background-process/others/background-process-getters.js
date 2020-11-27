
/**
 * It contains the get functions for the background process. Also, the cooldowns check functions.
 * @module background-process-getters
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @function getDataFromApi
 * @async
 * @description Get the symbol's data from the vendor's API, just one at a time.
 * @param {string} APIEndpoint The API Endpoint URL
 * @param {string} symbol a PAR symbol see:[Binace-doc]{@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics} or see:[Bitfinex-doc]{@link https://docs.bitfinex.com/docs/introduction}
 * @returns {JSON} data from Apis
 */
function getDataFromApi(APIEndpoint, symbol) {
    return new Promise(function (resolve, reject) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", APIEndpoint + symbol);
            xhr.responseType = "json";

            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                } else {
                    console.error("API not responding");
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error("Error in getFromApi function");
                reject(xhr.statusText);
            };
            xhr.send();
        } catch (error) {
            console.error("Error in getDataFromApi function");
        }
    });
}
/**
 * @function getPageDataFromWeb
 * @async
 * @description Fetch the web page's data from the vendor's web portal,
 * WARNING: this method request all data from the web portal and the return data must be scraping
 * @param {String} webURI the url of the web or file
 */
function getPageDataFromWeb(webURI) {
    return new Promise(function (resolve, reject) {
        try {
            $.ajax({
                url: webURI,
                // time max to wait in milliseconds
                timeout: 3000,
                type: "GET",
                dataType: "html",

                // If result get a response is handled whit a call back funtion
                success: function (htmlResponse) {
                    resolve(htmlResponse);
                },
                // If we have a error is handled whit a call back funtion
                error: function (xhr, status) {
                    console.error(`Sorry we have troubles with:${webURI}`);
                    reject(status);
                },

                // Always run this code
                complete: function (xhr, status) {
                    console.info(`Request from ${webURI} done`);
                }
            });
        } catch (error) {
            console.error(`Error in getPageDataFromWeb function: ${error}`);
        }
    });
}

/**
 * @function getDataFromBinance
 * @description do a request for each item in __cryptoFollowConfig.vendor.binance.symbol__
 * and save each result in
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}
 * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
function getDataFromBinance() {
    for (const item in cryptoFollowConfig.vendor.binance.symbol) {
        if (Object.prototype.hasOwnProperty.call(cryptoFollowConfig.vendor.binance.symbol, item)) {
            try {
                getDataFromApi(
                    cryptoFollowConfig.vendor.binance.APIEndpoint,
                    cryptoFollowConfig.vendor.binance.symbol[item]
                )
                    // eslint-disable-next-line no-loop-func
                    .then(function (data) {
                        const dataModel = {
                            symbol: data.symbol,
                            priceChangePercent: fixToSignificantDigits(
                                data.priceChangePercent
                            ),
                            lastPrice: fixToSignificantDigits(data.lastPrice)
                        };
                        dataRequestedFromVendors.data.push(dataModel);
                    })
                    // eslint-disable-next-line no-loop-func
                    .catch(function (error) {
                        dataRequestedFromVendors.data.push(
                            errorHandlerFunctions.onGetDataFromApi.EmptyModelCriteria(
                                error,
                                cryptoFollowConfig.vendor.binance.symbol[item]
                            )
                        );
                    });
            } catch (error) {
                dataRequestedFromVendors.data.push(
                    errorHandlerFunctions.onGetDataFromApi.EmptyModelCriteria(
                        error,
                        cryptoFollowConfig.vendor.binance.symbol[item]
                    )
                );
            }
        }
    }
}

/**
 * @function getDataFromBitfinex
 * @description do a request for each item in __cryptoFollowConfig.vendor.bitfinex.symbol__
 * and save each result in
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}
 * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
function getDataFromBitfinex() {
    for (const item in cryptoFollowConfig.vendor.bitfinex.symbol) {
        if (Object.prototype.hasOwnProperty.call(cryptoFollowConfig.vendor.bitfinex.symbol, item)) {
            try {
                getDataFromApi(
                    cryptoFollowConfig.vendor.bitfinex.APIEndpoint,
                    cryptoFollowConfig.vendor.bitfinex.symbol[item]
                )
                    // eslint-disable-next-line no-loop-func
                    .then(function (data) {
                        const data0 = data[0];
                        const modelLikeBinance = {
                            symbol: data0[0],
                            priceChangePercent: fixToSignificantDigits(data0[6] * 100),
                            lastPrice: fixToSignificantDigits(data0[7])
                        };
                        dataRequestedFromVendors.data.push(modelLikeBinance);
                    })
                    // eslint-disable-next-line no-loop-func
                    .catch(function (error) {
                        dataRequestedFromVendors.data.push(
                            errorHandlerFunctions.onGetDataFromApi.EmptyModelCriteria(
                                error,
                                cryptoFollowConfig.vendor.bitfinex.symbol[item]
                            )
                        );
                    });
            } catch (error) {
                dataRequestedFromVendors.data.push(
                    errorHandlerFunctions.onGetDataFromApi.EmptyModelCriteria(
                        error,
                        cryptoFollowConfig.vendor.bitfinex.symbol[item]
                    )
                );
            }
        }
    }
}

/**
 * @function getDataFromBitven
 * @description do a request if __cryptoFollowConfig.vendor.bitven.symbol__
 * is not empty, do the result scraping, and save in
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}.
 * Also, at next try prevent the fetch and reuse the last data in __oneTimeFetch__.
 * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
function getDataFromBitven() {
    if (cryptoFollowConfig.vendor.bitven.symbol.length > 0) {
        if (
            cryptoFollowConfig.vendor.bitven.oneTimeFetch.lastPrice
            === "Loading"
            || (new Date().getTime() - cryptoFollowConfig.vendor.bitven.oneTimeFetch.time)
            >= cryptoFollowConfig.barConfig.cooldownForGetPageData
        ) {
            try {
                getPageDataFromWeb(cryptoFollowConfig.vendor.bitven.webURL)
                    .then(function (data) {
                        const priceToday = parseInt(
                            JSON.parse(data).USD_TO_BSF_RATE,
                            10
                        );
                        const priceYesterday = priceToday;
                        const change = priceToday - priceYesterday;
                        const changePercent = (change / priceYesterday) * 100;
                        const modelData = {
                            symbol: "DolarToDay.VES",
                            priceChangePercent: fixToSignificantDigits(changePercent),
                            lastPrice: fixToSignificantDigits(priceToday),
                            time: new Date().getTime()
                        };
                        cryptoFollowConfig.vendor.bitven.oneTimeFetch = modelData;
                    })
                    .catch(function (error) {
                        errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                            error,
                            cryptoFollowConfig.vendor.bitven
                        );
                    });
            } catch (error) {
                errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                    error,
                    cryptoFollowConfig.vendor.bitven
                );
            }
        }
        dataRequestedFromVendors.data.push(
            cryptoFollowConfig.vendor.bitven.oneTimeFetch
        );
    }
}

/**
 * @function getDataFromInvestingOil
 * @description do a request if __cryptoFollowConfig.vendor.investingOil.symbol__
 * is not empty, do the result scraping, and save in
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}.
 * Also, at next try prevent the fetch and reuse the last data in __oneTimeFetch__.
 * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
function getDataFromInvestingOil() {
    if (cryptoFollowConfig.vendor.investingOil.symbol.length > 0) {
        if (
            cryptoFollowConfig.vendor.investingOil.oneTimeFetch.lastPrice
            === "Loading"
            || (new Date().getTime() - cryptoFollowConfig.vendor.investingOil.oneTimeFetch.time)
            >= cryptoFollowConfig.barConfig.cooldownForGetPageData
        ) {
            try {
                getPageDataFromWeb(cryptoFollowConfig.vendor.investingOil.webURL)
                    .then(function (data) {
                        const dataFromTables = $(data)
                            .find("#curr_table")
                            .find("td");
                        const priceToday = dataFromTables[1].innerHTML.replace(
                            /,/,
                            "."
                        );
                        const changePercent = dataFromTables[6].innerHTML
                            .replace(/,/, ".")
                            .replace(/%/, "");
                        const modelData = {
                            symbol:
                                cryptoFollowConfig.vendor.investingOil
                                    .oneTimeFetch.symbol,
                            priceChangePercent: fixToSignificantDigits(changePercent),
                            lastPrice: fixToSignificantDigits(priceToday),
                            time: new Date().getTime()
                        };
                        cryptoFollowConfig.vendor.investingOil.oneTimeFetch = modelData;
                    })
                    .catch(function (error) {
                        errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                            error,
                            cryptoFollowConfig.vendor.investingOil
                        );
                    });
            } catch (error) {
                errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                    error,
                    cryptoFollowConfig.vendor.investingOil
                );
            }
        }
        dataRequestedFromVendors.data.push(
            cryptoFollowConfig.vendor.investingOil.oneTimeFetch
        );
    }
}

/**
 * @function getDataFromBCV
 * @description if is enabled, call the function
 * [getPageDataFromWeb()]{@link module:background-process-getters~getPageDataFromWeb}
 * to get the web page content from the Venezuelan´s Central Bank, and then scraping
 * the data to get the USD vs BSS official price. The result is saved and posted.
 */
function getDataFromBCV() {
    if (cryptoFollowConfig.vendor.bancoCentralDeVenezuela.symbol.length > 0) {
        if (
            cryptoFollowConfig.vendor.bancoCentralDeVenezuela.oneTimeFetch
                .lastPrice === "Loading"
                || (new Date().getTime()
                - cryptoFollowConfig.vendor.bancoCentralDeVenezuela.oneTimeFetch.time)
            >= cryptoFollowConfig.barConfig.cooldownForGetPageData
        ) {
            try {
                getPageDataFromWeb(
                    cryptoFollowConfig.vendor.bancoCentralDeVenezuela.webURL
                )
                    .then(function (data) {
                        const firstRowData = $($(data).find("tr")[1]).find("td");
                        let secondRow = 1;
                        while (
                            $(firstRowData[0]).contents()[1].textContent
                            === $(
                                $($(data).find("tr")[secondRow]).find("td")
                            ).contents()[1].textContent
                        ) {
                            secondRow += 1;
                        }
                        const secondRowData = $(
                            $(data).find("tr")[secondRow]
                        ).find("td");
                        const priceToday = (parseInt(firstRowData[2].textContent.trim(), 10)
                        + parseInt(firstRowData[3].textContent.trim(), 10))
                        / 2;
                        const priceYesterday = (parseInt(secondRowData[2].textContent.trim(), 10)
                        + parseInt(secondRowData[3].textContent.trim(), 10))
                        / 2;
                        const change = priceToday - priceYesterday;
                        const changePercent = (change / priceYesterday) * 100;
                        const modelData = {
                            symbol:
                                cryptoFollowConfig.vendor
                                    .bancoCentralDeVenezuela.oneTimeFetch
                                    .symbol,
                            priceChangePercent: fixToSignificantDigits(changePercent),
                            lastPrice: fixToSignificantDigits(priceToday),
                            time: new Date().getTime()
                        };
                        cryptoFollowConfig.vendor.bancoCentralDeVenezuela.oneTimeFetch = modelData;
                    })
                    .catch(function (error) {
                        errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                            `Error in getDataFromBCV ${error}`,
                            cryptoFollowConfig.vendor.bancoCentralDeVenezuela
                        );
                    });
            } catch (error) {
                errorHandlerFunctions.onGetPageDataFromWeb.EmptyModelCriteria(
                    `Error in getDataFromBCV ${error}`,
                    cryptoFollowConfig.vendor.bancoCentralDeVenezuela
                );
            }
        }
        dataRequestedFromVendors.data.push(
            cryptoFollowConfig.vendor.bancoCentralDeVenezuela.oneTimeFetch
        );
    }
}

/**
 * @function getFromVendors
 * @description Clean the global var
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}
 * and call [getDataFromBinance]{@link module:background-process-getters~getDataFromBinance},
 * [getDataFromBitfitnex]{@link module:background-process-getters~getDataFromBitfinex},
 * [getDataFromBitven]{@link module:background-process-getters~getDataFromBitven},
 * [getDataFromInvestingOil]{@link module:background-process-getters~getDataFromInvestingOil},
 * [getDataFromBCV]{@link module:background-process-getters~getDataFromBCV}
 */
function getFromVendors() {
    dataRequestedFromVendors = {
        data: []
    };
    getDataFromBinance();
    getDataFromBitfinex();
    getDataFromBitven();
    getDataFromInvestingOil();
    getDataFromBCV();

    dataRequestedFromVendors.time = new Date().getTime();
}

/**
 * @function checkForUpdate
 * @description check if the [cooldown]{@link module:background-process-setup~cooldown}
 * time has been expired, then call
 * [getFromVendors]{@link module:background-process-getters~getFromVendors}.
 * Note: by default, the cooldown is 60 seconds.
 */
function checkForUpdate() {
    const timeFromLastRequests = Date.now() - Date.parse(lastRequestDate);
    if (timeFromLastRequests > 1000 * cooldown) {
        lastRequestDate = new Date();
        getFromVendors();
        return true;
    }
    return false;
}