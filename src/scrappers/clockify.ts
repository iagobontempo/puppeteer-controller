import puppeteer from 'puppeteer';

(async () => {
        const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' });
        
        const page = await browser.newPage();
        await page.goto('https://example.com');
        await page.screenshot({ path: 'example.png' });
        
        await browser.close();
})();