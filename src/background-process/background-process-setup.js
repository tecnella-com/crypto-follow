/* eslint-disable no-var */
/**
 * Contains the configurations and the global variables for the background process
 * @module background-process-setup
 * @author Tecnella
 * @author Vladimir Cusatti
 */
/**
 * @var {JSON} cryptoFollowConfig
 * @description Configuration in __backgroundScript__ process
 * have the same properties as __cryptoFollowDefaultConfig__
 * @see [cryptoFollowDefaultConfig]{@link module:declarationsAndConfig~cryptoFollowDefaultConfig}
 */
var cryptoFollowConfig = cryptoFollowDefaultConfig;

/**
 * @var {JSON} dataRequestedFromVendors
 * @description The container of response from get functions, is used by
 * [setDataOnLocalStorage]{@link module:background-process-data~setDataOnLocalStorage}
 * @property {Array<JSON>} data
 * - The container of get functions result
 * @property {JSON} data[item]
 * - contain the JSON of get functions result
 * @property {String} data[item].symbol
 * - The symbol or PAR relationship
 * @property {String} data[item].priceChangePercent
 * - The change percent of price in the last 24h
 * @property {String} data[item].lastPrice
 * - The actual price
 */
var dataRequestedFromVendors = {
    data: []
};
 
/**
 * @var {Date} timeForLocalRefresh
 * @description The time to refresh the bar with the
 * [dataRequestedFromVendors]{@link module:background-process-setup~dataRequestedFromVendors}.
 * This is represented in milliseconds.
 */
var timeForLocalRefresh = 5000;

/**
 * @var {Date} lastRequestDate
 * @description A temporal mark for request control
 * @see [timeFromLastRequests]{@link module:background-process-setup~timeFromLastRequests}
 * @see [cooldown]{@link module:background-process-setup~cooldown}
 */
var lastRequestDate = new Date();


/**
 * @var {Number} cooldown
 * @description The time to prevent an API infraction. This is represented in seconds.
 * @see [getDataFromApi]{@link module:background-process-getters~getDataFromApi}.
 */
var cooldown = 60;

/**
 * @var {JSON} errorHandlerFunctions
 * @description A JSON with function for handle errors
 * @property {JSON} onGetDataFromApi
 * - identify to the handler for API errors
 * [getDataFromApi]{@link module:background-process-getters~getDataFromApi}
 * @property {function} onGetDataFromApi.EmptyModelCriteria
 * - handler for API errors
 * [getDataFromApi]{@link module:background-process-getters~getDataFromApi}
 * @property {JSON} onGetPageDataFromWeb
 * - Identify to the handler for errors on web request functions
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @property {function} onGetPageDataFromWeb.EmptyModelCriteria
 * - handler for errors on web request functions
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @param {String} error A text message to show by console log, recomended do: "message"+error
 * @param {String} symbol text symbol recomended use:
 * [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 * example: cryptoFollowConfig.vendor.binance.symbol[item] item is number
 * @param {Object} cryptoFollowConfigVendor reference to a vendor in
 * [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
 */
const errorHandlerFunctions = {
    onGetDataFromApi: {
        /**
         * @function EmptyModelCriteria
         * @description Show the error by the console and return an empty element model.
         * @param {String} error A text message to show by console.
         * @param {String} symbol text symbol
         * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
         * @example cryptoFollowConfig.vendor.binance.symbol[item] item is a number
         */
        EmptyModelCriteria(error, symbol) {
            console.error(error);
            const emptyModel = {
                symbol,
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            };
            return emptyModel;
        }
    },
    onGetPageDataFromWeb: {
        /**
         * @function EmptyModelCriteria
         * @description Show the error by the console and return an empty element model.
         * @param {String} error A text message to show by the console.
         * @param {Object} cryptoFollowConfigVendor reference to the vendor.
         * @see [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}
         */
        EmptyModelCriteria(error, cryptoFollowConfigVendor) {
            console.error(error);
            //TODO: fix eslint no-param-reassign in this function
            cryptoFollowConfigVendor.oneTimeFetch = {
                symbol: cryptoFollowConfigVendor.oneTimeFetch.symbol,
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            };
        }
    }

};