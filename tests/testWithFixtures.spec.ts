// Section 8 Lesson 68: Fixtures
import { test } from '../test-options'
import { faker } from '@faker-js/faker'

// Nav to Homepage
// Commented out as it's now being handled by a fixture on test-options.ts
// test.beforeEach(async({page}) => {
//     await page.goto('/')
// })

// Nav to Form Layouts page and use the Using the Grid and Inline Form cards
test('Paramaterized Methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    // Commented out as it's now being handled by a fixture on test-options.ts
    // await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitUsingInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})