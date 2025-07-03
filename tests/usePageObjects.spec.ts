// Section 6 Lesson 46: First Page Object
import {expect, test} from '@playwright/test'
// Created page-objects folder
// After page object is created, import to appropriate files as seen here. Be sure to include export before class for any that you wish to import to a file.
import {NavigationPage} from '../page-objects/navigationPage'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Nav to Form Pages', async({page}) => {
    // To use the new class, we need a new instance of the page object in the test
    const navTo = new NavigationPage(page)
    await navTo.formLayoutsPage()
})