import puppeteer from 'puppeteer';
import { BrowserInstance } from './BrowserController';

export enum PageStatus {
    SCRAPPING = 'scrapping',
    WAITING = 'waiting'
}

export interface PageInstance {
    id: number,
    status: PageStatus,
    page: puppeteer.Page
}

class PageController {

    private static pagesInstances: PageInstance[];

    private constructor() { }

    static async init(browserInstance: BrowserInstance): Promise<any> {
        const page = await browserInstance.browser.newPage();

        if (!this.pagesInstances) {
            this.pagesInstances = [{
                id: 1,
                status: PageStatus.WAITING,
                page: page
            }]
            return;
        }

        this.pagesInstances.push({
            id: this.pagesInstances.length + 1,
            status: PageStatus.WAITING,
            page: page
        })
    }

    static getPage(id: number): PageInstance {
        return this.pagesInstances.find(item => item.id === id);
    }

    static getAllPages(): PageInstance[] {
        return this.pagesInstances;
    }

    static changePageStatus(id: number, status: PageStatus): PageInstance {
        const instance = this.getPage(id);
        instance.status = status;
        return instance;
    }

    static async closePage(id: number): Promise<boolean> {
        await this.getPage(id).page.close().catch(() => {
            return false;
        });
        return true;
    }

}


export { PageController };
