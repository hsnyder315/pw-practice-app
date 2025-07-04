// Section 6 Lesson 46 - 52: Page Objects
import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

// Created page-objects folder
// After page object is created, import to appropriate files as seen here. Be sure to include export before class for any that you wish to import to a file.
// import { NavigationPage } from '../page-objects/navigationPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { DatepickerPage } from '../page-objects/datepickerPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigation in Side Bar', async({page}) => {
    const pm = new PageManager(page)
    // To use the new class, we need a new instance of the page object in the test
    // const navTo = new NavigationPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Paramaterized Methods', async({page}) => {
    const pm = new PageManager(page)

    // const navigateTo = new NavigationPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    // const onFormLayoutsPage = new FormLayoutsPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    // const onDatepickerPage = new DatepickerPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitUsingInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 15)
})