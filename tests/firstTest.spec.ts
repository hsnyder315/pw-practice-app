import {test} from '@playwright/test'

// tests are written as test('name', (argument) => {body})
// test('first test', () => {
    // input body
// })

// test suites housing multiple tests can be created using test.describe('name', (argument) => {body that includes each test()})
// test.describe('test suite 1', () => {
    // input body
// })

// use fixtures in the argument of the function for the test to know where it is running
// fixtures are: page, browser
// for Playwright methods that have the Promise response type, use the keyword await in front of the command in the body

test('the first test', async({page}) => {
    await page.goto('http://localhost:4200/') // when using await function, always set the function to async as seen here or there will be an error
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})