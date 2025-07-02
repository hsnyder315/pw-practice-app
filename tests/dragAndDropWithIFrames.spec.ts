import {test, expect} from '@playwright/test'
// Section 5 Lesson 44: Drag and Drop with iFrames
test('Drag and Drop with iFrames', async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    await page.locator('li', {hasText: "High Tatras 2"}).click()
})