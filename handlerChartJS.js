// import arr from './test1'
// var arr = require('./test1.js')
// var fs = require('fs');
//   fs.readFile('filenew.js', 'utf8', function(err, data) {
//     if(err) throw err;
//     // if(err){
//     //   return console.log(err);
//     // }
//     // console.log('data');
//     console.log(data);
//     console.log(a);
//   });
// var arr = [4,2,4,2,4,4,4,4,4,4,4,4,2,2,4]
// console.log(arr);

// module.exports = function ThongKeSoLieu(param1){
// var arrayPercent = []
// function ThongKeSoLieu(param1) {
// var arrayPercentFunction = function (param1) {
// var arrayMerge = []
var arrayPercentFunction = function (param1) {
  // let arr = param1.map(element => {
  //   return element.idtheloai
  // })
  // console.log('arr:', arr);

  let arr_length = param1.length

  let occurrences = {};
  for (let i = 0; i < arr_length; i++) {
    occurrences[param1[i]] = (occurrences[param1[i]] || 0) + 1;
  }
  console.log(param1);
  console.log('occurrences:', occurrences);

  let object_null = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
  // console.log('object_null:', object_null);
  let merge = { ...object_null, ...occurrences }
  console.log('merge:', merge);
  var arrayMerge = Object.values(merge)
  console.log('arrayMerge:', arrayMerge);
  return arrayMerge

  // arrayPercent = Object.values(merge).map(element => {
  //   return (element / arr_length * 100).toFixed(2);
  // })
  // console.log('a', arrayPercent);
  // return arrayPercent;
}

// arrayMergeTotal = arrayPercentFunction(arr)
arrayMergeTotal1 = arrayPercentFunction(arrayNews1)
arrayMergeTotal2 = arrayPercentFunction(arrayNews2)
arrayMergeTotal3 = arrayPercentFunction(arrayNews3)
arrayMergeTotal4 = arrayPercentFunction(arrayNews4)
arrayMergeTotal5 = arrayPercentFunction(arrayNews5)
arrayMergeTotal6 = arrayPercentFunction(arrayNews6)

// module.exports = arrayMerge;
// export {arrayMerge};