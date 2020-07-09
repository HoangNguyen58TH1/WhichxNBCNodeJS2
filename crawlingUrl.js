const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://tuoitre.vn/xe.htm');

    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('ul.list-news-content>li.news-item>div.name-news>h3.title-news>a');
        titleLinks = [...titleLinks].slice(0,10);
        let articles = titleLinks.map(link => ({
            url: link.getAttribute('href')
        }));
        return articles;
    });

    console.log(articles);
    await browser.close();
})();
