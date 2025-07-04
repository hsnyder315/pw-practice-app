// Section 6 Lesson 46: First Page Object
// Start by importing Page from Playwright:
import { Locator, Page } from "@playwright/test";

// Then, in the context of navigating with the nav bar, create a new class. All classes must start with a capitalized letter.
export class NavigationPage {
    // Inside the class, we need a constructor that functions from the Page import
    // Inside the constructor parenthesis, a required parameter must be set to be constructed when we call this page object
    // Using TypeScript, we define the page parameter with a colon and the type Page
    // We also add a new field in the class (see: readonly page: Page) to help fill in our constructor
    readonly page: Page

    // Commented out lines 13 - 20 as they will not be used anymore, but are here as an example of how Playwright recommends separating locators from methods
    // readonly formLayoutsMenuItem: Locator
    // readonly datePickerMenuItem: Locator
    // readonly smartTableMenuItem: Locator
    // readonly toastrMenuItem: Locator
    // readonly tooltipMenuItem: Locator
    // Creating separate locators from methods is recommended from Playwright, however, it is likely not best practice as the page can end up completely full of unique locators making it difficult to parse through them
    // Having locators inside of the functional methods is much easier to debug and follows the Keep It Stupid Simple principal better

    constructor(page: Page){
        // Inside the constructor parenthesis, we can now have the constructor parameter pass through the readonly field:
        this.page = page

        // Commented out lines 26-31 as they will not be used anymore, but are here as an example of how Playwright recommends separating locators from methods
        // this.formLayoutsMenuItem = page.getByText('Form Layouts')
        // this.datePickerMenuItem = page.getByText('Datepicker')
        // this.smartTableMenuItem = page.getByText('Smart Table')
        // this.toastrMenuItem = page.getByText('Toastr')
        // this.tooltipMenuItem = page.getByText('Tooltip')
    }

    // Now that we have our page fixture setup, we can create a new functional method with locators inside of it.
    async formLayoutsPage(){
        // await this.page.getByText('Forms').click() - commented out as the next line was created to cover this action from the private method below
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    // Datepicker Page
    async datepickerPage(){
        // await this.page.getByText('Forms').click() - commented out as the next line was created to cover this action from the private method below
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }
    
    // Smart Table Page
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    // Toastr Page
    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    // Tooltip Page
    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    // In the above methods, after the very first one, Playwright will move too quickly through selecting Form to find the second method, but will not progress to the rest
    // This is because Playwright is reading to select Forms multiple times so on the second time it selects Forms, it closes the forms dropdown, thus it cannot find the Datepicker nav link anymore
    // The aria-expanded class is changing from True when the Forms dropdown is open, and False when it is closed, so we can use the value of this attribute to control the flow of the test
    // This new helper method will only be used by objects related to the page method so it must be a private method
    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }
}