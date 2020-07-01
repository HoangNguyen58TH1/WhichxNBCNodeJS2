var mysql = require("mysql");
var config = require("./config.js");
var tintuc = require("./tintuc.js");
var connection = mysql.createConnection(config);

connection.connect();
async function saveDB() {
  let articlesArray = await tintuc();
  let articlesPromise = articlesArray.map(article => create(article));
  let results = await Promise.all(articlesPromise);
  // let articlesTitle = articles.map(article => article.title);
  // let articlesUrl = articles.map(article => article.url);
  // articlesPromise = articles.map(article => createArticle(article));
  // Promise.all(articlesPromise)
  // createArticle()

  // câu lệnh insert
  // for (let i = 0; i < articles.length; i++) {
  //   // var sql = `INSERT INTO todo2(title,completed)
  //   //             VALUES("${articlesTitle[i]}",true)`;
  //   var sql = "insert into todos3 set ?"
  //   connection.query(sql, [articles[i]], (err, result) => {});
  // }
  // connection.end();
}

function create(article) {
  return new Promise((resolve, reject) => {

    var sql = "insert into tintuc set ?";

    connection.query(sql, [article], (err, result) => {
      if (err) reject(err);
      resolve(result);
      // connection.end();

    })
  })
}
saveDB()

// thực thi câu lệnh insert
