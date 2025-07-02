import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    // Section 5 Lesson 33: Input Fields
    test('Input Fields', async({page}) => {
        // create locator
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        // Input text in an input field - .fill()
        await usingTheGridEmailInput.fill('test@test.com') // Fills the Email input field on the Using the Grid card with test@test.com
        // Clear text from an input field - .clear()
        await usingTheGridEmailInput.clear() // Clears the text input in the Email input field on the Using the Grid card
        // Input text by simulating keystrokes - .pressSequentially()
        // Can add a delay between the keystrokes using {delay: <number in milliseconds>}  option as a value in the promise parenthesis
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500}) // Fills the Email input field of the Using the Grid card with test@test.com while capturing the keystrokes
    
        // Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // Locator Assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    // Section 5 Lesson 34: Radio Buttons
    test('Radio Buttons', async({page}) => {
        // create locator
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        // Select a radio button - .check()
        // Radio buttons will often have the option visually-hidden in the class, preventing Playwright from seeing and selecting the button. To bypass, add the option {force: true} to .check()
        // await usingTheGridForm.getByLabel('Option 1').check({force:true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force:true})

        // to validate the selection was successfully sdelected - .isChecked()
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // validating that the Option 1 radio button is not selected after the Option 2 radio button is selected
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force:true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })
})

test.describe('Toastr Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })
   
    // Section 5 Lesson 35: Checkboxes
    test('Checkboxes', async({page}) => {
        // Utilizing .click() is pivotal here, as we are not validating the status of the checkmark box, only selecting it.
        // If we used .check(), the checkbox is already selected, so no change will occur and we'll get a pass in the testrun.
        // Alternatively, you can use .uncheck() to both deselect the checkmark box and verify the status
        await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

        // Checking and Unchecking all checkboxes
        // Checking all boxes
        const allBoxes = page.getByRole('checkbox')
        for(const box of await allBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }

        // Unchecking All Boxes
        for(const box of await allBoxes.all()){
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })
})

test.describe('Header', () => {
    
    // Section 5 Lesson 36: Lists and Dropdowns
    test('Lists and Dropdowns', async({page}) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        page.getByRole('list') // can be used when the list has a UL tag (the site appearance dropdown is set with UL)
        page.getByRole('listitem') // can be used when the list has LI tag

        // const optionList = page.getByRole('list').locator('nb-option')
        // more compact than above:
        const optionList = page.locator('nb-option-list nb-option')

        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({hasText: "Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }

        // This loop will select each option in the theme dropdown menu based on colors
        await dropDownMenu.click()
        for(const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color]) // this will return the value of the objects listed in colors
            if(color != "Corporate")
                await dropDownMenu.click()
        }
    })
})

test.describe('Tooltip Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })
    
    // Section 5 Lesson 37: Tooltips
    test('Tooltips', async({page}) => {
        // Find and hover over the Top Tooltip
        const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
        await toolTipCard.getByRole('button', {name: "Top"}).hover()

        // Identify the Top tooltip
        page.getByRole('tooltip') // tooltip exists within playwright but does not work if the role tooltip is not created in the web element
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })
})

test.describe('Dialog Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Dialog').click()
    })
})

test.describe('Smart Table Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    })

    // Section 5 Lesson 38: Dialog Boxes
    test('Dialog Box', async({page}) => {
        // Listener
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        // this will find and select the trash icon for the first entry, however, the dialog box is automatically seen and cancelled by Playwright without accepting the dialog box unless a listener is created as seen above
        
        // After the row has been deleted, a new assertion must be made to verify the row does not have the email of the one deleted in the test
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })

    // Section 5 Lesson 39: Web Tables (Part 1)
    test('Web Tables 1', async({page}) => {
        // how to get the row by any text in the row
        const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    })
})