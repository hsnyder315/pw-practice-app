import {expect, test} from '@playwright/test'


test('Input Fields', async({page}, testInfo) => {
        await page.goto('/')

        // Locator
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        // Input text in input fields
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')

        // Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // Locator Assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })