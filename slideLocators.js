const slideLocators = {

    startFreeTrialButton: [
        '~Start free trial now',
        'android=new UiSelector().description("Start free trial now")',
        'android=new UiSelector().descriptionContains("Start free trial")',
        '//android.view.ViewGroup[@content-desc="Start free trial now"]',
        'android=new UiSelector().textContains("Start free trial")',
        '//android.widget.TextView[contains(@text,"Start free trial")]'
    ],

    checkoutIndicators: [
        'android=new UiSelector().textContains("Subscribe")',
        'android=new UiSelector().textContains("Payment")',
        'android=new UiSelector().textContains("Card information")',
        'android=new UiSelector().textContains("Email")'
    ]
};

module.exports = slideLocators;