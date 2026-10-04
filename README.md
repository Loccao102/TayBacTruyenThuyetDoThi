# TÂY BẮC — Tạp Chí Di Sản & Huyền Tích Đô Thị

> **Concept**: *Modern Heritage Editorial & Antique Parchment Journal* — Sự kết hợp giữa báo chí điều tra tương tác cao cấp (Interactive Digital Magazine) và trải nghiệm lật mở cuốn sổ nhật ký điền dã cổ điển.

---

## 🌟 Tính năng Nổi Bật

### 1. Trải nghiệm Báo chí & Tạp chí Quốc tế (Editorial Magazine)
- **Cinematic Hero**: Khám phá đại ngàn Tây Bắc với hiệu ứng sương khói, nắng vàng vùng cao, thông số điền dã và thanh tin tức chạy tự động (Breaking News Ticker).
- **Hồ sơ Tiêu điểm (Lead Investigation)**: Trình bày phong cách New York Times / National Geographic về *Đền Mẫu Tây Thiên*, tích hợp trích dẫn kinh điển, thời gian đọc và thông tin tác giả.
- **Tuyển tập Phóng sự & Huyền tích**: Hệ thống lưới bài viết đa dạng:
  - *Mù Cang Chải: Tuyệt tác ruộng bậc thang của người Mông*
  - *Chiến trường Điện Biên Phủ: Ký ức hào hùng Đồi A1 & Rừng Mường Phăng*
  - *Dinh thự Hoàng A Tưởng: Lâu đài bí ẩn vùng cao nguyên trắng Bắc Hà*
  - *Đền Bảo Hà: Oai linh Thần Vệ Quốc Ông Hoàng Bảy*
  - *Tháp Mường Luân: Kiệt tác gạch cổ thế kỷ 16 bên dòng sông Mã*

### 2. Cuốn Sổ Di Sản Tương Tác 2 Trang (Heritage Book Reader)
- Bố cục 2 trang giấy da cổ (Parchment Paper) với bóng gáy sách 3D chân thực:
  - **Trang Trái**: Hero visual lớn, trích dẫn văn bia, thông tin địa danh, và con dấu mực đỏ **"ĐÃ KHÁM PHÁ"** (Stamp) tự động đóng dấu khi người đọc tìm hiểu.
  - **Trang Phải (6 Tabs đa năng)**:
    1. **Tổng quan**: Thần tích, truyền thuyết dân gian và giá trị di sản.
    2. **Hình ảnh & Video**: Thư viện ảnh tư liệu sắc nét và video tài liệu phóng sự.
    3. **Liên môn (3 Góc nhìn)**: Lịch sử, Địa lí & Sinh thái, GD địa phương & Văn hóa.
    4. **Thử thách Quiz**: Trắc nghiệm tương tác kiểm tra kiến thức, chấm điểm và giải thích tức thì.
    5. **Bạn có biết? (Facts)**: Thẻ ghi chú trivia bất ngờ kẹp trong trang sổ.
    6. **Đánh giá & Ghi chú**: Đánh giá 5 sao, chia sẻ cảm nhận và hiển thị bình luận bạn đọc.

### 3. Bản Đồ Di Sản Tương Tác (Antique Cartography Map)
- Bản đồ phong cách phiêu lưu giấy da 6 tỉnh Tây Bắc: Lào Cai, Yên Bái, Điện Biên, Sơn La, Lai Châu, Hòa Bình (+ Vĩnh Phúc).
- Bộ lọc đa tiêu chí: *Đền / Miếu*, *Danh lam thắng cảnh*, *Di tích lịch sử*, *Kỳ bí / Truyền thuyết*.
- Tìm kiếm tức thời theo tên địa danh.
- Marker tương tác bật popover xem nhanh và mở thẳng cuốn sổ chi tiết.

### 4. Sổ Tay Hành Trình & Hệ Thống Huy Hiệu (Explorer Passport & Badges)
- Tích hợp lưu trạng thái tự động qua `localStorage`.
- Đếm tiến độ khám phá (`X/6 Điểm`).
- 3 Hạng huy hiệu vinh danh:
  - 🧭 **Explorer**: Mở ít nhất 2 di tích Tây Bắc.
  - 📜 **Historian**: Vượt qua ít nhất 2 bài Quiz thử thách.
  - 👑 **Master**: Giải mã trọn vẹn toàn bộ 6 di tích và đóng dấu tem.

### 5. Trợ Lý Ảo AI Nana (Interactive Mascot Assistant)
- Mascot cô gái vùng cao Tây Bắc trong trang phục thổ cẩm truyền thống (đồ họa vector SVG sắc nét).
- Hội thoại thông minh giải đáp các thắc mắc về lịch sử, địa lý, thời điểm du lịch đẹp nhất, gợi ý điểm đến và kích hoạt mở thẳng di tích tương ứng.

### 6. Âm Thanh Núi Rừng (Ambient Soundscape Engine)
- Tự động tổng hợp âm thanh sáo Mông (thang âm ngũ cung C-D-F-G-A) và tiếng gió ngàn Hoàng Liên Sơn bằng **Web Audio API** nguyên bản, không cần tải file ngoài, êm dịu và chân thực.

---

## 🚀 Hướng Dẫn Chạy

Dự án sử dụng thuần **Vanilla HTML, CSS, JavaScript** không phụ thuộc thư viện ngoài:

```bash
# Mở trực tiếp bằng trình duyệt:
Mở file index.html trong trình duyệt (Chrome, Edge, Firefox, Safari)

# Hoặc khởi chạy local server với Node.js:
npx serve .
# Hoặc:
node -e "const http=require('http'), fs=require('fs'), path=require('path'); http.createServer((req,res)=>{ let fp=path.join('.', req.url === '/' ? 'index.html' : req.url.split('?')[0]); fs.readFile(fp, (err,data)=>{ if(err){ res.writeHead(404); res.end('Not found'); } else { const ext=path.extname(fp); const types={ '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.jpg':'image/jpeg', '.png':'image/png' }; res.writeHead(200, {'Content-Type': types[ext] || 'text/plain'}); res.end(data); } }); }).listen(5000, ()=>console.log('http://localhost:5000'));"
```
