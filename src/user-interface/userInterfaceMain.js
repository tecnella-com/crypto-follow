/**
 * Contains listeners, the first call and all code different to functions or declarative code for the user interface
 * @module userInterfaceMain
 * @author Tecnella
 * @author Vladimir Cusatti
 */

 /**
  * @namespace firstCall
  * @description call to [getCryptoFollowLastConfigFromLocalStorage]{@link module:userInterfaceFunctions~getCryptoFollowLastConfigFromLocalStorage} and [fillVendorsWithAvailablesPairs]{@link module:userInterfaceFunctions~fillVendorsWithAvailablesPairs}
  */
getCryptoFollowLastConfigFromLocalStorage();
fillVendorsWithAvailablesPairs();


/**
 * @namespace searchBoxLogic
 * @description call to searchBoxLogic
 */

(function($) {
    try {
        let searchBox = $("#searchbox");
        searchBox.keyup(e => {
            searchBoxLogic(searchBox);
        });        
        searchBox.on("search", e => {
            searchBoxLogic(searchBox);
        });
    } catch (error) {
        console.log("error in searchBox, error:" + error);
    }
})(jQuery);

/**
 * @namespace resetDefault
 * @description Reset default at user interface call [resetDefaultOnButtonClick]{@link module:userInterfaceFunctions~resetDefaultOnButtonClick}
 */

(function($) {
    try {
        var resetDefault = $("#resetDefault");
        $(resetDefault).click(e => {
            resetDefaultOnButtonClick(e);
        });
    } catch (error) {
        console.log("Reset default error:" + error);
    }
})(jQuery);

/**
 * @namespace onCheckBoxClick
 * @description checkbox click at user interface
 * @fires onCheckBoxClick
 */
(function($) {
    try {
        var checkboxs = $(".checkbox");
        for (const key in checkboxs) {
            $(checkboxs[key]).click(e => {
                onCheckBoxClick(e);
            });
        }
    } catch (error) {
        console.log("checkbox click logic error:" + error);
    }
})(jQuery);

/**
 * @namespace accordionsLogic
 * @description Accordion logic at user interface
 * @fires showOrHideTheVendorSymbolsPanelByMaxHeightUpdating
 */
(function($) {
    try {
        var acc = $(".accordion");
        for (const key in acc) {
            $(acc[key]).click(e => {
                showOrHideTheVendorSymbolsPanelByMaxHeightUpdating(e);
            });
        }
    } catch (error) {
        console.log("Accordion logic error:" + error);
    }
})(jQuery);
