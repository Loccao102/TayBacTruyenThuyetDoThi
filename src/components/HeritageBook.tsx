"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CheckSquare,
  Square,
  Play,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Award,
  Star,
  MapPin,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Info
} from "lucide-react";
import { HERITAGE_SITES, SiteData, BADGES } from "@/data/heritage";

interface HeritageBookProps {
  initialOpen?: boolean;
  onClose?: () => void;
  targetSiteId?: string | null;
  targetTab?: string | null;
}

export default function HeritageBook({
  initialOpen = true,
  onClose,
  targetSiteId = null,
  targetTab = "overview"
}: HeritageBookProps) {
  // Page index:
  // 0: Cover (Screen 2)
  // 1: Introduction (Screen 3)
  // 2: Heritage Map (Screen 4)
  // 3: Site Detail (Screens 5, 6, 7, 8, 9, 11, 12)
  // 4: Travel Journal & Badges (Screen 10)
  // 5: Journey End (Screen 14)
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Selected site for detail view
  const [selectedSite, setSelectedSite] = useState<SiteData>(HERITAGE_SITES[0]);

  // Tab inside site detail (overview, media, interdisciplinary, quiz, facts, reviews)
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Map filters
  const [provinceFilter, setProvinceFilter] = useState<string>("all");
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: boolean }>({
    den: true,
    chua: true,
    "khu-di-tich": true,
    "danh-lam": true
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapHoverSite, setMapHoverSite] = useState<SiteData | null>(null);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Facts pagination
  const [factIndex, setFactIndex] = useState<number>(0);

  // Explored sites & badges tracking in localStorage
  const [exploredSites, setExploredSites] = useState<string[]>(["tay-thien"]);
  const [comments, setComments] = useState<Array<{ name: string; date: string; rating: number; text: string }>>([
    {
      name: "Nguyễn Thị Mai",
      date: "12/05/2026",
      rating: 5,
      text: "Thật sự rất ý nghĩa! Nội dung phong phú, hình ảnh đẹp, giúp mình hiểu hơn về văn hóa Tây Bắc."
    },
    {
      name: "Trần Bảo Nam",
      date: "04/05/2026",
      rating: 5,
      text: "Giao diện trang sách cổ và nét vẽ mộc bản gợi nhớ cảm giác những cuốn nhật ký điền dã năm xưa."
    }
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  // Handle outside targeting (e.g. from AI Nana or Hero)
  useEffect(() => {
    if (targetSiteId) {
      const site = HERITAGE_SITES.find(s => s.id === targetSiteId);
      if (site) {
        setSelectedSite(site);
        setCurrentPage(3);
        if (targetTab) setActiveTab(targetTab);
        markAsExplored(site.id);
      }
    }
  }, [targetSiteId, targetTab]);

  const markAsExplored = (id: string) => {
    if (!exploredSites.includes(id)) {
      const next = [...exploredSites, id];
      setExploredSites(next);
      try {
        localStorage.setItem("taybac_explored_sites", JSON.stringify(next));
      } catch {}
    }
  };

  const handleNextPage = () => {
    if (currentPage < 5) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleToggleCategory = (cat: string) => {
    setCategoryFilters(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleSelectSiteFromMap = (site: SiteData) => {
    setSelectedSite(site);
    markAsExplored(site.id);
    setCurrentPage(3); // Switch to site detail page
    setActiveTab("overview");
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newEntry = {
      name: "Bạn đọc ẩn danh",
      date: "Hôm nay",
      rating: 5,
      text: newCommentText.trim()
    };
    setComments([newEntry, ...comments]);
    setNewCommentText("");
  };

  // Filtered sites for map
  const filteredSites = HERITAGE_SITES.filter(site => {
    const matchProvince = provinceFilter === "all" || site.province.toLowerCase().includes(provinceFilter.toLowerCase());
    const matchCategory = categoryFilters[site.category] === true;
    const matchSearch =
      !searchQuery ||
      site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.province.toLowerCase().includes(searchQuery.toLowerCase());
    return matchProvince && matchCategory && matchSearch;
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        perspective: 2000
      }}
    >
      {/* Outer Book Shell with Authentic Spine and Leather Edge */}
      <div
        style={{
          background: "var(--leather-brown)",
          borderRadius: 12,
          padding: "16px",
          boxShadow: "var(--shadow-book)",
          border: "4px solid #2b1610",
          position: "relative"
        }}
      >
        {/* ====================================================================
            SCREEN 2: MỞ SỔ (THE EMBOSSED VINTAGE LEATHER COVER)
            ==================================================================== */}
        {currentPage === 0 && (
          <div
            onClick={handleNextPage}
            style={{
              minHeight: 640,
              background: "radial-gradient(circle at 45% 45%, #4a2920 0%, #29140e 100%)",
              borderRadius: 8,
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "40px",
              textAlign: "center",
              border: "1px solid rgba(212, 175, 109, 0.25)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Gold Embossed Frame Border */}
            <div
              style={{
                position: "absolute",
                inset: 24,
                border: "1.5px solid rgba(212, 175, 109, 0.4)",
                borderRadius: 6,
                pointerEvents: "none"
              }}
            />

            {/* Delicate Mountain Crest */}
            <div style={{ color: "var(--accent-gold)", marginBottom: 20, opacity: 0.85 }}>
              <svg width="60" height="40" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M 10,50 L 40,15 L 70,50 Z" />
                <path d="M 50,50 L 70,25 L 90,50 Z" />
                <circle cx="50" cy="10" r="3" fill="currentColor" />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 5vw, 54px)",
                color: "var(--accent-gold-soft)",
                letterSpacing: "0.15em",
                margin: "0 0 6px",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)"
              }}
            >
              TÂY BẮC
            </h2>

            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "16px",
                fontStyle: "italic",
                color: "#e6d5b8",
                letterSpacing: "0.2em",
                marginBottom: 36,
                display: "block"
              }}
            >
              NHẬT KÝ DI SẢN
            </span>

            {/* Embossed Floral Emblem */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "1px solid rgba(212, 175, 109, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-gold)",
                margin: "0 auto 40px"
              }}
            >
              <span style={{ fontSize: "28px" }}>✿</span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "15px",
                color: "rgba(240, 226, 206, 0.8)",
                maxWidth: 420,
                lineHeight: 1.8,
                marginBottom: 40
              }}
            >
              “Hành trình bắt đầu từ những trang giấy...”
            </p>

            <button className="btn-warm" style={{ pointerEvents: "none" }}>
              <span>LẬT MỞ TRANG SỔ</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ====================================================================
            TWO-PAGE OPEN BOOK SPREAD (SCREENS 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14)
            ==================================================================== */}
        {currentPage > 0 && (
          <div
            style={{
              minHeight: 650,
              background: "var(--paper-parchment)",
              borderRadius: 6,
              boxShadow: "inset 0 0 50px rgba(70, 45, 33, 0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Center Gutter Spine Shadow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 40,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, rgba(50,28,20,0.1) 0%, rgba(50,28,20,0.3) 48%, rgba(30,15,10,0.4) 50%, rgba(50,28,20,0.3) 52%, rgba(50,28,20,0.1) 100%)",
                pointerEvents: "none",
                zIndex: 30
              }}
            />

            {/* ==============================================================
                PAGE 1: LỜI MỞ ĐẦU (SCREEN 3)
                ============================================================== */}
            {currentPage === 1 && (
              <>
                {/* Left Page: Narrative text */}
                <div
                  style={{
                    padding: "48px 44px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRight: "1px solid var(--paper-border)"
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "24px",
                        color: "var(--accent-gold)",
                        display: "block",
                        marginBottom: 8
                      }}
                    >
                      01
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "34px",
                        color: "var(--ink-primary)",
                        marginBottom: 20
                      }}
                    >
                      Lời mở đầu
                    </h2>

                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "16px",
                        color: "var(--accent-gold)",
                        marginBottom: 24,
                        lineHeight: 1.6
                      }}
                    >
                      “Mỗi vùng đất đều có một câu chuyện.”
                    </p>

                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.85,
                        marginBottom: 16
                      }}
                    >
                      Tây Bắc không chỉ là những dãy núi hùng vĩ, những thửa ruộng bậc thang hay những bản làng ẩn hiện trong mây. Đó còn là nơi lưu giữ những giá trị văn hóa, lịch sử và con người đầy bản sắc.
                    </p>

                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.85
                      }}
                    >
                      Mỗi dòng suối, mái đền rêu phong hay tiếng khèn nơi triền núi đều cất giữ một mảnh linh hồn đất Việt. Mời bạn cùng bước vào cuốn nhật ký này — chậm lại một chút để cảm nhận chiều sâu nghìn năm.
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid rgba(94, 69, 56, 0.12)",
                      paddingTop: 16
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--ink-muted)", fontStyle: "italic" }}>
                      ✿ Hoa ban rừng Tây Bắc
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>Lật trang để tiếp tục...</span>
                  </div>
                </div>

                {/* Right Page: Hero photo with video play button */}
                <div
                  style={{
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 480,
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(43, 27, 21, 0.15)",
                      border: "6px solid #f6eee0"
                    }}
                  >
                    <img
                      src="https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1000"
                      alt="Tây Bắc đại ngàn"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(30, 16, 12, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <button
                        onClick={handleNextPage}
                        title="Khám phá bản đồ"
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: "50%",
                          background: "rgba(250, 246, 238, 0.9)",
                          color: "var(--leather-brown)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                          cursor: "pointer",
                          transition: "transform 0.25s ease"
                        }}
                      >
                        <Play size={22} fill="currentColor" style={{ marginLeft: 3 }} />
                      </button>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 16,
                        color: "#fff",
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "12px",
                        textShadow: "0 2px 6px rgba(0,0,0,0.8)"
                      }}
                    >
                      Khám phá Tây Bắc · Nhật ký di sản
                    </div>
                  </div>

                  {/* Turn page arrow */}
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button
                      onClick={handleNextPage}
                      className="btn-warm"
                      style={{ padding: "8px 16px", fontSize: "12px" }}
                    >
                      <span>Xem Bản Đồ Di Sản</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==============================================================
                PAGE 2: BẢN ĐỒ DI SẢN (SCREEN 4)
                ============================================================== */}
            {currentPage === 2 && (
              <>
                {/* Left Page: Filters & Search */}
                <div
                  style={{
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRight: "1px solid var(--paper-border)"
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "26px",
                        color: "var(--ink-primary)",
                        marginBottom: 6
                      }}
                    >
                      Bản đồ di sản
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: 20 }}>
                      Khám phá các điểm nổi bật của Tây Bắc
                    </p>

                    {/* Province dropdown */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-secondary)", display: "block", marginBottom: 6 }}>
                        Tỉnh / Thành
                      </label>
                      <select
                        value={provinceFilter}
                        onChange={e => setProvinceFilter(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: 6,
                          border: "1px solid rgba(94, 69, 56, 0.25)",
                          background: "var(--paper-ivory)",
                          fontSize: "12px",
                          color: "var(--ink-primary)",
                          outline: "none"
                        }}
                      >
                        <option value="all">Tất cả tỉnh thành</option>
                        <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                        <option value="Yên Bái">Yên Bái</option>
                        <option value="Lào Cai">Lào Cai</option>
                        <option value="Điện Biên">Điện Biên</option>
                        <option value="Sơn La">Sơn La</option>
                        <option value="Lai Châu">Lai Châu</option>
                      </select>
                    </div>

                    {/* Category Checkboxes */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-secondary)", display: "block", marginBottom: 8 }}>
                        Loại di tích
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                          { key: "den", label: "Đền" },
                          { key: "chua", label: "Chùa" },
                          { key: "khu-di-tich", label: "Khu di tích" },
                          { key: "danh-lam", label: "Danh lam thắng cảnh" }
                        ].map(c => (
                          <div
                            key={c.key}
                            onClick={() => handleToggleCategory(c.key)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontSize: "12px",
                              color: "var(--ink-secondary)",
                              cursor: "pointer"
                            }}
                          >
                            {categoryFilters[c.key] ? (
                              <CheckSquare size={15} color="var(--leather-brown)" />
                            ) : (
                              <Square size={15} color="rgba(94, 69, 56, 0.35)" />
                            )}
                            <span>{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Search Input */}
                    <div style={{ position: "relative" }}>
                      <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--ink-muted)" }} />
                      <input
                        type="text"
                        placeholder="Tìm kiếm di tích..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px 8px 30px",
                          borderRadius: 6,
                          border: "1px solid rgba(94, 69, 56, 0.25)",
                          background: "var(--paper-ivory)",
                          fontSize: "12px",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  {/* Legend */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      fontSize: "11px",
                      color: "var(--ink-secondary)",
                      borderTop: "1px solid rgba(94, 69, 56, 0.12)",
                      paddingTop: 14
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-cinnabar)" }} />
                      <span>Đã khám phá</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(94, 69, 56, 0.3)" }} />
                      <span>Chưa khám phá</span>
                    </div>
                  </div>
                </div>

                {/* Right Page: Illustrated Northwest Cartography Map */}
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 520,
                      background: "#e8deca",
                      borderRadius: 8,
                      border: "2px solid rgba(94, 69, 56, 0.2)",
                      overflow: "hidden",
                      backgroundImage:
                        "radial-gradient(#d3c4a8 1px, transparent 1px), linear-gradient(rgba(100,70,50,0.04) 1px, transparent 1px)",
                      backgroundSize: "20px 20px, 30px 30px"
                    }}
                  >
                    {/* Antique Mountains and Rivers Vector */}
                    <svg
                      viewBox="0 0 500 500"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}
                    >
                      <path d="M 50,120 Q 150,80 250,150 T 450,100" fill="none" stroke="#684735" strokeWidth="2" />
                      <path d="M 80,240 Q 200,180 320,260 T 480,200" fill="none" stroke="#684735" strokeWidth="1.5" />
                      <polygon points="120,180 150,130 180,180" fill="#758a7a" />
                      <polygon points="170,190 210,120 250,190" fill="#758a7a" />
                      <polygon points="320,220 360,150 400,220" fill="#758a7a" />
                    </svg>

                    {/* Province Regions Labels */}
                    <div style={{ position: "absolute", top: "18%", left: "42%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Lào Cai
                    </div>
                    <div style={{ position: "absolute", top: "25%", left: "18%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Lai Châu
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "15%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Điện Biên
                    </div>
                    <div style={{ position: "absolute", top: "62%", left: "42%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Sơn La
                    </div>
                    <div style={{ position: "absolute", top: "38%", left: "55%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Yên Bái
                    </div>

                    {/* Compass */}
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        fontSize: "10px",
                        textAlign: "center",
                        color: "var(--ink-secondary)",
                        fontFamily: "var(--font-serif)"
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "var(--accent-cinnabar)" }}>✦</span>
                      <br />BẮC
                    </div>

                    {/* Pins on the map */}
                    {filteredSites.map(site => {
                      const isExplored = exploredSites.includes(site.id);
                      return (
                        <div
                          key={site.id}
                          onClick={() => handleSelectSiteFromMap(site)}
                          onMouseEnter={() => setMapHoverSite(site)}
                          style={{
                            position: "absolute",
                            top: `${site.coords.y}%`,
                            left: `${site.coords.x}%`,
                            transform: "translate(-50%, -50%)",
                            cursor: "pointer",
                            zIndex: 10
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: "50%",
                              background: isExplored ? "var(--accent-cinnabar)" : "rgba(94, 69, 56, 0.4)",
                              border: "2px solid #fff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: "10px"
                            }}
                          >
                            ✦
                          </div>
                          <span
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "rgba(43, 27, 21, 0.85)",
                              color: "#fff",
                              padding: "2px 6px",
                              borderRadius: 4,
                              fontSize: "9.5px",
                              whiteSpace: "nowrap",
                              pointerEvents: "none",
                              marginTop: 2
                            }}
                          >
                            {site.title}
                          </span>
                        </div>
                      );
                    })}

                    {/* Pin Preview Tooltip Popover (Screen 4) */}
                    {mapHoverSite && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          width: 220,
                          background: "var(--paper-ivory)",
                          borderRadius: 6,
                          border: "1px solid rgba(181, 140, 73, 0.4)",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                          padding: "10px",
                          zIndex: 20
                        }}
                      >
                        <h4 style={{ fontSize: "12px", color: "var(--ink-primary)", margin: "0 0 2px" }}>
                          {mapHoverSite.title}
                        </h4>
                        <span style={{ fontSize: "10px", color: "var(--ink-muted)", display: "block", marginBottom: 6 }}>
                          {mapHoverSite.province} · {mapHoverSite.categoryName}
                        </span>
                        <div style={{ color: "var(--accent-gold)", fontSize: "11px", marginBottom: 8 }}>
                          {"★".repeat(Math.round(mapHoverSite.rating))} ({mapHoverSite.rating})
                        </div>
                        <button
                          onClick={() => handleSelectSiteFromMap(mapHoverSite)}
                          style={{
                            width: "100%",
                            padding: "6px",
                            background: "var(--leather-brown)",
                            color: "#fff",
                            borderRadius: 4,
                            fontSize: "10.5px",
                            fontWeight: 600,
                            textAlign: "center"
                          }}
                        >
                          Xem chi tiết →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Navigation controls */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <button
                      onClick={handlePrevPage}
                      style={{ fontSize: "11px", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <ChevronLeft size={14} /> Trang trước
                    </button>
                    <button
                      onClick={handleNextPage}
                      style={{ fontSize: "11px", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      Trang chi tiết di tích <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==============================================================
                PAGE 3: TRANG CHI TIẾT DI TÍCH (SCREENS 5, 6, 7, 8, 9, 11, 12)
                ============================================================== */}
            {currentPage === 3 && (
              <>
                {/* Left Page: Hero Image, Stamp & Identity (Screen 5 & 11) */}
                <div
                  style={{
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRight: "1px solid var(--paper-border)",
                    position: "relative"
                  }}
                >
                  <div>
                    {/* Back to Map button */}
                    <button
                      onClick={() => setCurrentPage(2)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "12px",
                        color: "var(--ink-secondary)",
                        marginBottom: 16,
                        fontWeight: 600
                      }}
                    >
                      <ArrowLeft size={14} /> Quay lại bản đồ
                    </button>

                    {/* Site Large Cover Photo */}
                    <div
                      style={{
                        position: "relative",
                        height: 380,
                        borderRadius: 6,
                        overflow: "hidden",
                        boxShadow: "0 6px 20px rgba(43, 27, 21, 0.16)",
                        border: "6px solid #f6eee0",
                        marginBottom: 16
                      }}
                    >
                      <img
                        src={selectedSite.coverImage}
                        alt={selectedSite.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, transparent 40%, rgba(20, 10, 7, 0.85) 100%)"
                        }}
                      />
                      <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, color: "#fff" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "22px",
                            color: "#fff8ee",
                            margin: "0 0 4px"
                          }}
                        >
                          {selectedSite.title}
                        </h3>
                        <p style={{ fontSize: "11px", color: "var(--accent-gold-soft)" }}>
                          {selectedSite.province} · {selectedSite.categoryName} · {selectedSite.period}
                        </p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "14px",
                        color: "var(--ink-secondary)",
                        borderLeft: "2px solid var(--accent-gold)",
                        paddingLeft: 12,
                        margin: "12px 0 16px"
                      }}
                    >
                      “{selectedSite.quote}”
                    </div>
                  </div>

                  {/* Stamp & Explored status (Screen 11) */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "12px", color: "var(--pastel-geo-text)" }}>
                      <CheckCircle2 size={16} /> Đã khám phá
                    </div>

                    <div className="stamp-explored">
                      <span>★ ĐÃ KHÁM PHÁ ★</span>
                    </div>
                  </div>
                </div>

                {/* Right Page: Tabs Content (Screens 5, 6, 7, 8, 9, 12) */}
                <div
                  style={{
                    padding: "24px 32px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflowY: "auto"
                  }}
                >
                  {/* Tab Navigation Buttons (Screen 5) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      borderBottom: "1px solid rgba(94, 69, 56, 0.16)",
                      paddingBottom: 8,
                      marginBottom: 20,
                      overflowX: "auto"
                    }}
                  >
                    {[
                      { key: "overview", label: "Tổng quan" },
                      { key: "media", label: "Hình ảnh & Video" },
                      { key: "interdisciplinary", label: "Liên môn" },
                      { key: "quiz", label: "Quiz" },
                      { key: "facts", label: "Ghi chú" },
                      { key: "reviews", label: "Bình luận" }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          fontSize: "11px",
                          fontWeight: activeTab === tab.key ? 700 : 500,
                          color: activeTab === tab.key ? "var(--leather-brown)" : "var(--ink-muted)",
                          background: activeTab === tab.key ? "rgba(94, 69, 56, 0.08)" : "transparent",
                          whiteSpace: "nowrap",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* TAB 1: TỔNG QUAN (SCREEN 5) */}
                  {activeTab === "overview" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "20px",
                          color: "var(--ink-primary)",
                          marginBottom: 12
                        }}
                      >
                        Câu chuyện di tích
                      </h4>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "var(--ink-secondary)",
                          lineHeight: 1.8,
                          marginBottom: 14
                        }}
                      >
                        {selectedSite.overview.story}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "var(--ink-secondary)",
                          lineHeight: 1.8,
                          marginBottom: 20
                        }}
                      >
                        {selectedSite.overview.description}
                      </p>

                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "14px",
                          color: "var(--accent-gold)",
                          textAlign: "center",
                          margin: "24px 0",
                          padding: "16px",
                          borderTop: "1px dashed rgba(94, 69, 56, 0.2)",
                          borderBottom: "1px dashed rgba(94, 69, 56, 0.2)"
                        }}
                      >
                        “{selectedSite.quote}”
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => setActiveTab("interdisciplinary")}
                          className="btn-warm"
                          style={{ padding: "6px 14px", fontSize: "11px" }}
                        >
                          Khám phá qua 3 góc nhìn →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: HÌNH ẢNH & VIDEO (SCREEN 6) */}
                  {activeTab === "media" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "18px",
                          color: "var(--ink-primary)",
                          marginBottom: 8
                        }}
                      >
                        Hình ảnh di tích
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                          marginBottom: 20
                        }}
                      >
                        {selectedSite.gallery.map((g, i) => (
                          <div
                            key={i}
                            style={{
                              borderRadius: 4,
                              overflow: "hidden",
                              height: 110,
                              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                          >
                            <img src={g.url} alt={g.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>

                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "18px",
                          color: "var(--ink-primary)",
                          marginBottom: 8
                        }}
                      >
                        Phim tài liệu
                      </h4>
                      <div
                        style={{
                          position: "relative",
                          height: 180,
                          borderRadius: 6,
                          overflow: "hidden",
                          background: "#160b08"
                        }}
                      >
                        <img
                          src={selectedSite.video.thumbnail}
                          alt={selectedSite.video.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              background: "rgba(250, 246, 238, 0.9)",
                              color: "var(--leather-brown)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer"
                            }}
                          >
                            <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 8,
                            left: 12,
                            right: 12,
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "11px",
                            color: "#fff"
                          }}
                        >
                          <span>{selectedSite.video.title}</span>
                          <span>{selectedSite.video.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LIÊN MÔN 3 GÓC NHÌN (SCREEN 7) */}
                  {activeTab === "interdisciplinary" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "18px",
                          color: "var(--ink-primary)",
                          marginBottom: 16
                        }}
                      >
                        Khám phá di tích qua 3 góc nhìn
                      </h4>

                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {/* Card 1: Lịch sử (Pastel Red/Terracotta) */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-history-bg)",
                            border: "1px solid var(--pastel-history-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: "16px" }}>🏛️</span>
                            <h5 style={{ fontSize: "14px", fontWeight: 700, color: "var(--pastel-history-text)" }}>
                              Lịch sử
                            </h5>
                          </div>
                          <ul style={{ fontSize: "12px", color: "var(--ink-secondary)", paddingLeft: 16, lineHeight: 1.6 }}>
                            {selectedSite.interdisciplinary.history.items.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Card 2: Địa lí (Pastel Sage Green) */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-geo-bg)",
                            border: "1px solid var(--pastel-geo-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: "16px" }}>🌿</span>
                            <h5 style={{ fontSize: "14px", fontWeight: 700, color: "var(--pastel-geo-text)" }}>
                              Địa lí & Môi trường
                            </h5>
                          </div>
                          <ul style={{ fontSize: "12px", color: "var(--ink-secondary)", paddingLeft: 16, lineHeight: 1.6 }}>
                            {selectedSite.interdisciplinary.geography.items.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Card 3: GD địa phương (Pastel Ochre/Cream) */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-edu-bg)",
                            border: "1px solid var(--pastel-edu-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: "16px" }}>🏮</span>
                            <h5 style={{ fontSize: "14px", fontWeight: 700, color: "var(--pastel-edu-text)" }}>
                              GD địa phương & Văn hóa
                            </h5>
                          </div>
                          <ul style={{ fontSize: "12px", color: "var(--ink-secondary)", paddingLeft: 16, lineHeight: 1.6 }}>
                            {selectedSite.interdisciplinary.education.items.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: QUIZ THỬ THÁCH (SCREEN 8) */}
                  {activeTab === "quiz" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-cinnabar)", textTransform: "uppercase" }}>
                            Thử thách
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginLeft: 8 }}>Câu 2 / 3</span>
                        </div>
                        {/* Thin progress bar */}
                        <div style={{ width: 100, height: 4, background: "rgba(94, 69, 56, 0.15)", borderRadius: 2 }}>
                          <div style={{ width: "66%", height: "100%", background: "var(--accent-gold)", borderRadius: 2 }} />
                        </div>
                      </div>

                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "16px",
                          color: "var(--ink-primary)",
                          marginBottom: 16
                        }}
                      >
                        {selectedSite.quiz.question}
                      </h4>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                        {selectedSite.quiz.options.map((opt, i) => (
                          <div
                            key={i}
                            onClick={() => !quizSubmitted && setSelectedOption(i)}
                            style={{
                              padding: "10px 14px",
                              borderRadius: 6,
                              background:
                                selectedOption === i ? "var(--accent-gold-pale)" : "var(--paper-ivory)",
                              border:
                                selectedOption === i
                                  ? "1.5px solid var(--accent-gold)"
                                  : "1px solid rgba(94, 69, 56, 0.18)",
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              cursor: quizSubmitted ? "default" : "pointer",
                              fontSize: "13px"
                            }}
                          >
                            <span
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                border: "1px solid var(--ink-secondary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px"
                              }}
                            >
                              {selectedOption === i ? "●" : ""}
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>

                      {!quizSubmitted ? (
                        <button
                          onClick={() => {
                            if (selectedOption !== null) {
                              setQuizSubmitted(true);
                              if (selectedOption === selectedSite.quiz.correctIndex) {
                                setQuizScore(quizScore + 1);
                              }
                            }
                          }}
                          className="btn-warm"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          Kiểm tra
                        </button>
                      ) : (
                        <div
                          style={{
                            padding: "12px",
                            borderRadius: 6,
                            background:
                              selectedOption === selectedSite.quiz.correctIndex
                                ? "var(--pastel-geo-bg)"
                                : "var(--pastel-history-bg)",
                            border: `1px solid ${
                              selectedOption === selectedSite.quiz.correctIndex
                                ? "var(--pastel-geo-border)"
                                : "var(--pastel-history-border)"
                            }`,
                            fontSize: "12px",
                            lineHeight: 1.6
                          }}
                        >
                          <strong>
                            {selectedOption === selectedSite.quiz.correctIndex ? "Xuất sắc! " : "Chưa chính xác! "}
                          </strong>
                          {selectedSite.quiz.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: FACTS / BẠN CÓ BIẾT? (SCREEN 9) */}
                  {activeTab === "facts" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <div
                        style={{
                          background: "#fff9ee",
                          borderRadius: 8,
                          border: "1px solid #e2cb9c",
                          padding: "20px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                          position: "relative"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, color: "var(--accent-gold)" }}>
                          <span>💡</span>
                          <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
                            Bạn có biết?
                          </span>
                        </div>

                        <p style={{ fontSize: "13.5px", color: "var(--ink-primary)", lineHeight: 1.8, marginBottom: 14 }}>
                          {selectedSite.facts[factIndex]?.content || selectedSite.facts[0]?.content}
                        </p>

                        <div style={{ height: 130, borderRadius: 4, overflow: "hidden", marginBottom: 14 }}>
                          <img
                            src={selectedSite.facts[factIndex]?.image || selectedSite.facts[0]?.image}
                            alt="Fact di sản"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>

                        {/* Pagination control */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, fontSize: "11px" }}>
                          <button
                            onClick={() => setFactIndex(Math.max(0, factIndex - 1))}
                            disabled={factIndex === 0}
                            style={{ opacity: factIndex === 0 ? 0.3 : 1 }}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <span>{factIndex + 1} / {selectedSite.facts.length}</span>
                          <button
                            onClick={() => setFactIndex(Math.min(selectedSite.facts.length - 1, factIndex + 1))}
                            disabled={factIndex === selectedSite.facts.length - 1}
                            style={{ opacity: factIndex === selectedSite.facts.length - 1 ? 0.3 : 1 }}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: ĐÁNH GIÁ & BÌNH LUẬN (SCREEN 12) */}
                  {activeTab === "reviews" && (
                    <div style={{ animation: "fadeIn 0.3s ease" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", margin: 0 }}>
                          Đánh giá & Bình luận
                        </h4>
                        <div style={{ display: "flex", color: "var(--accent-gold)", fontSize: "12px" }}>
                          ★★★★★
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>
                          {selectedSite.rating} ({selectedSite.reviewsCount} đánh giá)
                        </span>
                      </div>

                      {/* Comment Input */}
                      <div style={{ marginBottom: 18 }}>
                        <textarea
                          placeholder="Chia sẻ cảm nhận của bạn về di tích này..."
                          value={newCommentText}
                          onChange={e => setNewCommentText(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: 6,
                            border: "1px solid rgba(94, 69, 56, 0.2)",
                            background: "var(--paper-ivory)",
                            fontSize: "12px",
                            minHeight: 60,
                            outline: "none",
                            marginBottom: 8
                          }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          <button
                            onClick={handleAddComment}
                            className="btn-warm"
                            style={{ padding: "6px 14px", fontSize: "11px" }}
                          >
                            Gửi cảm nhận
                          </button>
                        </div>
                      </div>

                      {/* Comments Feed */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {comments.map((c, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "10px 12px",
                              borderRadius: 6,
                              background: "var(--paper-ivory)",
                              border: "1px solid rgba(94, 69, 56, 0.12)",
                              fontSize: "12px"
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                              <strong>{c.name}</strong>
                              <span style={{ fontSize: "10px", color: "var(--ink-muted)" }}>{c.date}</span>
                            </div>
                            <div style={{ color: "var(--accent-gold)", fontSize: "10px", marginBottom: 4 }}>
                              {"★".repeat(c.rating)}
                            </div>
                            <p style={{ color: "var(--ink-secondary)", margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 16,
                      borderTop: "1px solid rgba(94, 69, 56, 0.1)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <button
                      onClick={() => setCurrentPage(2)}
                      style={{ fontSize: "11px", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <ChevronLeft size={14} /> Xem bản đồ
                    </button>
                    <button
                      onClick={() => setCurrentPage(4)}
                      style={{ fontSize: "11px", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      Sổ tay hành trình & Huy hiệu <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==============================================================
                PAGE 4: SỔ TAY HÀNH TRÌNH & HUY HIỆU (SCREEN 10)
                ============================================================== */}
            {currentPage === 4 && (
              <>
                {/* Left Page: Journey Map & Progress */}
                <div
                  style={{
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRight: "1px solid var(--paper-border)"
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "26px",
                        color: "var(--ink-primary)",
                        marginBottom: 6
                      }}
                    >
                      📖 Sổ tay hành trình
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: 20 }}>
                      Đánh dấu những điểm đến bạn đã khám phá.
                    </p>

                    {/* Progress Card */}
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: 8,
                        background: "var(--paper-ivory)",
                        border: "1px solid rgba(181, 140, 73, 0.35)",
                        marginBottom: 20
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "var(--ink-muted)", display: "block", marginBottom: 4 }}>
                        Tiến độ khám phá
                      </span>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "30px",
                          fontWeight: 700,
                          color: "var(--accent-cinnabar)"
                        }}
                      >
                        {exploredSites.length} / {HERITAGE_SITES.length * 5}
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--ink-secondary)" }}>
                        điểm đã khám phá trên toàn nẻo đường Tây Bắc
                      </span>
                    </div>

                    {/* Mini Route Map */}
                    <div
                      style={{
                        height: 220,
                        background: "#e5dcce",
                        borderRadius: 6,
                        border: "1px solid rgba(94, 69, 56, 0.2)",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <span style={{ fontSize: "12px", fontStyle: "italic", color: "var(--ink-muted)" }}>
                        Bản đồ hành trình cá nhân
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentPage(2)}
                    className="btn-warm"
                    style={{ alignSelf: "flex-start", padding: "8px 18px", fontSize: "12px" }}
                  >
                    Xem bản đồ di sản →
                  </button>
                </div>

                {/* Right Page: Badges list (Screen 10) */}
                <div
                  style={{
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "22px",
                        color: "var(--ink-primary)",
                        marginBottom: 20
                      }}
                    >
                      Danh hiệu
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {BADGES.map((b, idx) => {
                        const isUnlocked = exploredSites.length >= b.reqPoints;
                        return (
                          <div
                            key={b.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 16,
                              padding: "14px 18px",
                              borderRadius: 8,
                              background: isUnlocked ? "var(--paper-ivory)" : "rgba(236, 225, 204, 0.4)",
                              border: isUnlocked
                                ? "1.5px solid var(--accent-gold)"
                                : "1px solid rgba(94, 69, 56, 0.15)",
                              opacity: isUnlocked ? 1 : 0.6
                            }}
                          >
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: isUnlocked ? "radial-gradient(circle, #fbf4e6, #ebd7ad)" : "#d9cbba",
                                border: "1px solid var(--accent-gold)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px"
                              }}
                            >
                              {idx === 0 ? "🏅" : idx === 1 ? "📜" : "👑"}
                            </div>

                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <strong style={{ fontSize: "14px", color: "var(--ink-primary)" }}>{b.name}</strong>
                                <span style={{ fontSize: "11px", color: "var(--accent-cinnabar)", fontWeight: 600 }}>
                                  ({b.reqPoints} điểm)
                                </span>
                              </div>
                              <p style={{ fontSize: "11px", color: "var(--ink-muted)", margin: "2px 0 0" }}>
                                {b.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={handleNextPage}
                      className="btn-warm"
                      style={{ padding: "8px 18px", fontSize: "12px" }}
                    >
                      Tiếp tục hành trình →
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==============================================================
                PAGE 5: KẾT THÚC HÀNH TRÌNH (SCREEN 14)
                ============================================================== */}
            {currentPage === 5 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "60px 40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  background: "radial-gradient(circle at 50% 40%, #faf3e6 0%, #ebe0cd 100%)"
                }}
              >
                <div style={{ color: "var(--accent-gold)", marginBottom: 16 }}>✿ ✿ ✿</div>

                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(28px, 4vw, 42px)",
                    color: "var(--ink-primary)",
                    maxWidth: 580,
                    lineHeight: 1.35,
                    marginBottom: 20
                  }}
                >
                  Còn nhiều câu chuyện đang chờ bạn khám phá...
                </h2>

                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--ink-secondary)",
                    maxWidth: 480,
                    lineHeight: 1.8,
                    marginBottom: 36
                  }}
                >
                  Hành trình di sản Tây Bắc vẫn luôn nối dài qua từng mùa mây, từng tiếng khèn và những mái đền cổ kính. Hãy tiếp tục lưu dấu bước chân của bạn.
                </p>

                <div style={{ display: "flex", gap: 14 }}>
                  <button
                    onClick={() => setCurrentPage(2)}
                    className="btn-warm"
                  >
                    Xem lại bản đồ di sản 🗺️
                  </button>
                  <button
                    onClick={() => setCurrentPage(0)}
                    className="btn-gold"
                  >
                    Đóng sổ về trang đầu ↻
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Page Turn Arrows at Bottom of Book */}
        {currentPage > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              color: "rgba(250, 246, 238, 0.7)",
              fontSize: "12px"
            }}
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: currentPage === 0 ? "default" : "pointer",
                opacity: currentPage === 0 ? 0.3 : 1
              }}
            >
              <ChevronLeft size={16} /> Lật trang trước
            </button>

            <span>Trang {currentPage} / 5</span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === 5}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: currentPage === 5 ? "default" : "pointer",
                opacity: currentPage === 5 ? 0.3 : 1
              }}
            >
              Lật trang sau <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
