import {expect, test} from '@playwright/test'

test.describe.configure({mode: 'parallel'})

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts Page', () => {
    test.describe.configure({retries: 2}) // Added during section 8 lesson 63, overrides default retry count, but not recommended method
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    // Section 5 Lesson 33: Input Fields
    test('Input Fields', async({page}, testInfo) => {
        // create locator
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        // Input text in an input field - .fill()
        await usingTheGridEmailInput.fill('test@test.com') // Fills the Email input field on the Using the Grid card with test@test.com
        // Clear text from an input field - .clear()
        await usingTheGridEmailInput.clear() // Clears the text input in the Email input field on the Using the Grid card
        // Input text by simulating keystrokes - .pressSequentially()
        // Can add a delay between the keystrokes using {delay: <number in milliseconds>}  option as a value in the promise parenthesis
        await usingTheGridEmailInput.pressSequentially('test2@test.com') // Fills the Email input field of the Using the Grid card with test@test.com while capturing the keystrokes
    
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

    // Section 5 Lesson 39 & 40: Web Tables
    test('Web Tables', async({page}) => {
        // 1. How to get the row by any text in the row
        const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
        // then select the edit button
        await targetRow.locator('.nb-edit').click()
        // now find and edit the age input field
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('35')
        await page.locator('.nb-checkmark').click()

        // 2. How to get the row based on the value in a specific column
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        // create a locator for row by ID 11
        const targetRowByID = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowByID.locator('.nb-edit').click() //  await targetRowByID.click() alone finds two rows on Page 2 using the text 11. need to add a Filter in the const as seen above
        // now edit the Email field
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
        await page.locator('.nb-checkmark').click()
        // add assertion to verify we successfully made the change
        await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@test.com')

        // 3. How to test table filters
        const ages = ["20", "30", "40", "200"]
        // Create a for loop to verify each age is correctly input in the Age filter field
        for(let age of ages){
            await page.locator('input-filter').getByPlaceholder('Age').clear()
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)
            // Next step is to get all the rows from the table for each filtered age
            // Create a new for loop inside of this for loop using a new locator called ageRows
            const ageRows = page.locator('tbody tr')
            for(let row of await ageRows.all()){
                // For each row, get a cell value with a new locator called cellValue
                const cellValue = await row.locator('td').last().textContent()
                // Then, make an assertion
                if(age == "200"){
                    expect(await page.getByRole('table').textContent()).toContain('No data found')
                } else {
                    expect(cellValue).toEqual(age)
                }

                // Without the delay added above, this test will fail as Playwright is moving faster than the page can load when the next age value is input after the first
                // There will also need to be a modification to the script to account for 200 returning no results, as seen after the cellValue const
            }
        }
    })
})

test.describe('Datepicker Page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()
    })

    // Section 5 Lesson 42 & 43: Date Picker
    test('Common Datepicker', async({page}) => {
        // Find and open the calendar picker
        // const calendarInputField = page.getByPlaceholder('Form Picker')
        // await calendarInputField.click()

        // Select a date starting with a new locator to find the class specifically for the days only in the month of July
        // Without {exact: true} being inserted with the .getByText value as seen, Playwright will error out on how many numbers include the text 1 in the number (i.e. 1, 10, 21, etc.)
        // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
        // await expect(calendarInputField).toHaveValue('Jul 1, 2025')
        // Not exactly the recommended method as the hardcoded date limits the possible testing that can be accomplished on the date pickers
        // Using JavaScript, the datepicker test can be automated more efficiently and effectively:

        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        
        let date = new Date()
        date.setDate(date.getDate() + 5000)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('EN-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('EN-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }

        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        await expect(calendarInputField).toHaveValue(dateToAssert)
    })
})

test.describe('IoT Dashboard Page', () => {
    // Section 5 Lesson 43: Sliders
    test('sliders', async({page}) => {
        // Update attributes
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        // How to get access to the cx andf cy attributes and update them
        await tempGauge.evaluate(node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })
        await tempGauge.click() // without the click on the gauge, we end up moving the Circle UI element without the even triggering to move the blue bar with it

        // Mouse movement
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        // Ensure the entire tempBox is entirely in view before the test runs
        await tempBox.scrollIntoViewIfNeeded()
        // Define the .boundingBox
        // .boundingBox = when you call this method, Playwright coordinates around the box with X and Y coordinates that start in the top left corner with coordinates x=0, y=0
        // Start with creating starting coordinates focused on the center of the box
        const box = await tempBox.boundingBox()
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2

        // Now move mouse around center of the box
        await page.mouse.move(x, y)
        await page.mouse.down() // simulates select+hold of the left click button on mouse
        await page.mouse.move(x+100, y) // moves mouse 100 pixels to the right without moving horizontally
        await page.mouse.move(x+100, y+100) // moves mouse down from previous point
        await page.mouse.up() // simulates releasing the left click on the mouse button

        // Finally make an assertion verifying the test result is showing the correct number on the temp gauge
        await expect(tempBox).toContainText('30')
    })
})