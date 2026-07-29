module.exports = {

    /*
     * =========================================================
     * COMMON BUTTONS
     * =========================================================
     */

    nextButton: [
        '~Next',
        'android=new UiSelector().description("Next")',
        '//android.view.ViewGroup[@content-desc="Next"]'
    ],

    skipButton: [
        '~Skip',
        'android=new UiSelector().description("Skip")',
        '//android.view.ViewGroup[@content-desc="Skip"]'
    ],

    backButton: [
        '~Back',
        'android=new UiSelector().description("Back")',
        '//android.view.ViewGroup[@content-desc="Back"]'
    ],


    /*
     * =========================================================
     * HEALTH PROFILE INTRODUCTION
     * =========================================================
     */

    healthProfileIntroHeading: [
        'android=new UiSelector().textContains("create your health profile")',
        '//android.widget.TextView[contains(@text,"create your health profile")]'
    ],

    bioAgeHeading: [
        'android=new UiSelector().textContains("biological age")',
        '//android.widget.TextView[contains(@text,"biological age")]'
    ],

    programIntroHeading: [
        'android=new UiSelector().textContains("continuously adjust your program")',
        '//android.widget.TextView[contains(@text,"continuously adjust your program")]'
    ],

    shareBiometricInfoHeading: [
        'android=new UiSelector().text("Share biometric info")',
        'android=new UiSelector().textContains("Share biometric info")',
        '//android.widget.TextView[contains(@text,"Share biometric info")]'
    ],


    /*
     * =========================================================
     * WEARABLES AND DATA
     * =========================================================
     */

    wearablesHeading: [
        'android=new UiSelector().text("Wearables and Data")',
        'android=new UiSelector().textContains("Wearables and Data")',
        '//android.widget.TextView[contains(@text,"Wearables and Data")]'
    ],


    /*
     * =========================================================
     * BIRTHDAY / HEIGHT / WEIGHT
     * =========================================================
     */

    birthdayHeading: [
        'android=new UiSelector().text("When is your birthday?")',
        'android=new UiSelector().textContains("When is your birthday")',
        '//android.widget.TextView[contains(@text,"When is your birthday")]'
    ],

    dateOfBirthField: [
        'android=new UiSelector().text("Date of Birth")',
        'android=new UiSelector().description("Date of Birth")',
        '//android.widget.TextView[@text="Date of Birth"]',
        '//android.view.ViewGroup[@content-desc="Date of Birth"]'
    ],

    selectedDateOfBirth: [
        'android=new UiSelector().textContains("Mar 23, 1998")',
        'android=new UiSelector().descriptionContains("Mar 23, 1998")',
        '//android.widget.TextView[contains(@text,"Mar 23, 1998")]'
    ],

    imperialOption: [
        '~imperial',
        'android=new UiSelector().description("imperial")',
        'android=new UiSelector().text("imperial")',
        '//*[@text="imperial"]'
    ],

    metricOption: [
        '~metric',
        'android=new UiSelector().description("metric")',
        'android=new UiSelector().text("metric")',
        '//*[@text="metric"]'
    ],

    heightField: [
        'android=new UiSelector().descriptionMatches("\\\\d+\'\\\\d+\\\"")',
        'android=new UiSelector().textMatches("\\\\d+\'\\\\d+\\\"")',
        '//android.view.ViewGroup[contains(@content-desc,"\'")]',
        '//android.widget.TextView[contains(@text,"\'")]'
    ],

    weightField: [
        'android=new UiSelector().descriptionMatches("\\\\d+ lb")',
        'android=new UiSelector().textMatches("\\\\d+ lb")',
        '//android.view.ViewGroup[contains(@content-desc,"lb")]',
        '//android.widget.TextView[contains(@text,"lb")]'
    ],


    /*
     * =========================================================
     * ANDROID DATE PICKER
     * =========================================================
     */

    datePicker: [
        'android=new UiSelector().resourceId("android:id/datePicker")',
        'id=android:id/datePicker',
        '//android.widget.DatePicker[@resource-id="android:id/datePicker"]'
    ],

    datePickerYearHeader: [
        'android=new UiSelector().resourceId("android:id/date_picker_header_year")',
        'id=android:id/date_picker_header_year',
        '//*[@resource-id="android:id/date_picker_header_year"]'
    ],

    datePickerYearList: [
        'android=new UiSelector().resourceId("android:id/date_picker_year_picker")',
        'android=new UiSelector().className("android.widget.ScrollView")',
        '//*[@resource-id="android:id/date_picker_year_picker"]'
    ],

    datePickerPreviousMonthButton: [
        'android=new UiSelector().descriptionContains("Previous month")',
        'android=new UiSelector().resourceId("android:id/prev")',
        'id=android:id/prev'
    ],

    datePickerNextMonthButton: [
        'android=new UiSelector().descriptionContains("Next month")',
        'android=new UiSelector().resourceId("android:id/next")',
        'id=android:id/next'
    ],

    datePickerOkButton: [
        'android=new UiSelector().resourceId("android:id/button1")',
        'android=new UiSelector().text("OK")',
        'id=android:id/button1',
        '//android.widget.Button[@text="OK"]'
    ],


    /*
     * =========================================================
     * HEIGHT AND WEIGHT PICKERS
     * =========================================================
     */

    pickerDoneButton: [
        '~Done',
        'android=new UiSelector().description("Done")',
        '//android.view.ViewGroup[@content-desc="Done"]'
    ],

    pickerCancelButton: [
        '~Cancel',
        'android=new UiSelector().description("Cancel")',
        '//android.view.ViewGroup[@content-desc="Cancel"]'
    ],

    feetUnit: [
        '~ft',
        'android=new UiSelector().description("ft")',
        'android=new UiSelector().text("ft")'
    ],

    centimetreUnit: [
        '~cm',
        'android=new UiSelector().description("cm")',
        'android=new UiSelector().text("cm")'
    ],


    /*
     * =========================================================
     * PREEXISTING CONDITIONS
     * =========================================================
     */

    preexistingConditionsHeading: [
        'android=new UiSelector().textContains("preexisting conditions")',
        '//android.widget.TextView[contains(@text,"preexisting conditions")]'
    ],

    preexistingConditionsField: [
        'android=new UiSelector().className("android.widget.EditText").textContains("Enter any preexisting conditions")',
        '//android.widget.EditText[contains(@text,"Enter any preexisting conditions")]'
    ],


    /*
     * =========================================================
     * SEX ASSIGNED AT BIRTH
     * =========================================================
     */

    sexAssignedHeading: [
        'android=new UiSelector().textContains("sex assigned at birth")',
        '//android.widget.TextView[contains(@text,"sex assigned at birth")]'
    ],

    femaleOption: [
        '~Female',
        'android=new UiSelector().description("Female")',
        '//android.view.ViewGroup[@content-desc="Female"]'
    ],

    maleOption: [
        '~Male',
        'android=new UiSelector().description("Male")',
        '//android.view.ViewGroup[@content-desc="Male"]'
    ],

    intersexOption: [
        '~Intersex',
        'android=new UiSelector().description("Intersex")',
        '//android.view.ViewGroup[@content-desc="Intersex"]'
    ],

    preferNotToSaySexOption: [
        '~Prefer not to say',
        'android=new UiSelector().description("Prefer not to say")',
        '//android.view.ViewGroup[@content-desc="Prefer not to say"]'
    ],


    /*
     * =========================================================
     * ETHNICITY
     * =========================================================
     */

    ethnicityHeading: [
        'android=new UiSelector().textContains("What is your ethnicity")',
        '//android.widget.TextView[contains(@text,"What is your ethnicity")]'
    ],

    americanIndianOption: [
        '~American Indian or Alaska Native',
        'android=new UiSelector().description("American Indian or Alaska Native")'
    ],

    asianOption: [
        '~Asian',
        'android=new UiSelector().description("Asian")'
    ],

    blackOption: [
        '~Black or African American',
        'android=new UiSelector().description("Black or African American")'
    ],

    hispanicOption: [
        '~Hispanic or Latino',
        'android=new UiSelector().description("Hispanic or Latino")'
    ],

    nativeHawaiianOption: [
        '~Native Hawaiian or Pacific Islander',
        'android=new UiSelector().description("Native Hawaiian or Pacific Islander")'
    ],

    whiteOption: [
        '~White',
        'android=new UiSelector().description("White")'
    ],

    twoOrMoreRacesOption: [
        '~Two or more races',
        'android=new UiSelector().description("Two or more races")'
    ],

    preferNotToSayEthnicityOption: [
        '~Prefer not to say',
        'android=new UiSelector().description("Prefer not to say")'
    ],


    /*
     * =========================================================
     * LOCATION
     * =========================================================
     */

    locationHeading: [
        'android=new UiSelector().textContains("Share location with")',
        '//android.widget.TextView[contains(@text,"Share location with")]'
    ],

    shareLocationButton: [
        '~Share Location',
        'android=new UiSelector().descriptionContains("Share Location")',
        'android=new UiSelector().text("Share Location")'
    ],

    discussGoalsHeading: [
    'android=new UiSelector().textContains("Discuss your goals")',
    'android=new UiSelector().textContains("discuss your goals")',
    '//android.widget.TextView[contains(@text,"Discuss your goals")]',
    '//android.widget.TextView[contains(@text,"discuss your goals")]'
]

};