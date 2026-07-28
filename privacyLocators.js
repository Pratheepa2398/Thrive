const privacyLocators = {

    // ============================================================
    // TIMEZONE POPUP (appears before the privacy screen sometimes)
    // ============================================================

    timezonePopupText: [
        'android=new UiSelector().textContains("timezone")'
    ],

    keepCurrentButton: [
        'android=new UiSelector().textContains("KEEP CURRENT")'
    ],

    // ============================================================
    // PRIVACY AND TERMS SCREEN
    // ============================================================

    privacyScreenIdentifier: [
        'android=new UiSelector().textContains("Privacy")',
        'android=new UiSelector().textContains("Terms")',
        '//*[contains(@text,"Privacy")]'
    ],

    privacyCheckbox: [
        '//android.widget.TextView[@text="I have read and understood Thrive AI Health\'s Privacy Policy and consent."]/parent::android.view.ViewGroup/android.view.ViewGroup[@clickable="true"][1]'
    ],

    termsCheckbox: [
        '//android.widget.TextView[@text="I have read and understood Thrive AI Health\'s Privacy Policy and consent."]/parent::android.view.ViewGroup/android.view.ViewGroup[@clickable="true"][2]'
    ],

    privacyNextButton: [
        '~Next',
        'android=new UiSelector().description("Next")',
        'android=new UiSelector().descriptionContains("Next")',
        '//*[contains(@content-desc,"Next")]'
    ]
};

module.exports = privacyLocators;