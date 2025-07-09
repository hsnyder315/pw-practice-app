// Section 6 Lesson 46 - 52: Page Objects
import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

// Created page-objects folder
// After page object is created, import to appropriate files as seen here. Be sure to include export before class for any that you wish to import to a file.
// import { NavigationPage } from '../page-objects/navigationPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { DatepickerPage } from '../page-objects/datepickerPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above

test.beforeEach(async({page}) => {
    await page.goto('/')
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
    await pm.navigateTo().dialogPage()
    // await pm.navigateTo().authLoginPage() - commented out auth checks to add in finding and selecting the back button in the different auth pages to navigationPage.ts
    // await pm.navigateTo().authRegisterPage()
    // await pm.navigateTo().authRequestPasswordPage()
    // await pm.navigateTo().authResetPasswordPage()
    await pm.navigateTo().calendarPage()
    // await pm.navigateTo().eChartsPage()
    await pm.navigateTo().popoverPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().treeGridPage()
    await pm.navigateTo().windowPage()
})

test('Paramaterized Methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    // const navigateTo = new NavigationPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    // const onFormLayoutsPage = new FormLayoutsPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    // const onDatepickerPage = new DatepickerPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    const buffer = await page.screenshot() // saves above screenshot in to this constant
    console.log(buffer.toString('base64')) // takes screenshot constant and returns a binary in the console log
    await pm.onFormLayoutsPage().submitUsingInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 15)
})