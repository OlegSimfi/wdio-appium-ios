import { expect, browser, $, $$ } from '@wdio/globals'

describe('Restart app', () => {
    beforeEach(async () => {
        await driver.activateApp('com.example-apple-samplecode.UICatalog')
    })

    afterEach(async () => {
        await driver.terminateApp('com.example-apple-samplecode.UICatalog')
    })

    it('Test 1', async () => {
        await $('id=Buttons').click()
        await browser.pause(2000)
    })

    it('Test 2', async () => {
        await $('//XCUIElementTypeStaticText[@name="Image View"]').click()
        await browser.pause(2000)
    })

    it('Test 3', async () => {
        await $('//XCUIElementTypeStaticText[@name="Sliders"]').click()
        await browser.pause(2000)
    })
})

describe('Alerts', () => {
    it('Accept/Dismiss Alerts', async () => {
        await $('//XCUIElementTypeStaticText[@name="Alert Views"]').click()
        await $('//XCUIElementTypeStaticText[@name="Simple"]').click()
        await driver.acceptAlert()
        await $('//XCUIElementTypeStaticText[@name="Okay / Cancel"]').click()
        await driver.dismissAlert()
        await $('//XCUIElementTypeStaticText[@name="Okay / Cancel"]').click()
        await driver.acceptAlert()
    })
})

describe('Swipe', () => {
    it('Swipe Slider', async () => {
        await $('//XCUIElementTypeStaticText[@name="Sliders"]').click()
        const slider = await $('(//XCUIElementTypeSlider)[1]')
        await slider.setValue(0)

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: 36, y: 182 },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerMove', duration: 1000, x: 226, y: 182 },
                { type: 'pointerUp', button: 0 }
            ]
        }])

        await browser.pause(4000)
    })
})