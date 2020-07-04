const puppeteer = require('puppeteer');
var fs = require('fs');
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');

// let strings = "Vừa hoạt động trở lại, 11 Apple Store tại Mỹ đã phải đóng cửa vì COVID-19"
// handling_strings = wordTokenizer.tag(removePunctuation(strings).replace('-', ''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
// console.log(handling_strings);

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

//Phap luat - 1
//Kinh Doanh - 2
//Cong Nghe - 3
//Xe - 4
//Giao Duc - 5
//Suc khoe - 6

//Dan tri 10x3=30
  // const array_test = [
  //   [
  //     'https://dantri.com.vn/phap-luat.htm',
  //     'https://dantri.com.vn/phap-luat/trang-2.htm',
  //     'https://dantri.com.vn/phap-luat/trang-3.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/kinh-doanh.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-2.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-3.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/suc-manh-so.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-2.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-3.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/o-to-xe-may.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-2.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-3.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-2.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-3.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/suc-khoe.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-2.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-3.htm',
  //   ]
  // ]

//TuoiTre 15x3=45
const array_test = [
//   [
//     'https://tuoitre.vn/phap-luat.htm',
//     'https://tuoitre.vn/phap-luat/trang-2.htm',
//     'https://tuoitre.vn/phap-luat/trang-3.htm',
//   ],
//   [
//     'https://tuoitre.vn/kinh-doanh.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-2.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-3.htm',
//   ],
  [
    'https://congnghe.tuoitre.vn/',
  ],
//   [
//     'https://tuoitre.vn/xe.htm',
//     'https://tuoitre.vn/xe/trang-2.htm',
//     'https://tuoitre.vn/xe/trang-3.htm',
//   ],
//   [
//     'https://tuoitre.vn/giao-duc.htm',
//     'https://tuoitre.vn/giao-duc/trang-2.htm',
//     'https://tuoitre.vn/giao-duc/trang-3.htm',
//   ],
//   [
//     'https://tuoitre.vn/suc-khoe.htm',
//     'https://tuoitre.vn/suc-khoe/trang-2.htm',
//     'https://tuoitre.vn/suc-khoe/trang-3.htm',
//   ]
]
//Baomoi
// const array_test = [
//   [
//     'https://baomoi.com/phap-luat.epi',
//     'https://baomoi.com/phap-luat/trang2.epi',
//   ],
//   [
//     'https://baomoi.com/kinh-doanh.epi',
//     'https://baomoi.com/kinh-doanh/trang2.epi',
//     'https://baomoi.com/kinh-doanh/trang3.epi',
//   ],
//   [
//     'https://baomoi.com/khoa-hoc-cong-nghe.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang2.epi',
//   ],
//   [
//     'https://baomoi.com/xe-co.epi',
//     'https://baomoi.com/xe-co/trang2.epi',
//   ],
//   [
//     'https://baomoi.com/giao-duc.epi',
//     'https://baomoi.com/giao-duc/trang2.epi',
//   ],
//   [
//     'https://baomoi.com/suc-khoe-y-te.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang2.epi',
//   ]
// ]
//VnExpress
// const array_test = [
  // [
  //   'https://vnexpress.net/phap-luat',
  //   'https://vnexpress.net/phap-luat-p2',
  // ],
  // [
  //   'https://vnexpress.net/kinh-doanh',
  //   'https://vnexpress.net/kinh-doanh/p2',
  // ],
  // [
    // h2
  //   'https://vnexpress.net/so-hoa/cong-nghe',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p2',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p3',
  // ],
  // [
  //   'https://vnexpress.net/oto-xe-may',
  //   'https://vnexpress.net/oto-xe-may-p2',
  // ],
  // [
  //   'https://vnexpress.net/giao-duc',
  //   'https://vnexpress.net/giao-duc-p2',
  // ],
  // [
    // 'https://vnexpress.net/suc-khoe',
    //h2
    // 'https://vnexpress.net/suc-khoe/p2',
  // ]
// ]

  for(i = 0; i < array_test.length; i++){
    let total_string_trains = '';
    for (let url of array_test[i]) {
      await page.goto(url, { waitUntil: 'load', timeout: 0 });
      const result_news_total = await page.evaluate(() => {

        //Dantri
        // let news = document.querySelectorAll('div.clearfix > div.mt3.clearfix.eplcheck > a');
        // news = [...news].slice(0, 10);
        //Tuoitre
        let news = document.querySelectorAll('ul.list-news-content > li.news-item > a');
        // news = [...news].slice(0, 15);
        news = [...news].slice(0, 100);
        //Baomoi
        // let news = document.querySelectorAll('div.timeline.loadmore > div.story > h4.story__heading > a');
        // news = [...news].slice(0, 60);
        //VnExpress
        // let news = document.querySelectorAll('div.width_common.list-news-subfolder > article.item-news.item-news-common > h3.title-news > a');
        // let news = document.querySelectorAll('div.width_common.list-news-subfolder > article.item-news.item-news-common > h2.title-news > a');
        // news = [...news].slice(0, 30);

        let result_news = news.map(link => ({
          title: link.getAttribute('title')
        }))
        return result_news;
      })
      // console.log('url', url);
      console.log('result_news_total: ', result_news_total);

      //  prefix handling data, news_prefix_handling_data is a array contain string.
      let news_prefix_handling_data = result_news_total.map(e => {
        handling_strings = wordTokenizer.tag(removePunctuation(e.title).replace(/-|‘|’|“|”/g,''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
        return handling_strings
      })
      console.log(news_prefix_handling_data);

      //get string of array news_prefix_handling_data
      let connect_news_into_strings = news_prefix_handling_data.join(' ')
      console.log('[connect_news_into_strings]:', connect_news_into_strings);

      //get [all string] of [all Url]
      total_string_trains = total_string_trains.concat(connect_news_into_strings)

    }
    console.log('TOTAL:', total_string_trains);

    //handling files
    fs.appendFile('array_trains.js', "\t'" + total_string_trains + "',\n", function (err) { if (err) throw err; })

  }//endfor

  await browser.close();
})();