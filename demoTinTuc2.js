const puppeteer = require('puppeteer');
var WhichX = require("whichx");

(async() => {
    // Mở trình duyệt mới và tới trang của tintuc
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // await page.goto('https://tuoitre.vn/phap-luat.htm', {waitUntil: 'load', timeout: 0});
    // await page.goto('https://tuoitre.vn/kinh-doanh.htm', {waitUntil: 'load', timeout: 0});
    // await page.goto('https://congnghe.tuoitre.vn/', {waitUntil: 'load', timeout: 0});
    // await page.goto('https://tuoitre.vn/xe.htm', {waitUntil: 'load', timeout: 0});
    // await page.goto('https://thethao.tuoitre.vn/', {waitUntil: 'load', timeout: 0});
    await page.goto('https://tuoitre.vn/giao-duc.htm', {waitUntil: 'load', timeout: 0});
    // await page.goto('https://tuoitre.vn/suc-khoe.htm', {waitUntil: 'load', timeout: 0});

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article1 và article2
    //1 - crawl title, urlimg
    // const articles = await page.evaluate(() => {
    //   let imgUrl = document.querySelectorAll('ul.list-news-content > li.news-item > a.pos-rlt > img')
    //   imgUrl = [...imgUrl];
    //   let articles = imgUrl.map(link => ({
    //     title: link.getAttribute('alt'),
    //     urlImage: link.getAttribute('src'),
    //   }));
    //   return articles;
    // })

    //2 - crawl description
    // const articles2 = await page.evaluate(() => {
    //   let des = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > p.sapo');
    //   des = [...des];
    //   let articles2 = des.map(link => ({
    //     description: link.innerText,
    //   }));
    //   return articles2;
    // });

    //3 - crawl url tintuc
    const articles3 = await page.evaluate(() => {
      //loaitin con lai
      let urlTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > h3.title-news > a');
      //thethao
      // let urlTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.txt > h3 > a');
      urlTintuc = [...urlTintuc].slice(0,2);
      let articles3 = urlTintuc.map(link => ({
        url: link.getAttribute('href')
      }))
      return articles3;
    })
    console.log('articles3: ', articles3);

    //convert urlInitial into TieuDeKhongDau
    var arrayUrl = articles3.map((arrayCurrent) => {
      let urlInitial = arrayCurrent.url
      let findIndexLastCharacter = urlInitial.lastIndexOf('-')
      urlInitial = urlInitial.slice(1, findIndexLastCharacter)
      // console.log('url Initial: ', urlInitial);
      // console.log('----------------------');
      return urlInitial
    })
    console.log(arrayUrl);

    //start crawl data from url
    var arrayTitle = []
    var arrayImageUrl = []
    var arrayDescription = []
    var arrayContentTotal = []
    for (let articles of articles3) {
      await page.goto('https://tuoitre.vn/' + articles.url, {waitUntil: 'load', timeout: 0});

      //title
      let titleTintuc = await page.evaluate(() => {
        let titleTintuc = document.getElementsByClassName("article-title")[0].innerText;
        return titleTintuc;
      });

      //imageUrl
      let imageUrlTintuc = await page.evaluate(() => {
        let checkElement = document.getElementsByClassName("lightbox-content")[0];
        let imageUrlTintuc;
        (checkElement != undefined) ? (imageUrlTintuc = checkElement.getAttribute('src')) : (imageUrlTintuc = null)
        return imageUrlTintuc;
      });

      //description
      let descriptionTintuc = await page.evaluate(() => {
        let descriptionTintuc = document.getElementsByClassName("sapo")[0].innerText;
          // .innerHTML;
          // .getElementsByClassName("content fck")[0]
          // .innerHTML.replace(/\<br\>/g, "");
        return descriptionTintuc;
      });

      //content
      let contentTintuc = await page.evaluate(() => {
        // let contentTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > h3.title-news > a');
        let contentTintuc = document.querySelectorAll('div.content.fck > p');
        contentTintuc = [...contentTintuc];
        let content = contentTintuc.map(link => ({
          content: link.innerText
        }));
        return content;
      });

      //log
      console.log("..............................");
      console.log(titleTintuc);
      console.log(imageUrlTintuc);
      console.log(descriptionTintuc);

      //handling content - convert array into string - cach1 (con cach2 nua) - cach chi dung 3 row thay vi 5 row.
      // console.log(contentTintuc);
      // console.log(typeof contentTintuc);
      var arrayContent = contentTintuc.map((arrayCurrent) => {
        return arrayCurrent.content
      })
      var stringsContentTinTuc = arrayContent.join('<br/><br/> ');
      console.log(stringsContentTinTuc);

      //add element into array
      arrayTitle.push(titleTintuc) // add tung cai string vào
      arrayImageUrl.push(imageUrlTintuc) // add tung cai string url vào
      arrayDescription.push(descriptionTintuc) // add tung cai string vào
      arrayContentTotal.push(stringsContentTinTuc) // khác 2 cái trên.
    }
    // console.log('testne1: ', titleTintuc); //ptu cuoi cung
    // console.log(typeof titleTintuc); //string
    console.log('TITLE TOTAL: ', arrayTitle);
    console.log(typeof arrayTitle);
    console.log('IMAGE URL TOTAL: ', arrayImageUrl);
    console.log(typeof arrayImageUrl);
    console.log('URL TOTAL: ', arrayUrl);
    console.log(typeof arrayUrl);
    console.log('DESCRIPTION TOTAL:', arrayDescription);
    console.log(typeof arrayDescription);
    console.log('CONTENT TOTAL:', arrayContentTotal);
    console.log(typeof arrayContentTotal);


    // In ra kết quả và đóng trình duyệt
    // console.log('articles: ', articles);
    // console.log('articles2: ', articles2);
    await browser.close();

    //whichx
    var category = new WhichX();
    var labels = ["pháp luật", "kinh doanh", "công nghệ", "xe", "thể thao", "giáo dục", "sức khoẻ"];

    category.addLabels(labels);
    category.addData("pháp luật", "khởi tố bị can vụ án bắt nghi phạm trộm bị cáo tù hầu toà đình chỉ công an xác minh vận chuyển ma tuý hối lộ đình công vay nặng lãi trái phép trốn thuế quả tang thiếu uý nạn nhân hồ sơ chiếm đoạt bồi thường quản lý năm tù chém nghi phạm oan hoãn xử");
    category.addData("kinh doanh", "dự án công ty vang mua thu giữ xử lý bảo hiểm thị trường tập đoàn thuế giàu thiệt hại tỷ USD xuất khẩu bảo hộ y tế triệu triệu đồng tiêu dùng hàng hoá giảm giá vốn đồng cầu đầu tư");
    category.addData("công nghệ", "facebook thông tin cá nhân trải nghiệm robot hiện đại cáp quang AGG mạng viễn thông sim điện thoại app hack huawei trực tuyến mã nguồn mở mạng xã hội twitter tweet tv khoa học công nghệ mới sáng tạo số hoá samsung iphone apple chip 5g 4g internet máy tính trí tuệ nhân tạo game điện toán đám mây karaoke airpods oneplus plus camera điện tử ứng dụng qualcomm cisco viettel global zoom ai online startup bphoen tiktok instagram di dộng realme dùng riêng tư chất lượng âm thanh TV ");
    category.addData("xe", "oto ôtô nhập cảnh xe lexus trốn thuế taxi phá sản chạy toyota hãng thị trường Camry Innova Corolla doanh số tụt dốc vinfast kiểm định tải khách con máy chổ cao tốc sản xuất đại lý Lexus RX330");
    category.addData("thể thao", "triệu tập ngôi sao tập luyện tập Ronaldo siêu phẩm cầu thủ chiêu mộ câu lạc bộ trận chấn thương VFF AFF tuyển world cup thái cực quyền c.ronaldo sao trẻ utd messi Văn Lâm dứt điểm dẫn dắt muller bayern munich hlv giải rách cơ đùi đấu võ sĩ đồng đội cđv liverpool atletico ngoại binh fc môn đối");
    category.addData("giáo dục", "học sinh cổng trường hiệu trưởng đại học THPT THCS tốt nghiệp điểm thi môn lãnh đạo xử lý trách nhiệm phụ huynh bằng khen thầy cô giáo trẻ đh học phí bạ tuyển lớp giảng viên tốt nghiệp");
    category.addData("sức khoẻ", "covid covid19 covid-19 vũ hán nhiễm virus corona qua đời giám đốc bệnh viện trẻ em phụ nữ mang thai dịch thuốc bệnh nhân nguy cơ giảm âm tính dương tính thuốc lá hại who cảnh báo kháng sinh chữa tiến triễn thăm phổi tổn thương xuất viện");

    var idtheloai;
    const articlesArray = [];
    for (let i = 0; i < arrayTitle.length; i++) {
      var News = category.classify(arrayTitle[i]);
      console.log(arrayTitle[i]);
      console.log("It is: " + i + " " + News);

      //set idtheloai
      switch(News){
        case 'pháp luật':
            idtheloai = 1;//10/15 66,7%
            break;
        case 'kinh doanh':
            idtheloai = 2;//4/17 24%
            break;
        case 'công nghệ':
            idtheloai = 3;//9/20 45% - 12/20 60%
            break;
        case 'xe':
            idtheloai = 4;//12/15 80%
            break;
        case 'thể thao':
            idtheloai = 5;//5/15 33,3% - 8/15 53%
            break;
        case 'giáo dục':
            idtheloai = 6;//4/15 27% - 11/15 73%
            break;
        case 'sức khoẻ':
            idtheloai = 7;//12/15 80%
            break;
        default:
            console.log('chet con me m deeeeeeeeeeee');
      }
      console.log('idtheloai: ', idtheloai);

      var articlesObject = {
      // title: arrayTitle[i],
      // imageurl: arrayImageUrl[i],
      // description: arrayDescription[i],
      // content: arrayContentTotal[i],
      // idtheloai: idtheloai,
      idLoaiTin: idtheloai,
      TieuDe: arrayTitle[i],
      TieuDeKhongDau: arrayUrl[i],
      TomTat: arrayDescription[i],
      NoiDung: arrayContentTotal[i],
      Hinh: arrayImageUrl[i],
      NoiBat: 1,
      SoLuotXem: 0,
      }
    articlesArray.push(articlesObject)
    }
    console.log('---testFinal: ', articlesArray);

})();
