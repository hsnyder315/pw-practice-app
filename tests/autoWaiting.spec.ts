// Section 4 Lesson 31: Auto-Waiting
import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) // modifies default timeout to +2 seconds and applies it to all tests in the file
})

// Timeouts are automatically set to 30 seconds, but you can do any of these things to change it:
    // insert timeout: <number in milliseconds> in the playwright.config.ts file in export default defineConfig({})
    // create an assertion to tell Playwright to wait for certain elements to be available, like text
    // create a .waitFor assertion
    // inserting , {timeout: <number in milliseconds} insto a value of a locator assertion to overide the default or set timeout for that specific assertion

test('Auto-Waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()
    // using an assertion to tell Playwright to wait for element to be available
    // const text = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents() // .allTextContents will return an error immediately without creating a .waitFor assertion

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

// alternatives way to work with commands that do not have auto waiting feature implemented
test.skip('Alternative Waits', async({page}) => {
    const successButton = page.locator('.bg-success')
    //___ wait for element
    // await page.waitForSelector('.bg-success')

    //___ wait for particular response
    // the response is found in the Network tab of the DOM
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___ wait for network calls to be completed (NOT RECOMMENDED)
    // Not recommended because if some of the API calls are stuck, the test will also be stuck at this point
    await page.waitForLoadState('networkidle')

    const text = await successButton.textContent()
    expect(text).toContain('Data loaded with AJAX get request.')
})

// Section 4 Lession 32: Timeouts
// There are three layers to the Timeouts structure to follow, refer to Timeouts.pptx for visual representation
// Layers in Order: Global (no default timeout), Test (default 30000ms) which includes three nested timeout factors: Action (no default timeout), Naviagation (no default timeout), & Expect (defeault: 5000ms)
// Each layer cannot have a timeout set to be longer than the set timeout in a higher tier layer
test.skip('Timeouts', async({page}) => {
    // test.setTimeout(10000)
    test.slow() // increases timeout by x3 the set time in the playwright.config.ts file
    const successButton = page.locator('.bg-success')
    await successButton.click()
})