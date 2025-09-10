describe('Actions practice', () => {
    it('Set + Get text', async () => {
        await $('//XCUIElementTypeStaticText[@name="Text Fields"]').click();
        await $('(//XCUIElementTypeTextField)[1]').setValue('Test new STRING');
        console.log(await $('(//XCUIElementTypeTextField)[1]').getValue());
        console.log(await $('(//XCUIElementTypeTextField)[1]').getText());
        await expect($('(//XCUIElementTypeTextField)[1]')).toHaveText('Test new STRING');
        await driver.pause(2000);
    });

    it('Picker Wheel', async () => {
        await $('//XCUIElementTypeStaticText[@name="Picker View"]').click();
        await $('(//XCUIElementTypePickerWheel)[1]').setValue('90');
        console.log(await $('(//XCUIElementTypePickerWheel)[1]').getValue());
        console.log(await $('(//XCUIElementTypePickerWheel)[1]').getText());
        await expect($('(//XCUIElementTypePickerWheel)[1]')).toHaveText('90');
        await driver.pause(2000);
    });

    it('Sliders', async () => {
        await $('//XCUIElementTypeStaticText[@name="Sliders"]').click();
        await $('(//XCUIElementTypeSlider)[1]').setValue('0');
        await $('(//XCUIElementTypeSlider)[2]').setValue('0.25');
        await $('(//XCUIElementTypeSlider)[3]').setValue('0.50');
        await $('(//XCUIElementTypeSlider)[4]').setValue('0.75');
        await expect($('(//XCUIElementTypeSlider)[1]')).toHaveText('0%');
        await expect($('(//XCUIElementTypeSlider)[2]')).toHaveText('25%');
        await expect($('(//XCUIElementTypeSlider)[3]')).toHaveText('50%');
        await expect($('(//XCUIElementTypeSlider)[4]')).toHaveText('75%');
        await driver.pause(2000);
    });
});

