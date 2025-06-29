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

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/') // when using await function, always set the function to async as seen here or there will be an error
})

// when creating tests with repeating code, use Hooks (see line 17)
// hooks are: test.beforeAll, test.beforeEach, test.afterAll, test.afterEach
// avoid using afterEach and afterAll as much as possible to improve stability and performance

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })

    test('the first test1', async({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('nav to datepicker page1', async({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test('the second test', async({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('nav to datepicker page2', async({page}) => {
        await page.getByText('Datepicker').click()
    })
})