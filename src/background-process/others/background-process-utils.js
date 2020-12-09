
/**
 * Contains utility functions such as number formatting for the background process.
 * @module background-process-utils
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
 * @function toThousandsCommaFormat
 * @description Convert a number to a string with thousand separator comma
 * @param {number} x The number without comma
 * @returns {string} The number converted to a string with thousand separator comma
 */
function toThousandsCommaFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @function fixToSignificantDigits
 * @description if the number is big, format it with a separate comma for thousand,
 * else fix the decimal precision to 3 digit
 * @param {Number} num a general number
 * @returns {string} num formated
 */
function fixToSignificantDigits(val) {
    let num = Number(val);
    try {
        if (val >= 999 || val <= -999) {
            // the number required comma
            num = num.toFixed(2);
            num = toThousandsCommaFormat(num);
        } else if (val <= 1 && val >= -1) {
            // the number is little
            num = num.toPrecision(3);
        } else {
            // the number don´t required comma
            num = num.toFixed(2);
        }
        return String(num);
    } catch (error) {
        console.error(`format numbers error: ${error}`);
    }
    return String(num);
}