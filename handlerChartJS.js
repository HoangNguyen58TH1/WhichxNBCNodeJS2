
var arrayPercentFunction = function (param1) {

  let arr_length = param1.length

  let occurrences = {};
  for (let i = 0; i < arr_length; i++) {
    occurrences[param1[i]] = (occurrences[param1[i]] || 0) + 1;
  }
  console.log(param1);
  console.log('occurrences:', occurrences);

  let object_null = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
  let merge = { ...object_null, ...occurrences }
  console.log('merge:', merge);
  var arrayMerge = Object.values(merge)
  console.log('arrayMerge:', arrayMerge);
  return arrayMerge

}

arrayMergeTotal1 = arrayPercentFunction(arrayNews1)
arrayMergeTotal2 = arrayPercentFunction(arrayNews2)
arrayMergeTotal3 = arrayPercentFunction(arrayNews3)
arrayMergeTotal4 = arrayPercentFunction(arrayNews4)
arrayMergeTotal5 = arrayPercentFunction(arrayNews5)
arrayMergeTotal6 = arrayPercentFunction(arrayNews6)
