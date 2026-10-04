"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Landmark,
  Mountain,
  GraduationCap,
  Lightbulb,
  Pencil,
  HelpCircle,
  MessageSquare,
  Scroll,
  Crown,
  Compass,
  Sparkles,
  Info,
  Layers,
  Image as ImageIcon,
  Video as VideoIcon,
  Volume2
} from "lucide-react";
import { HERITAGE_SITES, SiteData, BADGES } from "@/data/heritage";
import { playPageFlipSound, playStampSound, playWoodBlockSound } from "@/utils/audioEffects";
import AudioGuidePlayer from "@/components/AudioGuidePlayer";

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
  // 3: Site Detail (Screens 5 - 9, 11, 12)
  // 4: Travel Journal & Badges (Screen 10)
  // 5: Journey End (Screen 14)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<"forward" | "backward" | null>(null);

  // Selected site for detail view
  const [selectedSite, setSelectedSite] = useState<SiteData>(HERITAGE_SITES[0]);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Filters for Map
  const [provinceFilter, setProvinceFilter] = useState<string>("all");
  const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: boolean }>({
    den: true,
    chua: true,
    "khu-di-tich": true,
    "danh-lam": true
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapHoverSite, setMapHoverSite] = useState<SiteData | null>(null);

  // Quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Facts pagination
  const [factIndex, setFactIndex] = useState<number>(0);

  // Explored sites
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

  // Handle outside targeting
  useEffect(() => {
    if (targetSiteId) {
      const site = HERITAGE_SITES.find(s => s.id === targetSiteId);
      if (site) {
        setSelectedSite(site);
        flipToPage(3);
        if (targetTab) setActiveTab(targetTab);
        markAsExplored(site.id);
      }
    }
  }, [targetSiteId, targetTab]);

  // Reset quiz and facts when switching monument
  useEffect(() => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    setFactIndex(0);
  }, [selectedSite.id]);

  const markAsExplored = (id: string) => {
    if (!exploredSites.includes(id)) {
      const next = [...exploredSites, id];
      setExploredSites(next);
      try {
        localStorage.setItem("taybac_explored_sites", JSON.stringify(next));
      } catch {}
    }
  };

  // 3D Realistic Page Flip with Synthesized Paper Rustle Sound
  const flipToPage = (newPage: number) => {
    if (newPage === currentPage || isFlipping) return;
    const direction = newPage > currentPage ? "forward" : "backward";
    setIsFlipping(direction);
    playPageFlipSound();

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(null);
    }, 450);
  };

  const handleNextPage = () => {
    if (currentPage < 5) flipToPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) flipToPage(currentPage - 1);
  };

  const handleToggleCategory = (cat: string) => {
    setCategoryFilters(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleSelectSiteFromMap = (site: SiteData) => {
    setSelectedSite(site);
    markAsExplored(site.id);
    flipToPage(3);
    setActiveTab("overview");
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newEntry = {
      name: "Bạn đọc điền dã",
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
    <div className="physical-book-wrapper">
      {/* Real Leather Shell with Physical Brass Corners */}
      <div className="leather-exterior">
        {/* Brass Corner Clasps on 4 Corners */}
        <div className="brass-corner-bracket tl">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#b58c49" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>
        <div className="brass-corner-bracket tr">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#b58c49" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>
        <div className="brass-corner-bracket bl">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#b58c49" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>
        <div className="brass-corner-bracket br">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#b58c49" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>

        {/* ====================================================================
            SCREEN 2: MỞ SỔ (THE EMBOSSED VINTAGE LEATHER COVER)
            ==================================================================== */}
        {currentPage === 0 && (
          <div
            onClick={handleNextPage}
            style={{
              minHeight: 640,
              background: "radial-gradient(circle at 45% 45%, #46251b 0%, #26120c 80%, #150906 100%)",
              borderRadius: 8,
              boxShadow: "inset 0 0 70px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "40px",
              textAlign: "center",
              border: "1px solid rgba(212, 175, 109, 0.28)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Embossed Stitched Border */}
            <div
              style={{
                position: "absolute",
                inset: 22,
                border: "1.5px solid rgba(212, 175, 109, 0.4)",
                borderRadius: 6,
                pointerEvents: "none"
              }}
            />

            {/* Mountain Crest Icon */}
            <div style={{ color: "var(--gold-bright)", marginBottom: 18, opacity: 0.9 }}>
              <Mountain size={52} strokeWidth={1.5} />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(38px, 5.5vw, 56px)",
                color: "var(--gold-bright)",
                letterSpacing: "0.16em",
                margin: "0 0 6px",
                textShadow: "0 2px 10px rgba(0,0,0,0.6)"
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
                letterSpacing: "0.22em",
                marginBottom: 36,
                display: "block"
              }}
            >
              NHẬT KÝ DI SẢN
            </span>

            {/* Gold Floral Rosette */}
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                border: "1.5px solid rgba(212, 175, 109, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold-bright)",
                margin: "0 auto 36px"
              }}
            >
              <Sparkles size={28} />
            </div>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "15px",
                color: "rgba(240, 226, 206, 0.8)",
                maxWidth: 420,
                lineHeight: 1.8,
                marginBottom: 36
              }}
            >
              “Hành trình bắt đầu từ những trang giấy...”
            </p>

            <button className="btn-warm" style={{ pointerEvents: "none" }}>
              <BookOpen size={16} />
              <span>LẬT MỞ TRANG SỔ</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* ====================================================================
            THE REAL 2-PAGE SPREAD (SCREENS 3 - 12, 14)
            ==================================================================== */}
        {currentPage > 0 && (
          <div
            className="paper-spread-canvas"
            style={{
              transition: "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease",
              opacity: isFlipping ? 0.75 : 1,
              transform: isFlipping === "forward" ? "rotateY(-3deg) scale(0.99)" : isFlipping === "backward" ? "rotateY(3deg) scale(0.99)" : "none"
            }}
          >
            {/* Center Gutter Spine 3D Curvature Shadow */}
            <div className="gutter-spine-shadow" />

            {/* Red Silk Ribbon Bookmark Hanging Across Center */}
            <div className="silk-ribbon-bookmark" />

            {/* 3D Animated Flipping Leaf with Physical Curvature */}
            {isFlipping && (
              <>
                <div className={`flipping-page-leaf flip-${isFlipping}`}>
                  <div className="leaf-face leaf-front">
                    <div className="leaf-fold-gradient" />
                  </div>
                  <div className="leaf-face leaf-back">
                    <div className="leaf-fold-gradient reverse" />
                  </div>
                </div>
                <div
                  className={`flipping-shadow-sweep ${
                    isFlipping === "forward" ? "sweep-left" : "sweep-right"
                  }`}
                />
              </>
            )}

            {/* Curled Page Corners for Authentic Turn Affordance on Both Sides */}
            {currentPage < 5 && (
              <div
                className="page-curl-corner-br"
                onClick={handleNextPage}
                title="Lật sang trang tiếp theo (Click lật sách)"
              >
                <ChevronRight size={14} color="var(--ink-secondary)" style={{ opacity: 0.7 }} />
              </div>
            )}
            {currentPage > 1 && (
              <div
                className="page-curl-corner-bl"
                onClick={handlePrevPage}
                title="Lật về trang trước (Click lật sách)"
              >
                <ChevronLeft size={14} color="var(--ink-secondary)" style={{ opacity: 0.7 }} />
              </div>
            )}

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
                        color: "var(--gold-bright)",
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
                        marginBottom: 18
                      }}
                    >
                      Lời mở đầu
                    </h2>

                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "16px",
                        color: "var(--gold-bright)",
                        marginBottom: 22,
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
                    <span style={{ fontSize: "11px", color: "var(--ink-muted)", fontStyle: "italic", display: "flex", alignItems: "center", gap: 6 }}>
                      <Sparkles size={13} color="var(--gold-bright)" /> Hoa ban rừng Tây Bắc
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
                          background: "rgba(250, 246, 238, 0.92)",
                          color: "var(--leather-base)",
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

                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button
                      onClick={handleNextPage}
                      className="btn-warm"
                      style={{ padding: "8px 16px", fontSize: "12px" }}
                    >
                      <Compass size={14} />
                      <span>Xem Bản Đồ Di Sản</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==============================================================
                PAGE 2: BẢN ĐỒ DI SẢN (SCREEN 4) - VỚI 8 DI TÍCH TIÊU BIỂU
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
                    <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: 18 }}>
                      Khám phá các điểm nổi bật của Tây Bắc ({filteredSites.length} di tích)
                    </p>

                    {/* Province Filter */}
                    <div style={{ marginBottom: 16 }}>
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
                        <option value="all">Tất cả 6 tỉnh Tây Bắc</option>
                        <option value="Vĩnh Phúc">Vĩnh Phúc (Cửa ngõ Tây Thiên)</option>
                        <option value="Yên Bái">Yên Bái (Mù Cang Chải)</option>
                        <option value="Lào Cai">Lào Cai (Bắc Hà & Bảo Hà)</option>
                        <option value="Điện Biên">Điện Biên (Chiến trường Điện Biên)</option>
                        <option value="Sơn La">Sơn La (Nhà tù Sơn La)</option>
                        <option value="Lai Châu">Lai Châu (Đèo Ô Quy Hồ)</option>
                        <option value="Hòa Bình">Hòa Bình (Mai Châu)</option>
                      </select>
                    </div>

                    {/* Category Checkboxes */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink-secondary)", display: "block", marginBottom: 8 }}>
                        Loại di tích
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                          { key: "den", label: "Đền / Miếu", icon: <Landmark size={14} /> },
                          { key: "chua", label: "Chùa cổ", icon: <Landmark size={14} /> },
                          { key: "khu-di-tich", label: "Khu di tích lịch sử", icon: <Layers size={14} /> },
                          { key: "danh-lam", label: "Danh lam thắng cảnh", icon: <Mountain size={14} /> }
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
                              <CheckSquare size={15} color="var(--leather-base)" />
                            ) : (
                              <Square size={15} color="rgba(94, 69, 56, 0.35)" />
                            )}
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              {c.icon} {c.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Search Input */}
                    <div style={{ position: "relative" }}>
                      <Search size={14} style={{ position: "absolute", left: 10, top: 10, color: "var(--ink-muted)" }} />
                      <input
                        type="text"
                        placeholder="Tìm kiếm di tích, địa danh..."
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
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--seal-cinnabar)" }} />
                      <span>Đã khám phá ({exploredSites.length})</span>
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
                    {/* Antique Terrain Contours Vector */}
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

                    {/* Regional Labels */}
                    <div style={{ position: "absolute", top: "18%", left: "45%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Lào Cai
                    </div>
                    <div style={{ position: "absolute", top: "25%", left: "22%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Lai Châu
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: "15%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Điện Biên
                    </div>
                    <div style={{ position: "absolute", top: "62%", left: "40%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Sơn La
                    </div>
                    <div style={{ position: "absolute", top: "36%", left: "55%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Yên Bái
                    </div>
                    <div style={{ position: "absolute", top: "72%", left: "65%", fontSize: "11px", fontStyle: "italic", color: "#7a5c4d" }}>
                      Hòa Bình
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
                      <Compass size={20} color="var(--seal-cinnabar)" style={{ margin: "0 auto" }} />
                      <span>BẮC</span>
                    </div>

                    {/* All 8 Pins on the map */}
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
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: isExplored ? "var(--seal-cinnabar)" : "rgba(94, 69, 56, 0.45)",
                              border: "2px solid #fff",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff"
                            }}
                          >
                            <MapPin size={13} />
                          </div>
                          <span
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              background: "rgba(43, 27, 21, 0.88)",
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

                    {/* Popover Card */}
                    {mapHoverSite && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 16,
                          right: 16,
                          width: 240,
                          background: "var(--paper-ivory)",
                          borderRadius: 6,
                          border: "1px solid rgba(181, 140, 73, 0.4)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                          padding: "12px",
                          zIndex: 20
                        }}
                      >
                        <h4 style={{ fontSize: "12px", color: "var(--ink-primary)", margin: "0 0 2px" }}>
                          {mapHoverSite.title}
                        </h4>
                        <span style={{ fontSize: "10px", color: "var(--ink-muted)", display: "block", marginBottom: 6 }}>
                          {mapHoverSite.province} · {mapHoverSite.categoryName}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--gold-bright)", fontSize: "11px", marginBottom: 8 }}>
                          <Star size={12} fill="var(--gold-bright)" color="var(--gold-bright)" />
                          <span>{mapHoverSite.rating} ({mapHoverSite.reviewsCount})</span>
                        </div>
                        <button
                          onClick={() => handleSelectSiteFromMap(mapHoverSite)}
                          style={{
                            width: "100%",
                            padding: "6px",
                            background: "var(--leather-base)",
                            color: "#fff",
                            borderRadius: 4,
                            fontSize: "10.5px",
                            fontWeight: 600,
                            textAlign: "center"
                          }}
                        >
                          Xem chi tiết di tích →
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
                PAGE 3: TRANG CHI TIẾT DI TÍCH (SCREENS 5 - 9, 11, 12)
                VỚI AUDIO GUIDE PLAYER & BỘ CHỌN 8 DI TÍCH
                ============================================================== */}
            {currentPage === 3 && (
              <>
                {/* Left Page: Hero Image, Stamp & Identity (Screens 5 & 11) */}
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
                    {/* Header Controls: Back & Site Switcher Dropdown */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <button
                        onClick={() => flipToPage(2)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: "12px",
                          color: "var(--ink-secondary)",
                          fontWeight: 600
                        }}
                      >
                        <ArrowLeft size={14} /> Quay lại bản đồ
                      </button>

                      {/* Site Selector Dropdown */}
                      <select
                        value={selectedSite.id}
                        onChange={e => {
                          const s = HERITAGE_SITES.find(site => site.id === e.target.value);
                          if (s) {
                            setSelectedSite(s);
                            markAsExplored(s.id);
                            setActiveTab("overview");
                          }
                        }}
                        style={{
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: 4,
                          background: "var(--paper-ivory)",
                          border: "1px solid rgba(94, 69, 56, 0.2)",
                          color: "var(--ink-primary)",
                          outline: "none"
                        }}
                      >
                        {HERITAGE_SITES.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.province})
                          </option>
                        ))}
                      </select>
                    </div>

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
                        <p style={{ fontSize: "11px", color: "var(--gold-bright)" }}>
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
                        borderLeft: "2px solid var(--gold-primary)",
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

                    <div
                      className="stamp-explored"
                      onClick={() => playStampSound()}
                      style={{ cursor: "pointer" }}
                      title="Chạm để đóng dấu son gỗ"
                    >
                      <Sparkles size={14} />
                      <span>ĐÃ KHÁM PHÁ</span>
                    </div>
                  </div>
                </div>

                {/* Right Page: Tabs Content with Spoken Audio Guide Player */}
                <div
                  style={{
                    padding: "24px 32px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflowY: "auto"
                  }}
                >
                  {/* Dedicated Spoken Audio Guide Player (Item 4) */}
                  <AudioGuidePlayer
                    siteTitle={selectedSite.title}
                    narrationText={selectedSite.audioNarration}
                  />

                  {/* Tab Navigation Buttons (Screen 5) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      borderBottom: "1px solid rgba(94, 69, 56, 0.16)",
                      paddingBottom: 8,
                      marginBottom: 16,
                      overflowX: "auto"
                    }}
                  >
                    {[
                      { key: "overview", label: "Tổng quan", icon: <BookOpen size={13} /> },
                      { key: "media", label: "Hình ảnh & Video", icon: <ImageIcon size={13} /> },
                      { key: "interdisciplinary", label: "Liên môn", icon: <Layers size={13} /> },
                      { key: "quiz", label: "Quiz", icon: <Pencil size={13} /> },
                      { key: "facts", label: "Ghi chú", icon: <Lightbulb size={13} /> },
                      { key: "reviews", label: "Bình luận", icon: <MessageSquare size={13} /> }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          playWoodBlockSound();
                          setActiveTab(tab.key);
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 6,
                          fontSize: "11px",
                          fontWeight: activeTab === tab.key ? 700 : 500,
                          color: activeTab === tab.key ? "var(--leather-base)" : "var(--ink-muted)",
                          background: activeTab === tab.key ? "rgba(94, 69, 56, 0.08)" : "transparent",
                          whiteSpace: "nowrap",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "all 0.2s ease"
                        }}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* TAB 1: TỔNG QUAN (SCREEN 5) */}
                  {activeTab === "overview" && (
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "20px",
                          color: "var(--ink-primary)",
                          marginBottom: 10
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
                          marginBottom: 18
                        }}
                      >
                        {selectedSite.overview.description}
                      </p>

                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontStyle: "italic",
                          fontSize: "14px",
                          color: "var(--gold-primary)",
                          textAlign: "center",
                          margin: "20px 0",
                          padding: "14px",
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
                          <Layers size={13} />
                          <span>Khám phá qua 3 góc nhìn →</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: HÌNH ẢNH & VIDEO (SCREEN 6) */}
                  {activeTab === "media" && (
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "18px",
                          color: "var(--ink-primary)",
                          marginBottom: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        }}
                      >
                        <ImageIcon size={16} color="var(--gold-primary)" /> Hình ảnh di tích
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
                          marginBottom: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        }}
                      >
                        <VideoIcon size={16} color="var(--seal-cinnabar)" /> Phim tài liệu
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
                              background: "rgba(250, 246, 238, 0.92)",
                              color: "var(--leather-base)",
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
                    <div>
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
                        {/* Card 1: Lịch sử */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-history-bg)",
                            border: "1px solid var(--pastel-history-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <Landmark size={18} color="var(--pastel-history-text)" />
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

                        {/* Card 2: Địa lí */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-geo-bg)",
                            border: "1px solid var(--pastel-geo-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <Mountain size={18} color="var(--pastel-geo-text)" />
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

                        {/* Card 3: GD địa phương */}
                        <div
                          style={{
                            padding: "14px 18px",
                            borderRadius: 8,
                            background: "var(--pastel-edu-bg)",
                            border: "1px solid var(--pastel-edu-border)"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <GraduationCap size={18} color="var(--pastel-edu-text)" />
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
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Pencil size={15} color="var(--seal-cinnabar)" />
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--seal-cinnabar)", textTransform: "uppercase" }}>
                            Thử thách tri thức
                          </span>
                        </div>
                        <div style={{ width: 100, height: 4, background: "rgba(94, 69, 56, 0.15)", borderRadius: 2 }}>
                          <div style={{ width: "100%", height: "100%", background: "var(--gold-primary)", borderRadius: 2 }} />
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
                            onClick={() => {
                              if (!quizSubmitted) {
                                playWoodBlockSound();
                                setSelectedOption(i);
                              }
                            }}
                            style={{
                              padding: "10px 14px",
                              borderRadius: 6,
                              background:
                                selectedOption === i ? "var(--gold-pale)" : "var(--paper-ivory)",
                              border:
                                selectedOption === i
                                  ? "1.5px solid var(--gold-primary)"
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
                                playStampSound();
                              } else {
                                playWoodBlockSound();
                              }
                            }
                          }}
                          className="btn-warm"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <CheckCircle2 size={16} />
                          <span>Kiểm tra đáp án</span>
                        </button>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div
                            style={{
                              padding: "12px 14px",
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
                              fontSize: "12.5px",
                              lineHeight: 1.65
                            }}
                          >
                            <strong>
                              {selectedOption === selectedSite.quiz.correctIndex ? "Xuất sắc! " : "Chưa chính xác! "}
                            </strong>
                            {selectedSite.quiz.explanation}
                          </div>
                          <button
                            onClick={() => {
                              playWoodBlockSound();
                              setSelectedOption(null);
                              setQuizSubmitted(false);
                            }}
                            style={{
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "var(--ink-secondary)",
                              background: "rgba(94, 69, 56, 0.08)",
                              border: "1px solid rgba(94, 69, 56, 0.15)",
                              borderRadius: 6,
                              padding: "6px 12px",
                              cursor: "pointer",
                              alignSelf: "flex-start"
                            }}
                          >
                            ↻ Thử lại câu hỏi này
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: FACTS / BẠN CÓ BIẾT? (SCREEN 9) */}
                  {activeTab === "facts" && (
                    <div>
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
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, color: "var(--gold-primary)" }}>
                          <Lightbulb size={16} />
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
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", margin: 0 }}>
                          Đánh giá & Bình luận
                        </h4>
                        <div style={{ display: "flex", gap: 2 }}>
                          {[1, 2, 3, 4, 5].map(st => (
                            <Star key={st} size={13} fill="var(--gold-bright)" color="var(--gold-bright)" />
                          ))}
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
                            <MessageSquare size={13} />
                            <span>Gửi cảm nhận</span>
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
                            <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                              {[...Array(c.rating)].map((_, rIdx) => (
                                <Star key={rIdx} size={11} fill="var(--gold-bright)" color="var(--gold-bright)" />
                              ))}
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
                      onClick={() => flipToPage(2)}
                      style={{ fontSize: "11px", color: "var(--ink-secondary)", display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <ChevronLeft size={14} /> Xem bản đồ
                    </button>
                    <button
                      onClick={() => flipToPage(4)}
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
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <BookOpen size={24} color="var(--gold-primary)" /> Sổ tay hành trình
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: 20 }}>
                      Đánh dấu những điểm đến bạn đã khám phá.
                    </p>

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
                          color: "var(--seal-cinnabar)"
                        }}
                      >
                        {exploredSites.length} / {HERITAGE_SITES.length}
                      </div>
                      <span style={{ fontSize: "11px", color: "var(--ink-secondary)" }}>
                        di tích tiêu biểu đã được mở khóa và lưu dấu
                      </span>
                    </div>

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
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: 8
                      }}
                    >
                      <Compass size={32} color="var(--gold-primary)" />
                      <span style={{ fontSize: "12px", fontStyle: "italic", color: "var(--ink-muted)" }}>
                        Bản đồ hành trình cá nhân ({exploredSites.length} dấu mốc son)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => flipToPage(2)}
                    className="btn-warm"
                    style={{ alignSelf: "flex-start", padding: "8px 18px", fontSize: "12px" }}
                  >
                    <Compass size={14} />
                    <span>Xem bản đồ di sản →</span>
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
                        marginBottom: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <Award size={22} color="var(--gold-primary)" /> Danh hiệu
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
                                ? "1.5px solid var(--gold-primary)"
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
                                border: "1px solid var(--gold-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: isUnlocked ? "var(--leather-base)" : "var(--ink-muted)"
                              }}
                            >
                              {idx === 0 ? <Compass size={22} /> : idx === 1 ? <Scroll size={22} /> : <Crown size={22} />}
                            </div>

                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <strong style={{ fontSize: "14px", color: "var(--ink-primary)" }}>{b.name}</strong>
                                <span style={{ fontSize: "11px", color: "var(--seal-cinnabar)", fontWeight: 600 }}>
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
                      <span>Tiếp tục hành trình</span>
                      <ArrowRight size={14} />
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
                <div style={{ display: "flex", gap: 8, color: "var(--gold-primary)", marginBottom: 16 }}>
                  <Sparkles size={20} />
                  <Mountain size={20} />
                  <Sparkles size={20} />
                </div>

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
                    onClick={() => flipToPage(2)}
                    className="btn-warm"
                  >
                    <Compass size={16} />
                    <span>Xem lại bản đồ di sản</span>
                  </button>
                  <button
                    onClick={() => flipToPage(0)}
                    className="btn-gold"
                  >
                    <span>Đóng sổ về trang đầu ↻</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Page Turn Controls at Bottom */}
        {currentPage > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 14,
              color: "rgba(250, 246, 238, 0.75)",
              fontSize: "12px"
            }}
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || !!isFlipping}
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

            <span style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.1em" }}>
              Trang {currentPage} / 5
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === 5 || !!isFlipping}
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
