const puppeteer = require('puppeteer');
var WhichX = require("whichx");
var fs = require('fs');
var vntk = require('vntk')
var wordTokenizer = vntk.wordTokenizer()
var stopwords = require('vietnamese-stopwords');
var removePunctuation = require('remove-punctuation');

(async () => {
  // Mở trình duyệt mới và tới trang của tintuc
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  urlArray = [
    'https://tuoitre.vn/phap-luat.htm',
    'https://tuoitre.vn/kinh-doanh.htm',
    // 'https://congnghe.tuoitre.vn/',
    // 'https://tuoitre.vn/xe.htm',
    // 'https://tuoitre.vn/giao-duc.htm',
    // 'https://tuoitre.vn/suc-khoe.htm',
  ]

  for (let url of urlArray) {
    console.log(url);
    let indexUrl = urlArray.indexOf(url) + 1
    console.log(indexUrl);
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    //crawl url tintuc
    const articles3 = await page.evaluate(() => {
      let urlTintuc = document.querySelectorAll('ul.list-news-content > li.news-item > div.name-news > h3.title-news > a');
      urlTintuc = [...urlTintuc].slice(0, 1);
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
        var labels = ['pháp_luật', 'kinh_doanh', 'công_nghệ', 'xe', 'giáo_dục', 'sức_khoẻ'];

        arrayTrains = [
            'triệt_phá đường_dây ma_túy chung_cư cao_cấp hà_nội tìm_thấy thi_thể bé gái 13 tuổi mất_tích cuộc gọi kêu_cứu gia_đình clip khoảnh_khắc nữ đạo_chích mở cốp xe_máy trộm túi_xách tích_tắc hà_nội khiến bàng_hoàng quyết_liệt giải_pháp xử_lý nạn taxi dừng đỗ cổng bệnh_viện bạch_mai ổ_nhóm tín_dụng đen cho_vay 60 tỷ đồng thu lãi 24 tỷ đồng đàn_ông dúi đầu thẳng_tay tát bé trai khiến cđm phẫn_nộ bđbp quảng_bình liên_tiếp bắt đối_tượng tàng_trữ vận_chuyển ma_túy tổ_chức nhập_cảnh cách_ly 120 du_học sinh lào trở_lại nghệ_an học_tập nổ_súng minneapolis 1 chết 11 bị_thương căn nhà_ở đà_nẵng bốc_cháy đêm 7 gia_đình kịp_thời thoát_thân triệt_phá tụ_điểm đá_gà ăn_tiền rẫy vắng sao_không công_khai thưởng báo_tin bắt triệu quân_sự tìm_thấy thi_thể bé gái 13 tuổi mất_tích ăn_quà vặt khởi_tố vụ thảm_sát 3 chết điện_biên giang_hồ đe_dọa đòi nợ đàn_ông nhảy sông mất_tích thảm án 3 chết nhờ giải_quyết nợ 15 tỷ tây_ninh triệt_phá tụ_điểm đánh_bạc hình_thức lắc tài_xỉu ôtô đẩy xe_máy tóe lửa lao vun_vút đường mỹ tìm_thấy thi_thể bé gái 13 tuổi 3 mất_tích mỹ 10 bắn minneapolis cảnh_sát truy_tìm thủ_phạm',
            'báo_chí thời hội_nhập phóng_viên chạy nước_rút nữ tỷ_phú tự_thân thách_thức đối_tác lâu_năm apple fred wilson – đầu_tư thành_công cách ngược warren buffett vì_sao giới trẻ sẵn_sàng bỏ hàng nghìn usd mua đồ supreme về_hưu sớm tuổi 35 kỹ_sư phần_mềm tiết_lộ 3 sai_lầm chết_người khiến hầu_hết chúng_ta không_thể tiết_kiệm doanh_nhân huỳnh uy dũng xây cơ_ngơi nghìn tỷ thế_nào cách hóa giải số_liệu bài báo kinh_tế báo chí_hướng nguyên_tắc 5i samsung dịch_chuyển trung_quốc sang việt_nam tuyển lao_động quy_mô công_cụ cải_tiến kaizen giúp công_ty tnhh dệt may xuất_khẩu minh quang tạo_dựng thương_hiệu uy_tín học_hỏi trưởng_thành sinh_viên việt_nam trẻ vươn_tới … nhà_báo tân_hiệp phát_triển khai chọn_lọc ứng_viên nhân_sự kế_thừa 2020 lão_nông đi_đầu phát_triển kinh_tế trang_trại tuyên_quang phi_công chuyển_nghề trái_tim người_làm báo lên_tiếng báo_chí đa_dạng mô_hình kinh_doanh mô_hình kinh_doanh độc lạ món đồ_đồng nát quay nông tỷ_phú usd việt_nam mở trại nuôi lợn đa_dạng hóa nguồn thu báo_chí',
            'báo_chí đại_dịch thách thức thời_đại trung_quốc nga bước đột_phá phát_triển vaccine chống covid19 iphone x đẹp long_lanh giảm_giá kịch sàn việt_nam xuống mức đáy đứng đằng_sau thành công_của faceapp học sinh thái_nguyên giành giải_thưởng cuộc thi khkt cấp quốc_gia fbi hướng_dẫn 3 cách tránh mất tiền ngân_hàng ra_mắt cuốn sách giáo_trình tác_phẩm báo mạng điện_tử trung_quốc nga đạt tiến_triển điều_chế vaccine ngừa covid19 cách tắt tính_năng tự_động dừng phát nhạc tháo tai_nghe airpods faceapp độc_hại cảnh_giác microchip mở_rộng danh_mục sản_phẩm adaptec smartraid adapter cấp_độ phổ_thông thành_tích ấn_tượng apple ios 13 khiến google ghen_tị nữ tổng biên_tập đặc_biệt việt_nam mẹo nhỏ dùng iphone cũng_nên giúp máy chạy nhanh iphone 12 nhỏ iphone se màn_hình clip nữ tổng biên_tập đặc_biệt việt_nam một_mình chăm_sóc 800 gốc bưởi chụp_ảnh nhật_thực chiều 216 bí_quyết thành_công mua xe ô_tô cũ đòi bằng_được thứ cách xóa hình_ảnh video danh_bạ trùng_lặp điện_thoại',
            'chi_tiết mercedesbenz e 300 amg giá 29 tỷ đồng việt_nam toyota fortuner 2021 nâng_cấp đáng_giá xem toyota innova 2021 thiết_kế sang sienna 2021 siêu suv lamborghini urus 2021 tăng_giá bán xe thể_thao giá rẻ mercedesamg gt 43 khởi_điểm 21 tỷ đồng giá lăn_bánh kia cerato đối_thủ đáng_gờm mazda 3 honda civic chất_lượng sản_phẩm model y tụt dốc telsa chỉ_trích thậm_tệ ô tô_màu sản_xuất thế_giới mẫu xe kỳ_vọng đem thành_công âm_thầm rút_lui khỏi vn thaco đưa tổ_hợp showroom bmw tiêu_chuẩn quốc_tế đà_nẵng hoạt_động hyundai xác ra_mắt tucson lời đe_dọa gửi honda cr - v mazda cx - 5 volkswagen việt_nam công_bố biểu_tượng thương_hiệu volkswagen donkervoort d8 gtojd70 - siêu xe 2g đầu_tiên thế_giới top 10 môtô tốt 2020 honda cbr650r góp_mặt honda pilot 2021 trang_bị hộp_số 9 cấp đấu toyota highlander thời_điểm tắt điều_hòa ô_tô đảm_bảo an_toàn giảm lệ_phí trước_bạ 50 nissan sunny có_giá bao_nhiêu toyota venza 2021 thêm bản gr ngoại_thất thể_thao tesla chỉ_trích thậm_tệ chất_lượng sản_phẩm siêu xe sức_mạnh 3000 mã_lực người_ngoài hành_tinh',
            'mê kỹ_thuật ô_tô học đại_học cao_đẳng clip 12 câu_đố kiểm_tra trí_tuệ kỹ_năng sinh_tồn khoảng 10000 học_sinh tham_gia ngày_hội tư_vấn tuyển sinhhướng nghiệp 2020 nghề báo – nghề giàu_có tâm_sự nữ nhà_báo 17 gắn_bó ngành giáo_dục việt_nam đề thi tốt_nghiệp thpt dễ liệu mưa điểm 10 lập quy_hoạch dự_án thành_phố giáo_dục quốc_tế hà_tĩnh vốn đầu_tư 1300 tỷ đồng thầy dạy toán đại_học mỹ xin_lỗi công_khai đề_nghị sinh_viên gốc việt đổi tên thí_sinh thận_trọng điền thông_tin phiếu đăng_ký xét tuyển gần 45 triệu tác_phẩm tham_dự cuộc thi hồ thiếu_nhi thiếu_nhi hồ đh y_dược tphcm dành con nhà_giàu trải lòng nam nhà_báo tự cách_ly 14 ổ dịch bạch_mai ttthích hạnh bình giao_lưu giới_thiệu sách hàng ngàn học_sinh đội nắng ngày_hội tuyển_sinh 2020 công_bố đường dây_nóng hỗ_trợ thi tốt_nghiệp thpt tuyển_sinh 2020 infographic chi_tiết lịch thi môn năng_khiếu báo_chí 2020 450 tình_nguyện viên trường sĩ_quan thông_tin tham_gia hiến máu xã_hội hóa biên_soạn sgk tạo chất_lượng tiết_kiệm ngân_sách đh bách_khoa hà_nội tổ_chức làm_bài kiểm_tra tư_duy 3 địa_phương ninh_thuận sẵn_sàng kỳ thi thpt quốc_gia 2020',
            '7 sai_lầm ăn cơm khiến rước đủ bệnh dừng kẻo hối kịp 1 triệu ca nhiễm covid19 brazil who cảnh_báo giai_đoạn nguy_hiểm đại_dịch hạt_dẻ cười món ăn_vặt tốt sức_khỏe bệnh_nhi tử_vong bạch_hầu khẩn_trương cách_ly hàng trăm dân tiến_hành dập dịch lợi_ích củ_cải đường đọc xong mua ăn uống 1 ly nước nóng 2 thời_điểm đào_thải độc_tố giảm cân lợi_ích loại nước có_thể giúp giải_độc uống rượu_bia cực tốt chuyên_gia trung_quốc dịch covid19 bắc_kinh làn_sóng 2 nam phi ghi_nhận ca covid19 tăng kỷ_lục cho_phép sử_dụng dexamethasone ca covid19 romania gia_tăng trở_lại thực_phẩm thần_dược trị táo_bón 7 đồ_uống tăng nguy_cơ mắc ung_thư loại 2 nghe giật_mình bệnh nhân tử_vong người_nhà rút máy thở lấy ổ_cắm điều_hòa mát tại_sao muỗi thích đốt mỹ công_bố thử vắc xin covid19 putin lên_tiếng 5 thực_phẩm ngăn_ngừa ung_thư nhật ưa dùng mỹ dừng thử_nghiệm thuốc sốt_rét trị covid19 cách_ly 355 ngăn_chặn ổ dịch bạch_hầu lây_lan lão_nông sáng_chế máy trợ thở giúp con_trai giành sống đổ_bệnh đột_tử đừng bao_giờ tắm cách',
        ]

        category.addLabels(labels);
        category.addData('pháp_luật', arrayTrains[0]);
        category.addData('kinh_doanh', arrayTrains[1]);
        category.addData('công_nghệ', arrayTrains[2]);
        category.addData('xe', arrayTrains[3]);
        category.addData('giáo_dục', arrayTrains[4]);
        category.addData('sức_khoẻ', arrayTrains[5]);

    var idtheloai;
    const articlesArray = [];
    for (let i = 0; i < arrayTitle.length; i++) {
      var News = category.classify(arrayTitle[i]);
      // console.log(arrayTitle[i]);
      // console.log("It is: " + i + " " + News);

      //set idtheloai
      switch (News) {
        case 'pháp_luật':
            idtheloai = 1;//11/15 73,3%%
            break;
        case 'kinh_doanh':
            idtheloai = 2;//13/17 86,7%
            break;
        case 'công_nghệ':
            idtheloai = 3;//12/15 80%
            break;
        case 'xe':
            idtheloai = 4;//13/15 86,7%
            break;
        case 'giáo_dục':
            idtheloai = 5;//11/15 73,3%%
            break;
        case 'sức_khoẻ':
            idtheloai = 6;//13/17 86,7%
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
    // let totalArray = articlesArray.map(e => e.idLoaiTin)
    // fs.appendFile('filenew.js', 'arrayNews = [' + totalArray + ']\n', function (err) {
    //   if (err) throw err;
    //   console.log('Save');
    // })

    // return articlesArray;

  }
  await browser.close();
})();
