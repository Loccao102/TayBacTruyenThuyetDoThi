/* ==========================================================================
   TÂY BẮC — NHẬT KÝ DI SẢN & KỲ BÍ (HERITAGE JAVASCRIPT SYSTEM)
   Interactive Digital Magazine, Heritage Book Reader, Map, Quiz & AI Nana
   ========================================================================== */

// --- 1. HERITAGE KNOWLEDGE BASE & DOSSIER DATABASE ---
const HERITAGE_SITES = [
  {
    id: "tay-thien",
    title: "Đền Mẫu Tây Thiên",
    province: "Vĩnh Phúc (Cửa ngõ Tây Bắc)",
    category: "temple",
    categoryName: "Đền / Miếu linh thiêng",
    coords: { top: 40, left: 62 },
    rating: "4.9",
    reviewsCount: 138,
    lead: "Nơi linh thiêng hội tụ của đất trời và lòng người — Mỗi bậc đá dẫn lên non thiêng đều mang hơi thở tiền nhân.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1200",
    overview: `
      <p class="article-body-p">Nằm nép mình giữa đại ngàn Tam Đảo với mây ngàn gió núi quanh năm bồng bềnh, Đền Mẫu Tây Thiên là chốn tổ linh thiêng bậc nhất vùng cửa ngõ Tây Bắc. Tương truyền, đây là nơi phụng thờ Quốc Mẫu Lăng Thị Tiêu — chính vương phi của Hùng Chiêu Vương (đời Hùng Vương thứ 7).</p>
      <p class="article-body-p">Thuở đất nước nguy biến trước giặc ngoại xâm, bà đã đứng lên chiêu mộ hàng ngàn dũng sĩ, phò tá Vua Hùng gìn giữ non sông bờ cõi, sau đó dạy dân cấy lúa dệt tằm, mở mang phong hóa. Sau khi hóa về trời, nhân dân nhớ ơn đã lập đền phụng thờ trang nghiêm trên đỉnh non thiêng Thạch Bàn.</p>
      <p class="article-body-p">Tây Thiên còn nổi danh là cái nôi giao thoa hiếm có giữa Tín ngưỡng Thờ Mẫu Tam Phủ và Đạo Phật thời kỳ đầu tại Việt Nam, nơi tiếng chuông chùa sớm tối hòa cùng khói sương bảng lảng.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    ],
    videoTitle: "Khám phá huyền tích: Non thiêng Tây Thiên mây phủ",
    videoDuration: "08:24",
    multidisciplinary: {
      history: {
        title: "Lịch sử & Niên đại",
        points: [
          "Khởi dựng từ thời Hùng Vương thứ 7, trùng tu lớn vào thời Lý - Trần - Lê.",
          "Được sắc phong danh xưng cao quý: 'Tam Đảo Sơn Trụ Quốc Mẫu Thượng Đẳng Thần'.",
          "Hệ thống văn bia, chuông đồng và sắc phong cổ lưu giữ giá trị lịch sử độc bản."
        ]
      },
      geography: {
        title: "Địa lí & Sinh thái",
        points: [
          "Nằm trên dãy núi Tam Đảo ở độ cao từ 500m đến gần 1.200m so với mực nước biển.",
          "Khí hậu á nhiệt đới trong lành, sương mù bao phủ quanh năm.",
          "Bao quanh bởi quần thể rừng nguyên sinh với dòng Thác Bạc và Suối Vàng róc rách."
        ]
      },
      culture: {
        title: "Văn hóa & Giáo dục",
        points: [
          "Lễ hội Tây Thiên diễn ra từ ngày 15 đến 17/2 âm lịch hàng năm.",
          "Không gian diễn xướng hát Soọng cô của đồng bào Sán Dìu cư ngụ dưới chân núi.",
          "Bài học về tinh thần yêu nước quật khởi và đạo lý 'Uống nước nhớ nguồn'."
        ]
      }
    },
    quiz: {
      question: "Đền Mẫu Tây Thiên được xây dựng để phụng thờ vị thần có công phò tá thời kỳ nào?",
      options: [
        "A. Thời Hùng Vương (Vua Hùng Chiêu Vương)",
        "B. Thời Tiền Lê (Lê Đại Hành)",
        "C. Thời nhà Lý (Lý Thái Tổ)",
        "D. Thời Tây Sơn (Quang Trung)"
      ],
      correctIndex: 0,
      explanation: "Chính xác! Quốc Mẫu Lăng Thị Tiêu là chính vương phi của Hùng Chiêu Vương (thế kỷ thứ 7 TCN), người có công phò vua đánh giặc và mở mang bờ cõi non sông."
    },
    fact: {
      title: "Cái nôi Phật giáo & Tín ngưỡng Thờ Mẫu song hành",
      text: "Các nhà khảo cổ học phát hiện Tây Thiên chính là một trong những trung tâm tiếp nhận Phật giáo từ Ấn Độ sang Việt Nam sớm nhất vào thế kỷ thứ 3 TCN, cùng thời với Luy Lâu, tạo nên sự hòa quyện tuyệt vời với tín ngưỡng bản địa.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=600"
    }
  },

  {
    id: "mu-cang-chai",
    title: "Ruộng bậc thang Mù Cang Chải",
    province: "Yên Bái",
    category: "scenery",
    categoryName: "Danh lam thắng cảnh kỳ vĩ",
    coords: { top: 48, left: 45 },
    rating: "5.0",
    reviewsCount: 312,
    lead: "Bản giao hưởng giữa con người và đại ngàn — Tuyệt tác điêu khắc khổng lồ tạc vào sườn núi Hoàng Liên Sơn.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=1200",
    overview: `
      <p class="article-body-p">Được vinh danh là Di tích Quốc gia Đặc biệt, hơn 2.200 ha ruộng bậc thang tại Mù Cang Chải là kỳ quan độc nhất vô nhị do bàn tay và khối óc của đồng bào người Mông kiến tạo qua hàng trăm năm.</p>
      <p class="article-body-p">Nằm nép mình dưới chân đèo Khau Phạ — một trong 'Tứ đại đỉnh đèo' hùng vĩ bậc nhất miền Bắc — Mù Cang Chải biến đổi diện mạo theo từng mùa: mùa nước đổ (tháng 5-6) long lanh như những tấm gương trời phản chiếu mây non, và mùa vàng rực rỡ (tháng 9-10) khi những sườn đồi hóa thành biển vàng bất tận.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    ],
    videoTitle: "Tuyệt tác Mù Cang Chải: Bản hòa ca mùa lúa chín",
    videoDuration: "10:15",
    multidisciplinary: {
      history: {
        title: "Lịch sử & Canh tác",
        points: [
          "Bắt đầu hình thành từ hơn 300 năm trước khi người Mông di cư đến định cư tại sườn Hoàng Liên.",
          "Hệ thống dẫn thủy nhập điền bằng ống tre nứa độc đáo truyền qua nhiều đời.",
          "Được công nhận là Di tích quốc gia đặc biệt năm 2019."
        ]
      },
      geography: {
        title: "Địa hình & Khí hậu",
        points: [
          "Độ dốc trung bình 30 - 45 độ, độ cao từ 1.000m đến 1.700m so với mực nước biển.",
          "Khí hậu cận nhiệt đới vùng núi cao mát mẻ quanh năm, mây sương dày đặc.",
          "Ba vùng lõi đẹp nhất gồm: Đồi Mâm Xôi (La Pán Tẩn), Đồi Móng Ngựa (Sáng Nhù) và Chế Cu Nha."
        ]
      },
      culture: {
        title: "Văn hóa & Tín ngưỡng",
        points: [
          "Lễ cúng cơm mới của người Mông tạ ơn đất trời và tổ tiên cho mùa màng bội thu.",
          "Tiếng khèn Mông du dương cất lên trong những ngày hội gặt hái.",
          "Nghệ thuật thêu váy hoa thổ cẩm bằng sáp ong tinh xảo của phụ nữ Mông."
        ]
      }
    },
    quiz: {
      question: "Địa danh nào tại Mù Cang Chải nổi tiếng với hình tượng 'Đồi Mâm Xôi' biểu tượng?",
      options: [
        "A. Xã La Pán Tẩn",
        "B. Xã Chế Cu Nha",
        "C. Bản Lìm Mông",
        "D. Thị trấn Nghĩa Lộ"
      ],
      correctIndex: 0,
      explanation: "Chính xác! Đồi Mâm Xôi nằm ở bản Hán Xung, xã La Pán Tẩn, là tọa độ biểu tượng gắn liền với danh xưng di sản ruộng bậc thang Mù Cang Chải."
    },
    fact: {
      title: "Nghệ thuật dẫn nước trên đỉnh trời",
      text: "Người Mông không dùng máy bơm hay đập bê tông. Họ dùng sự am hiểu tinh tế về độ dốc tự nhiên để xẻ rãnh nước từ các khe suối ngàn năm, phân bổ dòng nước công bằng tới từng thửa ruộng mà không làm xói lở đất.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=600"
    }
  },

  {
    id: "dien-bien-phu",
    title: "Chiến trường Điện Biên Phủ",
    province: "Điện Biên",
    category: "history",
    categoryName: "Di tích lịch sử kháng chiến",
    coords: { top: 58, left: 24 },
    rating: "4.9",
    reviewsCount: 420,
    lead: "Năm mươi sáu ngày đêm khoét núi, ngủ hầm, mưa dầm, cơm vắt — Bản anh hùng ca lừng lẫy năm châu chấn động địa cầu.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1200",
    overview: `
      <p class="article-body-p">Quần thể di tích chiến trường Điện Biên Phủ là biểu tượng sáng ngời cho ý chí quật cường của dân tộc Việt Nam trong cuộc kháng chiến chống thực dân Pháp. Nơi đây từng chứng kiến 56 ngày đêm chiến đấu ngoan cường của quân và dân ta dưới sự lãnh đạo tài tình của Đại tướng Võ Nguyên Giáp.</p>
      <p class="article-body-p">Hệ thống di tích gồm 45 điểm di tích thành phần tiêu biểu như: Đồi A1, Hầm De Castries, Cứ điểm Him Lam, Cầu Mường Thanh, Đồi Độc Lập và Sở chỉ huy chiến dịch Mường Phăng ẩn mình trong rừng già nguyên sinh.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800"
    ],
    videoTitle: "Ký ức hào hùng: Trận quyết chiến Điện Biên Phủ 1954",
    videoDuration: "12:40",
    multidisciplinary: {
      history: {
        title: "Ý nghĩa Lịch sử",
        points: [
          "Chiến thắng ngày 7/5/1954 đập tan tập đoàn cứ điểm quân sự mạnh nhất của Pháp.",
          "Chấm dứt hoàn toàn ách thống trị của thực dân Pháp tại Đông Dương.",
          "Cổ vũ phong trào giải phóng dân tộc trên toàn thế giới, đặc biệt là châu Phi."
        ]
      },
      geography: {
        title: "Địa bàn Lòng chảo",
        points: [
          "Thung lũng Mường Thanh dài 20km, rộng 6km, lòng chảo phì nhiêu nhất vùng Tây Bắc.",
          "Bao quanh bởi các dãy núi cao dựng đứng hiểm trở, dòng sông Nậm Rốm chảy hiền hòa.",
          "Địa thế lòng chảo từng khiến quân Pháp ảo tưởng là 'pháo đài bất khả xâm phạm'."
        ]
      },
      culture: {
        title: "Giáo dục & Tri ân",
        points: [
          "Nghĩa trang liệt sĩ Đồi A1 nơi yên nghỉ của hàng ngàn anh hùng vô danh.",
          "Bức tranh Panorama Điện Biên Phủ lớn nhất thế giới tại Bảo tàng Chiến thắng.",
          "Bài học về tinh thần đại đoàn kết toàn dân và sức mạnh của lòng quả cảm."
        ]
      }
    },
    quiz: {
      question: "Đồi A1 trong chiến dịch Điện Biên Phủ đã được bộ đội ta tiêu diệt bằng loại vũ khí đặc biệt nào vào đêm 6/5/1954?",
      options: [
        "A. Khối bộc phá ngàn cân (gần 1.000kg) đào sâu dưới lòng đồi",
        "B. Pháo cao xạ 37mm",
        "C. Xe tăng hạng nặng",
        "D. Tên lửa tự chế"
      ],
      correctIndex: 0,
      explanation: "Chính xác! Quân ta đã bí mật đào một đường hầm dài 47m xuyên vào lòng Đồi A1 và kích nổ khối bộc phá gần 1 tấn, phá hủy công sự ngầm kiên cố của địch."
    },
    fact: {
      title: "Hạt cơm nghĩa tình Mường Thanh",
      text: "Gạo Điện Biên (đặc sản nếp nương Mường Thanh) cùng sự chở che, đóng góp lương thực và công sức của đồng bào các dân tộc Thái, H'Mông, Dao đã góp phần quan trọng nuôi dưỡng cả một chiến dịch thắng lợi vẻ vang.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=600"
    }
  },

  {
    id: "vua-meo",
    title: "Dinh thự Hoàng A Tưởng (Vua Mèo Bắc Hà)",
    province: "Lào Cai",
    category: "mystery",
    categoryName: "Địa điểm kỳ bí & Kiến trúc cổ",
    coords: { top: 22, left: 52 },
    rating: "4.7",
    reviewsCount: 96,
    lead: "Pháo đài bí ẩn giữa cao nguyên trắng — Nơi phong thủy huyền vi phương Đông giao hòa cùng nét cổ điển phương Tây.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1200",
    overview: `
      <p class="article-body-p">Nằm sừng sững giữa trung tâm thị trấn Bắc Hà (Lào Cai), Dinh thự Hoàng A Tưởng (còn gọi là Dinh Vua Mèo) được xây dựng từ năm 1914 đến 1921. Đây là cơ ngơi quyền lực của hai cha con thổ ty Hoàng Yến Tchao và Hoàng A Tưởng, người từng cai quản cả vùng cao nguyên Bắc Hà.</p>
      <p class="article-body-p">Tòa dinh thự mang đậm vẻ huyền bí với các đường hầm thoát hiểm, tường thành dày 50cm có lỗ châu mai phòng thủ, cùng vô số giai thoại dân gian về phong thủy trấn yểm và những căn hầm bí mật chôn giấu thuốc phiện và vàng bạc thời xưa.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    ],
    videoTitle: "Giải mã kiến trúc Dinh thự Vua Mèo giữa đại ngàn Bắc Hà",
    videoDuration: "07:18",
    multidisciplinary: {
      history: {
        title: "Bối cảnh Lịch sử",
        points: [
          "Xây dựng trong thời kỳ Pháp thuộc, phản ánh quyền lực của tầng lớp thổ ty miền núi.",
          "Hai kỹ sư thiết kế gồm một người Pháp và một thầy phong thủy người Trung Hoa.",
          "Trở thành chứng tích kiến trúc lịch sử độc đáo phản ánh xã hội thuộc địa phân hóa."
        ]
      },
      geography: {
        title: "Vị thế Phong thủy",
        points: [
          "Tọa lạc trên một quả đồi rộng, thế đất 'tựa sơn đạp thủy' đón ánh mặt trời.",
          "Khí hậu cao nguyên Bắc Hà mát mẻ quanh năm, bốn bề núi non che chắn vững chãi.",
          "Mùa xuân hoa mận, hoa lê nở trắng cả thung lũng tạo nên tên gọi 'Cao nguyên trắng'."
        ]
      },
      culture: {
        title: "Văn hóa & Đời sống",
        points: [
          "Gắn liền với phiên chợ vùng cao Bắc Hà rực rỡ sắc màu thổ cẩm và rượu ngô Bản Phố.",
          "Lễ hội đua ngựa truyền thống Bắc Hà không yên ngựa độc nhất vô nhị.",
          "Bảo tồn di sản kiến trúc kết hợp Á - Âu hiếm có của Việt Nam."
        ]
      }
    },
    quiz: {
      question: "Dinh thự Hoàng A Tưởng được xây dựng mất bao nhiêu năm mới hoàn thành?",
      options: [
        "A. 3 năm",
        "B. 7 năm (1914 - 1921)",
        "C. 15 năm",
        "D. 20 năm"
      ],
      correctIndex: 1,
      explanation: "Chính xác! Dinh thự được khởi công xây dựng từ năm 1914 và phải mất 7 năm ròng rã vận chuyển nguyên vật liệu xuyên rừng núi mới hoàn thiện vào năm 1921."
    },
    fact: {
      title: "Hỗn hợp vôi mật tráng thành lũy bất khả xâm phạm",
      text: "Tường của dinh thự dày từ 50 - 60cm được xây bằng gạch nung tại chỗ từ đất sét vùng đồi, gắn kết bằng mật mía, vôi tôi và cát sông, tạo nên kết cấu bền vững kiên cố qua hơn một thế kỷ mưa nắng gió tuyết.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=600"
    }
  },

  {
    id: "bao-ha",
    title: "Đền Bảo Hà (Thờ Ông Hoàng Bảy)",
    province: "Lào Cai",
    category: "temple",
    categoryName: "Đền / Miếu linh thiêng",
    coords: { top: 32, left: 47 },
    rating: "4.8",
    reviewsCount: 184,
    lead: "Trấn ải biên cương nghìn năm sông Hồng cuộn sóng — Oai linh Thần Vệ quốc phù trì non sông xã tắc.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=1200",
    overview: `
      <p class="article-body-p">Đền Bảo Hà nằm bên bờ hữu ngạn sông Hồng thuộc xã Bảo Hà, huyện Bảo Yên, tỉnh Lào Cai. Đền thờ vị anh hùng dân tộc Nguyễn Hoàng Bảy — một danh tướng thời Hậu Lê (niên hiệu Cảnh Hưng) đã có công dẹp giặc ngoại xâm phương Bắc, giữ vững bờ cõi biên cương Tây Bắc.</p>
      <p class="article-body-p">Trong hệ thống Tín ngưỡng Thờ Mẫu Tam Tứ Phủ của người Việt, Ông Hoàng Bảy ngự ở hàng Tứ Phủ Quan Hoàng, nổi tiếng với sự anh minh, uy vũ và lòng thương yêu muôn dân. Đền Bảo Hà được xếp hạng Di tích Lịch sử - Văn hóa cấp Quốc gia từ năm 1997.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    ],
    videoTitle: "Huyền tích Quan Hoàng Bảy: Người giữ cửa ải biên thùy",
    videoDuration: "06:50",
    multidisciplinary: {
      history: {
        title: "Chiến tích Lịch sử",
        points: [
          "Thế kỷ 18, vùng Quy Hóa (Lào Cai) thường xuyên bị giặc cỏ cướp phá biên thùy.",
          "Tướng quân Hoàng Bảy cùng tướng quân Nguyễn Văn Nhẫn thống lĩnh quân binh đánh đuổi giặc, khai thông đường thủy bộ.",
          "Khi ngài hy sinh, nhân dân thương tiếc lập đền tôn vinh là 'Trấn Vệ Quốc'."
        ]
      },
      geography: {
        title: "Vị thế Địa lý",
        points: [
          "Lưng tựa dãy núi Cấm hùng vĩ, mặt hướng dòng sông Hồng cuộn chảy phù sa.",
          "Là yết hầu giao thương huyết mạch nối liền đồng bằng Bắc Bộ với miền biên ải.",
          "Cảnh sắc sông núi hữu tình, phong cảnh tĩnh mịch giữa ngàn cây cổ thụ."
        ]
      },
      culture: {
        title: "Tín ngưỡng & Lễ hội",
        points: [
          "Lễ hội truyền thống diễn ra vào ngày 17 tháng 7 âm lịch thu hút đông đảo du khách thập phương.",
          "Nghi thức thực hành Hầu đồng mang đậm bản sắc văn hóa phi vật thể của dân tộc.",
          "Đạo lý tôn kính các bậc tiền nhân có công khai phá và bảo vệ đất nước."
        ]
      }
    },
    quiz: {
      question: "Tước hiệu tôn quý mà triều đình phong tặng cho Ông Hoàng Bảy được thờ tại Bảo Hà là gì?",
      options: [
        "A. Thần Vệ Quốc Hộ Dân",
        "B. Thái Tôn Thượng Đẳng Thần",
        "C. Khâm Sai Đại Thần",
        "D. Thần Hoàng Trấn Vũ"
      ],
      correctIndex: 0,
      explanation: "Chính xác! Các triều đại phong kiến vua Tự Đức, Khải Định đều ban sắc phong tôn xưng Ông Hoàng Bảy là 'Trấn Vệ Quốc' dũng cảm trừ giặc giữ nước."
    },
    fact: {
      title: "Huyền thoại ngựa thần trên dòng sông Hồng",
      text: "Tương truyền khi ngài tử trận trên sông, xác ngài trôi dạt về đến bến sông Bảo Hà thì dừng lại, trời nổi mây mù sấm chớp, có con tuấn mã màu hoa râm hí vang trời rồi hóa thân thành tảng đá lớn trấn giữ cửa ải đền thờ.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=600"
    }
  },

  {
    id: "muong-luan",
    title: "Tháp cổ Mường Luân",
    province: "Điện Biên",
    category: "history",
    categoryName: "Di tích lịch sử & Nghệ thuật cổ",
    coords: { top: 66, left: 30 },
    rating: "4.6",
    reviewsCount: 78,
    lead: "Ngọn tháp cổ trầm mặc bên bờ sông Mã — Dấu ấn tình hữu nghị Việt - Lào nghìn đời gắn kết.",
    coverImg: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1200",
    overview: `
      <p class="article-body-p">Tọa lạc tại xã Mường Luân, huyện Điện Biên Đông, Tháp Mường Luân là một kiệt tác kiến trúc cổ được xây dựng vào thế kỷ 16 thời Lê Trung Hưng. Tháp cao 15,5 mét, uy nghiêm soi bóng xuống dòng sông Mã lịch sử.</p>
      <p class="article-body-p">Toàn bộ tháp được xây bằng gạch nung đỏ gắn kết bằng vôi mật, chia làm 3 tầng với những mảng phù điêu đắp nổi hình hoa sen, cánh rùa, sóng nước và rồng cuộn. Tháp là minh chứng sống động cho sự hòa quyện văn hóa tâm linh Phật giáo giữa nhân dân hai nước Việt Nam và Lào nơi biên giới.</p>
    `,
    gallery: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800",
      "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800"
    ],
    videoTitle: "Bí ẩn tháp cổ Mường Luân thế kỷ 16 trên bờ sông Mã",
    videoDuration: "05:40",
    multidisciplinary: {
      history: {
        title: "Niên đại & Khởi dựng",
        points: [
          "Xây dựng vào khoảng năm 1569 dưới thời vua Lê Thế Tông.",
          "Cùng với tháp Chiềng Sơ tạo nên cặp tháp Phật giáo cổ nhất vùng Tây Bắc.",
          "Được công nhận là Di tích Kiến trúc Nghệ thuật cấp Quốc gia năm 1980."
        ]
      },
      geography: {
        title: "Tọa độ Sông Mã",
        points: [
          "Nằm trên một khu đất cao bằng phẳng bên hữu ngạn thượng nguồn sông Mã hung dữ.",
          "Vùng đất giáp ranh giữa cộng đồng người Lào và người Thái Tây Bắc.",
          "Địa thế bao bọc bởi đồi nương trù phú và cánh rừng bạt ngàn."
        ]
      },
      culture: {
        title: "Nghệ thuật & Tình anh em",
        points: [
          "Hoa văn điêu khắc chịu ảnh hưởng sâu đậm từ nghệ thuật Phật giáo Nam tông Lào.",
          "Nơi diễn ra lễ hội Té nước (Bun Huột Nặm) mừng năm mới truyền thống của người Lào.",
          "Biểu tượng keo sơn gắn bó keo sơn thủy chung giữa hai dân tộc anh em Việt - Lào."
        ]
      }
    },
    quiz: {
      question: "Tháp Mường Luân (Điện Biên) được xây dựng chủ yếu bằng vật liệu gì?",
      options: [
        "A. Gạch nung đỏ và vữa vôi mật mía truyền thống",
        "B. Đá hoa cương nguyên khối",
        "C. Gỗ lim và đá phiến",
        "D. Bê tông cốt thép thế kỷ 20"
      ],
      correctIndex: 0,
      explanation: "Chính xác! Tháp Mường Luân được dựng bằng gạch vồ nung đỏ gắn kết bằng hỗn hợp vôi tôi, mật mía và cát mịn, giữ vững cấu trúc vững chắc qua gần 500 năm."
    },
    fact: {
      title: "Huyền tích quả chuông đồng dưới lòng sông Mã",
      text: "Các già bản Mường Luân kể lại rằng, xưa kia trên đỉnh tháp có một quả chuông vàng phát ra tiếng ngân vang khắp thung lũng, sau này để tránh bị giặc ngoại xâm cướp phá, nhân dân đã giấu quả chuông dưới đáy vực sâu sông Mã.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=600"
    }
  }
];

// --- 2. PASSPORT & BADGES LOGIC ---
const BADGES_CONFIG = [
  {
    id: "explorer",
    name: "Nhà Thám Hiểm (Explorer)",
    desc: "Mở và đọc khám phá ít nhất 2 di tích Tây Bắc.",
    icon: "🧭",
    threshold: 2
  },
  {
    id: "historian",
    name: "Nhà Sử Học (Historian)",
    desc: "Hoàn thành và vượt qua ít nhất 2 bài Quiz thử thách.",
    icon: "📜",
    threshold: 2
  },
  {
    id: "master",
    name: "Bậc Thầy Tây Bắc (Master)",
    desc: "Khám phá trọn vẹn tất cả 6 di tích và đóng dấu tem.",
    icon: "👑",
    threshold: 6
  }
];

class PassportManager {
  constructor() {
    this.exploredKey = "taybac_explored_sites";
    this.quizzesKey = "taybac_completed_quizzes";
  }

  getExplored() {
    try {
      return JSON.parse(localStorage.getItem(this.exploredKey) || "[]");
    } catch {
      return [];
    }
  }

  markExplored(siteId) {
    const list = this.getExplored();
    if (!list.includes(siteId)) {
      list.push(siteId);
      localStorage.setItem(this.exploredKey, JSON.stringify(list));
      this.updateUI();
    }
  }

  getCompletedQuizzes() {
    try {
      return JSON.parse(localStorage.getItem(this.quizzesKey) || "[]");
    } catch {
      return [];
    }
  }

  markQuizCompleted(siteId) {
    const list = this.getCompletedQuizzes();
    if (!list.includes(siteId)) {
      list.push(siteId);
      localStorage.setItem(this.quizzesKey, JSON.stringify(list));
      this.updateUI();
    }
  }

  isUnlocked(badgeId) {
    const explored = this.getExplored();
    const quizzes = this.getCompletedQuizzes();

    if (badgeId === "explorer") return explored.length >= 2;
    if (badgeId === "historian") return quizzes.length >= 2;
    if (badgeId === "master") return explored.length >= HERITAGE_SITES.length;
    return false;
  }

  updateUI() {
    const exploredCount = this.getExplored().length;
    const passportCounter = document.getElementById("passportCounter");
    if (passportCounter) {
      passportCounter.textContent = `${exploredCount}/${HERITAGE_SITES.length} Điểm`;
    }

    const passportExploredStat = document.getElementById("passportExploredStat");
    if (passportExploredStat) {
      passportExploredStat.textContent = `${exploredCount}/${HERITAGE_SITES.length}`;
    }

    // Update Badges List
    BADGES_CONFIG.forEach(badge => {
      const el = document.getElementById(`badge-${badge.id}`);
      if (el) {
        if (this.isUnlocked(badge.id)) {
          el.classList.add("unlocked");
        } else {
          el.classList.remove("unlocked");
        }
      }
    });
  }
}

const passportManager = new PassportManager();

// --- 3. AMBIENT WEB AUDIO SYNTHESIZER (NORTHWEST FLUTE & WIND SOUNDSCAPE) ---
class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playFluteNote(freq, duration = 2.4, gainLevel = 0.08) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    
    // Main Oscillator (Bamboo flute timbre)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    // Subtle vibrato
    const vibrato = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, now);
    vibGain.gain.setValueAtTime(freq * 0.015, now);
    vibrato.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    // Warm Low-pass Filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);

    // Gentle Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  startMelody() {
    // Pentatonic Scale (Do - Re - Fa - Sol - La / C4, D4, F4, G4, A4, C5)
    const notes = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
    
    const playNext = () => {
      if (!this.isPlaying) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.playFluteNote(note, 3.2, 0.07);
      
      const nextDelay = 2200 + Math.random() * 2600;
      this.timer = setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  toggle() {
    this.init();
    const btn = document.getElementById("btnAudio");
    const label = document.getElementById("audioLabel");

    if (this.isPlaying) {
      this.isPlaying = false;
      clearTimeout(this.timer);
      if (btn) btn.classList.remove("playing");
      if (label) label.textContent = "Bật âm thanh";
    } else {
      this.isPlaying = true;
      this.startMelody();
      if (btn) btn.classList.add("playing");
      if (label) label.textContent = "Nhạc Tây Bắc";
    }
  }
}

const soundscape = new SoundscapeEngine();

// --- 4. INTERACTIVE BOOK READER CONTROLLER (Artboards 5, 6, 7, 8, 9, 11, 12) ---
class BookReader {
  constructor() {
    this.currentSite = null;
    this.backdrop = document.getElementById("bookModalBackdrop");
    this.tabButtons = document.querySelectorAll(".book-tab-btn");
    this.tabPanels = document.querySelectorAll(".tab-panel");
    this.stampEl = document.getElementById("stampExplored");

    this.initEvents();
  }

  initEvents() {
    // Tab switching inside book
    this.tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        this.switchTab(targetTab);
      });
    });

    // Close book button
    const closeBtn = document.getElementById("btnBookClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Close on backdrop click
    if (this.backdrop) {
      this.backdrop.addEventListener("click", (e) => {
        if (e.target === this.backdrop) this.close();
      });
    }

    // Submit Quiz button
    const submitQuizBtn = document.getElementById("btnSubmitQuiz");
    if (submitQuizBtn) {
      submitQuizBtn.addEventListener("click", () => this.checkQuiz());
    }

    // Post comment button
    const postCommentBtn = document.getElementById("btnPostComment");
    if (postCommentBtn) {
      postCommentBtn.addEventListener("click", () => this.addComment());
    }
  }

  open(siteId) {
    const site = HERITAGE_SITES.find(s => s.id === siteId) || HERITAGE_SITES[0];
    this.currentSite = site;

    // 1. Populate Left Page (Hero Cover & Details)
    const coverImg = document.getElementById("bookCoverImg");
    if (coverImg) coverImg.src = site.coverImg;

    const bookHeroTitle = document.getElementById("bookHeroTitle");
    if (bookHeroTitle) bookHeroTitle.textContent = site.title;

    const bookHeroProvince = document.getElementById("bookHeroProvince");
    if (bookHeroProvince) bookHeroProvince.textContent = `${site.categoryName} · ${site.province}`;

    const bookHeroQuote = document.getElementById("bookHeroQuote");
    if (bookHeroQuote) bookHeroQuote.textContent = `“${site.lead}”`;

    // 2. Populate Tab 1: Overview
    const articleTitle = document.getElementById("bookArticleTitle");
    if (articleTitle) articleTitle.textContent = site.title;

    const articleKicker = document.getElementById("bookArticleKicker");
    if (articleKicker) articleKicker.textContent = `HỒ SƠ DI SẢN · ${site.province}`;

    const articleBody = document.getElementById("bookArticleBody");
    if (articleBody) articleBody.innerHTML = site.overview;

    // 3. Populate Tab 2: Gallery & Video
    const galleryContainer = document.getElementById("bookGalleryGrid");
    if (galleryContainer) {
      galleryContainer.innerHTML = site.gallery.map((imgUrl, i) => `
        <div class="gallery-item">
          <img src="${imgUrl}" alt="${site.title} ảnh ${i + 1}" loading="lazy">
        </div>
      `).join("");
    }

    const videoTitle = document.getElementById("bookVideoTitle");
    if (videoTitle) videoTitle.textContent = site.videoTitle;

    const videoDuration = document.getElementById("bookVideoDuration");
    if (videoDuration) videoDuration.textContent = site.videoDuration;

    // 4. Populate Tab 3: Multidisciplinary 3 Angles
    const m = site.multidisciplinary;
    const historyList = document.getElementById("bookHistoryPoints");
    if (historyList) {
      historyList.innerHTML = m.history.points.map(pt => `<li>${pt}</li>`).join("");
    }
    const geoList = document.getElementById("bookGeoPoints");
    if (geoList) {
      geoList.innerHTML = m.geography.points.map(pt => `<li>${pt}</li>`).join("");
    }
    const cultureList = document.getElementById("bookCulturePoints");
    if (cultureList) {
      cultureList.innerHTML = m.culture.points.map(pt => `<li>${pt}</li>`).join("");
    }

    // 5. Populate Tab 4: Quiz
    const quizQuestion = document.getElementById("bookQuizQuestion");
    if (quizQuestion) quizQuestion.textContent = site.quiz.question;

    const quizOptions = document.getElementById("bookQuizOptions");
    if (quizOptions) {
      quizOptions.innerHTML = site.quiz.options.map((opt, i) => `
        <div class="quiz-opt" data-index="${i}">
          <span>${opt}</span>
        </div>
      `).join("");

      // Add selection event
      quizOptions.querySelectorAll(".quiz-opt").forEach(optEl => {
        optEl.addEventListener("click", () => {
          quizOptions.querySelectorAll(".quiz-opt").forEach(o => o.classList.remove("selected"));
          optEl.classList.add("selected");
        });
      });
    }

    const quizFeedback = document.getElementById("bookQuizFeedback");
    if (quizFeedback) {
      quizFeedback.className = "quiz-feedback";
      quizFeedback.textContent = "";
    }

    // 6. Populate Tab 5: Fact
    const factTitle = document.getElementById("bookFactTitle");
    if (factTitle) factTitle.textContent = site.fact.title;

    const factText = document.getElementById("bookFactText");
    if (factText) factText.textContent = site.fact.text;

    const factImg = document.getElementById("bookFactImg");
    if (factImg) factImg.src = site.fact.img;

    // Check if already explored (show stamp)
    const isExplored = passportManager.getExplored().includes(site.id);
    if (this.stampEl) {
      if (isExplored) {
        this.stampEl.classList.add("stamped");
      } else {
        this.stampEl.classList.remove("stamped");
      }
    }

    // Default to tab 1
    this.switchTab("overview");

    // Show modal
    this.backdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    // Mark as explored in passport
    passportManager.markExplored(site.id);

    // Trigger stamp animation smoothly after 1.2s if not stamped yet
    setTimeout(() => {
      if (this.stampEl) this.stampEl.classList.add("stamped");
    }, 1200);
  }

  close() {
    this.backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  switchTab(tabKey) {
    this.tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabKey);
    });

    this.tabPanels.forEach(panel => {
      panel.classList.toggle("active", panel.id === `tab-${tabKey}`);
    });
  }

  checkQuiz() {
    if (!this.currentSite) return;
    const selectedOpt = document.querySelector(".quiz-opt.selected");
    const feedback = document.getElementById("bookQuizFeedback");

    if (!selectedOpt) {
      if (feedback) {
        feedback.textContent = "Vui lòng chọn 1 phương án trả lời trước khi kiểm tra!";
        feedback.className = "quiz-feedback show error";
      }
      return;
    }

    const selectedIndex = parseInt(selectedOpt.dataset.index, 10);
    const isCorrect = selectedIndex === this.currentSite.quiz.correctIndex;

    const allOpts = document.querySelectorAll(".quiz-opt");
    allOpts.forEach((opt, idx) => {
      if (idx === this.currentSite.quiz.correctIndex) {
        opt.classList.add("correct");
      } else if (idx === selectedIndex && !isCorrect) {
        opt.classList.add("wrong");
      }
    });

    if (feedback) {
      if (isCorrect) {
        feedback.innerHTML = `<strong>Rất xuất sắc!</strong> ${this.currentSite.quiz.explanation}`;
        feedback.className = "quiz-feedback show success";
        passportManager.markQuizCompleted(this.currentSite.id);
      } else {
        feedback.innerHTML = `<strong>Chưa chính xác!</strong> Hãy xem lại nội dung tổng quan hoặc thử lại nhé.`;
        feedback.className = "quiz-feedback show error";
      }
    }
  }

  addComment() {
    const input = document.getElementById("commentInput");
    const list = document.getElementById("commentsList");
    if (!input || !input.value.trim() || !list) return;

    const commentText = input.value.trim();
    const commentItem = document.createElement("div");
    commentItem.className = "comment-item";
    commentItem.innerHTML = `
      <div class="comment-user-avatar">Bạn</div>
      <div class="comment-content">
        <span class="comment-author">Độc giả Tây Bắc</span>
        <span class="comment-date">Vừa xong</span>
        <div class="stars">★★★★★</div>
        <p class="comment-text">${commentText}</p>
      </div>
    `;

    list.prepend(commentItem);
    input.value = "";
  }
}

// --- 5. INTERACTIVE MAP CONTROLLER (Artboard 4) ---
class HeritageMapController {
  constructor(bookReader) {
    this.bookReader = bookReader;
    this.currentCategory = "all";
    this.searchQuery = "";
    this.popup = document.getElementById("mapPopupCard");
    this.pinsContainer = document.getElementById("mapPinsContainer");

    this.init();
  }

  init() {
    this.renderPins();
    this.bindEvents();
  }

  bindEvents() {
    // Filter chips
    const chips = document.querySelectorAll(".filter-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.currentCategory = chip.dataset.category;
        this.renderPins();
      });
    });

    // Search box
    const searchInput = document.getElementById("mapSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderPins();
      });
    }

    // Popup Close
    const closeBtn = document.getElementById("btnPopupClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.popup.classList.remove("active");
      });
    }

    // Popup Explore Button
    const exploreBtn = document.getElementById("btnPopupExplore");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        const siteId = exploreBtn.dataset.siteId;
        if (siteId) {
          this.popup.classList.remove("active");
          this.bookReader.open(siteId);
        }
      });
    }
  }

  renderPins() {
    if (!this.pinsContainer) return;
    this.pinsContainer.innerHTML = "";

    const filtered = HERITAGE_SITES.filter(site => {
      const matchCat = this.currentCategory === "all" || site.category === this.currentCategory;
      const matchSearch = !this.searchQuery || 
        site.title.toLowerCase().includes(this.searchQuery) ||
        site.province.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    filtered.forEach(site => {
      const marker = document.createElement("div");
      marker.className = "map-marker";
      marker.style.top = `${site.coords.top}%`;
      marker.style.left = `${site.coords.left}%`;

      marker.innerHTML = `
        <div class="marker-pin ${site.category}">
          <div class="marker-pin-inner">✦</div>
        </div>
        <div class="marker-label">${site.title}</div>
      `;

      marker.addEventListener("click", () => {
        this.showPopup(site);
      });

      this.pinsContainer.appendChild(marker);
    });
  }

  showPopup(site) {
    if (!this.popup) return;

    const img = document.getElementById("popupImg");
    if (img) img.src = site.coverImg;

    const province = document.getElementById("popupProvince");
    if (province) province.textContent = `${site.categoryName} · ${site.province}`;

    const title = document.getElementById("popupTitle");
    if (title) title.textContent = site.title;

    const desc = document.getElementById("popupDesc");
    if (desc) desc.textContent = site.lead;

    const exploreBtn = document.getElementById("btnPopupExplore");
    if (exploreBtn) exploreBtn.dataset.siteId = site.id;

    this.popup.classList.add("active");
  }
}

// --- 6. AI NANA CONVERSATIONAL ASSISTANT (Artboard 13) ---
class AiNanaAssistant {
  constructor(bookReader) {
    this.bookReader = bookReader;
    this.trigger = document.getElementById("nanaTrigger");
    this.drawer = document.getElementById("nanaDrawer");
    this.chatBody = document.getElementById("nanaChatBody");
    this.input = document.getElementById("nanaInput");
    this.sendBtn = document.getElementById("btnNanaSend");
    this.closeBtn = document.getElementById("btnNanaClose");
    this.quickChips = document.querySelectorAll(".quick-chip");

    this.init();
  }

  init() {
    if (this.trigger) {
      this.trigger.addEventListener("click", () => this.toggleDrawer());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeDrawer());
    }

    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener("click", () => this.handleSend());
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.handleSend();
      });
    }

    this.quickChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.dataset.prompt;
        if (query) {
          this.sendMessage(query, "user");
          this.respondTo(query);
        }
      });
    });
  }

  toggleDrawer() {
    this.drawer.classList.toggle("open");
  }

  closeDrawer() {
    this.drawer.classList.remove("open");
  }

  handleSend() {
    const text = this.input.value.trim();
    if (!text) return;
    this.sendMessage(text, "user");
    this.input.value = "";
    this.respondTo(text);
  }

  sendMessage(text, sender = "nana") {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    this.chatBody.appendChild(bubble);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  respondTo(query) {
    const q = query.toLowerCase();
    setTimeout(() => {
      let reply = "";

      if (q.includes("tây thiên") || q.includes("đền mẫu")) {
        reply = `
          Đền Mẫu Tây Thiên (Vĩnh Phúc) phụng thờ Quốc Mẫu Lăng Thị Tiêu — chính vương phi của Hùng Chiêu Vương! Nơi đây bồng bềnh mây trắng và là cái nôi giao thoa giữa tín ngưỡng Thờ Mẫu và Phật giáo thời sơ khai.
          <br><br>
          <button class="btn-popup-explore" style="margin-top:6px;padding:6px 12px;font-size:10px" onclick="window.bookReader.open('tay-thien')">Mở cuốn sổ Đền Mẫu Tây Thiên ↗</button>
        `;
      } else if (q.includes("mù cang chải") || q.includes("ruộng bậc thang") || q.includes("mùa nào")) {
        reply = `
          Mù Cang Chải đẹp nhất vào 2 mùa trong năm:
          <br>• <strong>Tháng 5 - 6 (Mùa nước đổ)</strong>: Các thửa ruộng như những tấm gương khổng lồ phản chiếu trời xanh.
          <br>• <strong>Tháng 9 - 10 (Mùa lúa chín)</strong>: Biển vàng óng ả tạc vào sườn đèo Khau Phạ!
          <br><br>
          <button class="btn-popup-explore" style="margin-top:6px;padding:6px 12px;font-size:10px" onclick="window.bookReader.open('mu-cang-chai')">Lật sổ khám phá Mù Cang Chải ↗</button>
        `;
      } else if (q.includes("điện biên") || q.includes("chiến trường") || q.includes("đồi a1")) {
        reply = `
          Chiến trường Điện Biên Phủ gắn liền với 56 ngày đêm 'khoét núi, ngủ hầm, mưa dầm, cơm vắt' lừng lẫy năm châu. Bạn có thể ghé thăm Đồi A1 với hố bộc phá nghìn cân và hầm tướng De Castries!
          <br><br>
          <button class="btn-popup-explore" style="margin-top:6px;padding:6px 12px;font-size:10px" onclick="window.bookReader.open('dien-bien-phu')">Xem hồ sơ Điện Biên Phủ ↗</button>
        `;
      } else if (q.includes("bảo hà") || q.includes("ông hoàng bảy")) {
        reply = `
          Đền Bảo Hà nằm bên bờ sông Hồng đỏ nặng phù sa, thờ Thần Vệ Quốc Ông Hoàng Bảy — vị danh tướng có công trấn ải biên cương dẹp giặc ngoại xâm cuối thời Hậu Lê.
          <br><br>
          <button class="btn-popup-explore" style="margin-top:6px;padding:6px 12px;font-size:10px" onclick="window.bookReader.open('bao-ha')">Mở trang sổ Đền Bảo Hà ↗</button>
        `;
      } else if (q.includes("vua mèo") || q.includes("hoàng a tưởng")) {
        reply = `
          Dinh thự Vua Mèo Hoàng A Tưởng ở Bắc Hà là kiệt tác kiến trúc kết hợp Á - Âu cực kỳ huyền bí, xây dựng ròng rã suốt 7 năm (1914 - 1921) với nhiều truyền thuyết về kho báu bí mật!
          <br><br>
          <button class="btn-popup-explore" style="margin-top:6px;padding:6px 12px;font-size:10px" onclick="window.bookReader.open('vua-meo')">Khám phá Dinh Hoàng A Tưởng ↗</button>
        `;
      } else if (q.includes("quiz") || q.includes("thử thách")) {
        reply = `
          Bạn muốn thử tài kiến thức ư? Rất tuyệt vời! Bạn hãy mở bất kỳ di tích nào trên bản đồ, chuyển sang tab <strong>'Quiz thử thách'</strong> để trả lời các câu hỏi và rinh huy hiệu Nhà Sử Học (Historian) nhé!
        `;
      } else {
        reply = `
          Chào bạn! Tây Bắc có muôn vàn di tích linh thiêng và huyền tích bí ẩn ở cả 6 tỉnh thành (Lào Cai, Lai Châu, Điện Biên, Sơn La, Yên Bái, Hòa Bình). Bạn có thể bấm vào bản đồ di sản hoặc hỏi Nana về bất kỳ địa danh nào nhé!
        `;
      }

      this.sendMessage(reply, "nana");
    }, 600);
  }
}

// --- 7. DOM READY INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Book Reader
  window.bookReader = new BookReader();

  // Initialize Map
  window.heritageMap = new HeritageMapController(window.bookReader);

  // Initialize AI Nana
  window.aiNana = new AiNanaAssistant(window.bookReader);

  // Initialize Passport & Badges
  passportManager.updateUI();

  // Bind Topbar Audio Toggle
  const btnAudio = document.getElementById("btnAudio");
  if (btnAudio) {
    btnAudio.addEventListener("click", () => soundscape.toggle());
  }

  // Bind Passport Modal Triggers
  const passportPill = document.getElementById("passportPill");
  const passportModal = document.getElementById("passportModal");
  const btnPassportClose = document.getElementById("btnPassportClose");

  if (passportPill && passportModal) {
    passportPill.addEventListener("click", () => {
      passportModal.classList.add("open");
      passportManager.updateUI();
    });
  }

  if (btnPassportClose && passportModal) {
    btnPassportClose.addEventListener("click", () => {
      passportModal.classList.remove("open");
    });
  }

  if (passportModal) {
    passportModal.addEventListener("click", (e) => {
      if (e.target === passportModal) passportModal.classList.remove("open");
    });
  }

  // Bind Open Book Nav Button
  const btnOpenBookNav = document.getElementById("btnOpenBookNav");
  if (btnOpenBookNav) {
    btnOpenBookNav.addEventListener("click", () => {
      window.bookReader.open("tay-thien");
    });
  }

  // Bind Hero Button
  const btnOpenHeroBook = document.getElementById("btnOpenHeroBook");
  if (btnOpenHeroBook) {
    btnOpenHeroBook.addEventListener("click", () => {
      window.bookReader.open("tay-thien");
    });
  }

  // Bind Featured Dossier Button
  const btnOpenFeaturedDossier = document.getElementById("btnOpenFeaturedDossier");
  if (btnOpenFeaturedDossier) {
    btnOpenFeaturedDossier.addEventListener("click", () => {
      window.bookReader.open("tay-thien");
    });
  }

  // Bind Read Story Cards
  document.querySelectorAll("[data-open-site]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const siteId = btn.dataset.openSite;
      if (siteId) window.bookReader.open(siteId);
    });
  });
});