const locators = require(
    '../locators/socialInviteLocators'
);

const common = require(
    '../utils/common'
);


class SocialInvitePage {

    constructor() {

        this.thrivePackage =
            'com.thriveaihealth.qa';

        this.whatsAppPackage =
            'com.whatsapp';
    }


    // ============================================================
    // Application handling
    // ============================================================

    async openThriveApp() {

        const currentPackage =
            await browser.getCurrentPackage();

        console.log(
            `Current package: ${currentPackage}`
        );

        if (
            currentPackage !==
            this.thrivePackage
        ) {

            await driver.activateApp(
                this.thrivePackage
            );

            await browser.pause(
                5000
            );
        }

        console.log(
            'Thrive AI Health app opened'
        );
    }


    async waitForPackage(
        expectedPackage,
        timeout = 30000
    ) {

        await browser.waitUntil(
            async () => {

                const currentPackage =
                    await browser.getCurrentPackage();

                return (
                    currentPackage ===
                    expectedPackage
                );
            },
            {
                timeout,
                interval: 1000,
                timeoutMsg:
                    `Package "${expectedPackage}" was not opened`
            }
        );

        console.log(
            `Package opened: ${expectedPackage}`
        );
    }


    // ============================================================
    // Social page
    // ============================================================

    async isSocialPageDisplayed() {

        const indicator =
            await common.findFirstDisplayed(
                locators.socialPageIndicators,
                1500
            );

        return Boolean(
            indicator
        );
    }


    async verifyHomeSocialCard() {

        const homeIndicator =
            await common.findFirstDisplayed(
                locators.homeSocialCardIndicators,
                3000
            );

        if (homeIndicator) {

            console.log(
                'Home Social card content is displayed'
            );
        }
    }


    async openSocialPage() {

        await this.openThriveApp();

        await browser.pause(
            4000
        );

        /*
         * The test may start with the Social page already open.
         */
        if (
            await this.isSocialPageDisplayed()
        ) {

            console.log(
                'Social page is already displayed'
            );

            return;
        }

        console.log(
            'Searching for the Social card on Home screen'
        );

        await this.verifyHomeSocialCard();

        /*
         * Appium Inspector shows the complete Social card as:
         *
         * android.widget.Button
         * content-desc="Add friends"
         */
        const socialCard =
            await common.swipeUntilDisplayed(
                locators.socialCard,
                5,
                3000
            );

        if (!socialCard) {

            throw new Error(
                'Social card was not displayed on the Home screen'
            );
        }

        const className =
            await socialCard.getAttribute(
                'class'
            );

        const contentDescription =
            await socialCard.getAttribute(
                'content-desc'
            );

        const clickable =
            await socialCard.getAttribute(
                'clickable'
            );

        console.log(
            `Social card class: ${className}`
        );

        console.log(
            `Social card content-desc: ${contentDescription}`
        );

        console.log(
            `Social card clickable: ${clickable}`
        );

        await socialCard.waitForDisplayed({
            timeout: 10000,
            timeoutMsg:
                'Social card was not displayed'
        });

        await socialCard.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                'Social card was not enabled'
        });

        await socialCard.click();

        console.log(
            'Home Social card clicked'
        );

        await browser.pause(
            5000
        );

        await browser.waitUntil(
            async () => {

                return await this
                    .isSocialPageDisplayed();
            },
            {
                timeout: 30000,
                interval: 1500,
                timeoutMsg:
                    'Social page did not open after clicking the Home Social card'
            }
        );

        console.log(
            'Social page opened successfully'
        );
    }


    // ============================================================
    // Friends section
    // ============================================================

    async openFriendsTab() {

        if (
            !await this.isSocialPageDisplayed()
        ) {

            throw new Error(
                'Social page is not displayed'
            );
        }

        const friendsSection =
            await common.findFirstDisplayed(
                locators.friendsSection,
                10000
            );

        if (!friendsSection) {

            throw new Error(
                'Friends section was not displayed on the Social page'
            );
        }

        /*
         * The screenshot shows Friends as a section heading rather
         * than a separate clickable tab.
         */
        console.log(
            'Friends section is displayed'
        );

        await browser.pause(
            1000
        );
    }

    async swipeUpOnSocialPage() {

    console.log(
        'Performing Social page upward swipe'
    );

    await driver.performActions([
        {
            type: 'pointer',
            id: 'socialSwipeFinger',
            parameters: {
                pointerType: 'touch'
            },
            actions: [
                {
                    type: 'pointerMove',
                    duration: 0,
                    x: 540,
                    y: 1900
                },
                {
                    type: 'pointerDown',
                    button: 0
                },
                {
                    type: 'pause',
                    duration: 200
                },
                {
                    type: 'pointerMove',
                    duration: 700,
                    x: 540,
                    y: 700
                },
                {
                    type: 'pointerUp',
                    button: 0
                }
            ]
        }
    ]);

    await driver.releaseActions();

    console.log(
        'Social page swipe completed'
    );
}

    // ============================================================
    // Add Friends
    // ============================================================

    async openAddFriendsSection(
    mode = 'share'
) {

    if (
        !await this.isSocialPageDisplayed()
    ) {

        throw new Error(
            'Social page is not displayed before clicking Add friends'
        );
    }

    console.log(
        'Searching for Add friends button on Social page'
    );

    let addFriendButton = null;

    for (
        let swipeCount = 0;
        swipeCount <= 5;
        swipeCount++
    ) {

        addFriendButton =
            await common.findFirstDisplayed(
                locators.addFriendButton,
                2000
            );

        if (addFriendButton) {

            console.log(
                `Add friends button found after ${swipeCount} swipe(s)`
            );

            break;
        }

        if (swipeCount < 5) {

            console.log(
                `Add friends not visible. Scrolling down: ${swipeCount + 1}/5`
            );

            await this.swipeUpOnSocialPage();

            await browser.pause(
                1500
            );
        }
    }

    if (!addFriendButton) {

        await common.takeScreenshot(
            `Add_friends_not_found_${Date.now()}.png`
        );

        throw new Error(
            'Add friends button was not displayed after scrolling'
        );
    }

    await addFriendButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg:
            'Add friends button was not displayed'
    });

    await addFriendButton.waitForEnabled({
        timeout: 10000,
        timeoutMsg:
            'Add friends button was not enabled'
    });

    const contentDescription =
        await addFriendButton.getAttribute(
            'content-desc'
        );

    console.log(
        `Add friends content-desc: ${contentDescription}`
    );

    await addFriendButton.click();

    console.log(
        'Add friends button clicked successfully'
    );

    await browser.pause(
        2500
    );

    const targetLocators =
        mode === 'contacts'
            ? locators.chooseFromContactsButton
            : locators.shareInviteLinkButton;

    const targetElement =
        await common.findFirstDisplayed(
            targetLocators,
            15000
        );

    if (!targetElement) {

        await common.takeScreenshot(
            `Add_friend_options_not_found_${Date.now()}.png`
        );

        throw new Error(
            mode === 'contacts'
                ? 'Choose from contacts option was not displayed'
                : 'Share invite link option was not displayed'
        );
    }

    console.log(
        'Add Friend options displayed successfully'
    );
}


    async clickChooseFromContacts() {

        console.log(
            'Clicking Choose from contacts'
        );

        const chooseFromContactsButton =
            await common.findFirstDisplayed(
                locators.chooseFromContactsButton,
                15000
            );

        if (!chooseFromContactsButton) {

            throw new Error(
                'Choose from contacts button was not displayed'
            );
        }

        await chooseFromContactsButton.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                'Choose from contacts button was not enabled'
        });

        await chooseFromContactsButton.click();

        console.log(
            'Choose from contacts clicked successfully'
        );

        await browser.pause(
            3000
        );
    }


    async clickShareInviteLink() {

        console.log(
            'Clicking Share invite link'
        );

        const shareInviteLink =
            await common.findFirstDisplayed(
                locators.shareInviteLinkButton,
                15000
            );

        if (!shareInviteLink) {

            throw new Error(
                'Share invite link button was not displayed'
            );
        }

        await shareInviteLink.waitForDisplayed({
            timeout: 10000,
            timeoutMsg:
                'Share invite link was not displayed'
        });

        await shareInviteLink.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                'Share invite link was not enabled'
        });

        await shareInviteLink.click();

        console.log(
            'Share invite link clicked successfully'
        );

        await browser.pause(
            3000
        );
    }


    // ============================================================
    // Android Contacts
    // ============================================================

    async openContactSearch() {

        let searchInput =
            await common.findFirstDisplayed(
                locators.contactSearchInputs,
                2000
            );

        if (searchInput) {

            return searchInput;
        }

        const searchButton =
            await common.findFirstDisplayed(
                locators.contactSearchButtons,
                10000
            );

        if (searchButton) {

            await searchButton.click();

            console.log(
                'Contact search button clicked'
            );

            await browser.pause(
                1500
            );
        }

        searchInput =
            await common.findFirstDisplayed(
                locators.contactSearchInputs,
                10000
            );

        if (!searchInput) {

            throw new Error(
                'Contact search input was not displayed'
            );
        }

        return searchInput;
    }


    async searchContact(
        contactName
    ) {

        const searchInput =
            await this.openContactSearch();

        await searchInput.click();

        try {

            await searchInput.clearValue();

        } catch (error) {

            console.log(
                'Contact search field could not be cleared'
            );
        }

        await searchInput.setValue(
            contactName
        );

        console.log(
            `Searching contact: ${contactName}`
        );

        await browser.pause(
            3000
        );

        await common.hideKeyboard();
    }


    async selectContact(
        contactName
    ) {

        console.log(
            `Selecting contact: ${contactName}`
        );

        const contact =
            await common.findFirstDisplayed(
                locators.contactByName(
                    contactName
                ),
                20000
            );

        if (!contact) {

            await common.takeScreenshot(
                `Contact_not_found_${Date.now()}.png`
            );

            throw new Error(
                `Contact "${contactName}" was not displayed`
            );
        }

        await contact.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                `Contact "${contactName}" was not enabled`
        });

        await contact.click();

        console.log(
            `Contact selected: ${contactName}`
        );

        await browser.pause(
            3000
        );
    }


    // ============================================================
    // Android Share Sheet
    // ============================================================

    async waitForAndroidShareSheet() {

        await browser.waitUntil(
            async () => {

                const whatsApp =
                    await common.findFirstDisplayed(
                        locators.whatsAppShareOption,
                        1000
                    );

                if (whatsApp) {

                    return true;
                }

                const indicator =
                    await common.findFirstDisplayed(
                        locators.shareSheetIndicators,
                        1000
                    );

                return Boolean(
                    indicator
                );
            },
            {
                timeout: 30000,
                interval: 1000,
                timeoutMsg:
                    'Android share sheet was not displayed'
            }
        );

        console.log(
            'Android share sheet displayed'
        );
    }


    async selectWhatsAppFromShareSheet() {

        await this.waitForAndroidShareSheet();

        const whatsApp =
            await common.findFirstDisplayed(
                locators.whatsAppShareOption,
                15000
            );

        if (!whatsApp) {

            throw new Error(
                'WhatsApp was not displayed in the share sheet'
            );
        }

        await whatsApp.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                'WhatsApp option was not enabled'
        });

        await whatsApp.click();

        console.log(
            'WhatsApp selected from share sheet'
        );

        await this.waitForPackage(
            this.whatsAppPackage,
            30000
        );

        await browser.pause(
            3000
        );
    }


    // ============================================================
    // WhatsApp Contact Selection
    // ============================================================

    async searchWhatsAppContact(
        contactName
    ) {

        await this.waitForPackage(
            this.whatsAppPackage,
            30000
        );

        console.log(
            `Searching WhatsApp contact: ${contactName}`
        );

        let searchInput =
            await common.findFirstDisplayed(
                locators.whatsAppSearchInput,
                2000
            );

        if (!searchInput) {

            const searchButton =
                await common.findFirstDisplayed(
                    locators.whatsAppSearchButton,
                    10000
                );

            if (!searchButton) {

                throw new Error(
                    'WhatsApp Search button was not displayed'
                );
            }

            await searchButton.click();

            console.log(
                'WhatsApp Search button clicked'
            );

            await browser.pause(
                1500
            );

            searchInput =
                await common.findFirstDisplayed(
                    locators.whatsAppSearchInput,
                    10000
                );
        }

        if (!searchInput) {

            throw new Error(
                'WhatsApp search input was not displayed'
            );
        }

        await searchInput.click();

        try {

            await searchInput.clearValue();

        } catch (error) {

            console.log(
                'WhatsApp search field could not be cleared'
            );
        }

        await searchInput.setValue(
            contactName
        );

        console.log(
            `WhatsApp contact entered: ${contactName}`
        );

        await browser.pause(
            3000
        );
    }


    async selectWhatsAppContact(
        contactName
    ) {

        await common.hideKeyboard();

        console.log(
            `Selecting WhatsApp contact: ${contactName}`
        );

        let contactElement =
            await common.findFirstDisplayed(
                locators.whatsAppContactRadioButton(
                    contactName
                ),
                10000
            );

        if (!contactElement) {

            contactElement =
                await common.findFirstDisplayed(
                    locators.whatsAppContactByName(
                        contactName
                    ),
                    10000
                );
        }

        if (!contactElement) {

            await common.takeScreenshot(
                `WhatsApp_contact_not_found_${Date.now()}.png`
            );

            throw new Error(
                `WhatsApp contact "${contactName}" was not displayed`
            );
        }

        await contactElement.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                `WhatsApp contact "${contactName}" was not enabled`
        });

        let checked = null;

        try {

            checked =
                await contactElement.getAttribute(
                    'checked'
                );

        } catch (error) {

            console.log(
                'Checked attribute was not available'
            );
        }

        if (
            checked !== 'true'
        ) {

            await contactElement.click();

            console.log(
                `WhatsApp contact clicked: ${contactName}`
            );
        }

        await browser.pause(
            2000
        );

        const selectedContact =
            await common.findFirstDisplayed(
                locators.whatsAppSelectedContact(
                    contactName
                ),
                5000
            );

        if (selectedContact) {

            console.log(
                `WhatsApp contact selected successfully: ${contactName}`
            );

        } else {

            console.log(
                'Selected state was not exposed. Continuing after contact click.'
            );
        }
    }


    async sendWhatsAppInvite() {

        console.log(
            'Searching for WhatsApp Send button'
        );

        const sendButton =
            await common.findFirstDisplayed(
                locators.whatsAppSendButton,
                15000
            );

        if (!sendButton) {

            await common.takeScreenshot(
                `WhatsApp_send_not_found_${Date.now()}.png`
            );

            throw new Error(
                'WhatsApp Send button was not displayed'
            );
        }

        await sendButton.waitForEnabled({
            timeout: 10000,
            timeoutMsg:
                'WhatsApp Send button was not enabled'
        });

        await sendButton.click();

        console.log(
            'WhatsApp invite sent successfully'
        );

        await browser.pause(
            5000
        );
    }
}


module.exports =
    new SocialInvitePage();