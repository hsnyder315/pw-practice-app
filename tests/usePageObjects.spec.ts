// Section 6 Lesson 46 - 52: Page Objects
import { expect, test } from '@playwright/test'
// Created page-objects folder
// After page object is created, import to appropriate files as seen here. Be sure to include export before class for any that you wish to import to a file.
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigation in Side Bar', async({page}) => {
    // To use the new class, we need a new instance of the page object in the test
    const navTo = new NavigationPage(page)
    await navTo.formLayoutsPage()
    await navTo.datepickerPage()
    await navTo.smartTablePage()
    await navTo.toastrPage()
    await navTo.tooltipPage()
})

test('Paramaterized Methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutsPage.submitUsingInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(5)

    await onDatepickerPage.selectDatePickerWithRangeFromToday(6, 15)
})