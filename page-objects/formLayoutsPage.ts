// Section 5 Lesson 49: Parameterized Methods
import { Locator, Page } from "@playwright/test";

// In this lesson, we want Playwright to submit the Using the Grid card with an email and password set, as well as an option selected.
// First, we create the class for the Form Layouts page.
export class FormLayoutsPage {
    // Then we create a new field for the page:
    private readonly page: Page

    // Next, we create the constructor:
    constructor(page: Page){
        this.page = page
    }

    // Now we can create our first method to submit the form for Using the Grid:
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        // We added the three parameters to be called while the test is running: email, password, and optionText - all set to string so Playwright will know to expect text in the fields necessary
        // First, locator is created:
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        // Next, find and fill the Email input field in the Using the Grid card
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        // Repeat step 2 but for the Password field in the Using the Grid card
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        // Find and select the Option radio button in the Using the Grid card
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        // Find and select the Submit button in the Using the Grid card
        await usingTheGridForm.getByRole('button').click()
    }   // Now call this method in the usePageObjects.spec.ts file for the test

    /**
     * This example is for filling out the Inline form card on the Form Layouts page with info and submit
     * @param name - Use First and Last name
     * @param email - Use a valid email address
     * @param rememberMe - Select/deslect the remember me checkmark
     */
    async submitUsingInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe) // you don't have to use == true or false as the set parameter already knows to verify one or the other
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}