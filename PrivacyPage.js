const locators = require('../../locators/onboarding/privacyLocators');

const common =
    require('../../utils/common');

class PrivacyPage {

    async handleTimezonePopup() {

        console.log('Checking timezone popup');

        const popupDisplayed =
            await common.isDisplayed(
                locators.timezonePopupText,
                8000
            );

        if (!popupDisplayed) {
            console.log('Timezone popup not shown, continuing');
            return;
        }

        console.log('Timezone popup displayed');

        await common.waitAndClick(
            locators.keepCurrentButton,
            8000
        );

        console.log('Clicked KEEP CURRENT');

        await browser.pause(2000);
    }

    async isDisplayed() {

        return common.isDisplayed(
            locators.privacyScreenIdentifier,
            3000
        );
    }

    async isCheckboxChecked(checkbox) {

        try {

            const desc =
                await checkbox.getAttribute('content-desc');

            // Unchecked state has an empty content-desc; once tapped,
            // the app sets it to a private-use glyph character.
            return Boolean(desc && desc.trim().length > 0);

        } catch (error) {

            return false;
        }
    }

    async tapCheckbox(checkboxLocators, checkboxName) {

        const checkbox =
            await common.waitForDisplayed(
                checkboxLocators,
                10000
            );

        const alreadyChecked =
            await this.isCheckboxChecked(checkbox);

        if (alreadyChecked) {
            console.log(`${checkboxName} checkbox already checked`);
            return;
        }

        const maxAttempts = 3;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {

            console.log(
                `Tapping ${checkboxName} checkbox (attempt ${attempt}/${maxAttempts})`
            );

            await checkbox.click();

            await browser.pause(500);

            const isChecked =
                await this.isCheckboxChecked(checkbox);

            if (isChecked) {
                console.log(`${checkboxName} checkbox confirmed checked`);
                return;
            }

            if (attempt === maxAttempts) {
                console.log(
                    `${checkboxName} checkbox could not be confirmed checked after ${maxAttempts} attempts - proceeding anyway`
                );
            }
        }
    }

    async acceptPrivacyAndTerms() {

        console.log(
            '========== PRIVACY PAGE STARTED =========='
        );

        await common.switchToNativeApp();

        await this.handleTimezonePopup();

        const pageTitle =
            await common.findFirstDisplayed(
                locators.privacyScreenIdentifier,
                30000
            );

        if (!pageTitle) {
            throw new Error(
                'Privacy and Terms page was not displayed.'
            );
        }

        console.log(
            'Privacy and Terms page displayed'
        );

        await this.tapCheckbox(
            locators.privacyCheckbox,
            'Privacy Policy'
        );

        await this.tapCheckbox(
            locators.termsCheckbox,
            'Terms of Use'
        );

        const nextButton =
            await common.findFirstDisplayed(
                locators.privacyNextButton,
                15000
            );

        if (!nextButton) {
            throw new Error(
                'Next button was not displayed.'
            );
        }

        await browser.waitUntil(
            async () => {

                try {
                    return await nextButton.isEnabled();
                } catch {
                    return false;
                }
            },
            {
                timeout: 10000,
                interval: 1000,
                timeoutMsg:
                    'Next button did not become enabled after selecting both checkboxes.'
            }
        );

        await nextButton.click();

        console.log(
            'Clicked Next on Privacy page'
        );

        await browser.pause(3000);

        console.log(
            '========== PRIVACY PAGE COMPLETED =========='
        );
    }
}

module.exports =
    new PrivacyPage();