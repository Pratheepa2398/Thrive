const locators = require('../../locators/onboarding/slideLocators');

class SlidePage {

    async findVisibleElement(locatorArray) {

        for (const locator of locatorArray) {

            try {

                const elements = await $$(locator);

                for (const element of elements) {

                    if (
                        await element.isExisting() &&
                        await element.isDisplayed()
                    ) {
                        console.log(`Element found using: ${locator}`);
                        return element;
                    }
                }

            } catch (error) {

                console.log(`Locator failed: ${locator}`);
            }
        }

        return null;
    }

    async isCheckoutOpened() {

        try {

            const contexts = await driver.getContexts();

            console.log(`Available contexts: ${JSON.stringify(contexts)}`);

            const webviewContext = contexts.find(
                context => context.includes('WEBVIEW')
            );

            if (webviewContext) {

                console.log('Checkout WebView is available.');

                return true;
            }

        } catch (error) {

            console.log(
                `Unable to check contexts: ${error.message}`
            );
        }

        return false;
    }

    async swipeUp() {

        console.log('Swiping vertically upward...');

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
                        x: 540,
                        y: 1850
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
                        duration: 900,
                        x: 540,
                        y: 500
                    },
                    {
                        type: 'pointerUp',
                        button: 0
                    }
                ]
            }
        ]);

        await driver.releaseActions();

        await browser.pause(1500);
    }

    async clickStartFreeTrial() {

        const startTrialButton = await this.findVisibleElement(
            locators.startFreeTrialButton
        );

        if (!startTrialButton) {
            return false;
        }

        console.log('Start free trial now button is visible.');

        try {

            await startTrialButton.click();

        } catch (error) {

            console.log(
                `Normal click failed. Using element coordinates: ${error.message}`
            );

            const location = await startTrialButton.getLocation();
            const size = await startTrialButton.getSize();

            const centerX = Math.round(location.x + size.width / 2);
            const centerY = Math.round(location.y + size.height / 2);

            await driver.execute('mobile: clickGesture', {
                x: centerX,
                y: centerY
            });
        }

        console.log('Start free trial now button clicked.');

        await browser.pause(5000);

        return true;
    }

    async completeSlides() {

        console.log('====================================');
        console.log('Starting onboarding slide flow');
        console.log('Swipe direction: Vertical upward');
        console.log('====================================');

        const maximumSwipes = 15;

        /*
         * Check before swiping because the test may already
         * be on the final slide.
         */
        if (await this.isCheckoutOpened()) {

            console.log(
                'Checkout is already open. Slide flow is completed.'
            );

            return;
        }

        if (await this.clickStartFreeTrial()) {

            console.log('Onboarding slide flow completed.');

            return;
        }

        for (
            let swipeNumber = 1;
            swipeNumber <= maximumSwipes;
            swipeNumber++
        ) {

            console.log(
                `Performing upward swipe ${swipeNumber} of ${maximumSwipes}`
            );

            await this.swipeUp();

            if (await this.isCheckoutOpened()) {

                console.log(
                    'Checkout opened. Slide flow completed.'
                );

                return;
            }

            const buttonClicked = await this.clickStartFreeTrial();

            if (buttonClicked) {

                console.log(
                    'Onboarding slide flow completed successfully.'
                );

                return;
            }
        }

        /*
         * Final fallback:
         * Sometimes React Native visually displays the button,
         * but UiAutomator does not expose it in the page source.
         *
         * Tap the bottom-center area where the final CTA appears.
         */
        console.log(
            'Button not exposed to Appium. Trying bottom-center tap.'
        );

        await driver.execute('mobile: clickGesture', {
            x: 540,
            y: 2050
        });

        await browser.pause(5000);

        if (await this.isCheckoutOpened()) {

            console.log(
                'Checkout opened after coordinate tap.'
            );

            return;
        }

        const screenshotPath =
            `./screenshots/Slide_Flow_Failed_${Date.now()}.png`;

        await driver.saveScreenshot(screenshotPath);

        console.log(`Failure screenshot: ${screenshotPath}`);

        throw new Error(
            'Unable to complete onboarding slides after 15 vertical swipes.'
        );
    }
}

module.exports = new SlidePage();