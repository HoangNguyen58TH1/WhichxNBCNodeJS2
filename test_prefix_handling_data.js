'use strict';
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');

var a = 'Bộ Chính trị chỉ đạo xây dựng Nghị quyết phát triển Thanh Hóa đến 2030, tầm nhìn 2045'
let handling_strings = wordTokenizer.tag(removePunctuation(a).replace(/-|‘|’|“|”/g,''), 'text').toLowerCase().split(' ').filter(val => !stopwords.includes(val)).join(' ')
let handling_strings2 = wordTokenizer.tag(removePunctuation(a).replace(/-|‘|’|“|”/g,''), 'text').toLowerCase()
console.log(handling_strings);
console.log(handling_strings2);