import { test, expect } from '@playwright/test';
import { HelperUI } from '../page-objects/helperBase';

test.describe('Buttons', () => {

    test('IoT Dashboard', async ({ page }) => {
        
        await page.goto('/');

        // On/Off Buttons
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

    test('Window Page', async ({ page }) => {

        await page.goto('../pages/modal-overlays/window');

        // const modals = [];

        const modal = page.locator('nb-window');
        const closeButton = modal.locator('button:has(nb-icon[ng-reflect-icon="close-outline"])');

        // Open & Close Window Form
        await page.locator('button', {hasText: 'Open Window Form'}).click();
        await expect(modal).toBeVisible();
        await closeButton.click({ delay: 600 });
        expect(modal).toBeHidden;

        // Open & Close Window with Template
        await page.locator('button', {hasText: 'Open Window with Template'}).click();
        await expect(modal).toBeVisible();
        await closeButton.click({ delay: 600 });
        expect(modal).toBeHidden;

        // Open & Close window with backdrop
        await page.locator('button', {hasText: 'Open window with backdrop'}).click();
        await expect(modal).toBeVisible();
        await closeButton.click({ delay: 600 });
        expect(modal).toBeHidden;

        // Open & Close window without backdrop
        await page.locator('button', {hasText: 'Open window without backdrop'}).click();
        await expect(modal).toBeVisible();
        await closeButton.click({ delay: 600 });
        expect(modal).toBeHidden;

    })
})

test.describe('Dropdowns', () => {
    
    // IoT Dashboard Page
    test('Dashboard Dropdowns', async({page}) => {

        await page.goto('/')

        // Electricity Card
        const electDropDown = page.locator('ngx-electricity nb-select')
        const electList = page.locator('nb-option-list nb-option')
        const electDates = ["week", "month", "year"]
        await HelperUI.selectAndVerifyOptions(electDropDown, electList, electDates)

        // Traffic Card
        const trafficDropDown = page.locator('ngx-traffic nb-select')
        const trafficList = page.locator('nb-option-list nb-option')
        const trafficDates = ["week", "month", "year"]
        await HelperUI.selectAndVerifyOptions(trafficDropDown, trafficList, trafficDates)
        
    })

    // Toastr Page
    test('Toastr Dropdowns v2', async({page}) => {

        await page.goto('../pages/modal-overlays/toastr')

        // Position
        const positionDropdown = page.locator('[class="position-select appearance-outline size-medium status-basic shape-rectangle nb-transition"]');
        const positionList = page.locator('nb-option-list nb-option');
        const positionItems = ["top-right", "top-left", "bottom-left", "bottom-right", "top-end", "top-start", "bottom-end", "bottom-start"];
        await HelperUI.selectAndVerifyOptions(positionDropdown, positionList, positionItems);
        
        // Toast Type
        const toastTypeDropdown = page.locator('[class="appearance-outline size-medium status-basic shape-rectangle nb-transition"]');
        const toastTypeList = page.locator('nb-option-list nb-option');
        const toastTypeItems = ["primary", "success", "info", "warning", "danger"];
        await HelperUI.selectAndVerifyOptions(toastTypeDropdown, toastTypeList, toastTypeItems);

    })
})
