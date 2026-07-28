const LoginPage =
    require('../../pages/onboarding/LoginPage');

const PrivacyPage =
    require('../../pages/onboarding/PrivacyPage');

const WelcomePage =
    require('../../pages/onboarding/WelcomePage');

const SlidePage =
    require('../../pages/onboarding/SlidePage');

const SubscriptionPage =
    require('../../pages/onboarding/SubscriptionPage');

const common =
    require('../../utils/common');


describe('Thrive AI Health Onboarding', function () {

    this.timeout(600000);

    before(async function () {

        console.log(
            '========== ONBOARDING TEST SUITE STARTED =========='
        );

        await common.ensureThriveAppIsOpen();

        await common.switchToNativeApp();
    });


    afterEach(async function () {

        if (
            this.currentTest &&
            this.currentTest.state === 'failed'
        ) {

            const testName =
                this.currentTest.title
                    .replace(/[^a-zA-Z0-9]+/g, '_');

            const timestamp =
                Date.now();

            try {

                await common.takeScreenshot(
                    `FAILED_${testName}_${timestamp}`
                );

            } catch (error) {

                console.log(
                    `Screenshot could not be captured: ${error.message}`
                );
            }

            try {

                await common.savePageSource(
                    `FAILED_${testName}_${timestamp}`
                );

            } catch (error) {

                console.log(
                    `Page source could not be saved: ${error.message}`
                );
            }
        }
    });


    after(async function () {

        console.log(
            '========== ONBOARDING TEST SUITE COMPLETED =========='
        );
    });


    it(
        'TC001 - Complete Onboarding and Subscription Flow',
        async function () {

            console.log(
                'Step 1: Starting Google login'
            );

            await LoginPage.loginWithGoogle();


            console.log(
                'Step 2: Clicking Continue after login'
            );

            await LoginPage.clickContinue();


            console.log(
                'Step 3: Handling timezone popup'
            );

            await LoginPage.handleTimezonePopup();


            console.log(
                'Step 4: Accepting Privacy Policy and Terms'
            );

            await PrivacyPage.acceptPrivacyAndTerms();


            console.log(
                'Step 5: Entering user name'
            );

            await WelcomePage.enterNameAndContinue();


            console.log(
               'Step 6: Completing onboarding slides'
             );

              await SlidePage.completeSlides();


            console.log(
                 'Step 7: Completing subscription checkout'
                  );

                 await SubscriptionPage.completeSubscriptionFlow();


              console.log(
                  '========== TC001 COMPLETED SUCCESSFULLY =========='
                   );
        })
});