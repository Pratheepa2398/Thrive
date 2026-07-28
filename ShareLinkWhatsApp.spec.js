const SocialInvitePage = require(
    '../../pages/SocialInvitePage'
);

const common = require(
    '../../utils/common'
);


describe(
    'Social - Share Invite Link through WhatsApp',
    () => {

        const WHATSAPP_CONTACT_NAME =
            'DC Raji Akka';


        it(
            'TC_002 - should share invite link through WhatsApp',
            async () => {

                console.log(
                    'Step 1: Opening Social page'
                );

                await SocialInvitePage
                    .openSocialPage();


                console.log(
                    'Step 2: Verifying Friends section'
                );

                await SocialInvitePage
                    .openFriendsTab();


                console.log(
                    'Step 3: Clicking Add friends'
                );

                await SocialInvitePage
                    .openAddFriendsSection(
                        'share'
                    );


                console.log(
                    'Step 4: Clicking Share invite link'
                );

                await SocialInvitePage
                    .clickShareInviteLink();


                console.log(
                    'Step 5: Selecting WhatsApp'
                );

                await SocialInvitePage
                    .selectWhatsAppFromShareSheet();


                console.log(
                    'Step 6: Searching WhatsApp contact'
                );

                await SocialInvitePage
                    .searchWhatsAppContact(
                        WHATSAPP_CONTACT_NAME
                    );


                console.log(
                    'Step 7: Selecting WhatsApp contact'
                );

                await SocialInvitePage
                    .selectWhatsAppContact(
                        WHATSAPP_CONTACT_NAME
                    );


                console.log(
                    'Step 8: Sending WhatsApp invite'
                );

                await SocialInvitePage
                    .sendWhatsAppInvite();


                console.log(
                    'TC_002 completed successfully'
                );
            }
        );


        afterEach(
            async function () {

                if (
                    this.currentTest &&
                    this.currentTest.state ===
                        'failed' &&
                    browser.sessionId
                ) {

                    try {

                        await common.takeScreenshot(
                            `FAILED_${Date.now()}.png`
                        );

                    } catch (error) {

                        console.log(
                            `Failure screenshot could not be taken: ${error.message}`
                        );
                    }
                }
            }
        );
    }
);