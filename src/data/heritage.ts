export interface SiteData {
  id: string;
  title: string;
  province: string;
  category: "den" | "chua" | "khu-di-tich" | "danh-lam";
  categoryName: string;
  period: string;
  rating: number;
  reviewsCount: number;
  coords: { x: number; y: number }; // percentage on map
  coverImage: string;
  quote: string;
  audioNarration: string; // Text for Audio Guide narrator
  overview: {
    story: string;
    description: string;
  };
  gallery: { url: string; caption: string }[];
  video: {
    title: string;
    duration: string;
    thumbnail: string;
  };
  interdisciplinary: {
    history: {
      title: string;
      items: string[];
    };
    geography: {
      title: string;
      items: string[];
    };
    education: {
      title: string;
      items: string[];
    };
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  facts: {
    title: string;
    content: string;
    image: string;
  }[];
}

export const HERITAGE_SITES: SiteData[] = [
  // 1. VĨNH PHÚC (Cửa ngõ Tây Bắc)
  {
    id: "tay-thien",
    title: "Đền Mẫu Tây Thiên",
    province: "Vĩnh Phúc",
    category: "den",
    categoryName: "Đền",
    period: "Thời kỳ Lý - Trần",
    rating: 4.8,
    reviewsCount: 142,
    coords: { x: 74, y: 55 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1200",
    quote: "Nơi linh thiêng hội tụ của đất trời và lòng người...",
    audioNarration: "Chào mừng quý khách đến với Đền Mẫu Tây Thiên. Nằm giữa vùng núi Thạch Bàn đại ngàn Tam Đảo, nơi đây thờ phụng Quốc Mẫu Lăng Thị Tiêu — người đã có công phò vua Hùng dựng nước và mở mang bờ cõi. Hãy lắng nghe tiếng chuông chùa sớm tối hòa cùng khói sương bảng lảng.",
    overview: {
      story: "Đền Mẫu Tây Thiên là một trong những ngôi đền linh thiêng và nổi tiếng nhất của vùng đất Vĩnh Phúc. Tương truyền, đây là nơi thờ Quốc Mẫu Lăng Thị Tiêu — người có công lớn trong việc giúp vua Hùng dựng nước, được nhân dân tôn kính là Thánh Mẫu.",
      description: "Nằm giữa vùng núi Thạch Bàn thuộc dãy Tam Đảo, quần thể danh thắng Tây Thiên là sự hòa quyện tuyệt vời giữa cảnh sắc thiên nhiên hùng vĩ và không gian tâm linh thâm nghiêm. Nơi đây từ lâu đã được coi là cái nôi của Phật giáo và tín ngưỡng thờ Mẫu Việt Nam."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Đền Thượng trong làn sương mây Tam Đảo" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800", caption: "Đường lên non thiêng ngút ngàn rừng trúc" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800", caption: "Thác Bạc róc rách bốn mùa" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800", caption: "Kiến trúc tam quan cổ kính" }
    ],
    video: {
      title: "Khám phá Đền Mẫu Tây Thiên (Phim tài liệu)",
      duration: "06:24",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: [
          "Thời gian xây dựng: Khởi dựng từ thời Hùng Vương, trùng tu lớn thời Lý - Trần.",
          "Sự kiện liên quan: Kháng chiến chống giặc Ân, phong trào phò vua cứu quốc.",
          "Nhân vật lịch sử: Quốc Mẫu Lăng Thị Tiêu (Tam Đảo Sơn Trụ Quốc Mẫu)."
        ]
      },
      geography: {
        title: "Địa lí",
        items: [
          "Vị trí địa lý: Tọa lạc sườn Tây dãy Tam Đảo, độ cao 500m - 1.200m.",
          "Đặc điểm tự nhiên: Rừng nguyên sinh á nhiệt đới, khí hậu mát mẻ quanh năm.",
          "Vai trò địa lí: Vùng đầu nguồn phòng hộ, bảo tồn đa dạng sinh học quý."
        ]
      },
      education: {
        title: "GD địa phương",
        items: [
          "Giá trị văn hóa: Di sản văn hóa phi vật thể Quốc gia (Lễ hội Tây Thiên rằm tháng 2).",
          "Ý nghĩa hiện tại: Trung tâm hành hương tâm linh kết nối Tây Bắc và Đồng bằng.",
          "Vai trò giáo dục: Bồi dưỡng truyền thống yêu nước, đạo lý uống nước nhớ nguồn."
        ]
      }
    },
    quiz: {
      question: "Đền Mẫu Tây Thiên được xây dựng vào thời kỳ nào?",
      options: ["Thời Lý", "Thời Trần", "Thời Lê", "Thời Nguyễn"],
      correctIndex: 1,
      explanation: "Chính xác! Các dấu tích kiến trúc cổ và văn bia còn lưu lại cho thấy đền được tôn tạo và phát triển rực rỡ nhất dưới triều đại nhà Trần."
    },
    facts: [
      {
        title: "Độ cao giữa đại ngàn",
        content: "Đền Mẫu Tây Thiên nằm ở độ cao khoảng 500m so với mực nước biển, được bao quanh bởi rừng nguyên sinh và khí hậu trong lành tĩnh mịch.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=600"
      },
      {
        title: "Giao thoa Đạo Mẫu và Phật Giáo",
        content: "Tây Thiên là một trong số rất ít địa danh tại Việt Nam có sự kết hợp hài hòa đặc biệt giữa tín ngưỡng thờ Quốc Mẫu và Thiền phái Trúc Lâm Yên Tử.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=600"
      }
    ]
  },

  // 2. YÊN BÁI
  {
    id: "mu-cang-chai",
    title: "Ruộng bậc thang Mù Cang Chải",
    province: "Yên Bái",
    category: "danh-lam",
    categoryName: "Danh lam thắng cảnh",
    period: "Thế kỷ 18 - Nay",
    rating: 4.9,
    reviewsCount: 310,
    coords: { x: 55, y: 38 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=1200",
    quote: "Tác phẩm điêu khắc vĩ đại của con người tạc vào vách đá cheo leo...",
    audioNarration: "Quý khách đang chiêm ngưỡng hơn hai nghìn hai trăm héc-ta ruộng bậc thang Mù Cang Chải. Đây là di tích quốc gia đặc biệt, nơi đồng bào người Mông đã dùng bàn tay khối óc khai phá sườn đèo Khau Phạ suốt hơn ba trăm năm qua.",
    overview: {
      story: "Hơn 2.200 ha ruộng bậc thang uốn lượn theo sườn núi Hoàng Liên Sơn là minh chứng sống động cho nghị lực phi thường và tri thức bản địa tinh hoa của đồng bào dân tộc Mông qua nhiều thế kỷ khai hoang lập bản.",
      description: "Vào mùa nước đổ (tháng 5-6), ruộng như những tấm gương khổng lồ phản chiếu mây trời. Đến mùa vàng (tháng 9-10), cả thung lũng Mù Cang Chải rực rỡ sắc vàng óng ả, hương lúa mới quyện vào làn gió ngàn biên giới."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800", caption: "Đồi Mâm Xôi La Pán Tẩn mùa lúa chín" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Ruộng bậc thang soi bóng mây trời" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800", caption: "Bản Lìm Mông dưới chân đèo Khau Phạ" }
    ],
    video: {
      title: "Mù Cang Chải: Bản tình ca giữa mây ngàn",
      duration: "08:15",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: [
          "Thời gian khai phá: Bắt đầu từ đầu thế kỷ 18 khi người Mông di cư đến vùng núi cao.",
          "Di sản đặc biệt: Được xếp hạng Di tích quốc gia đặc biệt năm 2019."
        ]
      },
      geography: {
        title: "Địa lí",
        items: [
          "Địa hình: Đồi núi dốc đứng 30 - 45 độ, độ cao 1.000m - 1.700m.",
          "Khí hậu: Cận nhiệt đới vùng núi, mùa đông lạnh giá, mùa hè mát mẻ."
        ]
      },
      education: {
        title: "GD địa phương",
        items: [
          "Kỹ thuật dẫn thủy nhập điền bằng ống bương nứa độc đáo.",
          "Lễ mừng cơm mới và tiếng khèn Mông kết nối cộng đồng bản làng."
        ]
      }
    },
    quiz: {
      question: "Địa danh nào tại Mù Cang Chải được mệnh danh là 'Đồi Mâm Xôi' kỳ quan?",
      options: ["Xã La Pán Tẩn", "Xã Chế Cu Nha", "Xã Dế Xu Phình", "Thị trấn Mù Cang Chải"],
      correctIndex: 0,
      explanation: "Chính xác! Đồi Mâm Xôi thuộc bản Hán Xung, xã La Pán Tẩn là biểu tượng danh thắng nổi tiếng nhất Mù Cang Chải."
    },
    facts: [
      {
        title: "Hệ thống tưới tự nhiên",
        content: "Người Mông không cần dùng bơm mà tận dụng dòng chảy tự nhiên từ đỉnh núi qua các máng tre chia đều cho từng khoảnh ruộng.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=600"
      }
    ]
  },

  // 3. ĐIỆN BIÊN
  {
    id: "dien-bien-phu",
    title: "Chiến trường Điện Biên Phủ",
    province: "Điện Biên",
    category: "khu-di-tich",
    categoryName: "Khu di tích",
    period: "Kháng chiến 1954",
    rating: 4.9,
    reviewsCount: 450,
    coords: { x: 20, y: 52 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1200",
    quote: "Bản anh hùng ca chấn động địa cầu tạc vào lòng chảo Mường Thanh...",
    audioNarration: "Chào mừng quý khách đến với Quần thể di tích Chiến trường Điện Biên Phủ. Nơi đây từng diễn ra năm mươi sáu ngày đêm khoét núi ngủ hầm, đập tan tập đoàn cứ điểm mạnh nhất Đông Dương và mở ra trang sử vàng chói lọi cho dân tộc Việt Nam.",
    overview: {
      story: "Quần thể di tích chiến trường Điện Biên Phủ ghi dấu mốc son chói lọi trong lịch sử đấu tranh giữ nước của dân tộc Việt Nam với 56 ngày đêm khoét núi ngủ hầm kiên cường.",
      description: "Các điểm di tích nổi tiếng gồm Đồi A1, Hầm De Castries, Tượng đài Chiến thắng, Nghĩa trang liệt sĩ A1 và Sở chỉ huy chiến dịch Mường Phăng nằm sâu trong tán rừng già."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800", caption: "Hầm chỉ huy tướng De Castries" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Hố bộc phá nghìn cân trên Đồi A1" }
    ],
    video: {
      title: "Ký ức hào hùng: Trận quyết chiến Điện Biên Phủ",
      duration: "09:40",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: [
          "Thời gian: Chiến dịch diễn ra từ 13/3/1954 đến 7/5/1954.",
          "Ý nghĩa: Chấm dứt ách thống trị của thực dân Pháp tại Đông Dương."
        ]
      },
      geography: {
        title: "Địa lí",
        items: [
          "Thung lũng Mường Thanh lòng chảo phì nhiêu nhất vùng Tây Bắc.",
          "Bao quanh bởi các dãy núi cao dựng đứng và dòng sông Nậm Rốm."
        ]
      },
      education: {
        title: "GD địa phương",
        items: [
          "Bồi đắp lòng tự hào dân tộc và lòng biết ơn thế hệ cha anh ngã xuống.",
          "Bảo tàng Chiến thắng Điện Biên Phủ với bức tranh Panorama lớn nhất Đông Nam Á."
        ]
      }
    },
    quiz: {
      question: "Đồi A1 trong chiến dịch Điện Biên Phủ được quân ta phá hủy bằng khối bộc phá nặng bao nhiêu?",
      options: ["Khoảng 500 kg", "Gần 1.000 kg", "2.000 kg", "300 kg"],
      correctIndex: 1,
      explanation: "Chính xác! Quân ta đã bí mật đào đường hầm sâu vào lòng đồi và kích nổ khối bộc phá gần 1.000 kg đêm 6/5/1954."
    },
    facts: [
      {
        title: "Hạt gạo Mường Thanh",
        content: "Nếp nương Mường Thanh dẻo thơm từng được đồng bào các dân tộc gùi qua đèo dốc tiếp tế cho bộ đội suốt chiến dịch.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=600"
      }
    ]
  },

  // 4. LÀO CAI
  {
    id: "bao-ha",
    title: "Đền Bảo Hà (Ông Hoàng Bảy)",
    province: "Lào Cai",
    category: "den",
    categoryName: "Đền",
    period: "Thời Hậu Lê (1740)",
    rating: 4.8,
    reviewsCount: 190,
    coords: { x: 50, y: 22 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=1200",
    quote: "Trấn ải biên cương nghìn năm sông Hồng cuộn sóng phù sa...",
    audioNarration: "Đền Bảo Hà nằm bên bờ sông Hồng đỏ nặng phù sa, là nơi thờ vị danh tướng Nguyễn Hoàng Bảy đã có công dẹp giặc ngoại xâm phương Bắc bảo vệ đồng bào vùng cao Bảo Thắng.",
    overview: {
      story: "Đền Bảo Hà nằm bên bờ sông Hồng, thờ danh tướng Nguyễn Hoàng Bảy đã có công chiêu binh dẹp giặc ngoại xâm phương Bắc, giữ vững yên bình vùng biên ải Bảo Thắng.",
      description: "Ngài được triều đình phong tước hiệu Trấn Vệ Quốc Thượng Đẳng Thần và là một trong những vị thánh uy linh nhất trong Tín ngưỡng Thờ Mẫu Tam Phủ của người Việt."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800", caption: "Đền Bảo Hà soi bóng dòng sông Hồng" }
    ],
    video: {
      title: "Huyền thoại Ông Hoàng Bảy trấn ải Bảo Hà",
      duration: "05:50",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: ["Chiến tích giữ ải biên thùy thế kỷ 18 thời vua Lê Cảnh Hưng."]
      },
      geography: {
        title: "Địa lí",
        items: ["Lưng tựa dãy núi Cấm, mặt nhìn ra dòng sông Hồng đỏ nặng phù sa."]
      },
      education: {
        title: "GD địa phương",
        items: ["Lễ hội đền Bảo Hà 17/7 âm lịch, gìn giữ nét đẹp văn hóa tâm linh dân tộc."]
      }
    },
    quiz: {
      question: "Tước hiệu triều đình ban phong cho vị tướng thờ tại Đền Bảo Hà là gì?",
      options: ["Thần Vệ Quốc", "Bình Tây Đại Nguyên Soái", "Đông Hải Đại Vương", "Thái Sư"],
      correctIndex: 0,
      explanation: "Chính xác! Triều đình sắc phong tướng quân Nguyễn Hoàng Bảy là 'Thần Vệ Quốc'."
    },
    facts: [
      {
        title: "Bến sông ngàn năm",
        content: "Bến sông trước cửa đền từng là trạm tiền tiêu trung chuyển thuyền bè giao thương huyết mạch nối miền ngược với miền xuôi.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=600"
      }
    ]
  },

  // 5. LÀO CAI (Bắc Hà)
  {
    id: "vua-meo",
    title: "Dinh Hoàng A Tưởng (Vua Mèo)",
    province: "Lào Cai",
    category: "khu-di-tich",
    categoryName: "Khu di tích",
    period: "Thời Pháp thuộc (1914 - 1921)",
    rating: 4.7,
    reviewsCount: 165,
    coords: { x: 58, y: 16 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1200",
    quote: "Pháo đài bí ẩn giữa lòng cao nguyên trắng Bắc Hà...",
    audioNarration: "Chào mừng quý khách đến với Dinh thự Hoàng A Tưởng tại Bắc Hà. Xây dựng ròng rã suốt 7 năm từ 1914 đến 1921, tòa lâu đài là sự kết hợp độc nhất vô nhị giữa kiến trúc cổ điển Pháp và thuật phong thủy âm dương phương Đông.",
    overview: {
      story: "Dinh thự Hoàng A Tưởng (Dinh Vua Mèo) được xây dựng bởi hai cha con thổ ty Hoàng Yến Tchao và Hoàng A Tưởng. Tòa dinh thự nguy nga sừng sững giữa cao nguyên trắng Bắc Hà với tường thành dày 50cm và các lỗ châu mai phòng thủ kiên cố.",
      description: "Kiến trúc kết hợp hài hòa giữa phong cách Pháp thuộc và nhà cổ phương Đông, lưu giữ những ký ức biến thiên lịch sử của vùng rẻo cao đầu thế kỷ 20."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Mặt tiền Dinh Hoàng A Tưởng" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800", caption: "Hành lang vòm cuốn kiểu Pháp" }
    ],
    video: {
      title: "Bí ẩn Dinh thự Vua Mèo Bắc Hà",
      duration: "07:18",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: ["Xây dựng từ 1914 đến 1921 thời kỳ Pháp thuộc, phản ánh quyền lực tầng lớp thổ ty cai trị."]
      },
      geography: {
        title: "Địa lí",
        items: ["Cao nguyên Bắc Hà ở độ cao trên 1.000m, khí hậu mát lạnh, mùa xuân hoa mận nở trắng rừng."]
      },
      education: {
        title: "GD địa phương",
        items: ["Gìn giữ kiến trúc độc bản, gắn kết cùng phiên chợ văn hóa Bắc Hà và lễ hội đua ngựa truyền thống."]
      }
    },
    quiz: {
      question: "Dinh thự Hoàng A Tưởng mất bao nhiêu năm xây dựng mới hoàn thành?",
      options: ["3 năm", "7 năm (1914 - 1921)", "12 năm", "15 năm"],
      correctIndex: 1,
      explanation: "Chính xác! Dinh thự được khởi công năm 1914 và mất 7 năm vận chuyển vật liệu qua rừng núi để hoàn thành năm 1921."
    },
    facts: [
      {
        title: "Vôi mật tráng thành",
        content: "Toàn bộ tường gạch được gắn kết bằng vôi tôi, mật mía và cát mịn tạo nên kết cấu thành lũy vững chãi qua hơn một thế kỷ.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=600"
      }
    ]
  },

  // 6. SƠN LA
  {
    id: "nha-tu-son-la",
    title: "Di tích Nhà tù Sơn La",
    province: "Sơn La",
    category: "khu-di-tich",
    categoryName: "Khu di tích",
    period: "Thời Pháp thuộc (1908)",
    rating: 4.9,
    reviewsCount: 280,
    coords: { x: 42, y: 64 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1200",
    quote: "Cây đào Tô Hiệu trổ hoa bên tường đá ngục tù kiên trung...",
    audioNarration: "Nhà tù Sơn La được thực dân Pháp xây dựng năm 1908 trên đỉnh đồi Khau Cả. Nơi đây từng giam cầm hàng ngàn chiến sĩ cách mạng tiền bối, và hình ảnh Cây đào Tô Hiệu nở hoa đã trở thành biểu tượng bất diệt cho tinh thần quật khởi của dân tộc.",
    overview: {
      story: "Nhà tù Sơn La do thực dân Pháp xây dựng năm 1908 trên đồi Khau Cả hòng dập tắt ngọn lửa yêu nước. Nhưng chính nơi 'địa ngục trần gian' này đã trở thành trường học cách mạng trui rèn nên những nhà lãnh đạo xuất sắc cho Đảng và cách mạng Việt Nam.",
      description: "Điểm nhấn thiêng liêng nhất là Cây đào Tô Hiệu mang tên người chiến sĩ cộng sản kiên trung, dẫu bị giam cầm khắc nghiệt vẫn truyền ngọn lửa niềm tin tất thắng tới muôn đời sau."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800", caption: "Tường đá kiên cố di tích Nhà tù Sơn La" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Cây đào Tô Hiệu trên đồi Khau Cả" }
    ],
    video: {
      title: "Sống mãi ngọn lửa đồi Khau Cả",
      duration: "08:45",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: ["Xếp hạng Di tích quốc gia đặc biệt năm 2014, nơi trui rèn các đồng chí Tô Hiệu, Lê Duẩn, Trường Chinh."]
      },
      geography: {
        title: "Địa lí",
        items: ["Tọa lạc trên đồi Khau Cả hiểm trở thuộc trung tâm thành phố Sơn La ngày nay."]
      },
      education: {
        title: "GD địa phương",
        items: ["Địa chỉ đỏ giáo dục truyền thống yêu nước, lòng dũng cảm và tinh thần lạc quan cách mạng cho thế hệ trẻ."]
      }
    },
    quiz: {
      question: "Biểu tượng bất khuất gắn liền với đồng chí Tô Hiệu tại Nhà tù Sơn La là gì?",
      options: ["Cây bàng cổ thụ", "Cây đào Tô Hiệu", "Khối đá ngục", "Giếng nước ngầm"],
      correctIndex: 1,
      explanation: "Chính xác! Cây đào do đồng chí Tô Hiệu trồng tại nhà tù đã trở thành biểu tượng cho sức sống mãnh liệt của cách mạng."
    },
    facts: [
      {
        title: "Chi bộ nhà tù",
        content: "Dù bị giam cầm khổ sai, các chiến sĩ cộng sản vẫn bí mật xuất bản tờ báo Suối Reo để tuyên truyền giác ngộ nhân dân.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=600"
      }
    ]
  },

  // 7. LAI CHÂU
  {
    id: "deo-o-quy-ho",
    title: "Đèo Ô Quy Hồ & Cổng Trời",
    province: "Lai Châu",
    category: "danh-lam",
    categoryName: "Danh lam thắng cảnh",
    period: "Thiên tạo ngàn năm",
    rating: 5.0,
    reviewsCount: 380,
    coords: { x: 28, y: 24 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=1200",
    quote: "Cung đèo mây phủ nối liền đại ngàn Hoàng Liên Sơn...",
    audioNarration: "Đèo Ô Quy Hồ là một trong 'Tứ đại đỉnh đèo' dài nhất và hùng vĩ nhất Việt Nam, vắt mình qua dãy Hoàng Liên Sơn nối liền Lào Cai và Lai Châu ở độ cao hơn hai nghìn mét.",
    overview: {
      story: "Đèo Ô Quy Hồ (còn gọi là đèo Mây) dài gần 50km uốn lượn quanh dãy Hoàng Liên Sơn hùng vĩ. Đỉnh đèo là Cổng Trời quanh năm mây phủ, nơi ranh giới khí hậu tạo nên hiện tượng kỳ thú: một bên Lào Cai sương mù mưa phùn, bên kia Lai Châu trời xanh nắng ấm.",
      description: "Gắn liền với truyền thuyết tình yêu hóa đá của nàng tiên thứ bảy say mê tiếng sáo chàng tiều phu Ô Quy Hồ nơi triền thác."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800", caption: "Biển mây Cổng trời Ô Quy Hồ" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Cung đèo uốn lượn vách núi" }
    ],
    video: {
      title: "Chinh phục Ô Quy Hồ: Đỉnh đèo mây ngàn",
      duration: "06:12",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: ["Con đường mòn giao thương hiểm trở từ thời tiền thuộc địa nối vùng Tây Bắc biên giới."]
      },
      geography: {
        title: "Địa lí",
        items: ["Độ cao đỉnh đèo 2.035m so với mực nước biển, đường phân thủy của hai hệ thống sông Hồng và sông Đà."]
      },
      education: {
        title: "GD địa phương",
        items: ["Khơi dậy tinh thần chinh phục thiên nhiên và bảo vệ môi trường sinh thái dãy Hoàng Liên."]
      }
    },
    quiz: {
      question: "Đèo Ô Quy Hồ nối liền hai tỉnh nào của vùng Tây Bắc?",
      options: ["Lào Cai và Lai Châu", "Sơn La và Điện Biên", "Yên Bái và Tuyên Quang", "Hòa Bình và Sơn La"],
      correctIndex: 0,
      explanation: "Chính xác! Đèo Ô Quy Hồ vắt qua dãy Hoàng Liên Sơn nối liền thị xã Sa Pa (Lào Cai) với huyện Tam Đường (Lai Châu)."
    },
    facts: [
      {
        title: "Ranh giới hai miền khí hậu",
        content: "Vào mùa đông, đỉnh đèo có thể xuất hiện băng tuyết phủ trắng xoá tạo nên cảnh quan kỳ thú bậc nhất miền Bắc.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=600"
      }
    ]
  },

  // 8. HÒA BÌNH
  {
    id: "mai-chau",
    title: "Thung lũng Mai Châu",
    province: "Hòa Bình",
    category: "danh-lam",
    categoryName: "Danh lam thắng cảnh",
    period: "Văn hóa Mường - Thái cổ",
    rating: 4.8,
    reviewsCount: 220,
    coords: { x: 70, y: 76 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=1200",
    quote: "Nhớ ôi Tây Tiến cơm lên khói / Mai Châu mùa em thơm nếp xôi...",
    audioNarration: "Chào mừng quý khách đến với Thung lũng Mai Châu thanh bình. Nơi đây là cái nôi định cư của đồng bào Thái trắng và người Mường với những nếp nhà sàn xinh xắn, khung cửi dệt thổ cẩm và hương xôi nếp nương thơm nồng.",
    overview: {
      story: "Nép mình giữa trùng điệp núi đá vôi, thung lũng Mai Châu bình yên với những nếp nhà sàn lợp lá gồi của người Thái trắng tại bản Lác, bản Pom Coọng. Nơi đây từng đi vào áng thơ 'Tây Tiến' bất hủ của nhà thơ Quang Dũng.",
      description: "Cảnh sắc đồng lúa bốn mùa xanh mướt, tiếng thoi đưa dệt thổ cẩm lách cách và điệu múa xòe hoa bên bình rượu cần làm say đắm lòng lữ khách."
    },
    gallery: [
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800", caption: "Bình minh trên thung lũng Mai Châu" },
      { url: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=800", caption: "Nhà sàn người Thái bản Lác" }
    ],
    video: {
      title: "Mai Châu: Nét duyên miền sơn cước",
      duration: "05:30",
      thumbnail: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=800"
    },
    interdisciplinary: {
      history: {
        title: "Lịch sử",
        items: ["Gắn liền với địa bàn hành quân của Trung đoàn Tây Tiến năm 1947 trong kháng chiến chống Pháp."]
      },
      geography: {
        title: "Địa lí",
        items: ["Thung lũng đá vôi khép kín, khí hậu quanh năm ôn hòa, đất đai màu mỡ thích hợp canh tác nếp nương."]
      },
      education: {
        title: "GD địa phương",
        items: ["Bảo tồn văn hóa dệt thổ cẩm truyền thống, điệu múa xòe Thái và nghệ thuật ẩm thực dân tộc."]
      }
    },
    quiz: {
      question: "Câu thơ 'Nhớ ôi Tây Tiến cơm lên khói / Mai Châu mùa em thơm nếp xôi' là của thi sĩ nào?",
      options: ["Quang Dũng", "Tố Hữu", "Chế Lan Viên", "Huy Cận"],
      correctIndex: 0,
      explanation: "Chính xác! Nhà thơ Quang Dũng đã sáng tác bài thơ Tây Tiến bất hủ khi nhớ về mảnh đất và con người Mai Châu."
    },
    facts: [
      {
        title: "Cơm lam nếp nương",
        content: "Nếp nương Mai Châu ngâm nước suối đầu nguồn, nướng trong ống tre bánh tẻ trên than hồng thơm ngon nức tiếng.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=600"
      }
    ]
  }
];

export const BADGES = [
  {
    id: "explorer",
    name: "Explorer",
    title: "Người khám phá",
    reqPoints: 2,
    desc: "Mở và khám phá ít nhất 2 di tích Tây Bắc trên sổ tay."
  },
  {
    id: "historian",
    name: "Historian",
    title: "Nhà sử học",
    reqPoints: 4,
    desc: "Hoàn thành và trả lời đúng bài kiểm tra Quiz thử thách tri thức."
  },
  {
    id: "master",
    name: "Master",
    title: "Bậc thầy Tây Bắc",
    reqPoints: 8,
    desc: "Giải mã toàn bộ các di tích trên bản đồ và nhận con dấu mộc đỏ."
  }
];
