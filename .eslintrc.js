module.exports = {
    extends: "airbnb-base",
    rules: {
        "linebreak-style": 0,
        quotes: [2, "double"],
        indent: ["error", 4],
        "no-console": ["error", { allow: ["info", "error"] }],
        "prefer-arrow-callback": 0,
        "func-style": ["error", "declaration", { allowArrowFunctions: false }],
        "func-names": ["error", "never"],
        "no-restricted-syntax": ["error", "WithStatement"],
        "comma-dangle": ["error", "never"]
    },
    globals: {
        document: "writable",
        jQuery: "writable",
        $: "writable",
        localStorage: "writable",
        location: "writable",
        bar: "writable",
        calculateTotalConfiguredElements: "writable",
        createCryptoFollowBar: "writable",
        cryptoFollowDefaultConfig: "writable",
        cryptoFollowConfig: "writable",
        cryptoFollowLastConfig: "writable",
        chrome: "writable",
        checkForUpdate: "writable",
        cooldown: "writable",
        dataToShow: "writable",
        dataRequestedFromVendors: "writable",
        description: "writable",
        errorHandlerFunctions: "writable",
        fixToSignificantDigits: "writable",
        fillVendorsWithAvailablesPairs: "writable",
        getFromVendors: "writable",
        getConfigFromLocalStorage: "writable",
        getCryptoFollowLastConfigFromLocalStorage: "writable",
        getDataToShowFromLocalStorage: "writable",
        hideTheBarTemporarily: "writable",
        lastData: "writable",
        lastRequestDate: "writable",
        onCheckBoxClick: "writable",
        onInstalling: "writable",
        setTheDefaultConfig: "writable",
        resetDefaultOnButtonClick: "writable",
        setConfigOnLocalStorage: "writable",
        setDataOnLocalStorage: "writable",
        searchBoxLogic: "writable",
        showOrHideTheVendorSymbolsPanelByMaxHeightUpdating: "writable",
        symbolsAvailables: "writable",
        timeForLocalRefresh: "writable",
        totalConfiguredItems: "writable",
        updateTheBar: "writable",
        version: "writable",
        window: "writable",
        XMLHttpRequest: "writable"
    }
};
