require('dotenv').config();

const fs = require('fs');
const path = require('path');

exports.config = {
    /*
     * ====================
     * Runner configuration
     * ====================
     */
    runner: 'local',

    /*
     * =========================
     * Appium server connection
     * =========================
     */
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    /*
     * ==================
     * Test specification
     * ==================
     */
    specs: [
        './tests/**/*.spec.js'
    ],

    exclude: [],

    /*
     * ============
     * Capabilities
     * ============
     */
    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',

            'appium:automationName': 'UiAutomator2',

            'appium:deviceName': 'Android Device',

            'appium:udid': 'AATSE6QGB6YDCUQ4',

            'appium:platformVersion': '15',

            'appium:appPackage': 'com.thriveaihealth.qa',

            'appium:appActivity':
                'com.thriveaihealth.MainActivity',

            /*
             * Do not clear application data before the test.
             */
            'appium:noReset': true,

            /*
             * Automatically grant application permissions.
             */
            'appium:autoGrantPermissions': true,

            /*
             * Allow Appium to wait for commands for five minutes.
             */
            'appium:newCommandTimeout': 300,

            /*
             * Required for retrieving WebView version details.
             */
            'appium:enableWebviewDetailsCollection': true,

            /*
             * Folder where downloaded ChromeDrivers will be stored.
             */
            'appium:chromedriverExecutableDir':
                'C:\\ThriveAI Automation\\chromedrivers',

            /*
             * Display ChromeDriver logs in the Appium logs.
             */
            'appium:showChromedriverLog': true
        }
    ],

    /*
     * ===================
     * WebdriverIO settings
     * ===================
     */
    logLevel: 'info',

    bail: 0,

    waitforTimeout: 20000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    /*
     * =================
     * Appium service
     * =================
     *
     * WebdriverIO starts Appium automatically.
     * Do not start Appium manually with this configuration.
     */
    services: [
        [
            'appium',
            {
                command: 'appium',

                args: {
                    address: '127.0.0.1',

                    port: 4723,

                    allowInsecure:
                        'uiautomator2:chromedriver_autodownload'
                },

                logPath: './appium-logs'
            }
        ]
    ],

    /*
     * ================
     * Test framework
     * ================
     */
    framework: 'mocha',

    reporters: [
        'spec'
    ],

    mochaOpts: {
        ui: 'bdd',

        /*
         * Maximum duration allowed for each test.
         */
        timeout: 180000
    },

    /*
     * =================
     * Framework hooks
     * =================
     */
    onPrepare: function () {
        const screenshotFolder = path.join(
            process.cwd(),
            'screenshots'
        );

        const chromeDriverFolder = path.join(
            process.cwd(),
            'chromedrivers'
        );

        if (!fs.existsSync(screenshotFolder)) {
            fs.mkdirSync(screenshotFolder, {
                recursive: true
            });
        }

        if (!fs.existsSync(chromeDriverFolder)) {
            fs.mkdirSync(chromeDriverFolder, {
                recursive: true
            });
        }

        console.log('====================================');
        console.log('Test execution is starting');
        console.log('Device: AATSE6QGB6YDCUQ4');
        console.log('App package: com.thriveaihealth.qa');
        console.log('Appium URL: http://127.0.0.1:4723/');
        console.log('====================================');
    },

    afterTest: async function (
        test,
        context,
        { passed, error }
    ) {
        if (!passed) {
            const testName = test.title.replace(
                /[^a-zA-Z0-9-_]/g,
                '_'
            );

            const screenshotPath = path.join(
                process.cwd(),
                'screenshots',
                `FAILED_${testName}_${Date.now()}.png`
            );

            try {
                /*
                 * Screenshot can only be captured when an Appium
                 * session was successfully created.
                 */
                if (browser && browser.sessionId) {
                    await browser.saveScreenshot(screenshotPath);

                    console.log(
                        `Failure screenshot saved: ${screenshotPath}`
                    );
                } else {
                    console.log(
                        'Screenshot not captured because the Appium session was not created.'
                    );
                }
            } catch (screenshotError) {
                console.error(
                    `Unable to save screenshot: ${screenshotError.message}`
                );
            }

            console.error(
                `Test failed: ${error?.message || 'Unknown error'}`
            );
        }
    },

    onComplete: function () {
        console.log('====================================');
        console.log('Test execution completed');
        console.log('====================================');
    }
};