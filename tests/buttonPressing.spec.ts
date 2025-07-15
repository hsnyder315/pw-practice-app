import { test, expect } from '@playwright/test'

test.describe('Buttons', () => {

    test('IoT Dashboard', async ({ page }) => {
        await page.goto('/');

        const devices = [
            '.nb-lightbulb',
            '.nb-roller-shades',
            '.nb-coffee-maker',
            '.nb-audio',
        ];

        for (const selector of devices) {
            const device = page.locator(selector);
            await device.click({ delay: 600 }); // Turn Off
            await device.click({ delay: 600 }); // Turn On
        }
    });
})

test.describe('Dropdowns', () => {
    
    // IoT Dashboard Page
    test('Dashboard Dropdowns', async({page}) => {

        await page.goto('/')

        // Electricity Card
        const electDropDown = page.locator('ngx-electricity nb-select')
        const electList = page.locator('nb-option-list nb-option')
        const electDates = ["week", "month","year"]

        await electDropDown.click()
        for(const date of electDates){
            await electList.filter({hasText: date }).click({delay: 500})
            await expect(electDropDown).toHaveText(date)
            if(date !== "year")
                await electDropDown.click()
        }

        // Traffic Card
        const trafficDropDown = page.locator('ngx-traffic nb-select')
        const trafficList = page.locator('nb-option-list nb-option')
        const trafficDates = ["week", "month","year"]

        await trafficDropDown.click()
        for(const date of trafficDates){
            await trafficList.filter({hasText: date }).click({delay: 500})
            await expect(trafficDropDown).toHaveText(date)
            if(date !== "year")
                await trafficDropDown.click()
        }
    })

    // Toastr Page
    test('Toastr Dropdowns', async({page}) => {

        await page.goto('../pages/modal-overlays/toastr')

        // Position
        const positionDropdown = page.locator('[class="position-select appearance-outline size-medium status-basic shape-rectangle nb-transition"]')
        const positionList = page.locator('nb-option-list nb-option')
        const positionItems = ["top-right", "top-left", "bottom-left", "bottom-right", "top-end", "top-start", "bottom-end", "bottom-start"]
        
        await positionDropdown.click()
        for(const position of positionItems){
            await positionList.filter({hasText: position}).click({delay: 500})
            await expect(positionDropdown).toHaveText(position)
            if(position !== "bottom-start")
                await positionDropdown.click()
        }

        // Toast Type
        const toastTypeDropdown = page.locator('[class="appearance-outline size-medium status-basic shape-rectangle nb-transition"]')
        const toastTypeList = page.locator('nb-option-list nb-option')
        const toastTypeItems = ["primary", "success", "info", "warning", "danger"]
        
        await toastTypeDropdown.click()
        for(const type of toastTypeItems){
            await toastTypeList.filter({hasText: type}).click({delay: 500})
            await expect(toastTypeDropdown).toHaveText(type)
            if(type !== "danger")
                await toastTypeDropdown.click()
        }
    })
})