/**
 * Contains configurations, global var for the content script process
 * @module userInterfaceConfigAndDeclarations
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @var {JSON} cryptoFollowLastConfig
 * @description configuration in user interface process geted by [getConfigFromLocalStorage]{@link module:backgroundGetF~getConfigFromLocalStorage} has the same properties like [cryptoFollowConfig]{@link module:declarationsAndConfig~cryptoFollowConfig}
 */
var cryptoFollowLastConfig = cryptoFollowDefaultConfig;

/**
 * @var {JSON} availablesSymbols
 * @description This var contains the PAR and name of vendors to show in the user interface accordeons. used by {@link fillVendorsWithAvailablesPairs}
 * @property {JSON} vendor                                      - Contains the vendors available
 * @property {JSON} vendor.binance                              - A api vendor [getDataFromApi]{@link module:backgroundGetF~getDataFromApi}
 * @property {String} vendor.binance.name                       - The url to conect to the api
 * @property {Array<String>} vendor.binance.symbol                      - Contains the symbols that can be obtained, see:[binance-docs]{@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics}
 * @property {JSON} vendor.bitfinex                             - A api vendor
 * @property {String} vendor.bitfinex.name                      - The url to conect to the api
 * @property {Array<String>} vendor.bitfinex.symbol                     - Contains the symbols that can be obtained, see:[docs.bitfinex]{@link https://docs.bitfinex.com/docs/introduction}
 * @property {JSON} vendor.notilogia                            - A web vendor [getDataFromWeb]{@link module:backgroundGetF~getDataFromWeb}
 * @property {String} vendor.notilogia.name                     - The name of vendor
 * @property {Array<String>} vendor.notilogia.symbol                    - Contains a name to show in user interface
 * @property {JSON} vendor.investingOil                         - A web vendor
 * @property {String} vendor.investingOil.name                  - The name of vendor
 * @property {Array<String>} vendor.investingOil.symbol                 - Contains a name to show in user interface
 * @property {JSON} vendor.bancoCentralDeVenezuela              - A web vendor
 * @property {String} vendor.bancoCentralDeVenezuela.name       - The name of vendor
 * @property {Array<String>} vendor.bancoCentralDeVenezuela.symbol      - Contains a name to show in user interface
 */
let availablesSymbols = {
    vendor: {
        binance: {
            name: "Binance",
            symbol: [
                "BTCUSDT",
                "EURUSDT",
                "ETHBTC",
                "LTCBTC",
                "BNBBTC",
                "NEOBTC",
                "ETHUSDT",
                "LTCUSDT",
                "ADAUSDT",
                "BNBUSDT"
            ]
        },
        bitfinex: {
            name: "Bitfinex",
            symbol: [
                "tBTCUSD",
                "tLTCUSD",
                "tETHBTC",
                "tLTCBTC",
                "tXAUT:USD",
                "tNEOBTC",
                "tETHUSD",
                "tLTCUSD",
                "tADAUSD",
                "tXRPUSD"
            ]
        },
        notilogia: {
            name: "Notilogia",
            symbol: ["DolarToDay.VES"]
        },
        investingOil: {
            name: "Investing Oil",
            symbol: ["Oil.Brend"]
        },
        bancoCentralDeVenezuela: {
            name: "Banco Central De Venezuela",
            symbol: ["USD:VES.BCV"]
        }
    }
};
