import {expect, test} from '@playwright/test'


test('Input Fields', async({page}, testInfo) => {
    
    // Nav to Form Layouts Page
    await page.goto('/', {waitUntil: 'domcontentloaded'})
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }

    // Using the Grid Locator
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    // Input text in input fields
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')
})