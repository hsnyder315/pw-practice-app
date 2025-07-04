// Section 6 Lesson 52: Parameterized Methods
import { Page } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}