import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class AuthResetPasswordPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }
    
}