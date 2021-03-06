/**
 * @module declarationsAndConfig
 * @description Contains the configurations and the globals variables for all process
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @var {JSON} cryptoFollowDefaultConfig
 * @description the default configuration to the extension.
 * @property {JSON} barConfig
 * - the bar config.
 * @property {JSON} barConfig.hideMode
 * - if is true mean Hide the bar on: Double click, on false hide the bar on: Mouseover.
 * @property {JSON} barConfig.cooldownForGetPageData
 * - cooldonw to refresh data from page in milliseconds, recomended value: 3600000
 * @property {JSON} barConfig.respawnTime
 * - respawn time after double click over the bar. This is represented in milliseconds.
 * @property {JSON} vendor
 * - identification for vendors.
 * @property {JSON} vendor.binance
 * - identification for API's vendor Binance.
 * @property {String} vendor.binance.APIEndpoint
 * - The URL to conect to the API.
 * @property {Array} vendor.binance.symbol
 * - Contains the symbols that will be request.
 * @property {JSON} vendor.bitfinex
 * - identification for API's vendor Bitfinex.
 * @property {String} vendor.bitfinex.APIEndpoint
 * - The URL to conect to the API.
 * @property {Array} vendor.bitfinex.symbol
 * - Contains the symbols that will be request.
 * @property {JSON} vendor.bitven
 * - identification for Web's vendor Bitven.
 * @property {String} vendor.bitven.webURL
 * - The URL that will be scraping.
 * @property {Array} vendor.bitven.symbol
 * - The symbol to show and if is empty disable the vendor data fetch.
 * @property {JSON} vendor.bitven.oneTimeFetch
 * - Save the vendor data, and is reused to prevent other
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @property {String} vendor.bitven.oneTimeFetch.symbol
 * - The symbol to show
 * @property {String} vendor.bitven.oneTimeFetch.priceChangePercent
 * - contains pair price change percent
 * @property {String} vendor.bitven.oneTimeFetch.lastPrice
 * - contains the pair last price
 * @property {JSON} vendor.investingOil
 * - identification for Web's vendor InvestingOil.
 * @property {String} vendor.investingOil.webURL
 * - The URL that will be scraping
 * @property {Array} vendor.investingOil.symbol
 * - The symbol to show and if is empty disable the vendor fetch
 * @property {JSON} vendor.investingOil.oneTimeFetch
 * - Save the vendor data, and is reused to prevent other
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @property {String} vendor.investingOil.oneTimeFetch.symbol
 * - The symbol to show
 * @property {String} vendor.investingOil.oneTimeFetch.priceChangePercent
 * - contains pair price change percent
 * @property {String} vendor.investingOil.oneTimeFetch.lastPrice
 * - contains the pair last price
 * @property {JSON} vendor.bancoCentralDeVenezuela
 * - identification for Web's vendor Venezuela's Central Bank.
 * @property {String} vendor.bancoCentralDeVenezuela.webURL
 * - The URL that will be scraping
 * @property {Array} vendor.bancoCentralDeVenezuela.symbol
 * - The symbol to show and if is empty disable the vendor fetch
 * @property {JSON} vendor.bancoCentralDeVenezuela.oneTimeFetch
 * - Save the vendor data, and is reused to prevent other
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @property {String} vendor.bancoCentralDeVenezuela.oneTimeFetch.symbol
 * - The symbol to show
 * @property {String} vendor.bancoCentralDeVenezuela.oneTimeFetch.priceChangePercent
 * - contains pair price change percent
 * @property {String} vendor.bancoCentralDeVenezuela.oneTimeFetch.lastPrice
 * - contains the pair last price
 */
const cryptoFollowDefaultConfig = {
    barConfig: {
        hideMode: false,
        cooldownForGetPageData: 3600000,
        respawnTime: 5000
    },
    vendor: {
        binance: {
            APIEndpoint: "https://api.binance.com/api/v3/ticker/24hr?symbol=",
            symbol: ["BTCUSDT", "EURUSDT"]
        },
        bitfinex: {
            APIEndpoint: "https://api-pub.bitfinex.com/v2/tickers?symbols=",
            symbol: ["tXAUT:USD"]
        },
        bitven: {
            webURL: "https://www.bitven.com/assets/js/rates.js",
            symbol: ["DolarToDay.VES"],
            oneTimeFetch: {
                symbol: "DolarToDay.VES",
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            }
        },
        investingOil: {
            webURL: "https://es.investing.com/commodities/brent-oil-historical-data",
            symbol: ["Oil.Brend"],
            oneTimeFetch: {
                symbol: "Oil.Brend",
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            }
        },
        bancoCentralDeVenezuela: {
            webURL: "http://www.bcv.org.ve/tasas-informativas-sistema-bancario",
            symbol: ["USD:VES.BCV"],
            oneTimeFetch: {
                symbol: "USD:VES.BCV",
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            }
        }
    }
};
/**
* @var {String} manifest
* @description A global variable that contains the program manifest
*/
// eslint-disable-next-line no-var, no-unused-vars
var manifest = chrome.runtime.getManifest();

/**
 * @var {String} version
 * @description A global variable that contains the program version
 */
// eslint-disable-next-line no-var, no-unused-vars
var version = manifest.version;

/**
 * @var {String} description
 * @description A global variable that contains a short description
 */
// eslint-disable-next-line no-var, no-unused-vars
var description = "Crypto and assets always in your browser";

/**
 * @function setTheDefaultConfig
 * @description function to restore the default configuration
 */
function setTheDefaultConfig() {
    console.info("--- Crypto follow instaled, setting default configuration ---");
    try {
        chrome.storage.sync.set(
            { cryptoFollowConfig: JSON.stringify(cryptoFollowDefaultConfig) }, function () {
            }
        );
    } catch (error) {
        console.error(`Error in onInstallingsetTheDefaultConfig, error: ${error}`);
    }
}
