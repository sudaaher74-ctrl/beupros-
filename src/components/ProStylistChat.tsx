"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, Send, RotateCcw, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  recommendedProducts?: Product[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

const samplePrompts = [
  "Which hair color is best for curly hair?",
  "How to get 100% resistant grey coverage?",
  "What iron temperature for keratin smoothing?",
  "Which haircut suits a round face shape?",
  "How to neutralize orange brassy tones?",
  "Rica wax temperature & application guide",
  "How to sanitize tools using Barbicide?",
  "How to market salon on Instagram for new clients?",
  "What licenses are needed to open a salon?",
];

const renderInlineFormatting = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ fontWeight: 800 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} style={{ fontStyle: "italic" }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

const renderFormattedContent = (content: string, isUser: boolean) => {
  if (isUser) {
    return <span>{content}</span>;
  }

  const lines = content.split("\n");
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} style={{ height: "6px" }} />;
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h4
          key={idx}
          style={{
            fontSize: "14px",
            fontWeight: 800,
            color: "#111111",
            marginTop: idx === 0 ? "0" : "10px",
            marginBottom: "4px",
            letterSpacing: "0.01em",
          }}
        >
          {trimmed.replace(/^###\s+/, "")}
        </h4>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h3
          key={idx}
          style={{
            fontSize: "15px",
            fontWeight: 900,
            color: "#111111",
            marginTop: idx === 0 ? "0" : "12px",
            marginBottom: "6px",
          }}
        >
          {trimmed.replace(/^##\s+/, "")}
        </h3>
      );
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s+(.*)$/);
      if (match) {
        return (
          <div key={idx} style={{ display: "flex", gap: "6px", marginTop: "4px", marginBottom: "4px" }}>
            <span style={{ fontWeight: 800, color: "#d97706", minWidth: "18px", flexShrink: 0 }}>
              {match[1]}
            </span>
            <div style={{ flex: 1 }}>{renderInlineFormatting(match[2])}</div>
          </div>
        );
      }
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      const itemText = trimmed.replace(/^[-*•]\s+/, "");
      return (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "3px",
            marginBottom: "3px",
            paddingLeft: "6px",
          }}
        >
          <span style={{ color: "#d97706", fontWeight: "bold", flexShrink: 0 }}>•</span>
          <div style={{ flex: 1 }}>{renderInlineFormatting(itemText)}</div>
        </div>
      );
    }

    return (
      <p key={idx} style={{ margin: "2px 0", lineHeight: 1.55 }}>
        {renderInlineFormatting(line)}
      </p>
    );
  });
};

export const ProStylistChat: React.FC = () => {
  const { isChatOpen, openChat, closeChat, chatInitialQuery, clearChatInitialQuery, addToCart } = useCart();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: `Hello! I'm your **Beupros Pro Cosmetology & Salon Advisor**. 

You can ask me **anything about the salon**:
• **Hair Chemistry:** Color formulations, 20V/30V/40V developers, grey coverage, bleach ratios, toning brassy hair.
• **Chemical Services:** Keratin iron temperatures, Hair Botox, Nanoplastia, rebonding, hair spa protocols.
• **Styling & Barbering:** Face-shape haircut recommendations, seamless skin fades, beard grooming.
• **Esthetics & Skin:** O3+ bridal facials, D-Tan, Rica liposoluble waxing, ingrown prevention.
• **Nails & Feet:** Gel polish retention, UV lamps, clinical cracked-heel pedicures.
• **Hygiene & Safety:** Hospital-grade Barbicide 10-minute disinfection, autoclaving, allergy patch tests.
• **Salon Business:** Opening a salon, licensing, service pricing, staff commissions, Instagram marketing, and bulk backbar 5L can savings.

Type any question below or pick a topic to get started!`,
      suggestedFollowUps: samplePrompts,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = useCallback(async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get advice");
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: data.reply,
        recommendedProducts: data.recommendedProducts || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: "I apologize, but I encountered an error retrieving that formulation. Please check your connection or try asking your question again.",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      scrollToBottom();
    }
  }, [isChatOpen, messages]);

  // Handle initial query if triggered externally (e.g. from header or product page)
  useEffect(() => {
    if (chatInitialQuery && isChatOpen) {
      handleSend(chatInitialQuery);
      clearChatInitialQuery();
    }
  }, [chatInitialQuery, isChatOpen, handleSend, clearChatInitialQuery]);

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "assistant",
        text: `Conversation cleared! You can ask me **anything about the salon**: hair colors, keratin formulas, haircuts for face shapes, bridal facials, waxing guides, tool sterilization, or salon business advice.`,
        suggestedFollowUps: samplePrompts,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* 1. Floating Chat Trigger Button (Bottom Right) */}
      {!isChatOpen && (
        <button
          onClick={() => openChat()}
          className="chat-trigger-mobile"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 95,
            backgroundColor: "#111111",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "12px 22px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            border: "1.5px solid rgba(245, 158, 11, 0.5)",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.backgroundColor = "#000000";
            e.currentTarget.style.borderColor = "#f59e0b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#111111";
            e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.5)";
          }}
          aria-label="Open Pro Stylist AI Chat"
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <Sparkles size={18} color="#f59e0b" />
          <span style={{ fontSize: "13.5px", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Ask Pro Stylist AI
          </span>
        </button>
      )}

      {/* 2. Chat Window Drawer */}
      {isChatOpen && (
        <div
          className="chat-window-mobile"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "440px",
            maxWidth: "calc(100vw - 32px)",
            height: "640px",
            maxHeight: "calc(100vh - 48px)",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
            border: "1px solid #e5e7eb",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "modalFadeIn 0.25s ease-out",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #222222",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#222222",
                  border: "1.5px solid #f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={20} color="#f59e0b" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "0.02em", margin: 0, textTransform: "uppercase" }}>
                    Beupros Pro Stylist AI
                  </h3>
                  <span
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.2)",
                      color: "#10b981",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    ONLINE
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#a1a1aa", marginTop: "2px" }}>
                  Ask Any Hair, Esthetics, Barbering or Salon Business Question
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={handleClear}
                title="Restart conversation"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#999999",
                  padding: "6px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={closeChat}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  padding: "6px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: isUser ? "12px 16px" : "14px 18px",
                      borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      backgroundColor: isUser ? "#111111" : "#ffffff",
                      color: isUser ? "#ffffff" : "#1f2937",
                      fontSize: "13.5px",
                      lineHeight: 1.55,
                      boxShadow: isUser ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
                      border: isUser ? "none" : "1px solid #e5e7eb",
                      wordBreak: "break-word",
                    }}
                  >
                    <div>
                      {renderFormattedContent(m.text, isUser)}
                    </div>

                    {/* Recommended Products Carousel Cards inside chat bubble */}
                    {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                      <div style={{ marginTop: "16px", borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
                        <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#b45309", letterSpacing: "0.1em", marginBottom: "8px" }}>
                          Verified Products In Our Catalog:
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {m.recommendedProducts.map((p) => (
                            <div
                              key={p.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                padding: "8px",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "44px",
                                  height: "44px",
                                  backgroundColor: "#ffffff",
                                  borderRadius: "6px",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                <Image
                                  src={p.image || "/placeholder.png"}
                                  alt={p.name}
                                  fill
                                  sizes="44px"
                                  style={{ objectFit: "contain", padding: "2px" }}
                                />
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#6b7280" }}>
                                  {p.brand}
                                </div>
                                <Link
                                  href={`/product/${p.id}`}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: "#111111",
                                    lineHeight: 1.25,
                                    display: "block",
                                  }}
                                  className="line-clamp-1"
                                >
                                  {p.name}
                                </Link>
                                <div style={{ fontSize: "12px", fontWeight: 800, color: "#111111", marginTop: "2px" }}>
                                  ₹{p.salePrice.toLocaleString("en-IN")}
                                </div>
                              </div>

                              <button
                                onClick={() => addToCart(p, 1)}
                                className="btn-pill-black"
                                style={{
                                  padding: "6px 10px",
                                  fontSize: "11px",
                                  borderRadius: "6px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <ShoppingBag size={12} /> Add
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px", maxWidth: "90%" }}>
                      {m.suggestedFollowUps.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #d1d5db",
                            borderRadius: "9999px",
                            padding: "6px 12px",
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: "#374151",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                            e.currentTarget.style.borderColor = "#111111";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffffff";
                            e.currentTarget.style.borderColor = "#d1d5db";
                          }}
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e5e7eb", width: "fit-content" }}>
                <Sparkles size={16} color="#f59e0b" className="animate-spin" />
                <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>
                  Pro Stylist is formulating advice & matching products...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div
            style={{
              padding: "14px 16px",
              backgroundColor: "#ffffff",
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: "9999px",
                padding: "6px 8px 6px 16px",
                border: "1.5px solid #e5e7eb",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything: hair color, cuts, treatments, skin, waxing, salon business..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "13px",
                  color: "#111111",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                style={{
                  backgroundColor: input.trim() && !loading ? "#111111" : "#d1d5db",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  transition: "background-color 0.2s",
                }}
              >
                <Send size={15} />
              </button>
            </form>

            <div style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", marginTop: "6px" }}>
              Exclusively trained on master cosmetology standards, salon operations & 4,200+ salon products.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
