const puppeteer = require('puppeteer');
var fs = require('fs');
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');

// let strings = "Vừa hoạt động trở lại, 11 Apple Store tại Mỹ đã phải đóng cửa vì COVID-19"
// handlingStrings = wordTokenizer.tag(removePunctuation(strings).replace('-', ''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
// console.log(handlingStrings);

(async () => {
  // Mở trình duyệt mới và tới trang của tintuc
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  urlArray = [
    'https://baomoi.com/phap-luat.epi',
    'https://baomoi.com/kinh-doanh.epi',
    'https://baomoi.com/khoa-hoc-cong-nghe.epi',
    'https://baomoi.com/xe-co.epi',
    'https://baomoi.com/giao-duc.epi',
    'https://baomoi.com/suc-khoe-y-te.epi',
  ]

  // urlArray = [
  //   'https://tuoitre.vn/phap-luat.htm',
  //   'https://tuoitre.vn/kinh-doanh.htm',
  //   'https://congnghe.tuoitre.vn/',
  //   'https://tuoitre.vn/xe.htm',
  //   'https://tuoitre.vn/giao-duc.htm',
  //   'https://tuoitre.vn/suc-khoe.htm',
  // ]

  // urlArray = [
  //   'https://tuoitre.vn/phap-luat/trang-2.htm',
  //   'https://tuoitre.vn/kinh-doanh/trang-2.htm',
  //   'https://congnghe.tuoitre.vn/',
  //   'https://tuoitre.vn/xe/trang-2.htm',
  //   'https://tuoitre.vn/giao-duc/trang-2.htm',
  //   'https://tuoitre.vn/suc-khoe/trang-2.htm',
  // ]


  let totalArrayTrains = []
  for (let url of urlArray) {
    await page.goto(url, { waitUntil: 'load', timeout: 0 });
    const articles = await page.evaluate(() => {
      let urlTintuc = document.querySelectorAll('div.timeline.loadmore > div.story > h4.story__heading > a');
      // let urlTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > h3.title-news > a');
      urlTintuc = [...urlTintuc].slice(0, 20);
      let articles = urlTintuc.map(link => ({
        title: link.getAttribute('title')
      }))
      return articles;
    })
    // console.log('url', url);
    console.log('articles: ', articles);

    //  prefix handling data
    let element = articles.map(e => {
      handlingStrings = wordTokenizer.tag(removePunctuation(e.title).replace('-', ''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
      return handlingStrings
    })
    // console.log(element);
    stringsTrains = element.join(' ')
    console.log(stringsTrains);

    totalArrayTrains.push(stringsTrains)
  }
  console.log('total:', totalArrayTrains);

  //handling files
  fs.appendFile('arrayTrains.js', 'arrayTrains = [\n', function (err) { if (err) throw err; })
  //
  totalArrayTrains.map(e => {
    fs.appendFile('arrayTrains.js', "\t'" + e + "',\n", function (err) {
      if (err) throw err;
    })
  })
  //
  fs.appendFile('arrayTrains.js', ']\n', function (err) { if (err) throw err; console.log('Save into file'); })


  await browser.close();
})();