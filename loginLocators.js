const loginLocators = {

    googleLoginButton: [
        '~, Google',

        'android=new UiSelector()' +
        '.className("android.view.ViewGroup")' +
        '.descriptionContains("Google")' +
        '.clickable(true)',

        '//android.view.ViewGroup' +
        '[contains(@content-desc,"Google")]' +
        '[@clickable="true"]',

        '//android.widget.TextView[@text="Google"]' +
        '/parent::android.view.ViewGroup',

        'android=new UiSelector()' +
        '.text("Google")'
    ],

    googleAccount: [
        'id=com.google.android.gms:id/account_name',

        'android=new UiSelector()' +
        '.resourceId("com.google.android.gms:id/account_name")',

        'id=com.google.android.gms:id/container'
    ],

    googleConsentContinueButton: [
        '~Continue',

        'android=new UiSelector().text("Continue")',

        'android=new UiSelector().description("Continue")',

        '//*[contains(@text,"Continue")]'
    ],

    timezonePopupTitle: [
        'android=new UiSelector().textContains("timezone")',

        'android=new UiSelector().textContains("Timezone")',

        'android=new UiSelector().textContains("travel")',

        '//*[contains(@text,"timezone")]'
    ],

    timezoneUpdateButton: [
        'android=new UiSelector().textContains("UPDATE TIMEZONE")',

        'android=new UiSelector().textContains("Update timezone")',

        'id=android:id/button1'
    ],

    timezoneKeepCurrentButton: [
        'android=new UiSelector().textContains("KEEP CURRENT")',

        'android=new UiSelector().textContains("Keep Current")',

        'id=android:id/button2'
    ]
};

module.exports = loginLocators;