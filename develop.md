# 🏔️ TÂY BẮC: TRUYỀN THUYẾT ĐÔ THỊ — DEVELOP ROADMAP

> **Bản đồ phát triển giao diện, motion, hiệu ứng và trải nghiệm điền dã tương tác.**  
> Dự án kết hợp công nghệ web hiện đại (Next.js 16, TypeScript, Tailwind/Vanilla CSS, Web Audio API, Canvas 60FPS) với chiều sâu văn hóa di sản vùng cao Tây Bắc.

---

## 📊 TỔNG QUAN TIẾN ĐỘ

- **Đã hoàn thành**: 10/30 tính năng lớn + Nền tảng Typography & Audio chuẩn tiếng Việt nữ + Video Modal di sản.
- **Đang chờ phát triển**: 20 tính năng (AI Nana để cuối cùng theo chỉ đạo).

---

## ✅ CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH (COMPLETED)

- [x] **Phase 0: Nền tảng Typography & Giọng đọc bản địa chuẩn Nữ**
  - Tích hợp phông chữ `Newsreader` (optical-sizing 6..72) & `Be Vietnam Pro` hỗ trợ đầy đủ 100% bộ dấu tiếng Việt không bị cụt hay lỗi glyph.
  - Xây dựng động cơ phát giọng đọc kép (`Dual Speech Engine`): ưu tiên Web Speech API nữ bản địa (`HoaiMy`, `Linh`, `Google Tiếng Việt`), tự động chuyển tiếp mượt mà sang `Google Natural Vietnamese Female Audio` streaming khi chạy trên các hệ điều hành chưa cài gói tiếng Việt. Loại bỏ hoàn toàn lỗi phát tiếng Anh/giọng nam `Microsoft David`.
- [x] **#11: Bản đồ hành trình Cartography di sản cổ điển (Expedition Map Canvas)**
  - Tọa độ lưới kinh vĩ độ cổ điển, thớ giấy Dó sẫm màu với các nếp gấp phong trần.
  - Thủy văn Sông Đà, Sông Hồng, Sông Mã mềm mại uốn lượn; rặng núi Hoàng Liên Sơn mộc bản.
  - Cột mốc địa hình cao độ (Đỉnh Fansipan 3.143m, Đèo Ô Quy Hồ 2.035m, Đèo Khau Phạ, Đèo Pha Đin).
  - La bàn bằng đồng 3D tương tác nghiêng đa chiều theo vị trí chuột.
  - Tuyến hành trình điền dã kết nối tuần tự 8 di tích trọng điểm với chỉ vàng phát sáng nhấp nháy.
  - Pin địa danh hoa văn dân tộc tương tác, thẻ xem trước di tích (Hover Preview Card) kèm hình ảnh, đánh giá và nút xem nhanh.
- [x] **#21: Rạp phim tư liệu di sản (Heritage Cinema Video Modal)**
  - Hộp chiếu phim tài liệu tỷ lệ chuẩn 16:9 với viền khung đồng, góc nẹp hoa văn và dải thổ cẩm.
  - Bổ sung ID video YouTube tư liệu chính thức cho cả 8 di tích Tây Bắc.
  - Nút Play tại trang Lời mở đầu (Page 1) và tab "Hình ảnh & Video" (Page 3) mở video trực tiếp trong rạp phim cổ kính.
- [x] **Mở sách từ trang chủ vào thẳng Bản đồ di sản (Direct Jump to Map)**
  - Khi người dùng bấm mở sách từ Hero, ứng dụng trực tiếp lật mở vào Trang 2 (Bản đồ di sản) thay vì dừng ở bìa da đóng kín.
- [x] **#1: Mở sổ điện ảnh 3D (Cinematic Book Opening Transition)**
  - Cuốn sổ da 3D phóng to (`scale(1.22)`), đẩy trục Z vào trung tâm góc nhìn.
  - Bìa da xoay mở 3D chân thực (`rotateY(-155deg)`), hé lộ trang giấy Dó bên trong cùng triện son *Khai Quyển* và huy hiệu Dao Đỏ xoay nhẹ.
  - Âm thanh gáy da uốn cong và sột soạt lật mở (`playBookOpenCreakSound`).
- [x] **#2: Màn sương mây che mở cảnh (Mountain Mist Transition Wipes)**
  - Lớp sương mây Fansipan bồng bềnh dựng bằng SVG Fractal Noise Distortion (`feTurbulence`, `feDisplacementMap`).
  - Chuyển cảnh mềm mại khi mở sách hoặc quay lại Hero ("Mây ngàn Hoàng Liên Sơn...", "Trở lại non ngàn Tây Bắc...").
  - Kèm âm thanh gió núi vi vu (`playMistWhooshSound`).
- [x] **#6: Hoa văn thổ cẩm dệt động (Animated Ethnic Brocade Borders)**
  - Họa tiết hình học chân thực: H'Mông (quả trám chữ thập), Thái (răng cưa sóng nước), Dao Đỏ (mặt trời 8 cánh), Ruộng bậc thang Mù Cang Chải.
  - Hiệu ứng ánh kim chạy chỉ dệt lấp lánh phản chiếu ánh nắng.
  - Đã đính viền tại Hero, trang Lời mở đầu, Bản đồ, Chi tiết di tích và Sổ tay hành trình.
- [x] **#9: Cỗ máy thời tiết 4 mùa Tây Bắc (Highland Weather Engine)**
  - Canvas 60FPS mượt mà:
    - **Xuân**: Cánh hoa đào phai và hoa mận trắng chao liệng theo gió.
    - **Hạ**: Mùa nước đổ lấp lánh, vệt mưa sương ngọc ngà trên bậc thang.
    - **Thu**: Bụi phấn nắng ấm và vỏ trấu lúa nương vàng óng ả.
    - **Đông**: Mây mù và tinh thể băng tuyết, sương muối Fansipan.
  - Thanh chọn mùa tương tác trực quan ngay tại Hero.
- [x] **#16: Kéo góc lật trang xúc giác (Drag-to-Flip Tactile Page Peeling)**
  - Hỗ trợ kéo chuột/chạm vuốt (pointer drag) ở 2 góc sách dưới.
  - Độ cong trang giấy và bóng đổ động biến thiên theo cự ly tay kéo.
  - Kéo qua 32% chiều rộng trang tự động lật kèm âm thanh; thả sớm tự động đàn hồi về góc cũ.

---

## 📋 DANH SÁCH CÁC TÍNH NĂNG CÒN THIẾU CẦN PHÁT TRIỂN

### 🎬 NHÓM A: CHUYỂN CẢNH & MOTION TỔNG THỂ
- [ ] **#3: Scroll-driven storytelling**
  - Trải nghiệm cuộn trang từ Hero biến thành chuyến điền dã từ thung lũng lên đỉnh mây ngàn.
  - Hệ thống Parallax đa lớp: đồi thấp, bản làng, ruộng bậc thang tầng tầng lớp lớp, biển mây và dãy Hoàng Liên Sơn xa mờ trôi với các vận tốc độc lập.
- [ ] **#4: Chữ hiện như mực thấm giấy Dó (Ink-bleed typography)**
  - Các dòng tiêu đề và câu ngâm thơ hiện dần theo hiệu ứng mực nho loang tự nhiên trên thớ giấy Dó xốp thay cho hiệu ứng fade-in thông thường.
- [ ] **#5: Con trỏ tùy biến Tây Bắc (Custom Highland Cursor)**
  - Con trỏ biến thành ngọn bút lông điền dã hoặc một đốm sáng lân tinh vàng ấm, để lại vệt sáng mờ nhẹ (light trail) khi rê chuột qua trang sách.

---

### 🪡 NHÓM B: BẢN SẮC & CHẤT LIỆU VÙNG CAO
- [ ] **#7: Nền chàm & Họa tiết sáp ong (Batik indigo textures)**
  - Chất liệu vải nhuộm chàm thô mộc và kỹ thuật vẽ sáp ong truyền thống của người Mông/Dao cho các thẻ di tích và popup.
  - Hiệu ứng các đường nứt sáp ong tự nảy nở khi tải nội dung.
- [ ] **#8: Khèn & Sáo Mông phản ứng thị giác (Audio-reactive soundscape)**
  - Visualizer âm thanh uốn lượn như dải lụa theo tiếng sáo mèo, mây trôi theo nhịp điệu.
  - Bổ sung hoạt cảnh vòng xòe hoa đăng bằng các đốm sáng xoay tròn theo nhịp điệu dân tộc.
- [ ] **#10: Đèn lồng & Đom đóm tương tác ban đêm**
  - Ở chế độ ban đêm (*Đêm Trăng*), bầy đom đóm bay lượn ngẫu nhiên và bị hút nhẹ theo con trỏ chuột.
  - Khi nhấp chuột, đom đóm tụ lại tạo thành hình phác họa của địa danh nổi tiếng.

---

### 🗺️ NHÓM C: BẢN ĐỒ & DI TÍCH TƯƠNG TÁC
- [ ] **#11: Bản đồ hành trình nét vẽ chì nâng cấp**
  - Bản đồ cổ với các tuyến đường nối mộc bản được vẽ nét dần như nét chì điền dã.
  - Pin địa danh "nở hoa" khi hover, la bàn cổ bằng đồng 3D tự định hướng theo chuột.
- [ ] **#12: Nana dẫn đường đi bộ trên bản đồ (Walking Nana Guide)**
  - Avatar Nana chibi di chuyển dọc theo các lối mòn trên bản đồ 8 di tích.
  - Khi đến mỗi điểm, Nana dừng lại, tự động đóng dấu mộc son và bắt đầu giọng đọc thuyết minh.
- [ ] **#13: Ghim kỷ niệm & Bản đồ nhiệt hoàn thành**
  - Từng tỉnh thành/di tích sau khi được khám phá sẽ sáng bừng lên trên bản đồ.
  - Thanh tiến độ khám phá toàn vùng Tây Bắc cập nhật sống động (ví dụ: *Đã chinh phục 4/6 tỉnh*).
- [ ] **#14: Tranh khắc 3D đa chiều (Card Parallax Depth)**
  - Thẻ ảnh di tích có hiệu ứng nghiêng 3D (tilt) theo chuột, tách biệt lớp cổng đền/cây cỏ tiền cảnh và rặng núi hậu cảnh để tạo độ sâu thị giác ấn tượng.
- [ ] **#15: Trục thời gian lịch sử cuộn ngang (Horizontal Chronicle Scroll)**
  - Lịch sử hình thành của các di tích trọng điểm (Chiến trường Điện Biên Phủ, Nhà tù Sơn La, Dinh Hoàng A Tưởng) dưới dạng cuộn thư cổ kéo ngang theo niên biểu.

---

### 📖 NHÓM D: TRẢI NGHIỆM CUỐN SỔ ĐIỀN DÃ
- [ ] **#17: Ký họa nét bút & Băng keo dán ảnh (Field Sketchbook Aesthetic)**
  - Nét ghi chú vẽ tay của nhà nghiên cứu hiện dần từng nét như đang phác họa trực tiếp.
  - Trang trí thêm ghim bấm cổ điển, washi tape thổ cẩm dán mép ảnh chụp.
- [ ] **#18: Thẻ ảnh Polaroid rơi tự do**
  - Thư viện hình ảnh trong trang chi tiết rơi xuống mặt bàn giấy Dó với độ xoay nghiêng ngẫu nhiên và hiệu ứng nảy vật lý.
- [ ] **#19: Đóng dấu mộc sống động (Kinetic Rubber Stamp)**
  - Khi mở khóa một di tích, con dấu triện son nảy mạnh xuống mặt giấy, tạo vệt mực loang nhẹ và làm rung nhẹ cả cuốn sổ.
- [ ] **#20: Hộ chiếu di sản (Highland Heritage Passport)**
  - Layout hộ chiếu riêng biệt: mỗi di tích là một trang visa có dấu xuất nhập cảnh cổ.
  - Sưu tầm đủ 8 con dấu sẽ mở khóa danh hiệu *"Đại sứ Di sản Tây Bắc"* kèm huy hiệu vàng phát sáng.

---

### 🤖 NHÓM E: NÂNG CẤP AI NANA THỰC THỤ
- [ ] **#21: Biểu cảm & Cử chỉ phong phú cho Nana**
  - Bổ sung các trạng thái cảm xúc: Vui tươi, ngạc nhiên, chỉ tay vào di tích, vẫy chào bạn đọc, nhón chân ngó vào mép cuốn sổ.
- [ ] **#22: Nana phản ứng theo ngữ cảnh & hành vi người dùng**
  - Nếu người dùng dừng lại một trang quá 15 giây: Nana khẽ nhắc mở audio hoặc gợi ý câu chuyện huyền bí.
  - Khi người dùng trả lời sai Quiz: Nana động viên, gợi ý manh mối.
  - Khi người dùng hoàn thành 100% di tích: Nana nhảy múa chúc mừng.
- [ ] **#23: Hiệu ứng lời thoại máy chữ & khẩu hình (Typewriter Text & Lip Sync)**
  - Lời thoại của Nana hiện từng ký tự kèm âm gõ mực lách cách nhẹ nhàng, avatar cử động miệng nhịp nhàng theo giọng đọc speech synthesis.
- [ ] **#24: Nana đồng hành đa vị trí (Interactive Roaming Modes)**
  - Cho phép người dùng kéo thả Nana đến bất kỳ vị trí nào trên màn hình, hoặc Nana tự ngồi vắt vẻo trên mép bìa cuốn sổ khi đang đọc sách.

---

### ✨ NHÓM F: MICRO-INTERACTIONS & TÍNH NĂNG MỞ RỘNG
- [ ] **#25: Nút bấm từ tính (Magnetic Buttons)**
  - Các nút hành động chính (Mở sổ, Nghe thuyết minh, Bắt đầu hành trình) hút nhẹ về phía con trỏ chuột khi đến gần.
- [ ] **#26: Bộ đếm số tự nhảy (Animated Number Ticker)**
  - Các chỉ số tại Hero (`06 Tỉnh`, `08+ Quần thể`, `100% Audio Guide`) số nhảy tăng dần từ 0 khi lướt vào tầm nhìn.
- [ ] **#27: Bộ câu hỏi Quiz kiểu mộc bản khắc gỗ**
  - Đáp án đúng khắc nổi lên như mộc bản in thời xưa; đáp án sai rung nhẹ phản hồi xúc giác.
- [ ] **#28: Skeleton Loading vân giấy Dó**
  - Trong lúc chờ tải ảnh chất lượng cao từ Wikimedia, hiển thị khung giấy Dó với các sợi xơ tự nhiên thay vì khung xám mặc định.
- [ ] **#29: Chế độ Chụp ảnh kỷ niệm (Polaroid Photo Mode)**
  - Nút chụp ảnh lưu lại khoảnh khắc hiện tại của trang sổ/Hero, xuất file ảnh polaroid kèm con dấu ngày tháng và chữ ký lưu niệm để người dùng tải về điện thoại/máy tính.
- [ ] **#30: Âm thanh không gian tương tác (3D Spatial Audio Elements)**
  - Bổ sung tiếng chuông trâu gõ mõ lốc cốc xa xa, tiếng suối Nậm Rốm róc rách, tiếng gió lùa đỉnh Ô Quy Hồ chuyển dịch theo hướng chuột hoặc tai nghe.

---

## 🎯 LỘ TRÌNH TRIỂN KHAI ƯU TIÊN TIẾP THEO (NEXT SPRINTS)

| Sprint | Các mục tiêu trọng tâm | Giá trị mang lại |
|:---:|:---|:---|
| **Sprint 1** | **#11 & #12 (Bản đồ nét chì + Nana dẫn đường)** + **#20 (Hộ chiếu di sản)** | Biến việc khám phá thành trò chơi nhập vai (gamification), giữ chân người dùng lâu hơn. |
| **Sprint 2** | **#21, #22 & #23 (Nâng cấp cảm xúc, cử chỉ & khẩu hình cho Nana)** | Biến AI Nana thành một hướng dẫn viên người bản địa thực sự sống động và có hồn. |
| **Sprint 3** | **#14 (Tranh khắc 3D đa chiều)** + **#17, #18 & #19 (Ký họa, ảnh rơi polaroid, triện mộc kinetic)** | Đẩy độ thẩm mỹ và cảm giác xúc giác của cuốn sổ lên cấp độ bảo tàng số cao cấp. |
| **Sprint 4** | **#3 & #4 (Scroll-driven storytelling + Mực loang giấy Dó)** + **#29 (Photo mode)** | Tối ưu trải nghiệm chia sẻ lên mạng xã hội và gây ấn tượng mạnh từ những giây đầu cuộn trang. |
