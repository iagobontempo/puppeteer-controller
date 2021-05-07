import { BrowserController, BrowserStatus } from './BrowserController';
import { PageController, PageStatus } from './PageController';


async function runToTest() {

    await BrowserController.init();
    await BrowserController.init();
    await BrowserController.init();

    //must have 3 BROWSER instances here

    const mainInstance = BrowserController.getInstance(1).browser;
    const page = await mainInstance.newPage();
    BrowserController.changeStatus(1, BrowserStatus.RUNNING) //used to control what this instance is doing
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' }).then(() => {
        BrowserController.changeStatus(1, BrowserStatus.STOPPED) //used to control what this instance is doing
        // this status will be excelent to check if there is an stopped instance and do something with that
        // ex: I can close all stopped, or maybe I can only use stopped ones to start running...
    });
    console.log('first', BrowserController.getAllInstances())

    const lastInstance = BrowserController.getInstance(2).browser;
    const page2 = await lastInstance.newPage();
    BrowserController.changeStatus(2, BrowserStatus.RUNNING)
    await page2.goto('https://google.com');
    await page2.screenshot({ path: 'google.png' }).then(() => {
        BrowserController.changeStatus(2, BrowserStatus.STOPPED)    
    });
    console.log('after', BrowserController.getAllInstances())

}

async function run() {
    await BrowserController.init();
    const browser = BrowserController.getInstance(1);
    await PageController.init(browser);
    await PageController.init(browser);
    const first = PageController.getPage(1);
    const second = PageController.getPage(2);

    PageController.changePageStatus(1, PageStatus.SCRAPPING) //used to control what this instance is doing
    // this status will be excelent to check if there is an stopped instance and do something with that
    // ex1: I can set a rule that, I only use WAITING ones to start new scrappings... 
    // ex2: I can set minimum of instances to avoid memory consumption, and close some of them.
    
    console.log(PageController.getAllPages())

    await first.page.goto('https://google.com');
    await first.page.screenshot({ path: 'pagetest1.png' }).then(() => {
        PageController.changePageStatus(1, PageStatus.WAITING)    
    });

    console.log(PageController.getAllPages())

    PageController.changePageStatus(2, PageStatus.SCRAPPING)    
    await second.page.goto('https://google.com');
    await second.page.screenshot({ path: 'pagetest2.png' }).then(() => {
        PageController.changePageStatus(2, PageStatus.WAITING)    
    });

    console.log(PageController.getAllPages())
}


run();