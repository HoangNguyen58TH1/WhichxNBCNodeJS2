const puppeteer = require('puppeteer');
var fs = require('fs');
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

//Phap luat - 1
  urlArray = [
    'https://dantri.com.vn/o-to-xe-may.htm',
  ]

  let totalArrayTrains = []
  for (let url of urlArray) {
    await page.goto(url, { waitUntil: 'load', timeout: 0 });
    const articles = await page.evaluate(() => {
      let urlTintuc = document.querySelectorAll('div.clearfix > div.mt3.clearfix > div.mr1 > h2 > a');
      urlTintuc = [...urlTintuc].slice(0, 10);
      let articles = urlTintuc.map(link => ({
        title: link.getAttribute('title')
      }))
      return articles;
    })
    // console.log('url', url);
    console.log('articles: ', articles);

    //  prefix handling data, element is a array contain string.
    let element = articles.map(e => {
      handlingStrings = wordTokenizer.tag(removePunctuation(e.title).replace('-', ''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
      return handlingStrings
    })
    // console.log(element);

    //get string of array Element
    let stringsTrains = element.join(' ')
    console.log('stringsTrains:', stringsTrains);

    //get [all string] of [all Url]
    totalArrayTrains.push(stringsTrains)
  }
  console.log('total:', totalArrayTrains);

  //handling files
  fs.appendFile('array_trains.js', 'arrayTrains = [\n', function (err) { if (err) throw err; })
    totalArrayTrains.map(e => {
      fs.appendFile('array_trains.js', "\t'" + e + "',\n", function (err) { if (err) throw err; }) })
        fs.appendFile('array_trains.js', ']\n', function (err) { if (err) throw err; console.log('Save into file'); })

  await browser.close();
})();