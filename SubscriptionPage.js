const locators =
    require('../../locators/onboarding/subscriptionLocators');

const common =
    require('../../utils/common');


class SubscriptionPage {

    constructor() {

        this.thrivePackage =
            process.env.THRIVE_APP_PACKAGE ||
            'com.thriveaihealth.qa';

        this.chromePackage =
            'com.android.chrome';
    }


    /*
     * =========================================================
     * COMMON METHODS
     * =========================================================
     */

    async switchToNativeApp() {

        try {

            await driver.switchContext(
                'NATIVE_APP'
            );

        } catch (error) {

            console.log(
                `Native context switch warning: ${error.message}`
            );
        }

        await browser.pause(500);
    }


    async find(
        locatorList,
        elementName,
        timeout = 15000
    ) {

        const element =
            await common.findFirstDisplayed(
                locatorList,
                timeout
            );

        if (!element) {

            const fileName =
                elementName.replace(
                    /[^a-zA-Z0-9]+/g,
                    '_'
                );

            await common.takeScreenshot(
                `${fileName}_Not_Found`
            ).catch(() => {});

            await common.savePageSource(
                `${fileName}_Not_Found`
            ).catch(() => {});

            throw new Error(
                `${elementName} was not displayed.`
            );
        }

        console.log(
            `${elementName} displayed`
        );

        return element;
    }


    async findOptional(
        locatorList,
        elementName,
        timeout = 5000
    ) {

        const element =
            await common.findFirstDisplayed(
                locatorList,
                timeout
            );

        if (element) {

            console.log(
                `${elementName} displayed`
            );

            return element;
        }

        console.log(
            `${elementName} was not displayed`
        );

        return null;
    }


    async findScrollableOption(
        locatorList,
        elementName,
        timeout = 25000
    ) {

        console.log(
            `Searching dropdown for ${elementName}`
        );

        for (const locator of locatorList) {

            try {

                console.log(
                    `Trying scrollable locator: ${locator}`
                );

                const element =
                    await $(locator);

                await element.waitForExist({
                    timeout
                });

                const displayed =
                    await element.isDisplayed()
                        .catch(() => false);

                if (displayed) {

                    console.log(
                        `${elementName} found using UiScrollable`
                    );

                    return element;
                }

            } catch (error) {

                console.log(
                    `${elementName} not found using locator: ${locator}`
                );
            }
        }

        const fileName =
            elementName.replace(
                /[^a-zA-Z0-9]+/g,
                '_'
            );

        await common.takeScreenshot(
            `${fileName}_Not_Found`
        ).catch(() => {});

        await common.savePageSource(
            `${fileName}_Not_Found`
        ).catch(() => {});

        throw new Error(
            `${elementName} was not found in the dropdown list.`
        );
    }


    async hideKeyboard() {

        try {

            const keyboardShown =
                await driver.isKeyboardShown();

            if (keyboardShown) {

                await driver.hideKeyboard();

                await browser.pause(800);

                console.log(
                    'Keyboard hidden'
                );
            }

        } catch (error) {

            console.log(
                `Keyboard hide warning: ${error.message}`
            );
        }
    }


    async pressAndroidBack() {

        try {

            await driver.back();

            await browser.pause(1000);

        } catch (error) {

            console.log(
                `Android Back warning: ${error.message}`
            );
        }
    }


    async swipeUp() {

        console.log(
            'Performing upward page swipe'
        );

        const windowSize =
            await driver.getWindowSize();

        const centerX =
            Math.round(
                windowSize.width * 0.5
            );

        const startY =
            Math.round(
                windowSize.height * 0.78
            );

        const endY =
            Math.round(
                windowSize.height * 0.28
            );

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: {
                    pointerType: 'touch'
                },
                actions: [
                    {
                        type: 'pointerMove',
                        duration: 0,
                        x: centerX,
                        y: startY
                    },
                    {
                        type: 'pointerDown',
                        button: 0
                    },
                    {
                        type: 'pause',
                        duration: 300
                    },
                    {
                        type: 'pointerMove',
                        duration: 800,
                        x: centerX,
                        y: endY
                    },
                    {
                        type: 'pointerUp',
                        button: 0
                    }
                ]
            }
        ]);

        await driver.releaseActions()
            .catch(() => {});

        await browser.pause(1200);
    }


    async scrollUntilElementVisible(
        locatorList,
        elementName,
        maximumSwipes = 6
    ) {

        let element =
            await this.findOptional(
                locatorList,
                elementName,
                2000
            );

        if (element) {

            return element;
        }

        for (
            let swipeNumber = 1;
            swipeNumber <= maximumSwipes;
            swipeNumber++
        ) {

            console.log(
                `Searching for ${elementName}. Swipe ${swipeNumber}/${maximumSwipes}`
            );

            await this.swipeUp();

            element =
                await this.findOptional(
                    locatorList,
                    elementName,
                    2000
                );

            if (element) {

                return element;
            }
        }

        throw new Error(
            `${elementName} was not displayed after scrolling.`
        );
    }


    async clearAndEnterValue(
        element,
        value,
        fieldName
    ) {

        console.log(
            `Entering ${fieldName}: ${value}`
        );

        await element.waitForDisplayed({
            timeout: 15000
        });

        await element.click();

        await browser.pause(500);

        try {

            await element.clearValue();

        } catch (error) {

            console.log(
                `${fieldName} clearValue warning: ${error.message}`
            );
        }

        await element.setValue(
            value
        );

        await browser.pause(700);

        let currentValue = '';

        try {

            currentValue =
                await element.getText();

        } catch (error) {

            console.log(
                `${fieldName} getText warning: ${error.message}`
            );
        }

        if (!currentValue) {

            currentValue =
                await element.getAttribute(
                    'text'
                ).catch(() => '');
        }

        console.log(
            `${fieldName} value after entry: ${currentValue}`
        );
    }


    async clickElement(
        element,
        elementName
    ) {

        await element.waitForDisplayed({
            timeout: 15000
        });

        await element.waitForEnabled({
            timeout: 15000
        }).catch(() => {});

        try {

            await element.click();

            console.log(
                `${elementName} clicked`
            );

        } catch (error) {

            console.log(
                `${elementName} normal click failed: ${error.message}`
            );

            const location =
                await element.getLocation();

            const size =
                await element.getSize();

            const centerX =
                Math.round(
                    location.x +
                    size.width / 2
                );

            const centerY =
                Math.round(
                    location.y +
                    size.height / 2
                );

            await driver.execute(
                'mobile: clickGesture',
                {
                    x: centerX,
                    y: centerY
                }
            );

            console.log(
                `${elementName} clicked using clickGesture`
            );
        }

        await browser.pause(1000);
    }


    /*
     * =========================================================
     * THRIVE SUBSCRIPTION PAGE
     * =========================================================
     */

    async validateSubscriptionPage() {

        console.log(
            '========== SUBSCRIPTION PAGE VALIDATION STARTED =========='
        );

        await this.switchToNativeApp();

        await browser.pause(3000);

        const monthlyPlan =
            await this.findOptional(
                locators.monthlyPlan,
                'Monthly plan',
                10000
            );

        const trialButton =
            await this.findOptional(
                locators.monthlyTrialButton,
                'Start 14-day free trial button',
                10000
            );

        if (
            !monthlyPlan &&
            !trialButton
        ) {

            await common.takeScreenshot(
                'Subscription_Page_Not_Displayed'
            );

            await common.savePageSource(
                'Subscription_Page_Not_Displayed'
            );

            throw new Error(
                'The Thrive subscription page was not displayed.'
            );
        }

        await this.find(
            locators.monthlyTrialButton,
            'Start 14-day free trial button',
            15000
        );

        console.log(
            '========== SUBSCRIPTION PAGE VALIDATION COMPLETED =========='
        );
    }


    async openMonthlyCheckout() {

        console.log(
            '========== OPENING STRIPE CHECKOUT =========='
        );

        await this.switchToNativeApp();

        const trialButton =
            await this.find(
                locators.monthlyTrialButton,
                'Start 14-day free trial button',
                20000
            );

        await this.clickElement(
            trialButton,
            'Start 14-day free trial button'
        );

        await this.waitForStripeCheckout();

        console.log(
            '========== STRIPE CHECKOUT OPENED =========='
        );
    }


    async waitForStripeCheckout() {

        console.log(
            'Waiting for Stripe checkout'
        );

        await browser.waitUntil(
            async () => {

                const currentPackage =
                    await driver.getCurrentPackage()
                        .catch(() => '');

                console.log(
                    `Current package while waiting: ${currentPackage}`
                );

                if (
                    currentPackage === this.chromePackage
                ) {

                    return true;
                }

                const heading =
                    await common.findFirstDisplayed(
                        locators.stripeCheckoutHeading,
                        1500
                    );

                return Boolean(heading);

            },
            {
                timeout: 45000,
                interval: 2000,
                timeoutMsg:
                    'Stripe checkout did not open.'
            }
        );

        await this.switchToNativeApp();

        await browser.pause(3000);

        await this.find(
            locators.stripeCheckoutHeading,
            'Stripe checkout heading',
            20000
        );
    }


    /*
     * =========================================================
     * STRIPE FORM
     * =========================================================
     */

    async verifyEmail() {

        console.log(
            'Verifying prefilled Stripe email'
        );

        const email =
            await this.findOptional(
                locators.stripeEmailText,
                'Stripe email',
                8000
            );

        if (!email) {

            console.log(
                'Email was not detected. Continuing because Stripe may render it as non-editable text.'
            );

            return;
        }

        const emailText =
            await email.getText()
                .catch(() => '');

        console.log(
            `Stripe email displayed: ${emailText}`
        );
    }


    async enterName(
        name = 'Pratheepa QA'
    ) {

        const nameField =
            await this.find(
                locators.billingNameField,
                'Billing name field',
                20000
            );

        await this.clearAndEnterValue(
            nameField,
            name,
            'Billing name'
        );

        await this.hideKeyboard();
    }


    async selectCountry(
        country = 'United States'
    ) {

        console.log(
            `========== SELECTING COUNTRY: ${country} ==========`
        );

        await this.hideKeyboard();

        let countryDropdown =
            await this.findOptional(
                locators.billingCountryDropdown,
                'Billing country dropdown',
                8000
            );

        if (!countryDropdown) {

            countryDropdown =
                await this.scrollUntilElementVisible(
                    locators.billingCountryDropdown,
                    'Billing country dropdown',
                    5
                );
        }

        const currentCountry =
            await countryDropdown.getText()
                .catch(() => '');

        console.log(
            `Current billing country: ${currentCountry}`
        );

        if (
            currentCountry
                .trim()
                .toLowerCase() ===
            country
                .trim()
                .toLowerCase()
        ) {

            console.log(
                `${country} is already selected`
            );

            return;
        }

        await this.clickElement(
            countryDropdown,
            'Billing country dropdown'
        );

        await browser.pause(1500);

        const countryList =
            await this.findOptional(
                locators.countryList,
                'Country dropdown list',
                5000
            );

        if (!countryList) {

            await common.takeScreenshot(
                'Country_Dropdown_List_Not_Opened'
            ).catch(() => {});

            throw new Error(
                'Country dropdown list did not open.'
            );
        }

        const directLocators =
            country === 'United States'
                ? locators.unitedStatesCountryOption
                : locators.indiaCountryOption;

        const scrollableLocators =
            country === 'United States'
                ? locators.unitedStatesScrollableOption
                : locators.indiaScrollableOption;

        let countryOption =
            await this.findOptional(
                directLocators,
                `${country} country option`,
                3000
            );

        if (!countryOption) {

            countryOption =
                await this.findScrollableOption(
                    scrollableLocators,
                    `${country} country option`,
                    25000
                );
        }

        await this.clickElement(
            countryOption,
            `${country} country option`
        );

        await browser.pause(2500);

        countryDropdown =
            await this.find(
                locators.billingCountryDropdown,
                'Billing country dropdown after selection',
                15000
            );

        const selectedCountry =
            await countryDropdown.getText()
                .catch(() => '');

        console.log(
            `Selected billing country: ${selectedCountry}`
        );

        if (
            !selectedCountry
                .toLowerCase()
                .includes(
                    country.toLowerCase()
                )
        ) {

            throw new Error(
                `Expected billing country "${country}", but displayed "${selectedCountry}".`
            );
        }

        console.log(
            `========== COUNTRY SELECTED SUCCESSFULLY: ${country} ==========`
        );
    }

    async openManualAddressForm() {

    console.log(
        'Checking whether manual address form is open'
    );

    await this.hideKeyboard();

    /*
     * Use one fast locator instead of checking every locator
     * with a long timeout.
     */
    const cityField =
        await $(
            'android=new UiSelector().resourceId("billingLocality")'
        );

    const cityDisplayed =
        await cityField.isDisplayed()
            .catch(() => false);

    if (cityDisplayed) {

        console.log(
            'Manual address form is already open'
        );

        return;
    }

    let manualAddressButton =
        await this.findOptional(
            locators.enterAddressManuallyButton,
            'Enter address manually button',
            3000
        );

    if (!manualAddressButton) {

        await this.swipeUp();

        manualAddressButton =
            await this.find(
                locators.enterAddressManuallyButton,
                'Enter address manually button',
                5000
            );
    }

    await this.clickElement(
        manualAddressButton,
        'Enter address manually button'
    );

    await browser.pause(1500);

    const displayedCityField =
        await this.find(
            locators.billingCityField,
            'Billing city field after opening manual form',
            8000
        );

    if (!displayedCityField) {

        throw new Error(
            'Manual billing address form did not open.'
        );
    }

    console.log(
        'Manual address form opened successfully'
    );
}

    async enterAddress(
    address = '63 West Main Street') {

    console.log(
        `Entering billing address: ${address}`
    );

    /*
     * Manual form is already opened from
     * completeStripeCheckoutForm().
     */
    const addressField =
        await this.find(
            locators.billingAddressField,
            'Billing address field',
            10000
        );

    await this.clearAndEnterValue(
        addressField,
        address,
        'Billing address'
    );

    await this.hideKeyboard();

    await browser.pause(1000);

    console.log(
        'Billing address entered successfully'
    );
}


    async enterCity(
        city = 'New York'
    ) {

        let cityField =
            await this.findOptional(
                locators.billingCityField,
                'Billing city field',
                6000
            );

        if (!cityField) {

            cityField =
                await this.scrollUntilElementVisible(
                    locators.billingCityField,
                    'Billing city field',
                    5
                );
        }

        await this.clearAndEnterValue(
            cityField,
            city,
            'Billing city'
        );

        await this.hideKeyboard();
    }


    async enterPostalCode(
        postalCode = '10001'
    ) {

        let postalCodeField =
            await this.findOptional(
                locators.billingPostalCodeField,
                'Billing ZIP code field',
                6000
            );

        if (!postalCodeField) {

            postalCodeField =
                await this.scrollUntilElementVisible(
                    locators.billingPostalCodeField,
                    'Billing ZIP code field',
                    5
                );
        }

        await this.clearAndEnterValue(
            postalCodeField,
            postalCode,
            'Billing ZIP code'
        );

        await this.hideKeyboard();
    }


    async selectState(
        state = 'New York'
    ) {

        let stateDropdown =
            await this.findOptional(
                locators.billingStateDropdown,
                'Billing state dropdown',
                6000
            );

        if (!stateDropdown) {

            stateDropdown =
                await this.scrollUntilElementVisible(
                    locators.billingStateDropdown,
                    'Billing state dropdown',
                    5
                );
        }

        const currentState =
            await stateDropdown.getText()
                .catch(() => '');

        if (
            currentState
                .trim()
                .toLowerCase() ===
            state
                .trim()
                .toLowerCase()
        ) {

            console.log(
                `${state} is already selected`
            );

            return;
        }

        await this.clickElement(
            stateDropdown,
            'Billing state dropdown'
        );

        await browser.pause(1500);

        const stateList =
            await this.findOptional(
                locators.stateList,
                'State dropdown list',
                5000
            );

        if (!stateList) {

            throw new Error(
                'State dropdown list did not open.'
            );
        }

        let stateOption =
            await this.findOptional(
                locators.newYorkStateOption,
                'New York state option',
                3000
            );

        if (!stateOption) {

            stateOption =
                await this.findScrollableOption(
                    locators.newYorkScrollableOption,
                    'New York state option',
                    20000
                );
        }

        await this.clickElement(
            stateOption,
            'New York state option'
        );

        await browser.pause(1500);

        stateDropdown =
            await this.find(
                locators.billingStateDropdown,
                'Billing state dropdown after selection',
                10000
            );

        const selectedState =
            await stateDropdown.getText()
                .catch(() => '');

        console.log(
            `Selected billing state: ${selectedState}`
        );
    }


    async clickStartTrial() {

        await this.hideKeyboard();

        let startTrialButton =
            await this.findOptional(
                locators.startTrialButton,
                'Stripe Start trial button',
                6000
            );

        if (!startTrialButton) {

            startTrialButton =
                await this.scrollUntilElementVisible(
                    locators.startTrialButton,
                    'Stripe Start trial button',
                    5
                );
        }

        const enabled =
            await startTrialButton.isEnabled()
                .catch(() => false);

        if (!enabled) {

            await common.takeScreenshot(
                'Stripe_Start_Trial_Button_Disabled'
            );

            await common.savePageSource(
                'Stripe_Start_Trial_Button_Disabled'
            );

            throw new Error(
                'Stripe Start trial button is disabled. Required checkout details may be incomplete.'
            );
        }

        await this.clickElement(
            startTrialButton,
            'Stripe Start trial button'
        );

        await browser.pause(10000);
    }


    async checkForStripeError() {

        const errorElement =
            await this.findOptional(
                locators.stripeErrorIndicator,
                'Stripe error message',
                5000
            );

        if (!errorElement) {

            return;
        }

        const errorText =
            await errorElement.getText()
                .catch(() => 'Unknown Stripe error');

        throw new Error(
            `Stripe checkout displayed an error: ${errorText}`
        );
    }


    /*
     * =========================================================
     * RETURN TO THRIVE APP
     * =========================================================
     */

    async returnToThriveApplication() {

        await this.switchToNativeApp();

        const packageAfterCheckout =
            await driver.getCurrentPackage()
                .catch(() => '');

        console.log(
            `Package after checkout: ${packageAfterCheckout}`
        );

        if (
            packageAfterCheckout !== this.thrivePackage
        ) {

            try {

                await driver.activateApp(
                    this.thrivePackage
                );

            } catch (error) {

                console.log(
                    `activateApp warning: ${error.message}`
                );

                await this.pressAndroidBack();
            }
        }

        await browser.pause(7000);

        await this.switchToNativeApp();

        const currentPackage =
            await driver.getCurrentPackage()
                .catch(() => '');

        if (
            currentPackage !== this.thrivePackage
        ) {

            throw new Error(
                `Thrive application was not restored. Current package: ${currentPackage}`
            );
        }
    }


    async verifyThriveApplicationAfterSubscription() {

        const homeIndicator =
            await this.findOptional(
                locators.appHomeIndicator,
                'Thrive home indicator',
                15000
            );

        if (homeIndicator) {

            return;
        }

        const successIndicator =
            await this.findOptional(
                locators.subscriptionSuccessIndicator,
                'Subscription success indicator',
                10000
            );

        if (successIndicator) {

            return;
        }

        const currentPackage =
            await driver.getCurrentPackage()
                .catch(() => '');

        if (
            currentPackage === this.thrivePackage
        ) {

            console.log(
                'Thrive application is in the foreground'
            );

            return;
        }

        throw new Error(
            'Thrive application verification failed after subscription.'
        );
    }


    /*
     * =========================================================
     * COMPLETE FLOW
     * =========================================================
     */

    async completeStripeCheckoutForm() {

    console.log(
        '========== STRIPE CHECKOUT FORM STARTED =========='
    );

    await this.verifyEmail();

    await this.enterName(
        'Pratheepa QA'
    );

    await this.selectCountry(
        'United States'
    );

    /*
     * Open the manual form only once.
     */
    await this.openManualAddressForm();

    await this.enterAddress(
        '63 West Main Street'
    );

    await this.enterCity(
        'New York'
    );

    await this.enterPostalCode(
        '10001'
    );

    await this.selectState(
        'New York'
    );

    await this.clickStartTrial();

    await this.checkForStripeError();

    await this.returnToThriveApplication();

    await this.verifyThriveApplicationAfterSubscription();

    console.log(
        '========== STRIPE CHECKOUT FORM COMPLETED =========='
    );
}


    async completeSubscriptionFlow() {

        console.log(
            '========== SUBSCRIPTION FLOW STARTED =========='
        );

        await this.validateSubscriptionPage();

        await this.openMonthlyCheckout();

        await this.completeStripeCheckoutForm();

        console.log(
            '========== SUBSCRIPTION FLOW COMPLETED =========='
        );
    }
}


module.exports =
    new SubscriptionPage();