const locators =
    require('../../locators/onboarding/healthProfileLocators');

const common =
    require('../../utils/common');


class HealthProfilePage {

    /*
     * =========================================================
     * COMMON METHODS
     * =========================================================
     */

    async switchToNativeApp() {

        await driver.switchContext(
            'NATIVE_APP'
        ).catch(error => {

            console.log(
                `Native context warning: ${error.message}`
            );
        });

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
        timeout = 3000
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

        } catch (error) {

            const location =
                await element.getLocation();

            const size =
                await element.getSize();

            await driver.execute(
                'mobile: clickGesture',
                {
                    x: Math.round(
                        location.x +
                        size.width / 2
                    ),

                    y: Math.round(
                        location.y +
                        size.height / 2
                    )
                }
            );
        }

        console.log(
            `${elementName} clicked`
        );

        await browser.pause(800);
    }


    async hideKeyboard() {

        try {

            if (
                await driver.isKeyboardShown()
            ) {

                await driver.hideKeyboard();

                await browser.pause(700);
            }

        } catch (error) {

            console.log(
                `Keyboard warning: ${error.message}`
            );
        }
    }


    async clickNext(
        timeout = 30000
    ) {

        await this.hideKeyboard();

        const nextButton =
            await this.find(
                locators.nextButton,
                'Next button',
                timeout
            );

        await browser.waitUntil(
            async () =>
                await nextButton.isEnabled()
                    .catch(() => false),
            {
                timeout,
                interval: 500,
                timeoutMsg:
                    'Next button did not become enabled.'
            }
        );

        await this.clickElement(
            nextButton,
            'Next button'
        );

        await browser.pause(1200);
    }


    async clickSkip(
        timeout = 30000
    ) {

        const skipButton =
            await this.find(
                locators.skipButton,
                'Skip button',
                timeout
            );

        await this.clickElement(
            skipButton,
            'Skip button'
        );

        await browser.pause(1200);
    }


    async swipePageUp() {

        const size =
            await driver.getWindowSize();

        await driver.performActions([
            {
                type: 'pointer',
                id: `pageFinger_${Date.now()}`,

                parameters: {
                    pointerType: 'touch'
                },

                actions: [
                    {
                        type: 'pointerMove',
                        duration: 0,
                        x: Math.round(size.width * 0.50),
                        y: Math.round(size.height * 0.75)
                    },
                    {
                        type: 'pointerDown',
                        button: 0
                    },
                    {
                        type: 'pause',
                        duration: 250
                    },
                    {
                        type: 'pointerMove',
                        duration: 700,
                        x: Math.round(size.width * 0.50),
                        y: Math.round(size.height * 0.30)
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

        await browser.pause(800);
    }


    async performPickerSwipe(
        x,
        startPercentage,
        endPercentage
    ) {

        const size =
            await driver.getWindowSize();

        await driver.performActions([
            {
                type: 'pointer',
                id: `pickerFinger_${Date.now()}`,

                parameters: {
                    pointerType: 'touch'
                },

                actions: [
                    {
                        type: 'pointerMove',
                        duration: 0,
                        x,
                        y: Math.round(
                            size.height *
                            startPercentage
                        )
                    },
                    {
                        type: 'pointerDown',
                        button: 0
                    },
                    {
                        type: 'pause',
                        duration: 250
                    },
                    {
                        type: 'pointerMove',
                        duration: 650,
                        x,
                        y: Math.round(
                            size.height *
                            endPercentage
                        )
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

        await browser.pause(500);
    }


    /*
     * Finger moves downward.
     * Used for:
     * 2026 -> 1998
     * 184 lb -> 164 lb
     */
    /*async swipePickerDown() {

    const size = await driver.getWindowSize();

    await driver.executeScript(
        'mobile: swipeGesture',
        [
            {
                left: Math.round(size.width * 0.35),
                top: Math.round(size.height * 0.58),
                width: Math.round(size.width * 0.30),
                height: Math.round(size.height * 0.22),
                direction: 'down',
                percent: 0.65,
                speed: 700
            }
        ]
    );

    await browser.pause(600);
}

    async swipePickerUp() {

    const size = await driver.getWindowSize();

    await driver.executeScript(
        'mobile: swipeGesture',
        [
            {
                left: Math.round(size.width * 0.35),
                top: Math.round(size.height * 0.58),
                width: Math.round(size.width * 0.30),
                height: Math.round(size.height * 0.22),
                direction: 'up',
                percent: 0.65,
                speed: 700
            }
        ]
    );

    await browser.pause(600);
}
    */


   async scrollPickerColumn(
    columnX,
    direction,
    steps = 1
) {

    const size = await driver.getWindowSize();

    const centreY =
        Math.round(size.height * 0.73);

    const swipeDistance =
        Math.round(size.height * 0.055);

    for (
        let step = 1;
        step <= steps;
        step++
    ) {

        const startY =
            direction === 'up'
                ? centreY + swipeDistance
                : centreY - swipeDistance;

        const endY =
            direction === 'up'
                ? centreY - swipeDistance
                : centreY + swipeDistance;

        console.log(
            `Picker ${direction} step ${step}/${steps}`
        );

        await driver.performActions([
            {
                type: 'pointer',
                id: `pickerFinger_${Date.now()}_${step}`,

                parameters: {
                    pointerType: 'touch'
                },

                actions: [
                    {
                        type: 'pointerMove',
                        duration: 0,
                        x: columnX,
                        y: startY
                    },
                    {
                        type: 'pointerDown',
                        button: 0
                    },
                    {
                        type: 'pause',
                        duration: 150
                    },
                    {
                        type: 'pointerMove',
                        duration: 450,
                        x: columnX,
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

        await browser.pause(500);
    }
}


async swipePickerUp(
    columnX,
    steps = 1
) {

    await this.scrollPickerColumn(
        columnX,
        'up',
        steps
    );
}


async swipePickerDown(
    columnX,
    steps = 1
) {

    await this.scrollPickerColumn(
        columnX,
        'down',
        steps
    );
}8


    async closeOpenPicker() {

        const doneButton =
            await this.findOptional(
                locators.pickerDoneButton,
                'Open picker Done button',
                1500
            );

        if (doneButton) {

            console.log(
                'An existing picker is open. Closing it.'
            );

            await this.clickElement(
                doneButton,
                'Open picker Done button'
            );

            await browser.pause(1000);
        }
    }


    /*
     * =========================================================
     * INTRODUCTION SCREENS
     * =========================================================
     */

    async completeIntroductionScreens() {

        console.log(
            '========== HEALTH PROFILE INTRO STARTED =========='
        );

        await this.switchToNativeApp();

        await this.find(
            locators.healthProfileIntroHeading,
            'Health profile introduction',
            20000
        );

        await this.clickNext();

        await this.find(
            locators.bioAgeHeading,
            'Bio Age screen',
            20000
        );

        await this.clickNext();

        await this.find(
            locators.programIntroHeading,
            'Program introduction screen',
            20000
        );

        await this.clickNext();

        await this.find(
            locators.shareBiometricInfoHeading,
            'Share biometric information screen',
            20000
        );

        await this.clickNext();

        console.log(
            '========== HEALTH PROFILE INTRO COMPLETED =========='
        );
    }


    /*
     * =========================================================
     * WEARABLES AND DATA
     * =========================================================
     */

    async handleWearablesAndData() {

        console.log(
            '========== WEARABLES AND DATA STARTED =========='
        );

        await this.find(
            locators.wearablesHeading,
            'Wearables and Data screen',
            30000
        );

        console.log(
            'Waiting 60 seconds on Wearables and Data screen'
        );

        await browser.pause(
            60000
        );

        await this.clickSkip(
            30000
        );

        console.log(
            '========== WEARABLES AND DATA COMPLETED =========='
        );
    }


    /*
     * =========================================================
     * DATE OF BIRTH
     * =========================================================
     */

    async selectDatePickerYear(
        targetYear = 1998
    ) {

        console.log(
            `========== SELECTING DOB YEAR: ${targetYear} ==========`
        );

        const yearHeader =
            await this.find(
                locators.datePickerYearHeader,
                'Date picker year header',
                10000
            );

        const currentYear =
            await yearHeader.getText()
                .catch(() => '');

        if (
            currentYear.trim() ===
            String(targetYear)
        ) {

            console.log(
                `${targetYear} is already selected`
            );

            return;
        }

        await this.clickElement(
            yearHeader,
            'Date picker year header'
        );

        await browser.pause(1000);

        const targetLocators = [
            `android=new UiSelector().text("${targetYear}")`,
            `//android.widget.TextView[@text="${targetYear}"]`
        ];

        let targetElement =
            await this.findOptional(
                targetLocators,
                `${targetYear} year option`,
                1000
            );

        if (targetElement) {

            await this.clickElement(
                targetElement,
                `${targetYear} year option`
            );

            return;
        }

        const size =
            await driver.getWindowSize();

        const yearColumnX =
            Math.round(
                size.width * 0.50
            );

        /*
         * Downward gesture only.
         * Do not add upward fallback.
         */
        for (
            let swipeNumber = 1;
            swipeNumber <= 18;
            swipeNumber++
        ) {

            console.log(
                `DOB year downward swipe ${swipeNumber}/18`
            );

            await this.swipePickerDown(
                yearColumnX
            );

            targetElement =
                await this.findOptional(
                    targetLocators,
                    `${targetYear} year option`,
                    900
                );

            if (targetElement) {

                await this.clickElement(
                    targetElement,
                    `${targetYear} year option`
                );

                console.log(
                    `${targetYear} selected successfully`
                );

                await browser.pause(800);

                return;
            }
        }

        throw new Error(
            `DOB year ${targetYear} was not found after downward scrolling.`
        );
    }


    async getCurrentCalendarMonth() {

        const source =
            await driver.getPageSource();

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        for (const month of months) {

            const match =
                source.match(
                    new RegExp(
                        `\\d{1,2}\\s+${month}\\s+(\\d{4})`,
                        'i'
                    )
                );

            if (match) {

                return {
                    month:
                        months.indexOf(month) + 1,

                    year:
                        Number(match[1])
                };
            }
        }

        return null;
    }


    async selectDatePickerMonth(
        targetMonth,
        targetYear
    ) {

        const targetValue =
            targetYear * 12 +
            targetMonth;

        for (
            let attempt = 1;
            attempt <= 15;
            attempt++
        ) {

            const current =
                await this.getCurrentCalendarMonth();

            if (!current) {

                await browser.pause(500);

                continue;
            }

            if (
                current.month === targetMonth &&
                current.year === targetYear
            ) {

                return;
            }

            const currentValue =
                current.year * 12 +
                current.month;

            const locatorList =
                currentValue > targetValue
                    ? locators.datePickerPreviousMonthButton
                    : locators.datePickerNextMonthButton;

            const buttonName =
                currentValue > targetValue
                    ? 'Previous month button'
                    : 'Next month button';

            const button =
                await this.find(
                    locatorList,
                    buttonName,
                    5000
                );

            await this.clickElement(
                button,
                buttonName
            );

            await browser.pause(300);
        }

        throw new Error(
            `Unable to display month ${targetMonth}/${targetYear}.`
        );
    }


    async selectDatePickerDay(
        day,
        month,
        year
    ) {

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const monthName =
            monthNames[month - 1];

        const paddedDay =
            String(day).padStart(
                2,
                '0'
            );

        const fullDate =
            `${paddedDay} ${monthName} ${year}`;

        const alternateDate =
            `${day} ${monthName} ${year}`;

        const dateElement =
            await this.find(
                [
                    `~${fullDate}`,
                    `android=new UiSelector().description("${fullDate}")`,
                    `android=new UiSelector().description("${alternateDate}")`,
                    `//android.view.View[@content-desc="${fullDate}"]`,
                    `//android.view.View[@content-desc="${alternateDate}"]`
                ],
                `${fullDate} date`,
                10000
            );

        await this.clickElement(
            dateElement,
            `${fullDate} date`
        );
    }


    async enterDateOfBirth(
        day = 23,
        month = 3,
        year = 1998
    ) {

        console.log(
            `========== ENTERING DOB: ${day}/${month}/${year} ==========`
        );

        await this.find(
            locators.birthdayHeading,
            'Birthday screen',
            20000
        );

        const existingDate =
            await this.findOptional(
                locators.selectedDateOfBirth,
                'Existing Date of Birth',
                2500
            );

        if (existingDate) {

            console.log(
                'Date of Birth is already selected'
            );

            return;
        }

        const dobField =
            await this.find(
                locators.dateOfBirthField,
                'Date of Birth field',
                15000
            );

        await this.clickElement(
            dobField,
            'Date of Birth field'
        );

        await this.find(
            locators.datePicker,
            'Native Date Picker',
            10000
        );

        await this.selectDatePickerYear(
            year
        );

        await this.selectDatePickerMonth(
            month,
            year
        );

        await this.selectDatePickerDay(
            day,
            month,
            year
        );

        const okButton =
            await this.find(
                locators.datePickerOkButton,
                'Date picker OK button',
                10000
            );

        await this.clickElement(
            okButton,
            'Date picker OK button'
        );

        await browser.pause(1200);

        console.log(
            'Date of Birth completed'
        );
    }


    /*
     * =========================================================
     * HEIGHT
     * =========================================================
     */

    async selectImperialUnit() {

        const imperial =
            await this.findOptional(
                locators.imperialOption,
                'Imperial option',
                4000
            );

        if (imperial) {

            await this.clickElement(
                imperial,
                'Imperial option'
            );
        }
    }


    /*async selectHeightPickerValue(
        valueText,
        columnX,
        swipeDirection,
        maximumSwipes
    ) {

        const valueLocators = [
            `android=new UiSelector().text("${valueText}")`,
            `//android.widget.TextView[@text="${valueText}"]`
        ];

        let valueElement =
            await this.findOptional(
                valueLocators,
                `${valueText} option`,
                1000
            );

        if (valueElement) {

            await this.clickElement(
                valueElement,
                `${valueText} option`
            );

            return;
        }

        for (
            let swipeNumber = 1;
            swipeNumber <= maximumSwipes;
            swipeNumber++
        ) {

            if (
                swipeDirection === 'down'
            ) {

                await this.swipePickerDown(
                    columnX
                );

            } else {

                await this.swipePickerUp(
                    columnX
                );
            }

            valueElement =
                await this.findOptional(
                    valueLocators,
                    `${valueText} option`,
                    800
                );

            if (valueElement) {

                await this.clickElement(
                    valueElement,
                    `${valueText} option`
                );

                return;
            }
        }

        throw new Error(
            `${valueText} was not found in the height picker.`
        );
    }
    */


    async enterHeight(
    targetFeet = 5,
    targetInches = 9,
    currentFeet = 5,
    currentInches = 0
) {

    console.log(
        `========== SELECTING HEIGHT: ` +
        `${targetFeet}ft ${targetInches}in ==========`
    );

    await this.closeOpenPicker();

    const heightField =
        await this.find(
            locators.heightField,
            'Height field',
            15000
        );

    await this.clickElement(
        heightField,
        'Height field'
    );

    await browser.pause(1500);

    await this.find(
        locators.pickerDoneButton,
        'Height picker Done button',
        10000
    );

    const size =
        await driver.getWindowSize();

    const feetColumnX =
        Math.round(size.width * 0.38);

    const inchesColumnX =
        Math.round(size.width * 0.63);

    const feetDifference =
        targetFeet - currentFeet;

    if (feetDifference > 0) {

        await this.swipePickerUp(
            feetColumnX,
            feetDifference
        );

    } else if (feetDifference < 0) {

        await this.swipePickerDown(
            feetColumnX,
            Math.abs(feetDifference)
        );
    }

    const inchesDifference =
        targetInches - currentInches;

    if (inchesDifference > 0) {

        await this.swipePickerUp(
            inchesColumnX,
            inchesDifference
        );

    } else if (inchesDifference < 0) {

        await this.swipePickerDown(
            inchesColumnX,
            Math.abs(inchesDifference)
        );
    }

    const doneButton =
        await this.find(
            locators.pickerDoneButton,
            'Height picker Done button',
            10000
        );

    await this.clickElement(
        doneButton,
        'Height picker Done button'
    );

    await browser.pause(1200);

    console.log(
        `========== HEIGHT SELECTED: ` +
        `${targetFeet}ft ${targetInches}in ==========`
    );
}


    /*
     * =========================================================
     * WEIGHT
     * =========================================================
     */

    async enterWeight(
    targetWeight = 164,
    currentWeight = 170
) {

    console.log(
        `========== SELECTING WEIGHT: ` +
        `${targetWeight} lb ==========`
    );

    await this.closeOpenPicker();

    let weightField =
        await this.findOptional(
            locators.weightField,
            'Weight field',
            5000
        );

    if (!weightField) {

        await this.swipePageUp();

        weightField =
            await this.find(
                locators.weightField,
                'Weight field',
                10000
            );
    }

    await this.clickElement(
        weightField,
        'Weight field'
    );

    await browser.pause(1500);

    await this.find(
        locators.pickerDoneButton,
        'Weight picker Done button',
        10000
    );

    const size =
        await driver.getWindowSize();

    const weightColumnX =
        Math.round(size.width * 0.50);

    const weightDifference =
        targetWeight - currentWeight;

    if (weightDifference > 0) {

        await this.swipePickerUp(
            weightColumnX,
            weightDifference
        );

    } else if (weightDifference < 0) {

        await this.swipePickerDown(
            weightColumnX,
            Math.abs(weightDifference)
        );

    } else {

        console.log(
            'Target weight is already selected.'
        );
    }

    const doneButton =
        await this.find(
            locators.pickerDoneButton,
            'Weight picker Done button',
            10000
        );

    await this.clickElement(
        doneButton,
        'Weight picker Done button'
    );

    await browser.pause(1200);

    console.log(
        `========== WEIGHT SELECTED: ` +
        `${targetWeight} lb ==========`
    );
}


    async completeBirthdayHeightWeight() {

        console.log(
            '========== BIRTHDAY HEIGHT WEIGHT STARTED =========='
        );

        await this.enterDateOfBirth(
            23,
            3,
            1998
        );

        await this.selectImperialUnit();

await this.enterHeight(
    5,
    9,
    5,
    0
);

await this.enterWeight(
    164,
    170
);

await this.clickNext(
    30000
);

        console.log(
            '========== BIRTHDAY HEIGHT WEIGHT COMPLETED =========='
        );
    }


     /*
     * =========================================================
     * SEX ASSIGNED AT BIRTH
     * =========================================================
     */

    async selectSexAssignedAtBirth(
        option = 'Female'
    ) {

        await this.find(
            locators.sexAssignedHeading,
            'Sex assigned at birth screen',
            20000
        );

        const options = {
            Female:
                locators.femaleOption,

            Male:
                locators.maleOption,

            Intersex:
                locators.intersexOption,

            'Prefer not to say':
                locators.preferNotToSaySexOption
        };

        const optionLocators =
            options[option];

        if (!optionLocators) {

            throw new Error(
                `Unsupported sex option: ${option}`
            );
        }

        const optionElement =
            await this.find(
                optionLocators,
                `${option} option`,
                10000
            );

        await this.clickElement(
            optionElement,
            `${option} option`
        );

        await this.clickNext(
            20000
        );
    }


    /*
     * =========================================================
     * ETHNICITY
     * =========================================================
     */

    async selectEthnicity(
        option = 'Asian'
    ) {

        await this.find(
            locators.ethnicityHeading,
            'Ethnicity screen',
            20000
        );

        const options = {
            'American Indian or Alaska Native':
                locators.americanIndianOption,

            Asian:
                locators.asianOption,

            'Black or African American':
                locators.blackOption,

            'Hispanic or Latino':
                locators.hispanicOption,

            'Native Hawaiian or Pacific Islander':
                locators.nativeHawaiianOption,

            White:
                locators.whiteOption,

            'Two or more races':
                locators.twoOrMoreRacesOption,

            'Prefer not to say':
                locators.preferNotToSayEthnicityOption
        };

        const optionLocators =
            options[option];

        if (!optionLocators) {

            throw new Error(
                `Unsupported ethnicity option: ${option}`
            );
        }

        const optionElement =
            await this.find(
                optionLocators,
                `${option} ethnicity option`,
                10000
            );

        await this.clickElement(
            optionElement,
            `${option} ethnicity option`
        );

        await this.clickNext(
            20000
        );
    }


    /*
     * =========================================================
     * LOCATION
     * =========================================================
     */

    async skipLocationSharing() {

        await this.find(
            locators.locationHeading,
            'Location sharing screen',
            20000
        );

        await this.clickSkip(
            15000
        );
    }

    async handleDiscussGoals() {

    console.log(
        '========== DISCUSS YOUR GOALS STARTED =========='
    );

    await this.find(
        locators.discussGoalsHeading,
        'Discuss your goals screen',
        20000
    );

    await this.clickNext(
        20000
    );

    console.log(
        '========== DISCUSS YOUR GOALS COMPLETED =========='
    );
}


    /*
     * =========================================================
     * COMPLETE FLOWS
     * =========================================================
     */

    async completeHealthProfileFlowFromBirthday() {

    console.log(
        '========== HEALTH PROFILE FROM BIRTHDAY STARTED =========='
    );

    await this.switchToNativeApp();

    await this.completeBirthdayHeightWeight();

    await this.selectSexAssignedAtBirth(
        'Female'
    );

    await this.selectEthnicity(
        'Asian'
    );

    await this.skipLocationSharing();

    await this.handleDiscussGoals();

    console.log(
        '========== HEALTH PROFILE FROM BIRTHDAY COMPLETED =========='
    );
}


    async completeHealthProfileFlow() {

    console.log(
        '========== HEALTH PROFILE FLOW STARTED =========='
    );

    await this.completeIntroductionScreens();

    await this.handleWearablesAndData();

    await this.completeBirthdayHeightWeight();

    await this.selectSexAssignedAtBirth(
        'Female'
    );

    await this.selectEthnicity(
        'Asian'
    );

    await this.skipLocationSharing();

    await this.handleDiscussGoals();

    console.log(
        '========== HEALTH PROFILE FLOW COMPLETED =========='
    );
}
}


module.exports =
    new HealthProfilePage();