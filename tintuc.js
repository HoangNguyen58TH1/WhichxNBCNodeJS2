const puppeteer = require('puppeteer');
var WhichX = require("whichx");
var fs = require('fs');

module.exports = (async () => {
  // Mở trình duyệt mới và tới trang của tintuc
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto('https://tuoitre.vn/phap-luat.htm', {waitUntil: 'load', timeout: 0});
  // await page.goto('https://tuoitre.vn/kinh-doanh.htm', { waitUntil: 'load', timeout: 0 });
  // await page.goto('https://congnghe.tuoitre.vn/', {waitUntil: 'load', timeout: 0});
  await page.goto('https://tuoitre.vn/xe.htm', { waitUntil: 'load', timeout: 0 });
  // await page.goto('https://tuoitre.vn/giao-duc.htm', { waitUntil: 'load', timeout: 0 });
  // await page.goto('https://tuoitre.vn/suc-khoe.htm', { waitUntil: 'load', timeout: 0 });

  //crawl url tintuc
  const articles3 = await page.evaluate(() => {
    let urlTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > h3.title-news > a');
    urlTintuc = [...urlTintuc].slice(0, 2);
    // urlTintuc = [...urlTintuc];
    let articles3 = urlTintuc.map(link => ({
      url: link.getAttribute('href')
    }))
    return articles3;
  })
  console.log('articles3: ', articles3);

  //convert urlInitial into TieuDeKhongDau
  var arrayUrl = articles3.map((e) => {
    let urlInitial = e.url
    let findIndexLastCharacter = urlInitial.lastIndexOf('-')
    urlInitial = urlInitial.slice(1, findIndexLastCharacter)
    return urlInitial
  })

  //vao tung url crawll title, des, img, content
  var arrayTitle = [], arrayImageUrl = [], arrayDescription = [], arrayContentTotal = [];
  for (let articles of articles3) {
    await page.goto('https://tuoitre.vn/' + articles.url, { waitUntil: 'load', timeout: 0 });

    //title
    let titleTintuc = await page.evaluate(() => {
      let checkElement = document.getElementsByClassName("article-title")[0];
      let titleTintuc;
      (checkElement != undefined) ? (titleTintuc = checkElement.innerText) : (titleTintuc = '')
      return titleTintuc;
    });

    //imageUrl
    let imageUrlTintuc = await page.evaluate(() => {
      let checkElement = document.getElementsByClassName("lightbox-content")[0];
      let imageUrlTintuc;
      (checkElement != undefined) ? (imageUrlTintuc = checkElement.getAttribute('src')) : (imageUrlTintuc = '')
      return imageUrlTintuc;
    });

    //description
    let descriptionTintuc = await page.evaluate(() => {
      let checkElement = document.getElementsByClassName("sapo")[0];
      let descriptionTintuc;
      (checkElement != undefined) ? (descriptionTintuc = checkElement.innerText) : (descriptionTintuc = '')
      return descriptionTintuc;
    });

    //content
    //contentTintuc la 1 Array gom nhung object chua chuoi
    let contentTintuc = await page.evaluate(() => {
      let contentTintuc = document.querySelectorAll('div.content.fck > p');
      contentTintuc = [...contentTintuc];
      let content = contentTintuc.map(link => ({
        content: link.innerText,
      }));
      return content;
    });
    //arrayContent di tung object cua contentTintuc de tao thanh 1 Array chua nhung ptu la chuoi
    var arrayContent = contentTintuc.map((e) => {
      return e.content
    })
    //noi cac ptu la chuoi trong arrayContent lai
    var stringsContentTinTuc = arrayContent.join('<br/><br/> ');

    //add element into array
    arrayTitle.push(titleTintuc) // add tung cai string vào
    arrayImageUrl.push(imageUrlTintuc) // add tung cai string url vào
    arrayDescription.push(descriptionTintuc) // add tung cai string vào
    arrayContentTotal.push(stringsContentTinTuc) // khác 2 cái trên.
  }

  // In ra kết quả và đóng trình duyệt
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
    // console.log(arrayTitle[i]);
    // console.log("It is: " + i + " " + News);

    //set idtheloai
    switch (News) {
      case 'pháp luật':
        idtheloai = 1;//10/15 66,7% -----
        break;
      case 'kinh doanh':
        idtheloai = 2;//4/17 35,5% -----
        break;
      case 'công nghệ':
        idtheloai = 3;//9/20 20% -----
        break;
      case 'xe':
        idtheloai = 4;//12/15 73,3% -----
        break;
      case 'thể thao':
        idtheloai = 5;//5/15 33,3% - 8/15 53%
        break;
      case 'giáo dục':
        idtheloai = 6;//4/15 27% - 11/15 73% -----
        break;
      case 'sức khoẻ':
        idtheloai = 7;//12/15 46,7% -----
        break;
      default:
      // console.log('chet con me m deeeeeeeeeeee');
    }
    // console.log('idtheloai: ', idtheloai);

    var articlesObject = {
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

  //handling files
  let totalArray = articlesArray.map(e => e.idLoaiTin)
  fs.appendFile('filenew.js', 'arrayNews = [' + totalArray + ']\n', function (err) {
    if (err) throw err;
    console.log('Save');
  })

  return articlesArray;
});
