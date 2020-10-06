/* eslint-disable wrap-iife */

/**
 * @module user-interface-main
 * @description Contains the listeners and the main code for the user interface.
 * @author Tecnella
 * @author Vladimir Cusatti
 */

/**
  * @namespace mainCode
  * @description Get the configuration form the Local Storage,
  * then set the vendors and the pairs in the user interface
  * @see {@link module:user-interface-data~getCryptoFollowLastConfigFromLocalStorage}
  * @see {@link module:user-interface-utils~fillVendorsWithAvailablesPairs}
  */
getCryptoFollowLastConfigFromLocalStorage();
if (window.location.href.indexOf("licence.html") === -1) {
    fillVendorsWithAvailablesPairs();
}
const versionSpan = document.getElementById("version");
versionSpan.innerText = version;
const descriptionSpan = document.getElementById("description");
descriptionSpan.innerText = description;

/**
 * @namespace searchBoxLogic
 * @description The listener for the searchbox event.
 * @fires searchBoxLogic
 */

(function ($) {
    try {
        const searchBox = $("#searchbox");
        searchBox.keyup(function () {
            searchBoxLogic(searchBox);
        });
        searchBox.on("search", function () {
            searchBoxLogic(searchBox);
        });
    } catch (error) {
        console.error(`error in searchBoxLogic, error: ${error}`);
    }
})(jQuery);

/**
 * @namespace resetDefault
 * @description The listener for the Reset Button click event.
 * @fires resetDefaultOnButtonClick
 */

(function ($) {
    try {
        const resetDefault = $("#resetDefault");
        $(resetDefault).click(function (e) {
            resetDefaultOnButtonClick(e);
        });
    } catch (error) {
        console.error(`Error in Reset default error: ${error}`);
    }
})(jQuery);

/**
 * @namespace saveOrRemoveAssociatePair
 * @description The listener for the click event at each checkbox.
 * @fires saveOrRemoveAssociatePair
 */
(function ($) {
    try {
        const checkboxs = $(".checkbox");
        for (const key in checkboxs) {
            if (Object.prototype.hasOwnProperty.call(checkboxs, key)) {
                // eslint-disable-next-line no-loop-func
                $(checkboxs[key]).click(function (e) {
                    saveOrRemoveAssociatePair(e);
                });
            }
        }
    } catch (error) {
        console.error(`Error in saveOrRemoveAssociatePair error: ${error}`);
    }
})(jQuery);

/**
 * @namespace accordionsLogic
 * @description The listener for the click event at each accordion buttons.
 * @fires showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 */
(function ($) {
    try {
        const acc = $(".bodyContainer .accordion");
        for (const key in acc) {
            if (Object.prototype.hasOwnProperty.call(acc, key)) {
                // eslint-disable-next-line no-loop-func
                $(acc[key]).click(function (e) {
                    showOrHideTheVendorSymbolsPanelByMaxHeightUpdating(e);
                });
            }
        }
    } catch (error) {
        console.error(`Error in Accordion logic error: ${error}`);
    }
})(jQuery);