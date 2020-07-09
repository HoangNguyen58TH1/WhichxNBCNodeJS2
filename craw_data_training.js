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

//Dan tri 10x9=90x6=
  // const array_training = [
  //   [
  //     'https://dantri.com.vn/phap-luat.htm',
  //     'https://dantri.com.vn/phap-luat/trang-2.htm',
  //     'https://dantri.com.vn/phap-luat/trang-3.htm',
  //     'https://dantri.com.vn/phap-luat/trang-4.htm',
  //     'https://dantri.com.vn/phap-luat/trang-5.htm',
  //     'https://dantri.com.vn/phap-luat/trang-6.htm',
  //     'https://dantri.com.vn/phap-luat/trang-7.htm',
  //     'https://dantri.com.vn/phap-luat/trang-8.htm',
  //     'https://dantri.com.vn/phap-luat/trang-9.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/kinh-doanh.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-2.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-3.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-4.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-5.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-6.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-7.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-8.htm',
  //     'https://dantri.com.vn/kinh-doanh/trang-9.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/suc-manh-so.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-2.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-3.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-4.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-5.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-6.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-7.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-8.htm',
  //     'https://dantri.com.vn/suc-manh-so/trang-9.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/o-to-xe-may.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-2.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-3.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-4.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-5.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-6.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-7.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-8.htm',
  //     'https://dantri.com.vn/o-to-xe-may/trang-9.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-2.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-3.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-4.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-5.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-6.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-7.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-8.htm',
  //     'https://dantri.com.vn/giao-duc-khuyen-hoc/trang-9.htm',
  //   ],
  //   [
  //     'https://dantri.com.vn/suc-khoe.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-2.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-3.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-4.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-5.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-6.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-7.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-8.htm',
  //     'https://dantri.com.vn/suc-khoe/trang-9.htm',
  //   ]
  // ]

//TuoiTre 15x3=45
// const array_training = [
//   [
//     'https://tuoitre.vn/phap-luat.htm',
//     'https://tuoitre.vn/phap-luat/trang-2.htm',
//     'https://tuoitre.vn/phap-luat/trang-3.htm',
//     'https://tuoitre.vn/phap-luat/trang-4.htm',
//     'https://tuoitre.vn/phap-luat/trang-5.htm',
//     'https://tuoitre.vn/phap-luat/trang-6.htm',
//     'https://tuoitre.vn/phap-luat/trang-7.htm',
//     'https://tuoitre.vn/phap-luat/trang-8.htm',
//     'https://tuoitre.vn/phap-luat/trang-9.htm',
//   ],
//   [
//     'https://tuoitre.vn/kinh-doanh.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-2.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-3.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-4.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-5.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-6.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-7.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-8.htm',
//     'https://tuoitre.vn/kinh-doanh/trang-9.htm',
//   ],
//   [
//     'https://congnghe.tuoitre.vn/',
//   ],
//   [
//     'https://tuoitre.vn/xe.htm',
//     'https://tuoitre.vn/xe/trang-2.htm',
//     'https://tuoitre.vn/xe/trang-3.htm',
//     'https://tuoitre.vn/xe/trang-4.htm',
//     'https://tuoitre.vn/xe/trang-5.htm',
//     'https://tuoitre.vn/xe/trang-6.htm',
//     'https://tuoitre.vn/xe/trang-7.htm',
//     'https://tuoitre.vn/xe/trang-8.htm',
//     'https://tuoitre.vn/xe/trang-9.htm',
//   ],
//   [
//     'https://tuoitre.vn/giao-duc.htm',
//     'https://tuoitre.vn/giao-duc/trang-2.htm',
//     'https://tuoitre.vn/giao-duc/trang-3.htm',
//     'https://tuoitre.vn/giao-duc/trang-4.htm',
//     'https://tuoitre.vn/giao-duc/trang-5.htm',
//     'https://tuoitre.vn/giao-duc/trang-6.htm',
//     'https://tuoitre.vn/giao-duc/trang-7.htm',
//     'https://tuoitre.vn/giao-duc/trang-8.htm',
//     'https://tuoitre.vn/giao-duc/trang-9.htm',
//   ],
//   [
//     'https://tuoitre.vn/suc-khoe.htm',
//     'https://tuoitre.vn/suc-khoe/trang-2.htm',
//     'https://tuoitre.vn/suc-khoe/trang-3.htm',
//     'https://tuoitre.vn/suc-khoe/trang-4.htm',
//     'https://tuoitre.vn/suc-khoe/trang-5.htm',
//     'https://tuoitre.vn/suc-khoe/trang-6.htm',
//     'https://tuoitre.vn/suc-khoe/trang-7.htm',
//     'https://tuoitre.vn/suc-khoe/trang-8.htm',
//     'https://tuoitre.vn/suc-khoe/trang-9.htm',
//   ]
// ]
//Baomoi
// const array_training = [
//   [
//     'https://baomoi.com/phap-luat.epi',
//     'https://baomoi.com/phap-luat/trang2.epi',
//     'https://baomoi.com/phap-luat/trang3.epi',
//     'https://baomoi.com/phap-luat/trang4.epi',
//     'https://baomoi.com/phap-luat/trang5.epi',
//     'https://baomoi.com/phap-luat/trang6.epi',
//   ],
//   [
//     'https://baomoi.com/kinh-doanh.epi',
//     'https://baomoi.com/kinh-doanh/trang2.epi',
//     'https://baomoi.com/kinh-doanh/trang3.epi',
//     'https://baomoi.com/kinh-doanh/trang4.epi',
//     'https://baomoi.com/kinh-doanh/trang5.epi',
//     'https://baomoi.com/kinh-doanh/trang6.epi',
//   ],
//   [
//     'https://baomoi.com/khoa-hoc-cong-nghe.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang2.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang3.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang4.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang5.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang6.epi',
//      //thay cho CN o tuoitre
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang7.epi',
//     'https://baomoi.com/khoa-hoc-cong-nghe/trang8.epi',
//   ],
//   [
//     'https://baomoi.com/xe-co.epi',
//     'https://baomoi.com/xe-co/trang2.epi',
//     'https://baomoi.com/xe-co/trang3.epi',
//     'https://baomoi.com/xe-co/trang4.epi',
//     'https://baomoi.com/xe-co/trang5.epi',
//     'https://baomoi.com/xe-co/trang6.epi',
//   ],
//   [
//     'https://baomoi.com/giao-duc.epi',
//     'https://baomoi.com/giao-duc/trang2.epi',
//     'https://baomoi.com/giao-duc/trang3.epi',
//     'https://baomoi.com/giao-duc/trang4.epi',
//     'https://baomoi.com/giao-duc/trang5.epi',
//     'https://baomoi.com/giao-duc/trang6.epi',
//   ],
//   [
//     'https://baomoi.com/suc-khoe-y-te.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang2.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang3.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang4.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang5.epi',
//     'https://baomoi.com/suc-khoe-y-te/trang6.epi',
//   ]
// ]

//VnExpress
// const array_training = [
  // [
  //   'https://vnexpress.net/phap-luat',
  //   'https://vnexpress.net/phap-luat-p2',
  //   'https://vnexpress.net/phap-luat-p3',
  //   'https://vnexpress.net/phap-luat-p4',
  //   'https://vnexpress.net/phap-luat-p5',
  //   'https://vnexpress.net/phap-luat-p6',
  // ],
  // [
  //   'https://vnexpress.net/kinh-doanh',
  //   'https://vnexpress.net/kinh-doanh/p2',
  //   'https://vnexpress.net/kinh-doanh/p3',
  //   'https://vnexpress.net/kinh-doanh/p4',
  //   'https://vnexpress.net/kinh-doanh/p5',
  //   'https://vnexpress.net/kinh-doanh/p6',
  // ],
  // [
    // h2
  //   'https://vnexpress.net/so-hoa/cong-nghe',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p2',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p3',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p4',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p5',
  //   'https://vnexpress.net/so-hoa/cong-nghe-p6',
  // ],
  // [
  //   'https://vnexpress.net/oto-xe-may',
  //   'https://vnexpress.net/oto-xe-may-p2',
  //   'https://vnexpress.net/oto-xe-may-p3',
  //   'https://vnexpress.net/oto-xe-may-p4',
  //   'https://vnexpress.net/oto-xe-may-p5',
  //   'https://vnexpress.net/oto-xe-may-p6',
  // ],
  // [
  //   'https://vnexpress.net/giao-duc',
  //   'https://vnexpress.net/giao-duc-p2',
  //   'https://vnexpress.net/giao-duc-p3',
  //   'https://vnexpress.net/giao-duc-p4',
  //   'https://vnexpress.net/giao-duc-p5',
  //   'https://vnexpress.net/giao-duc-p6',
  // ],
  // [
    // 'https://vnexpress.net/suc-khoe',
    // h2
//     'https://vnexpress.net/suc-khoe/p2',
//     'https://vnexpress.net/suc-khoe/p3',
//     'https://vnexpress.net/suc-khoe/p4',
//     'https://vnexpress.net/suc-khoe/p5',
//     'https://vnexpress.net/suc-khoe/p6',
//   ]
// ]

//VOV-DaiTiengNoi
// const array_training = [
//   [
//     'https://vov.vn/phap-luat/',
//     'https://vov.vn/phap-luat/trang2',
//     'https://vov.vn/phap-luat/trang3',
//     'https://vov.vn/phap-luat/trang4',
//     'https://vov.vn/phap-luat/trang5',
//     'https://vov.vn/phap-luat/trang6',
//   ],
//   [

//   ],
//   [

//   ],
//   [
//     'https://vov.vn/oto-xe-may/',
//     'https://vov.vn/oto-xe-may/trang2',
//     'https://vov.vn/oto-xe-may/trang3',
//     'https://vov.vn/oto-xe-may/trang4',
//     'https://vov.vn/oto-xe-may/trang5',
//     'https://vov.vn/oto-xe-may/trang6',
//   ],
//   [

//   ],
//   [
//     'https://vov.vn/suc-khoe/',
//     'https://vov.vn/suc-khoe/trang2',
//     'https://vov.vn/suc-khoe/trang3',
//     'https://vov.vn/suc-khoe/trang4',
//     'https://vov.vn/suc-khoe/trang5',
//     'https://vov.vn/suc-khoe/trang6',
//   ],
// ]

//ThanhNien
const array_training = [
  [

  ],
  [
    'https://thanhnien.vn/tai-chinh-kinh-doanh/',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-2.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-3.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-4.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-5.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-6.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-7.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-8.html',
    'https://thanhnien.vn/tai-chinh-kinh-doanh/trang-9.html',
  ],
  [
    'https://thanhnien.vn/cong-nghe/',
    'https://thanhnien.vn/cong-nghe/trang-2.html',
    'https://thanhnien.vn/cong-nghe/trang-3.html',
    'https://thanhnien.vn/cong-nghe/trang-4.html',
    'https://thanhnien.vn/cong-nghe/trang-5.html',
    'https://thanhnien.vn/cong-nghe/trang-6.html',
    'https://thanhnien.vn/cong-nghe/trang-7.html',
    'https://thanhnien.vn/cong-nghe/trang-8.html',
    'https://thanhnien.vn/cong-nghe/trang-9.html',
  ],
  [

  ],
  [
    'https://thanhnien.vn/giao-duc/',
    'https://thanhnien.vn/giao-duc/trang-2.html',
    'https://thanhnien.vn/giao-duc/trang-3.html',
    'https://thanhnien.vn/giao-duc/trang-4.html',
    'https://thanhnien.vn/giao-duc/trang-5.html',
    'https://thanhnien.vn/giao-duc/trang-6.html',
    'https://thanhnien.vn/giao-duc/trang-7.html',
    'https://thanhnien.vn/giao-duc/trang-8.html',
    'https://thanhnien.vn/giao-duc/trang-9.html',
  ],
  [
    'https://thanhnien.vn/suc-khoe/',
    'https://thanhnien.vn/suc-khoe/trang-2.html',
    'https://thanhnien.vn/suc-khoe/trang-3.html',
    'https://thanhnien.vn/suc-khoe/trang-4.html',
    'https://thanhnien.vn/suc-khoe/trang-5.html',
    'https://thanhnien.vn/suc-khoe/trang-6.html',
    'https://thanhnien.vn/suc-khoe/trang-7.html',
    'https://thanhnien.vn/suc-khoe/trang-8.html',
    'https://thanhnien.vn/suc-khoe/trang-9.html',
  ],
]

  for(let i = 0; i < array_training.length; i++){
    let total_string_trains = '';
    for (let url of array_training[i]) {
      await page.goto(url, { waitUntil: 'load', timeout: 0 });
      const result_news_total = await page.evaluate(() => {

        //Dantri
        // let news = document.querySelectorAll('div.clearfix > div.mt3.clearfix.eplcheck > a');
        // news = [...news].slice(0, 10);
        //Tuoitre
        // let news = document.querySelectorAll('ul.list-news-content > li.news-item > a');
        // news = [...news].slice(0, 15);
        // news = [...news].slice(0, 20);
        //Baomoi
        // let news = document.querySelectorAll('div.timeline.loadmore > div.story > h4.story__heading > a');
        // news = [...news].slice(0, 60);

        //VnExpress
        // let news = document.querySelectorAll('div.width_common.list-news-subfolder > article.item-news.item-news-common > h3.title-news > a');
        // let news = document.querySelectorAll('div.width_common.list-news-subfolder > article.item-news.item-news-common > h2.title-news > a');
        // news = [...news].slice(0, 30);

        //DaitiengnoiVN - img
        // let news = document.querySelectorAll('div.stories-style-6 > article.story > figure.story__thumb > a > img');
        // news = [...news].slice(0, 30);

        //ThanhNien
        let news = document.querySelectorAll('div.relative > article.story > a');
        news = [...news].slice(0, 20);

        //---//
        let result_news = news.map(link => ({
          title: link.getAttribute('title')

          //DaitiengNoiVN - img get alt
          // title: link.getAttribute('alt')
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