"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Compass,
  BookOpen,
  HelpCircle,
  Volume2,
  VolumeX,
  Footprints,
  Play,
  RotateCcw,
  Landmark,
  Mountain,
  Award,
  ChevronRight
} from "lucide-react";
import { createFemaleUtterance, isSpeechSupported, useVietnameseFemaleVoice } from "@/utils/speech";

interface AiNanaProps {
  onOpenSite: (siteId: string) => void;
  onOpenMap: () => void;
  onOpenQuiz: (siteId: string) => void;
  onOpenHero: () => void;
  currentView: "hero" | "book";
}

interface TourStep {
  id: string;
  title: string;
  text: string;
  pos: { x: number; y: number }; // percentage coordinates
  action?: () => void;
}

export default function AiNana({
  onOpenSite,
  onOpenMap,
  onOpenQuiz,
  onOpenHero,
  currentView
}: AiNanaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const voiceInfo = useVietnameseFemaleVoice();
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  // Position of Nana on the screen (percentage: left/top or px)
  const [nanaPos, setNanaPos] = useState<{ x: number; y: number }>({ x: 88, y: 82 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0
  });

  // Tour steps across the platform
  const TOUR_STEPS: TourStep[] = [
    {
      id: "welcome",
      title: "Lời chào Tây Bắc",
      text: "Xin chào bạn thương! Mình là Nana. Hãy cùng mình dạo một vòng khám phá cuốn sổ di sản kỳ vĩ này nhé!",
      pos: { x: 75, y: 35 },
      action: () => onOpenHero()
    },
    {
      id: "open-book",
      title: "Mở cuốn sổ da",
      text: "Đây là nút 'MỞ SỔ'. Hãy chạm vào để bắt đầu lật mở từng trang giấy Dó cổ truyền!",
      pos: { x: 30, y: 62 },
      action: () => onOpenHero()
    },
    {
      id: "map-intro",
      title: "Bản đồ 6 tỉnh thành",
      text: "Đây là Bản đồ Tây Bắc! Mỗi chiếc ghim đại diện cho một danh thắng hoặc đền miếu linh thiêng được vẽ tay mộc mạc.",
      pos: { x: 65, y: 38 },
      action: () => onOpenMap()
    },
    {
      id: "monument-detail",
      title: "Đền Mẫu Tây Thiên",
      text: "Đền Mẫu Tây Thiên ngút ngàn mây trắng — nơi phụng thờ Quốc Mẫu Lăng Thị Tiêu từ thời Hùng Vương dựng nước!",
      pos: { x: 28, y: 35 },
      action: () => onOpenSite("tay-thien")
    },
    {
      id: "quiz-challenge",
      title: "Thử thách Quiz",
      text: "Bạn hãy thử trả lời câu hỏi trắc nghiệm này để nhận con dấu son đỏ 'ĐÃ KHÁM PHÁ' của riêng bạn nhé!",
      pos: { x: 70, y: 55 },
      action: () => onOpenQuiz("tay-thien")
    },
    {
      id: "passport-badges",
      title: "Huy hiệu di sản",
      text: "Khi bạn khám phá càng nhiều di tích, bạn sẽ mở khóa các huy hiệu Explorer, Historian và Master vinh danh!",
      pos: { x: 75, y: 40 }
    }
  ];

  // Text-to-speech for Vietnamese (female voice). `force` bypasses stale toggle state.
  const speakText = (text: string, force = false) => {
    if ((!isVoiceEnabled && !force) || !isSpeechSupported()) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#]/g, "");
      window.speechSynthesis.speak(createFemaleUtterance(cleanText, voiceInfo, { rate: 0.97 }));
    } catch {}
  };

  // Chat conversation
  const [messages, setMessages] = useState<Array<{ role: "nana" | "user"; text: string; action?: { label: string; onClick: () => void } }>>([
    {
      role: "nana",
      text: "Xin chào bạn thương! Mình là **Nana**, hướng dẫn viên bản địa của bạn. Bạn muốn mình dẫn đi dạo quanh giới thiệu di tích nào hôm nay?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Trigger tour step action & speech
  const goToTourStep = (index: number) => {
    const step = TOUR_STEPS[index];
    if (!step) return;
    setTourStepIndex(index);
    setNanaPos(step.pos);
    if (step.action) step.action();
    speakText(step.text);
  };

  const startTour = () => {
    setIsTourActive(true);
    setIsOpen(false);
    goToTourStep(0);
  };

  const nextTourStep = () => {
    if (tourStepIndex < TOUR_STEPS.length - 1) {
      goToTourStep(tourStepIndex + 1);
    } else {
      setIsTourActive(false);
      setNanaPos({ x: 88, y: 82 });
      speakText("Cảm ơn bạn đã đồng hành cùng Nana! Bây giờ bạn có thể tự do đọc sổ tay di sản nhé.");
    }
  };

  const prevTourStep = () => {
    if (tourStepIndex > 0) {
      goToTourStep(tourStepIndex - 1);
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setNanaPos({ x: 88, y: 82 });
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Draggable logic for Nana
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: nanaPos.x,
      initY: nanaPos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = ((e.clientX - dragRef.current.startX) / window.innerWidth) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / window.innerHeight) * 100;
      const newX = Math.min(94, Math.max(6, dragRef.current.initX + dx));
      const newY = Math.min(94, Math.max(6, dragRef.current.initY + dy));
      setNanaPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputValue).trim();
    if (!q) return;

    const newMsgs = [...messages, { role: "user" as const, text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInputValue("");

    setTimeout(() => {
      const lower = q.toLowerCase();
      let reply = "";
      let action: { label: string; onClick: () => void } | undefined = undefined;

      if (lower.includes("tour") || lower.includes("dẫn đi") || lower.includes("giới thiệu")) {
        reply = "Được chứ! Nana sẽ đi quanh màn hình và giới thiệu từng góc của cuốn sổ di sản cho bạn ngay bây giờ nhé!";
        action = {
          label: "Bắt đầu Tour cùng Nana 🧭",
          onClick: () => startTour()
        };
      } else if (lower.includes("tây thiên") || lower.includes("đền mẫu")) {
        reply = "Đền Mẫu Tây Thiên nằm giữa đại ngàn Tam Đảo ở độ cao gần 600m, phụng thờ Quốc Mẫu Lăng Thị Tiêu từ thời Vua Hùng dựng nước!";
        action = {
          label: "Mở xem Đền Mẫu Tây Thiên 📖",
          onClick: () => {
            onOpenSite("tay-thien");
            setIsOpen(false);
          }
        };
      } else if (lower.includes("mù cang chải") || lower.includes("ruộng")) {
        reply = "Mù Cang Chải có hơn 2.200 ha ruộng bậc thang tuyệt mỹ của đồng bào Mông! Mùa nước đổ tháng 5-6 và mùa lúa chín tháng 9-10 là đẹp nhất.";
        action = {
          label: "Khám phá Mù Cang Chải 🌾",
          onClick: () => {
            onOpenSite("mu-cang-chai");
            setIsOpen(false);
          }
        };
      } else if (lower.includes("điện biên")) {
        reply = "Chiến trường Điện Biên Phủ với 56 ngày đêm khoét núi ngủ hầm, đồi A1 và hầm tướng De Castries đã làm nên chiến thắng chấn động địa cầu.";
        action = {
          label: "Xem Chiến trường Điện Biên 📜",
          onClick: () => {
            onOpenSite("dien-bien-phu");
            setIsOpen(false);
          }
        };
      } else {
        reply = "Bạn muốn Nana kể thêm truyền thuyết hay dẫn bạn đi dạo quanh khám phá các di tích trên bản đồ?";
      }

      speakText(reply);
      setMessages(prev => [...prev, { role: "nana", text: reply, action }]);
    }, 450);
  };

  return (
    <>
      {/* ====================================================================
          NANA ROAMING BOT CHARACTER (DRAGGABLE & ANIMATED)
          ==================================================================== */}
      <div
        style={{
          position: "fixed",
          left: `${nanaPos.x}%`,
          top: `${nanaPos.y}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 80,
          transition: isDragging ? "none" : "left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none"
        }}
      >
        {/* Dynamic Interactive Speech Bubble */}
        {(isTourActive || (!isOpen && !isTourActive)) && (
          <div
            style={{
              background: "var(--paper-ivory)",
              border: "1.5px solid rgba(181, 140, 73, 0.45)",
              color: "var(--ink-primary)",
              padding: "10px 16px",
              borderRadius: "16px",
              fontSize: "12px",
              maxWidth: 260,
              boxShadow: "0 6px 20px rgba(0,0,0,0.28)",
              marginBottom: 10,
              position: "relative",
              lineHeight: 1.5,
              animation: "floatBubble 3s ease-in-out infinite"
            }}
          >
            {isTourActive ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--accent-cinnabar)", textTransform: "uppercase" }}>
                    {TOUR_STEPS[tourStepIndex].title} ({tourStepIndex + 1}/{TOUR_STEPS.length})
                  </span>
                  <button onClick={endTour} title="Dừng tour" style={{ color: "var(--ink-muted)" }}>
                    <X size={12} />
                  </button>
                </div>
                <p style={{ margin: "0 0 8px" }}>{TOUR_STEPS[tourStepIndex].text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    onClick={prevTourStep}
                    disabled={tourStepIndex === 0}
                    style={{ fontSize: "10px", opacity: tourStepIndex === 0 ? 0.3 : 1 }}
                  >
                    ← Trước
                  </button>
                  <button
                    onClick={nextTourStep}
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--accent-cinnabar)",
                      display: "flex",
                      alignItems: "center",
                      gap: 2
                    }}
                  >
                    {tourStepIndex === TOUR_STEPS.length - 1 ? "Hoàn thành ✓" : "Tiếp theo →"}
                  </button>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
                <span>Bạn muốn Nana dẫn đi dạo quanh giới thiệu di tích không? ✦</span>
              </div>
            )}

            {/* Bubble pointer */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 12,
                height: 12,
                background: "var(--paper-ivory)",
                borderRight: "1.5px solid rgba(181, 140, 73, 0.45)",
                borderBottom: "1.5px solid rgba(181, 140, 73, 0.45)"
              }}
            />
          </div>
        )}

        {/* Real Mascot Avatar with Stepping Animation */}
        <div
          onMouseDown={handleMouseDown}
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          className="nana-roaming-character"
          title="Kéo Nana đi quanh màn hình hoặc bấm để trò chuyện"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "radial-gradient(circle, #f9f2e3, #ecdab5)",
            border: "2.5px solid var(--accent-gold)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Authentic SVG Character */}
          <svg viewBox="0 0 100 100" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="36" rx="34" ry="14" fill="#a6382a" stroke="#d4af6d" strokeWidth="2" />
            <rect x="22" y="27" width="56" height="7" rx="3" fill="#2d4059" />
            <circle cx="30" cy="30" r="2.5" fill="#f6ecda" />
            <circle cx="40" cy="30" r="2.5" fill="#d4af6d" />
            <circle cx="50" cy="30" r="2.5" fill="#e75845" />
            <circle cx="60" cy="30" r="2.5" fill="#d4af6d" />
            <circle cx="70" cy="30" r="2.5" fill="#f6ecda" />
            <ellipse cx="50" cy="52" rx="26" ry="23" fill="#ffebd9" />
            <path d="M 26,44 Q 28,62 30,68" stroke="#331c15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 74,44 Q 72,62 70,68" stroke="#331c15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="40" cy="50" rx="3.5" ry="5" fill="#331c15" />
            <circle cx="41" cy="48" r="1.5" fill="#ffffff" />
            <ellipse cx="60" cy="50" rx="3.5" ry="5" fill="#331c15" />
            <circle cx="61" cy="48" r="1.5" fill="#ffffff" />
            <ellipse cx="34" cy="57" rx="4.5" ry="2.5" fill="#ff9999" opacity="0.6" />
            <ellipse cx="66" cy="57" rx="4.5" ry="2.5" fill="#ff9999" opacity="0.6" />
            <path d="M 46,58 Q 50,62 54,58" stroke="#a6382a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 32,73 Q 50,86 68,73 L 74,96 L 26,96 Z" fill="#2b3a4a" />
            <path d="M 38,76 Q 50,83 62,76" stroke="#d4af6d" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* ====================================================================
          AI NANA CHAT DRAWER & TOUR CONTROLS
          ==================================================================== */}
      {isOpen && (
        <aside
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: "min(380px, 92vw)",
            height: 520,
            background: "var(--paper-parchment)",
            border: "2px solid rgba(181, 140, 73, 0.45)",
            borderRadius: 16,
            boxShadow: "0 16px 45px rgba(0,0,0,0.5)",
            zIndex: 90,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "var(--leather-brown)",
              color: "var(--paper-ivory)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(212, 175, 109, 0.3)"
            }}
          >
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent-gold-soft)" }}>
                AI Nana ✦ Hướng Dẫn Viên Thực Thụ
              </h4>
              <span style={{ fontSize: "10px", color: "rgba(250, 246, 238, 0.7)" }}>
                Đi quanh & thuyết minh di sản Tây Bắc
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Voice Toggle Button */}
              <button
                onClick={() => {
                  const nextVoice = !isVoiceEnabled;
                  setIsVoiceEnabled(nextVoice);
                  if (nextVoice) speakText("Đã bật giọng nói thuyết minh tiếng Việt của Nana!", true);
                }}
                title={isVoiceEnabled ? "Tắt giọng nói Nana" : "Bật giọng nói tiếng Việt của Nana"}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isVoiceEnabled ? "var(--accent-gold)" : "rgba(255,255,255,0.12)",
                  color: isVoiceEnabled ? "#1e100c" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {isVoiceEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Tour CTA Bar */}
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(181, 140, 73, 0.14)",
              borderBottom: "1px solid rgba(94, 69, 56, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "11px", color: "var(--ink-secondary)" }}>
              <Footprints size={14} color="var(--accent-cinnabar)" />
              <span>Chế độ Nana dẫn đi dạo quanh:</span>
            </div>
            <button
              onClick={() => startTour()}
              className="btn-warm"
              style={{ padding: "4px 10px", fontSize: "10.5px" }}
            >
              <Play size={11} fill="currentColor" /> Bắt đầu Tour
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "nana" ? "flex-start" : "flex-end",
                  maxWidth: "85%",
                  background: m.role === "nana" ? "var(--paper-ivory)" : "var(--leather-brown)",
                  color: m.role === "nana" ? "var(--ink-primary)" : "var(--paper-ivory)",
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: m.role === "nana" ? "1px solid rgba(94, 69, 56, 0.14)" : "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  fontSize: "12.5px",
                  lineHeight: 1.55
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />

                {m.action && (
                  <button
                    onClick={m.action.onClick}
                    style={{
                      marginTop: 8,
                      padding: "6px 12px",
                      background: "var(--accent-cinnabar)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      borderRadius: 6,
                      display: "inline-block"
                    }}
                  >
                    {m.action.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div
            style={{
              padding: "8px 12px",
              background: "rgba(236, 225, 204, 0.5)",
              borderTop: "1px solid rgba(94, 69, 56, 0.1)",
              display: "flex",
              flexWrap: "wrap",
              gap: 6
            }}
          >
            <button
              onClick={() => handleSend("Dẫn mình đi dạo quanh tour di sản")}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: 9999,
                background: "var(--paper-ivory)",
                border: "1px solid rgba(181, 140, 73, 0.35)",
                color: "var(--ink-secondary)",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <Compass size={11} color="var(--accent-gold)" /> Đi dạo tour
            </button>

            <button
              onClick={() => handleSend("Kể về Đền Mẫu Tây Thiên")}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: 9999,
                background: "var(--paper-ivory)",
                border: "1px solid rgba(181, 140, 73, 0.35)",
                color: "var(--ink-secondary)",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <Landmark size={11} color="var(--pastel-history-text)" /> Đền Mẫu Tây Thiên
            </button>

            <button
              onClick={() => handleSend("Mù Cang Chải có gì đặc biệt?")}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: 9999,
                background: "var(--paper-ivory)",
                border: "1px solid rgba(181, 140, 73, 0.35)",
                color: "var(--ink-secondary)",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <Mountain size={11} color="var(--pastel-geo-text)" /> Mù Cang Chải
            </button>
          </div>

          {/* Input Bar */}
          <div
            style={{
              padding: "10px 14px",
              background: "var(--paper-ivory)",
              borderTop: "1px solid rgba(94, 69, 56, 0.15)",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Hỏi Nana về di tích Tây Bắc..."
              style={{
                flex: 1,
                padding: "7px 12px",
                borderRadius: 9999,
                border: "1px solid rgba(94, 69, 56, 0.2)",
                background: "#fff",
                fontSize: "12px",
                outline: "none"
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--leather-brown)",
                color: "var(--paper-ivory)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
