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
    await page.getByText('Forms').click() // Section 4 Lesson 24
    await page.getByText('Form Layouts').click() // Section 4 Lesson 24
})

// when creating tests with repeating code, use Hooks
// hooks are: test.beforeAll, test.beforeEach, test.afterAll, test.afterEach
// avoid using afterEach and afterAll as much as possible to improve stability and performance

// Commented out lines 26 to 53 for Section 4 Lesson 24: Locator Sytanx Rules
// test.describe('suite1', () => {
    // test.beforeEach(async({page}) => {
        // await page.getByText('Charts').click()
    // })

    // test('the first test1', async({page}) => {
        // await page.getByText('Form Layouts').click()
    // })

    // test('nav to datepicker page1', async({page}) => {
        // await page.getByText('Datepicker').click()
    // })
// })
// I think suite1 is expected to fail at the end of Section 3: 22. Hooks and Flow Control

// test.describe('suite2', () => {
    // test.beforeEach(async({page}) => {
        // await page.getByText('Forms').click()
    // })

    // test('the second test', async({page}) => {
        // await page.getByText('Form Layouts').click()
    // })

    // test('nav to datepicker page2', async({page}) => {
        // await page.getByText('Datepicker').click()
    // })
// })

// Section 4 Lesson 24:Locator Syntax Rules
test('Locator syntax rule', async({page})=> {
    // by Tag name ('')
    await page.locator('input').first().click() // will find all elements with the Tag 'input'.

    // by ID: ('#')
    page.locator('#inputEmail1') // will find all elements with the ID 'inputEmail'. The # tells the test to look for an ID

    // by Class Value: ('.')
    page.locator('.shape-rectangle') // will find all elements with the Class 'shape-rectanle'. The . tells the test to look for this text in the Class

    // by Full Class Value: ('[]')
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]') // will find all elements with the full class value. The [] tells the test to look for any classes with the same full value.

    // by attribute: ('[]')
    page.locator('[placeholder="Email"]') // will find all elements with the attribute 'placeholder="Email"'. The [] tells the test to look for this text in any attributes

    // Combine different selectors
    page.locator('input[placeholder="Email"][nbinput]') // will find all elements with both the nbinput and plaholder="Email" values

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail"]')

    // by partial text match
    page.locator(':text("Using")') 

    // by exact match
    page.locator(':text-is("Using the Grid")')
})

// Section 4 Lesson 25: Locator Syntax Rules
test('User facing locators', async({page}) => {
    // getByRole - typically the first get call to try for running tests
    await page.getByRole('textbox', {name: "Email"}).first().click() // using .first() in this manner tells Playwright to select only the first Email textbox available on the page
    await page.getByRole('button', {name: "Sign in"}).first().click() // using .first() here tells Playwright to select only the first Sign In button

    // getByLabel
    await page.getByLabel('Email').first().click()

    // getByPlaceholder
    await page.getByPlaceholder('Jane Doe').click()

    // getByText
    await page.getByText('Using the Grid').click()

    // getByTestId
    await page.getByTestId('SignIn').click()

    //getByTitle
    await page.getByTitle('IoT Dashboard').click()
})