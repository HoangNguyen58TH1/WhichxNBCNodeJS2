// let arrayNews = [1,2,2,2,2,3,3,4,2,3,5,5,5,1,2,6,6,2,6,6]
// let array_number_itinial = [2,2,2,2,2,3,3,3,3,3,5,5,5,5,5,6,6,6,6,6,]
// let arrayNews = [1, 2, 2, 2, 2, 3, 3, 4, 2, 3, 5, 5, 5, 1, 2, 6, 6, 2, 6, 6, 2, 2, 2]
// let array_number_itinial = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 2, 2, 2]

console.log('arrayNews', arrayNews);
console.log('array_number_itinial', array_number_itinial);

let array_number1 = [], array_number2 = [], array_number3 = [], array_number4 = [], array_number5 = [], array_number6 = []
let index_array1 = [], index_array2 = [], index_array3 = [], index_array4 = [], index_array5 = [], index_array6 = []

for (let i = 0; i < array_number_itinial.length; i++) {
  if (array_number_itinial[i] === 1) {
    array_number1.push(array_number_itinial[i])
    index_array1.push(i);
  }
  if (array_number_itinial[i] === 2) {
    array_number2.push(array_number_itinial[i])
    index_array2.push(i);
  }
  if (array_number_itinial[i] === 3) {
    array_number3.push(array_number_itinial[i])
    index_array3.push(i);
  }
  if (array_number_itinial[i] === 4) {
    array_number4.push(array_number_itinial[i])
    index_array4.push(i);
  }
  if (array_number_itinial[i] === 5) {
    array_number5.push(array_number_itinial[i])
    index_array5.push(i);
  }
  if (array_number_itinial[i] === 6) {
    array_number6.push(array_number_itinial[i])
    index_array6.push(i);
  }
}
// console.log('array_number1', array_number1);
console.log('index_array1', index_array1);
// console.log('array_number2', array_number2);
console.log('index_array2', index_array2);
// console.log('array_number3', array_number3);
console.log('index_array3', index_array3);
// console.log('array_number4', array_number4);
console.log('index_array4', index_array4);
// console.log('array_number5', array_number5);
console.log('index_array5', index_array5);
// console.log('array_number6', array_number6);
console.log('index_array6', index_array6);

var arrayNews1 = [], arrayNews2 = [], arrayNews3 = [], arrayNews4 = [], arrayNews5 = [], arrayNews6 = [];
for(let i = 0; i < index_array1.length; i++){
  arrayNews1.push(arrayNews[index_array1[i]])
}
for(let i = 0; i < index_array2.length; i++){
  arrayNews2.push(arrayNews[index_array2[i]])
}
for(let i = 0; i < index_array3.length; i++){
  arrayNews3.push(arrayNews[index_array3[i]])
}
for(let i = 0; i < index_array4.length; i++){
  arrayNews4.push(arrayNews[index_array4[i]])
}
for(let i = 0; i < index_array5.length; i++){
  arrayNews5.push(arrayNews[index_array5[i]])
}
for(let i = 0; i < index_array6.length; i++){
  arrayNews6.push(arrayNews[index_array6[i]])
}
console.log('arrayNews1 ', arrayNews1);
console.log('arrayNews2 ', arrayNews2);
console.log('arrayNews3 ', arrayNews3);
console.log('arrayNews4 ', arrayNews4);
console.log('arrayNews5 ', arrayNews5);
console.log('arrayNews6 ', arrayNews6);