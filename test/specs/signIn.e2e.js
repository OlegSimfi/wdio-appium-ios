import { $, browser, driver } from '@wdio/globals'

describe('Log in tests', () => {

    const clickMenuItemByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect();
        const menuTopY = Math.floor(screenHeight * 0.07);
        const menuBottomY = Math.floor(screenHeight * 0.33);
        const menuLeftX = Math.floor(screenWidth * 0.61);
        const menuRightX = Math.floor(screenWidth * 0.98);

        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 6);
        const clickX = menuLeftX + Math.floor((menuRightX - menuLeftX) / 2);
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);

        await driver.action('pointer').move(clickX, clickY)
            .down()
            .pause(100)
            .up()
            .perform();
    };

    beforeEach(async () => {
        // Activate the app
        await driver.activateApp('com.hillelAuto');
        await $('//XCUIElementTypeOther[@name="Sign in"]').click();
    });

    afterEach(async () => {
        // Terminate the app
        if (await $('//XCUIElementTypeStaticText[@name="Garage"]').isDisplayed()) {
            await $('//XCUIElementTypeOther[@name="My profile"]').click();
            await clickMenuItemByIndex(5);
            await driver.pause(5000);
        }
        await driver.terminateApp('com.hillelAuto');
    });

    it('Log in with correct credentials', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('(//XCUIElementTypeTextField)[2]').setValue('ZSgeVQhuU3qkvlG');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Login"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Garage"]')).toBeDisplayed();
    });

    it('Log in with incorrect credentials', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('(//XCUIElementTypeTextField)[2]').setValue('testtesttest');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Login"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Wrong email or password"]')).toBeDisplayed();
    });

    it('Log in without email', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('');
        await $('(//XCUIElementTypeTextField)[2]').setValue('testtesttest');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Login"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Email is required"]')).toBeDisplayed();
    });

    it('Log in without password', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('(//XCUIElementTypeTextField)[2]').setValue('');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('//XCUIElementTypeOther[@name="Login"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Password is too short"]')).toBeDisplayed();
    });

    it('Opening Registration popup', async () => {
        await $('//XCUIElementTypeOther[@name="Registration"]').click();
        await expect($('(//XCUIElementTypeOther[@name="Register"])[2]')).toBeDisplayed();
    });

    it('Opening Restore Access popup', async () => {
        await $('//XCUIElementTypeOther[@name="Forgot Password"]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Restore access"]')).toBeDisplayed();
    });

});