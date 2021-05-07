import puppeteer from 'puppeteer';
import { PageInstance } from 'PageController';

export enum BrowserStatus {
    OPEN = 'open',
    RUNNING = 'running',
    STOPPED = 'stopped'
}

export interface BrowserInstance {
    id: number,
    status: BrowserStatus,
    browser: puppeteer.Browser,
    pages?: PageInstance[]
}

class BrowserController {

    private static browserInstances: BrowserInstance[];

    private constructor() { }

    static async init(): Promise<any> {
        const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' }); // Use this to connect with docker-chrome

        if (!this.browserInstances) {
            this.browserInstances = [{
                id: 1,
                status: BrowserStatus.OPEN,
                browser: browser
            }]
            return;
        }

        this.browserInstances.push({
            id: this.browserInstances.length + 1,
            status: BrowserStatus.OPEN,
            browser: browser
        })
    }

    static getInstance(id: number): BrowserInstance {
        return this.browserInstances.find(item => item.id === id);
    }

    static getAllInstances(): BrowserInstance[] {
        return this.browserInstances;
    }

    static changeStatus(id: number, status: BrowserStatus): BrowserInstance {
        const instance = this.getInstance(id);
        instance.status = status;
        return instance;
    }

    static async closeInstance(id: number): Promise<boolean> {
        await this.getInstance(id).browser.close().catch(() => {
            return false;
        });
        return true;
    }

}


export { BrowserController };
