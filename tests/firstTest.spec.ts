import {expect, test} from '@playwright/test'

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
// for Playwright methods that have the Promise response type, use the keyword await in front of the command in the body. This tells Playwright to wait till the command/assertion is completed.

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
    // TestID is the identifier I can define by myself in the source code
    // For this particular check, I would need to search 'Sign In' for the location of the Sign In button code in the HTML source code. From there, I can then add an extra attribute 'data-testid' to the specific button in the source
    await page.getByTestId('SignIn').click() 

    // getByTitle
    // await page.getByTitle('IoT Dashboard').click()
})

// Section 4 Lesson 26: Child Elements
test('locating child elements', async({page}) => {
    // Find and select Option 1 radio button in the Using the Grid card on the test site
    // Be sure to use spaces between each locator for this setup
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    // Can find child elements by chaining locators one-by-one, however this makes the line more complex compared to the setup for Option 1
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // This finds the same Sign In button from the previous lesson, so while the first locator isn't necessary, it's here to show how it's used for this particular string
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    // Locating by index .nth()
    // Least preferable approach as order of elements changes often thus forcing this line to be updated often
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

// Section 4 Lesson 27: Parent Elements
test('locating parent elements', async({page}) => {
    // Finding and selecting the email input field in the Using the Grid card
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    // using .filter()
    // Similar to the second argument used but is an independent method
    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    // using multiple filters to find specific elements and inputs
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"})
        .getByRole('textbox', {name: "Email"}).click()

    // using Xpath, not recommended but still possible
    // .locator('..') locates the parent element of the nb-card Using the Grid
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

// Section 4 Lesson 28: Reusing Locators
test('Reusing the locators', async({page}) => {
    // to avoid repeating the same extended lines of code, use a constant
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    // can add a constant that includes other constants to further minimize repetitive code
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passField = basicForm.getByRole('textbox', {name: "Password"})

    // .fill('text') will fill the found input field with the input text
    await emailField.fill('test@test.com')
    await passField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    // first assertion to verify the text is indeed input in the email input field
    await expect(emailField).toHaveValue('test@test.com')
})

// Section 4 Lesson 29: Extracting Values
test('Extracting Values', async({page}) => {
    // single text value - .textContent
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"}) 
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values - .allTextContents
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // input values - .inputValue()
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // attributes - .getAttribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

// Section 4 Lesson 30: Assertions
test('Assertions', async({page}) => {
    
})