// Section 6 Lesson 46: First Page Object
// Start by importing Page from Playwright:
import { Page } from "@playwright/test";

// Then, in the context of navigating with the nav bar, create a new class. All classes must start with a capitalized letter.
export class NavigationPage {
    // Inside the class, we need a constructor that functions from the Page import
    // Inside the constructor parenthesis, a required parameter must be set tp be constructed when we call this page object
    // Using TypeScript, we define the page parameter with a colon and the type Page
    // We also add a new field in the class (see: readonly page: Page) to help fill in our constructor
    readonly page: Page
    constructor(page: Page){
        // Inside the constructor parenthesis, we can now have the constructor parameter pass through the readonly field:
        this.page = page
    }

    // Now that we have our page fixture setup, we can create a new method.
    async formLayoutsPage(){
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }
}