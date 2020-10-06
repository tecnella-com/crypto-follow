/**
 * @module declarationsAndConfig
 * @description Contains the configurations and the globals variables for all process
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @var {JSON} cryptoFollowDefaultConfig
 * @description the default configuration to the extension.
 * @property {JSON} vendor
 * - identification for vendors.
 * @property {JSON} vendor.binance
 * - identification for API's vendor Binance.
 * @property {String} vendor.binance.urlApi
 * - The URL to conect to the API.
 * @property {Array} vendor.binance.symbol
 * - Contains the symbols that will be request.
 * @property {JSON} vendor.bitfinex
 * - identification for API's vendor Bitfinex.
 * @property {String} vendor.bitfinex.urlApi
 * - The URL to conect to the API.
 * @property {Array} vendor.bitfinex.symbol
 * - Contains the symbols that will be request.
 * @property {JSON} vendor.notilogia
 * - identification for Web's vendor Notilogia.
 * @property {String} vendor.notilogia.urlApi
 * - The URL that will be scraping.
 * @property {Array} vendor.notilogia.symbol
 * - The symbol to show and if is empty disable the vendor data fetch.
 * @property {JSON} vendor.notilogia.oneTimeFetch
 * - Save the vendor data, and is reused to prevent other
 * [getPageDataFromWeb]{@link module:background-process-getters~getPageDataFromWeb}
 * @property {String} vendor.notilogia.oneTimeFetch.symbol
 * - The symbol to show
 * @property {String} vendor.notilogia.oneTimeFetch.priceChangePercent
 * - contains pair price change percent
 * @property {String} vendor.notilogia.oneTimeFetch.lastPrice
 * - contains the pair last price
 * @property {JSON} vendor.investingOil
 * - identification for Web's vendor InvestingOil.
 * @property {String} vendor.investingOil.urlApi
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
 * @property {String} vendor.bancoCentralDeVenezuela.urlApi
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
    vendor: {
        binance: {
            urlApi: "https://api.binance.com/api/v3/ticker/24hr?symbol=",
            symbol: ["BTCUSDT", "EURUSDT"]
        },
        bitfinex: {
            urlApi: "https://api-pub.bitfinex.com/v2/tickers?symbols=",
            symbol: ["tXAUT:USD"]
        },
        notilogia: {
            // https://www.notilogia.com/2020/08/precio-dolar-paralelo.html
            urlApi:
                `https://www.notilogia.com/${
                    new Date().getFullYear()
                }/${
                    String(new Date().getMonth() + 101).substring(1, 3)
                }/precio-dolar-paralelo.html`,
            symbol: [],
            oneTimeFetch: {
                symbol: "DolarToDay.VES",
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            }
        },
        investingOil: {
            urlApi:
                "https://es.investing.com/commodities/brent-oil-historical-data",
            symbol: ["Oil.Brend"],
            oneTimeFetch: {
                symbol: "Oil.Brend",
                priceChangePercent: "Loading",
                lastPrice: "Loading"
            }
        },
        bancoCentralDeVenezuela: {
            urlApi:
                "http://www.bcv.org.ve/tasas-informativas-sistema-bancario",
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
 * @var {String} version
 * @description A global variable that contains the program version
 */
// eslint-disable-next-line no-var, no-unused-vars
var version = "1.0.0";

/**
 * @var {String} description
 * @description A global variable that contains a short description
 */
// eslint-disable-next-line no-var, no-unused-vars
var description = "Crypto and assets always in your browser";
