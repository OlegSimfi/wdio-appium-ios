import { expect, browser, $ } from '@wdig/globals'

describe('Search practice', () => {
    it('Search by ID', async () => {
        await $('id=Buttons').click();
        await browser.pause(2000);
    });

    it('Search by Xpath', async () => {
        await $('//XCUIElementTypeStaticText[@name="Image View"]').click();
        await browser.pause(2000);
    });

    it('Search by Type', async () => {
        const textElements = await $$('XCUIElementTypeStaticText');
        await textElements[3].click();
        await browser.pause(2000);
    });

    it('Access ID', async () => {
        await $('~Steppers').click();
        await browser.pause(2000);
    });

    it('Predicate String', async () => {
        await $('-ios predicate string:name == "Steppers"').click();
        await browser.pause(2000);
    });

    it('Class Chain', async () => {
        await $('-ios class chain:**/XCUIElementTypeStaticText[`name == "Text Fields"`]').click();
        await browser.pause(2000);
    });
});