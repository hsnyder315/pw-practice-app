import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class WindowPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }
    
}