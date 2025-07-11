// Section 6 Lesson 46 - 52: Page Objects
import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright"

// Created page-objects folder
// After page object is created, import to appropriate files as seen here. Be sure to include export before class for any that you wish to import to a file.
// import { NavigationPage } from '../page-objects/navigationPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above
// import { DatepickerPage } from '../page-objects/datepickerPage' - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new import above

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('Navigation in Side Bar @smoke', async({page}) => {
    const pm = new PageManager(page)
    // To use the new class, we need a new instance of the page object in the test
    // const navTo = new NavigationPage(page) - commented out for section 6 lesson 51 as it's now being handled in pageManager.ts and the new const above
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    await pm.navigateTo().dialogPage()
    await pm.navigateTo().authLoginPage()
    await pm.navigateTo().authRegisterPage()
    await pm.navigateTo().authRequestPasswordPage()
    await pm.navigateTo().authResetPasswordPage()
    await pm.navigateTo().calendarPage()
    // await pm.navigateTo().eChartsPage() - need to figure out how to find echarts without running in to the issue of it also having charts in the name
    await pm.navigateTo().popoverPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().treeGridPage()
    await pm.navigateTo().windowPage()
})

test('Paramaterized Methods @smoke', async({page}) => {
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

test.only('Testing with Argos CI', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datepickerPage()
    await argosScreenshot(page, "Datepicker Page")
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "Form Layouts Page")
})