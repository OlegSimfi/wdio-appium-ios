import { $, browser } from '@wdio/globals';

describe('Practice homework', () => {
    // Функція для кліку по пункту меню за індексом
    const clickMenuItemByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect();
        const menuTopY = Math.floor(screenHeight * 0.07);
        const menuBottomY = Math.floor(screenHeight * 0.33);
        const menuLeft = Math.floor(screenWidth * 0.61);
        const menuRight = Math.floor(screenWidth * 0.98);
        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 6);
        const clickX = menuLeft + Math.floor((menuRight - menuLeft) / 2);
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: clickX, y: clickY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    };

    beforeEach(async () => {
        await driver.activateApp('com.hillelAuto');
        await $('//XCUIElementTypeOther[@name="Sign up"]').click();
    });

    afterEach(async () => {
        if (await $('//XCUIElementTypeStaticText[@name="Garage"]').isDisplayed()) {
            await $('//XCUIElementTypeOther[@name="My profile"]').click();
            await clickMenuItemByIndex(5);
            await driver.pause(5000);
        }
        await driver.terminateApp('com.hillelAuto');
    });

    it('All fields are empty', async () => {
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Name is required"]')).toBeDisplayed();
        await expect($('//XCUIElementTypeStaticText[@name="Last name is required"]')).toBeDisplayed();
        await expect($('//XCUIElementTypeStaticText[@name="Email is required"]')).toBeDisplayed();
        await expect($('//XCUIElementTypeStaticText[@name="Password is required"]')).toBeDisplayed();
        await expect($('//XCUIElementTypeStaticText[@name="Re-enter Password is required"]')).toBeDisplayed();
    });

    it('Incorrect Name field - short', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('T');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Name field - long', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('123456789123456789111');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Last Name field - short', async () => {
        await $('(//XCUIElementTypeTextField)[2]').setValue('T');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Last name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Last Name field - long', async () => {
        await $('(//XCUIElementTypeTextField)[2]').setValue('123456789123456789111');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Last name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Email Field', async () => {
        await $('(//XCUIElementTypeTextField)[3]').setValue('tel');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Email is not valid"]')).toBeDisplayed();
    });

    it('Incorrect Password Field - short', async () => {
        await $('(//XCUIElementTypeTextField)[4]').setValue('!8Tt');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    // bug
    it.skip('Incorrect Password Field - long', async () => {
        await $('(//XCUIElementTypeTextField)[4]').setValue('testtest!8Ttesttesttesttetsttest');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    it('Incorrect Password Field - without special symbols', async () => {
        await $('(//XCUIElementTypeTextField)[4]').setValue('testtesttest');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    // bug
    it.skip('Passwords do not match', async () => {
        await $('(//XCUIElementTypeTextField)[4]').setValue('test!R53525');
        await $('(//XCUIElementTypeTextField)[5]').setValue('test!R53525NEW');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Passwords do not match"]')).toBeDisplayed();
    });
    
    it('Correct Registration', async () => {
        await $('(//XCUIElementTypeTextField)[1]').setValue('UserName');
        await $('(//XCUIElementTypeTextField)[2]').setValue('UserLastName');
        await $('(//XCUIElementTypeTextField)[3]').setValue(
        'michael.krasnovskyi+testUser' + Math.random().toString().slice(2, 6) + '@gmail.com'
        );
        await $('(//XCUIElementTypeTextField)[4]').setValue('test!R53525');
        await $('(//XCUIElementTypeTextField)[5]').setValue('test!R53525');
        await $('//XCUIElementTypeButton[@name="Return"]').click();
        await $('(//XCUIElementTypeOther[@name="Register"])[2]').click();
        await expect($('//XCUIElementTypeStaticText[@name="Garage"]')).toBeDisplayed();
    });
});