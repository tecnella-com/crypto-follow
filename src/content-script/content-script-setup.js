/* eslint-disable no-var */
/**
 * Contains the configurations and the global variables for the __content-script__ process
 * @module content-script-setup
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @var {JSON} cryptoFollowConfig
 * @description Configuration in __contentScript__ process
 * have the same properties as __cryptoFollowDefaultConfig__.
 * @see [cryptoFollowDefaultConfig]{@link module:declarationsAndConfig~cryptoFollowDefaultConfig}.
 */
var cryptoFollowConfig = cryptoFollowDefaultConfig;
/**
 * @var {Number} totalConfiguredItems
 * @description Contains the number of elements to create on the bar,
 * is extracted from [cryptoFollowConfig]{@link module:background-process-setup~cryptoFollowConfig}.
 */
var totalConfiguredItems;
/**
 * @var {JSON} dataToShow
 * @description contains the data requested from the vendors to fill the bar.
 * @property {Array} data                           - contains the data requested to each vendor.
 * @property {Date} time                            - A temporal mark from the last request.
 * @property {String} data[item].symbol             - Name of symbol.
 * @property {String} data[item].priceChangePercent - Pair price percentual variation.
 * @property {String} data[item].lastPrice          - Pair's last Price
 */
var dataToShow = {
    data: [
        {
            symbol: "DolarToDay.VES",
            priceChangePercent: "Loading",
            lastPrice: "Loading"
        }
    ],
    time: new Date().getTime()
};

/**
 * @var {JSON} lastData
 * @description contains the data requested from the vendors to fill the bar.
 * @property {Array} data                           - contains the data requested to each vendor.
 * @property {Date} time                            - A temporal mark from the last request.
 * @property {String} data[item].symbol             - Name of symbol.
 * @property {String} data[item].priceChangePercent - Pair price percentual variation.
 * @property {String} data[item].lastPrice          - Pair's last Price
 */
var lastData = {
    data: [
        {
            symbol: "DolarToDay.VES",
            priceChangePercent: "Loading",
            lastPrice: "Loading"
        }
    ],
    time: new Date().getTime()
};
/**
 * @var {object} bar
 * @description Contain the reference to object with id="cryptoFollowBar"
 */
var bar;

/**
 * @var {Number} respawnTime
 * @description respawn time after double click over the bar. This is represented in milliseconds.
 */
var respawnTime = 5000;