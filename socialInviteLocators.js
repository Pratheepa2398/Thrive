const socialInviteLocators = {

    // ============================================================
    // Thrive AI Health Home screen
    // ============================================================

    /*
     * The Social card is exposed in Appium Inspector as:
     *
     * android.widget.Button
     * content-desc="Add friends"
     *
     * The card contains the visible texts:
     * Social
     * Better together
     * Add friends
     */
    socialCard: [
        'android=new UiSelector()' +
        '.className("android.widget.Button")' +
        '.description("Add friends")',

        '//android.widget.Button[@content-desc="Add friends"]',

        '~Add friends'
    ],

    // Texts inside the Home Social card.
    // These are used only as supporting indicators.
    homeSocialCardIndicators: [
        'android=new UiSelector().text("Better together")',

        'android=new UiSelector().textContains("Better together")',

        '//*[@text="Better together"]',

        '//*[contains(@text,"Better together")]'
    ],

    // ============================================================
    // Social screen
    // ============================================================

    /*
     * Do not use only "Social" as an indicator because the Home card
     * also contains the text "Social".
     *
     * "Friends" and "My Groups" are specific to the Social page.
     */
    socialPageIndicators: [
        'android=new UiSelector().text("Friends")',

        'android=new UiSelector().textContains("Friends")',

        'android=new UiSelector().text("My Groups")',

        'android=new UiSelector().textContains("My Groups")',

        '//*[@text="Friends"]',

        '//*[contains(@text,"Friends")]',

        '//*[@text="My Groups"]',

        '//*[contains(@text,"My Groups")]'
    ],

    socialPageTitle: [
        'android=new UiSelector().text("Social")',

        '//*[@text="Social"]'
    ],

    friendsSection: [
        'android=new UiSelector().text("Friends")',

        'android=new UiSelector().textContains("Friends")',

        '//*[@text="Friends"]'
    ],

    /*
     * The Add friends button on the Social page is exposed as:
     *
     * accessibility id = Add friends
     * class = android.widget.Button
     */
    addFriendButton: [
    'android=new UiSelector()' +
    '.className("android.widget.Button")' +
    '.description("Add friends")',

    '//android.widget.Button[@content-desc="Add friends"]',

    '~Add friends'
],

    chooseFromContactsButton: [
        '~Choose from contacts',

        'android=new UiSelector()' +
        '.className("android.widget.Button")' +
        '.description("Choose from contacts")',

        'android=new UiSelector().description("Choose from contacts")',

        'android=new UiSelector().descriptionContains("Choose from contacts")',

        'android=new UiSelector().text("Choose from contacts")',

        'android=new UiSelector().textContains("Choose from contacts")',

        '//android.widget.Button[@content-desc="Choose from contacts"]',

        '//*[contains(@content-desc,"Choose from contacts")]',

        '//*[contains(@text,"Choose from contacts")]'
    ],

    shareInviteLinkButton: [
        '~Share invite link',

        '~Share Invite Link',

        'android=new UiSelector()' +
        '.className("android.widget.Button")' +
        '.descriptionContains("Share invite link")',

        'android=new UiSelector().description("Share invite link")',

        'android=new UiSelector().descriptionContains("Share invite link")',

        'android=new UiSelector().text("Share invite link")',

        'android=new UiSelector().textContains("Share invite link")',

        '//android.widget.Button[contains(@content-desc,"Share invite link")]',

        '//*[contains(@content-desc,"Share invite link")]',

        '//*[contains(@text,"Share invite link")]'
    ],

    // ============================================================
    // Android Contacts / Contact Picker
    // ============================================================

    contactPickerIndicators: [
        'android=new UiSelector().textContains("Contacts")',

        'android=new UiSelector().textContains("Choose a contact")',

        'android=new UiSelector().descriptionContains("Search")',

        'android=new UiSelector().className("android.widget.EditText")'
    ],

    contactSearchButtons: [
        '~Search',

        'android=new UiSelector().description("Search")',

        'android=new UiSelector().descriptionContains("Search")',

        'id=com.google.android.contacts:id/menu_search',

        'id=com.android.contacts:id/menu_search',

        'id=android:id/search_button'
    ],

    contactSearchInputs: [
        'id=android:id/search_src_text',

        'id=com.google.android.contacts:id/search_view',

        'id=com.android.contacts:id/search_view',

        'android=new UiSelector().className("android.widget.EditText")',

        '//android.widget.EditText'
    ],

    contactByName: contactName => [
        `android=new UiSelector().text("${contactName}")`,

        `android=new UiSelector().textContains("${contactName}")`,

        `android=new UiSelector().description("${contactName}")`,

        `android=new UiSelector().descriptionContains("${contactName}")`,

        `//*[contains(@text,"${contactName}")]`,

        `//*[contains(@content-desc,"${contactName}")]`
    ],

    // ============================================================
    // Android Share Sheet
    // ============================================================

    shareSheetIndicators: [
        'android=new UiSelector().textContains("Share")',

        'android=new UiSelector().textContains("Suggested")',

        'android=new UiSelector().textContains("Quick Share")',

        'android=new UiSelector().textContains("Share with")',

        '//*[contains(@text,"Share")]',

        '//*[contains(@content-desc,"Share")]'
    ],

    whatsAppShareOption: [
        'android=new UiSelector().text("WhatsApp")',

        'android=new UiSelector().textContains("WhatsApp")',

        'android=new UiSelector().description("WhatsApp")',

        'android=new UiSelector().descriptionContains("WhatsApp")',

        '//*[contains(@text,"WhatsApp")]',

        '//*[contains(@content-desc,"WhatsApp")]'
    ],

    // ============================================================
    // WhatsApp
    // ============================================================

    whatsAppSearchButton: [
        '~Search',

        'id=com.whatsapp:id/menuitem_search',

        'id=com.whatsapp:id/search',

        'android=new UiSelector().description("Search")',

        'android=new UiSelector().descriptionContains("Search")',

        '//android.widget.ImageView[contains(@content-desc,"Search")]',

        '//android.widget.ImageButton[contains(@content-desc,"Search")]'
    ],

    whatsAppSearchInput: [
        'id=com.whatsapp:id/search_input',

        'id=com.whatsapp:id/search_src_text',

        'id=android:id/search_src_text',

        'android=new UiSelector().className("android.widget.EditText")',

        '//android.widget.EditText'
    ],

    whatsAppContactByName: contactName => [
        `android=new UiSelector().text("${contactName}")`,

        `android=new UiSelector().textContains("${contactName}")`,

        `android=new UiSelector().description("${contactName}")`,

        `android=new UiSelector().descriptionContains("${contactName}")`,

        `//*[contains(@text,"${contactName}")]`,

        `//*[contains(@content-desc,"${contactName}")]`
    ],

    whatsAppContactRadioButton: contactName => [
        `android=new UiSelector()` +
        `.className("android.widget.RadioButton")` +
        `.descriptionContains("${contactName}")`,

        `//android.widget.RadioButton` +
        `[contains(@content-desc,"${contactName}")]`,

        `//*[contains(@content-desc,"${contactName}")]`
    ],

    whatsAppSelectedContact: contactName => [
        `android=new UiSelector()` +
        `.className("android.widget.RadioButton")` +
        `.descriptionContains("${contactName}")` +
        `.checked(true)`,

        `//android.widget.RadioButton` +
        `[contains(@content-desc,"${contactName}") and @checked="true"]`,

        `//*[contains(@content-desc,"${contactName}") and @selected="true"]`
    ],

    whatsAppSendButton: [
        '~Send',

        'id=com.whatsapp:id/send',

        'id=com.whatsapp:id/send_button',

        'android=new UiSelector().resourceId("com.whatsapp:id/send")',

        'android=new UiSelector().description("Send")',

        'android=new UiSelector().descriptionContains("Send")',

        '//android.widget.ImageButton[@content-desc="Send"]',

        '//android.widget.ImageButton[contains(@content-desc,"Send")]'
    ]
};

module.exports = socialInviteLocators;