const locators = require(
    '../../locators/onboarding/loginLocators'
);

class LoginPage {

    async findDisplayedElement(locatorList, timeout = 15000) {

        for (const locator of locatorList) {

            try {
                console.log(`Trying locator: ${locator}`);

                const element = await $(locator);

                await element.waitForDisplayed({
                    timeout,
                    interval: 500
                });

                if (await element.isDisplayed()) {
                    console.log(`Element found: ${locator}`);
                    return element;
                }

            } catch (error) {
                console.log(`Locator did not match: ${locator}`);
            }
        }

        return null;
    }

    async loginWithGoogle() {

        console.log('Searching for Google login button');

        const googleButton = await this.findDisplayedElement(
            locators.googleLoginButton,
            10000
        );

        if (!googleButton) {
            throw new Error('Google button was not found.');
        }

        await googleButton.click();

        console.log('Google login button clicked');

        await browser.pause(2000);

        await this.selectGoogleAccount();
    }

    async selectGoogleAccount() {

        const account = await this.findDisplayedElement(
            locators.googleAccount,
            10000
        );

        if (!account) {
            console.log(
                'Google account picker was not displayed. ' +
                'The account may already be selected.'
            );

            return;
        }

        await account.click();

        console.log('Google account selected');

        await browser.pause(2000);
    }

    async clickContinue() {

        const continueButton = await this.findDisplayedElement(
            locators.googleConsentContinueButton,
            15000
        );

        if (!continueButton) {
            console.log(
                'Google consent Continue button was not displayed.'
            );

            return;
        }

        await continueButton.click();

        console.log('Google consent Continue button clicked');

        await browser.pause(2000);
    }

    async handleTimezonePopup() {
    console.log('Checking timezone popup or Privacy page...');

    const privacyPageLocators = [
        'android=new UiSelector().textContains("Privacy")',
        'android=new UiSelector().textContains("Terms")',
        '//*[contains(@text,"Privacy")]',
        '//*[contains(@text,"Terms")]'
    ];

    // First check whether the app already moved to Privacy page
    const privacyPage = await this.findDisplayedElement(
        privacyPageLocators,
        5000
    );

    if (privacyPage) {
        console.log(
            'Timezone popup already handled. Privacy page is displayed.'
        );
        return;
    }

    // Check whether timezone popup is still displayed
    const popup = await this.findDisplayedElement(
        locators.timezonePopupTitle,
        5000
    );

    if (!popup) {
        console.log(
            'Timezone popup is not displayed. Continuing to the next step.'
        );
        return;
    }

    console.log('Timezone popup displayed.');

    const keepCurrentButton = await this.findDisplayedElement(
        locators.timezoneKeepCurrentButton,
        5000
    );

    if (keepCurrentButton) {
        await keepCurrentButton.click();
        console.log('Keep Current Timezone clicked');
    } else {
        const updateButton = await this.findDisplayedElement(
            locators.timezoneUpdateButton,
            5000
        );

        if (updateButton) {
            await updateButton.click();
            console.log('Update Timezone clicked');
        } else {
            throw new Error(
                'Timezone popup displayed, but action button was not found.'
            );
        }
    }

    // Confirm that Privacy page loads after closing popup
    const privacyAfterTimezone = await this.findDisplayedElement(
        privacyPageLocators,
        15000
    );

    if (!privacyAfterTimezone) {
        throw new Error(
            'Privacy page was not displayed after timezone popup.'
        );
    }

    console.log('Privacy page displayed successfully.');
    }
}

module.exports = new LoginPage();