"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, Compass, BookOpen, HelpCircle } from "lucide-react";
import { SiteData } from "@/data/heritage";

interface AiNanaProps {
  onOpenSite: (siteId: string) => void;
  onOpenMap: () => void;
  onOpenQuiz: (siteId: string) => void;
}

export default function AiNana({ onOpenSite, onOpenMap, onOpenQuiz }: AiNanaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "nana" | "user"; text: string; action?: { label: string; onClick: () => void } }>>([
    {
      role: "nana",
      text: "Xin chào bạn thương! Mình là **Nana**, người con của núi rừng Tây Bắc. Bạn muốn cùng mình lật mở câu chuyện linh thiêng nào hôm nay?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputValue).trim();
    if (!q) return;

    const newMsgs = [...messages, { role: "user" as const, text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInputValue("");

    // Thinking response
    setTimeout(() => {
      const lower = q.toLowerCase();
      let reply = "";
      let action: { label: string; onClick: () => void } | undefined = undefined;

      if (lower.includes("gợi ý") || lower.includes("điểm đến") || lower.includes("đâu")) {
        reply = "Nếu bạn tìm kiếm sự an yên và linh thiêng giữa mây ngàn, hãy ghé thăm **Đền Mẫu Tây Thiên** nơi cửa ngõ Tam Đảo. Hoặc nếu bạn muốn chiêm ngưỡng kỳ quan bàn tay con người tạc vào vách núi, **Ruộng bậc thang Mù Cang Chải** đang chờ bạn đó!";
        action = {
          label: "Mở xem Đền Mẫu Tây Thiên 📖",
          onClick: () => {
            onOpenSite("tay-thien");
            setIsOpen(false);
          }
        };
      } else if (lower.includes("quiz") || lower.includes("thử thách") || lower.includes("câu hỏi")) {
        reply = "Bạn muốn thử tài kiến thức ư? Tuyệt lắm! Hãy cùng làm thử thách trắc nghiệm của Đền Mẫu Tây Thiên để nhận con dấu 'ĐÃ KHÁM PHÁ' nhé.";
        action = {
          label: "Bắt đầu làm Quiz ngay ✏️",
          onClick: () => {
            onOpenQuiz("tay-thien");
            setIsOpen(false);
          }
        };
      } else if (lower.includes("lịch sử") || lower.includes("điện biên") || lower.includes("chiến trường")) {
        reply = "Vùng đất **Điện Biên Phủ** lưu giữ bản hùng ca 56 ngày đêm khoét núi ngủ hầm của cha ông, nơi đồi A1 và hầm tướng De Castries vẫn còn vẹn nguyên chứng tích hào hùng.";
        action = {
          label: "Khám phá Chiến trường Điện Biên 📜",
          onClick: () => {
            onOpenSite("dien-bien-phu");
            setIsOpen(false);
          }
        };
      } else if (lower.includes("bản đồ")) {
        reply = "Mình đã mở sẵn Bản đồ di sản Tây Bắc cho bạn rồi nhé. Bạn có thể lọc theo Đền, Chùa, Khu di tích hay Danh lam thắng cảnh!";
        action = {
          label: "Mở Bản đồ Tây Bắc 🗺️",
          onClick: () => {
            onOpenMap();
            setIsOpen(false);
          }
        };
      } else {
        reply = "Tây Bắc có muôn ngàn câu chuyện giấu sau những vạt mây mù. Bạn có thể xem bản đồ, làm quiz, hoặc đọc những trang sổ nhật ký di sản cùng Nana nhé!";
      }

      setMessages(prev => [...prev, { role: "nana", text: reply, action }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger (Screen 13) */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: 12
        }}
      >
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            style={{
              background: "var(--paper-ivory)",
              border: "1px solid rgba(181, 140, 73, 0.4)",
              color: "var(--ink-primary)",
              padding: "7px 15px",
              borderRadius: "9999px",
              fontSize: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              animation: "floatBubble 3s ease-in-out infinite"
            }}
          >
            <span>Bạn muốn khám phá di tích nào?</span>
            <Sparkles size={14} color="var(--accent-gold)" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Trợ lý ảo AI Nana"
          aria-label="Mascot AI Nana"
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "radial-gradient(circle, #f9f2e3, #ecdab5)",
            border: "2.5px solid var(--accent-gold)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            overflow: "hidden"
          }}
        >
          {/* Custom SVG Chibi H'Mong Highland Girl */}
          <svg viewBox="0 0 100 100" width="46" height="46" xmlns="http://www.w3.org/2000/svg">
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
        </button>
      </div>

      {/* AI Nana Chat Drawer */}
      {isOpen && (
        <aside
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: "min(360px, 90vw)",
            height: 480,
            background: "var(--paper-parchment)",
            border: "2px solid rgba(181, 140, 73, 0.45)",
            borderRadius: 16,
            boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
            zIndex: 70,
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
                AI Nana ✦ Sứ giả Tây Bắc
              </h4>
              <span style={{ fontSize: "10px", color: "rgba(250, 246, 238, 0.7)" }}>
                Đồng hành lật mở di sản & văn hóa
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff"
              }}
            >
              <X size={16} />
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

          {/* Quick Prompt Chips (Screen 13) */}
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
              onClick={() => handleSend("Gợi ý điểm đến linh thiêng nhất Tây Bắc")}
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
              <Compass size={11} color="var(--accent-gold)" /> Gợi ý điểm đến
            </button>

            <button
              onClick={() => handleSend("Làm quiz thử thách di sản")}
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
              <HelpCircle size={11} color="var(--accent-cinnabar)" /> Làm quiz
            </button>

            <button
              onClick={() => handleSend("Tìm hiểu lịch sử Đền Mẫu Tây Thiên")}
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
              <BookOpen size={11} color="var(--pastel-geo-text)" /> Tìm hiểu lịch sử
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
