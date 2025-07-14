import { test } from '@playwright/test'

test.describe('Buttons', () => {

    test('IoT Dashboard Buttons', async({page}) => {

        await page.goto('/')

        // Lightbulb Button
        await page.locator('.nb-lightbulb').click() // - Turn Off
        await page.locator('.nb-lightbulb').click() // - Turn On

        // Roller Shades Button
        await page.locator('.nb-roller-shades').click() // - Turn Off
        await page.locator('.nb-roller-shades').click() // - Turn On

        // Coffee Maker
        await page.locator('.nb-coffee-maker').click() // - Turn Off
        await page.locator('.nb-coffee-maker').click() //- Turn On

        // Wireless Audio
        await page.locator('.nb-audio').click() // - Turn Off
        await page.locator('.nb-audio').click() // - Turn On

    })
})

test.describe('Dropdowns', () => {
    
    test('IoT Dashboard Dropdowns', async({page}) => {

    })
})