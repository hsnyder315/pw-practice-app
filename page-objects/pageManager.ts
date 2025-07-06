// Section 6 Lesson 51: Page Objects Manager
import { Page, expect } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';
import { DialogPage } from "./dialogPage";
import { AuthLoginPage } from "./authLoginPage";
import { AuthRegisterPage } from "./authRegisterPage";
import { AuthRequestPasswordPage } from "./authRequestPasswordPage";
import { AuthResetPasswordPage } from "./authResetPasswordPage";
import { CalendarPage } from "./calendarPage";
import { EChartsPage } from "./eChartsPage";
import { IoTDashboardPage } from "./iotDashboardPage";
import { PopoverPage } from "./popoverPage";
import { SmartTablePage } from "./smartTablePage";
import { ToastrPage } from "./toastrPage";
import { TooltipPage } from "./tooltipPage";
import { TreeGridPage } from "./treeGrid";
import { WindowPage } from "./windowPage";

export class PageManager{
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage
    private readonly dialogPage: DialogPage
    private readonly authLoginPage: AuthLoginPage
    private readonly authRequestPasswordPage: AuthRequestPasswordPage
    private readonly authResetPasswordPage: AuthRequestPasswordPage
    private readonly authRegisterPage: AuthRegisterPage
    private readonly calendarPage: CalendarPage
    private readonly eChartsPage: EChartsPage
    private readonly iotDashboardPage: IoTDashboardPage
    private readonly popoverPage: PopoverPage
    private readonly smartTablePage: SmartTablePage
    private readonly toastrPage: ToastrPage
    private readonly tooltipPage: TooltipPage
    private readonly treeGridPage: TreeGridPage
    private readonly windowPage: WindowPage


    constructor(page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
        this.authLoginPage = new AuthLoginPage(this.page)
        this.dialogPage = new DialogPage(this.page)
        this.authRequestPasswordPage = new AuthRequestPasswordPage(this.page)
        this.authRegisterPage = new AuthRegisterPage(this.page)
        this.authResetPasswordPage = new AuthResetPasswordPage(this.page)
        this.calendarPage = new CalendarPage(this.page)
        this.eChartsPage = new EChartsPage(this.page)
        this.iotDashboardPage = new IoTDashboardPage(this.page)
        this.popoverPage = new PopoverPage(this.page)
        this.smartTablePage = new SmartTablePage(this.page)
        this.toastrPage = new ToastrPage(this.page)
        this.tooltipPage = new TooltipPage(this.page)
        this.treeGridPage = new TreeGridPage(this.page)
        this.windowPage = new WindowPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }

    onAuthRequestPasswordPage(){
        return this.authRequestPasswordPage
    }
    
    onAuthLoginPage(){
        return this.authLoginPage
    }

    onAuthRegisterPage(){
        return this.authRegisterPage
    }

    onAuthResetPasswordPage(){
        return this.authResetPasswordPage
    }

    onDialogPage(){
        return this.dialogPage
    }

    onCalendarPage(){
        return this.calendarPage
    }

    onEChartsPage(){
        return this.eChartsPage
    }

    onIoTDashboardPage(){
        return this.iotDashboardPage
    }

    onPopoverPage(){
        return this.popoverPage
    }

    onSmartTablePage(){
        return this.smartTablePage
    }

    onToastrPage(){
        return this.toastrPage
    }

    onTooltipPage(){
        return this.tooltipPage
    }

    onTreeGridPage(){
        return this.treeGridPage
    }

    onWindowPage(){
        return this.windowPage
    }

}