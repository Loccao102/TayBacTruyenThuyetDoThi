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
  {
    id: "tay-thien",
    title: "Đền Mẫu Tây Thiên",
    province: "Vĩnh Phúc",
    category: "den",
    categoryName: "Đền",
    period: "Thời kỳ Lý - Trần",
    rating: 4.8,
    reviewsCount: 120,
    coords: { x: 74, y: 55 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1200",
    quote: "Nơi linh thiêng hội tụ của đất trời và lòng người...",
    overview: {
      story: "Đền Mẫu Tây Thiên là một trong những ngôi đền linh thiêng và nổi tiếng nhất của vùng đất Vĩnh Phúc. Tương truyền, đây là nơi thờ Quốc Mẫu Lăng Thị Tiêu — người có công lớn trong việc giúp vua Hùng dựng nước, được nhân dân tôn kính là Thánh Mẫu.",
      description: "Nằm giữa vùng núi Thạch Bàn thuộc dãy Tam Đảo, quần thể danh thắng Tây Thiên là sự hòa quyện tuyệt vời giữa cảnh sắc thiên nhiên hùng vĩ và không gian tâm linh thâm nghiêm. Nơi đây từ lâu đã được coi là một trong những cái nôi của Phật giáo và tín ngưỡng thờ Mẫu Việt Nam."
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
  {
    id: "mu-cang-chai",
    title: "Ruộng bậc thang Mù Cang Chải",
    province: "Yên Bái",
    category: "danh-lam",
    categoryName: "Danh lam thắng cảnh",
    period: "Thế kỷ 18 - Nay",
    rating: 4.9,
    reviewsCount: 310,
    coords: { x: 52, y: 38 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=1200",
    quote: "Tác phẩm điêu khắc vĩ đại của con người tạc vào vách đá cheo leo...",
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
  {
    id: "dien-bien-phu",
    title: "Khu di tích Chiến trường Điện Biên Phủ",
    province: "Điện Biên",
    category: "khu-di-tich",
    categoryName: "Khu di tích",
    period: "Kháng chiến 1954",
    rating: 4.9,
    reviewsCount: 450,
    coords: { x: 26, y: 52 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1200",
    quote: "Bản anh hùng ca chấn động địa cầu tạc vào lòng chảo Mường Thanh...",
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
  {
    id: "bao-ha",
    title: "Đền Bảo Hà (Thờ Ông Hoàng Bảy)",
    province: "Lào Cai",
    category: "den",
    categoryName: "Đền",
    period: "Thời Hậu Lê",
    rating: 4.8,
    reviewsCount: 190,
    coords: { x: 58, y: 28 },
    coverImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong3.jpg?width=1200",
    quote: "Trấn ải biên cương nghìn năm sông Hồng cuộn sóng phù sa...",
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
  }
];

export const BADGES = [
  {
    id: "explorer",
    name: "Explorer",
    title: "Người khám phá",
    reqPoints: 1,
    desc: "Mở và khám phá điểm di tích đầu tiên trên sổ tay."
  },
  {
    id: "historian",
    name: "Historian",
    title: "Nhà sử học",
    reqPoints: 2,
    desc: "Hoàn thành bài kiểm tra Quiz thử thách tri thức."
  },
  {
    id: "master",
    name: "Master",
    title: "Bậc thầy Tây Bắc",
    reqPoints: 4,
    desc: "Giải mã toàn bộ các di tích và nhận con dấu mộc đỏ."
  }
];
