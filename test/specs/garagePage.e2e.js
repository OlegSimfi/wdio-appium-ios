import { $, browser, driver } from '@wdio/globals';

describe('Garage page tests', () => {
    before(async () => {
        // Activate the app
        await driver.activateApp('com.hillelAuto');
        await $('//XCUIElementTypeOther[@name="Sign in"]').click();
        await $('(//XCUIElementTypeTextField)[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('(//XCUIElementTypeTextField)[2]').setValue('ZSgeVQhuU3qkvlG');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Login"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Garage"]')).toBeDisplayed();

    });

    beforeEach(async () => {
        await driver.activateApp('com.hillelAuto');

    });    

    afterEach(async () => {
        await driver.terminateApp('com.hillelAuto');
    });

    it('Add BMW X5', async () => {
        await $('//XCUIElementTypeOther[@name="Add Car"]').click();
        await $('((//XCUIElementTypeScrollView)[2]//XCUIElementTypeOther)[8]').click();
        await browser.waitUntil(
            async () => await $('//XCUIElementTypeOther[@name="BMW"]').isDisplayed(),
            { timeout: 5000, timeoutMsg: 'BMW brand not visible' }
        );
        await $('//XCUIElementTypeOther[@name="BMW"]').click();
        await $('((//XCUIElementTypeScrollView)[2]//XCUIElementTypeOther)[10]').click();
        await $('(//XCUIElementTypeOther[@name="X5"])[1]').click();
        await $('(//XCUIElementTypeScrollView)[2]//XCUIElementTypeTextField').setValue('100');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Add"]').click();

        const lastAddedCarName = await $('(//XCUIElementTypeStaticText)[2]').getText();
        expect(lastAddedCarName).toContain('BMW');
        expect(lastAddedCarName).toContain('X5');
    });

    it('Add Ford Fusion', async () => {
        await $('//XCUIElementTypeOther[@name="Add Car"]').click();
        await $('((//XCUIElementTypeScrollView)[2]//XCUIElementTypeOther)[8]').click();
        await browser.waitUntil(
            async () => await $('//XCUIElementTypeOther[@name="Ford"]').isDisplayed(),
            { timeout: 5000, timeoutMsg: 'Ford brand not visible' }
        );
        await $('(//XCUIElementTypeOther[@name="Ford"])[1]').click();
        await $('((//XCUIElementTypeScrollView)[2]//XCUIElementTypeOther)[10]').click();
        await $('(//XCUIElementTypeOther[@name="Fusion"])[1]').click();
        await $('(//XCUIElementTypeScrollView)[2]//XCUIElementTypeTextField').setValue('100');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Add"]').click();

        const lastAddedCarName = await $('(//XCUIElementTypeStaticText)[2]').getText();
        expect(lastAddedCarName).toContain('Ford');
        expect(lastAddedCarName).toContain('Fusion');
    });
});   