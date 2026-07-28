module.exports = {

    /*
     * =========================================================
     * THRIVE AI SUBSCRIPTION PAGE
     * =========================================================
     */

    monthlyPlan: [
        'android=new UiSelector().text("Monthly")',
        'android=new UiSelector().textContains("Monthly")',
        '//*[@text="Monthly"]'
    ],

    monthlyPrice: [
        'android=new UiSelector().text("$0/mo")',
        'android=new UiSelector().textContains("0/mo")',
        '//*[contains(@text,"0/mo")]'
    ],

    monthlyDiscount: [
        'android=new UiSelector().textContains("Was $40")',
        '//*[contains(@text,"Was $40")]'
    ],

    monthlyTrialButton: [
        'android=new UiSelector().descriptionContains("Start 14-day free trial")',
        '//android.view.ViewGroup[contains(@content-desc,"Start 14-day free trial")]',
        '//*[contains(@content-desc,"Start 14-day free trial")]'
    ],


    /*
     * =========================================================
     * STRIPE CHECKOUT PAGE
     * Chrome Custom Tab exposed as native Android elements
     * =========================================================
     */

    stripeCheckoutHeading: [
        'android=new UiSelector().textContains("14 days free")',
        'android=new UiSelector().textContains("Try App Subscription")',
        '//*[contains(@text,"14 days free")]',
        '//*[contains(@text,"Try App Subscription")]'
    ],

    stripeEmailText: [
        'android=new UiSelector().textContains("@")',
        '//*[contains(@text,"@")]'
    ],

    billingNameField: [
        'id=billingName',
        'android=new UiSelector().resourceId("billingName")',
        '//android.widget.EditText[@resource-id="billingName"]'
    ],

    billingCountryDropdown: [
        'id=billingCountry',
        'android=new UiSelector().resourceId("billingCountry")',
        '//*[@resource-id="billingCountry"]'
    ],

    countryList: [
        'android=new UiSelector().className("android.widget.ListView")',
        '//android.widget.ListView'
    ],

    unitedStatesCountryOption: [
        'android=new UiSelector().className("android.widget.CheckedTextView").text("United States")',
        '//android.widget.CheckedTextView[@text="United States"]',
        '//*[@resource-id="android:id/text1" and @text="United States"]'
    ],

    unitedStatesScrollableOption: [
        'android=new UiScrollable(new UiSelector().className("android.widget.ListView")).scrollIntoView(new UiSelector().className("android.widget.CheckedTextView").text("United States"))',
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("United States"))'
    ],

    indiaCountryOption: [
        'android=new UiSelector().className("android.widget.CheckedTextView").text("India")',
        '//android.widget.CheckedTextView[@text="India"]',
        '//*[@resource-id="android:id/text1" and @text="India"]'
    ],

    indiaScrollableOption: [
        'android=new UiScrollable(new UiSelector().className("android.widget.ListView")).scrollIntoView(new UiSelector().className("android.widget.CheckedTextView").text("India"))',
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("India"))'
    ],

    billingAddressField: [
        'id=billingAddressLine1',
        'android=new UiSelector().resourceId("billingAddressLine1")',
        '//android.widget.EditText[@resource-id="billingAddressLine1"]'
    ],

    enterAddressManuallyButton: [
    'android=new UiSelector().text("Enter address manually")',
    'android=new UiSelector().textContains("Enter address manually")',
    '//*[@text="Enter address manually"]',
    '//*[contains(@text,"Enter address manually")]'
],

billingAddressField: [
    'android=new UiSelector().resourceId("billingAddressLine1")',
    '//android.widget.EditText[@resource-id="billingAddressLine1"]',
    'id=billingAddressLine1'
],

billingCityField: [
    'android=new UiSelector().resourceId("billingLocality")',
    '//android.widget.EditText[@resource-id="billingLocality"]',
    'id=billingLocality'
],

billingPostalCodeField: [
    'android=new UiSelector().resourceId("billingPostalCode")',
    '//android.widget.EditText[@resource-id="billingPostalCode"]',
    'id=billingPostalCode'
],

billingStateDropdown: [
    'android=new UiSelector().resourceId("billingAdministrativeArea")',
    '//*[@resource-id="billingAdministrativeArea"]',
    'id=billingAdministrativeArea'
],

    stateList: [
        'android=new UiSelector().className("android.widget.ListView")',
        '//android.widget.ListView'
    ],

    newYorkStateOption: [
        'android=new UiSelector().className("android.widget.CheckedTextView").text("New York")',
        '//android.widget.CheckedTextView[@text="New York"]',
        '//*[@resource-id="android:id/text1" and @text="New York"]'
    ],

    newYorkScrollableOption: [
        'android=new UiScrollable(new UiSelector().className("android.widget.ListView")).scrollIntoView(new UiSelector().className("android.widget.CheckedTextView").text("New York"))',
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("New York"))'
    ],

    startTrialButton: [
        'android=new UiSelector().className("android.widget.Button").text("Start trial")',
        'android=new UiSelector().text("Start trial")',
        '//android.widget.Button[@text="Start trial"]'
    ],


    /*
     * =========================================================
     * STRIPE RESULT
     * =========================================================
     */

    stripeSuccessIndicator: [
        'android=new UiSelector().textContains("success")',
        'android=new UiSelector().textContains("Thank you")',
        'android=new UiSelector().textContains("confirmed")',
        'android=new UiSelector().textContains("trial has started")',
        '//*[contains(@text,"success")]',
        '//*[contains(@text,"Thank you")]',
        '//*[contains(@text,"confirmed")]'
    ],

    stripeErrorIndicator: [
        'android=new UiSelector().textContains("Unable")',
        'android=new UiSelector().textContains("error")',
        'android=new UiSelector().textContains("failed")',
        'android=new UiSelector().textContains("invalid")',
        '//*[contains(@text,"error")]',
        '//*[contains(@text,"failed")]'
    ],


    /*
     * =========================================================
     * THRIVE APP AFTER CHECKOUT
     * =========================================================
     */

    appHomeIndicator: [
        'android=new UiSelector().textContains("Today")',
        'android=new UiSelector().textContains("Health Points")',
        'android=new UiSelector().descriptionContains("Home")',
        '//android.widget.TextView[contains(@text,"Today")]',
        '//android.widget.TextView[contains(@text,"Health Points")]'
    ],

    subscriptionSuccessIndicator: [
        'android=new UiSelector().textContains("Welcome")',
        'android=new UiSelector().textContains("subscription")',
        'android=new UiSelector().textContains("trial")',
        'android=new UiSelector().textContains("Health Connect")',
        '//*[contains(@text,"Welcome")]',
        '//*[contains(@text,"trial")]'
    ]
};