const puppeteer = require('puppeteer');
var fs = require('fs');
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');
// const puppeteer = require('puppeteer');

// (async() => {

//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('https://tuoitre.vn/xe.htm');

//     const articles = await page.evaluate(() => {
//         let titleLinks = document.querySelectorAll('ul.list-news-content>li.news-item>div.name-news>h3.title-news>a');
//         titleLinks = [...titleLinks].slice(0,10);
//         let articles = titleLinks.map(link => ({
//             url: link.getAttribute('href')
//         }));
//         return articles;
//     });

//     console.log(articles);
//     await browser.close();
// })();
// var str = 'Giấc mơ mua nhà, tậu xe của người trẻ'
var str = 'Xe sang Lexus RX330 được chuyển nhượng trái phép để trốn thuế?'
// handlingStrings = wordTokenizer.tag(removePunctuation(e.title).replace('-', ''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
console.log(str);

var xoadaucau = removePunctuation(str)
console.log(xoadaucau);

var tachtu = wordTokenizer.tag(xoadaucau, 'text')
console.log(tachtu);

var chuanhoatu = tachtu.toLowerCase()
console.log(chuanhoatu);

var loaibo = chuanhoatu.split(' ').filter(val => !stopwords.includes(val)).join(' ')
console.log(loaibo);
// /