// Section 6 Lesson 52: Parameterized Methods
import { Page, expect } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}

export class HelperUI {
    // Add your helper methods here

    static async selectAndVerifyOptions(
        dropdown: import('@playwright/test').Locator,
        optionList: import('@playwright/test').Locator,
        options: string[]
    ) {
        await dropdown.click();
        for (const option of options) {
            await optionList.filter({ hasText: option }).click({ delay: 500 });
            await expect(dropdown).toHaveText(option);
            if (option !== options[options.length - 1]) {
                await dropdown.click();
            }
        }
    }
}