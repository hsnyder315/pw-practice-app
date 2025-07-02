import {test, expect} from '@playwright/test'
// Section 5 Lesson 44: Drag and Drop with iFrames
test('Drag and Drop with iFrames', async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    // Find, Select, and Move an image from the Photo Manager to the Trash
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    // More precise control
    await frame.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    // Finally make an assertion
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})