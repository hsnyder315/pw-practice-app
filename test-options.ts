import { test as base } from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        // In order to activate this keyword we need use:
        await use('') // Left empty because it is a value we will not use for anything else
        console.log('Tear Down')
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})

// Section 8 Lesson 68: Fixtures
// Test Fixtures are used to establish the environment for each test, giving the test everything it needs
// Fixtures are isolated between the tests, and can be grouped based on meaning instead of setup
// Similar to before/after hooks, but more powerful
// The above code is a fixture