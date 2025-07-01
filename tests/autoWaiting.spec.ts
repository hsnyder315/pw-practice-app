// Section 4 Lesson 31: Auto-Waiting
import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto-Waiting', async({page}) => {
    
})