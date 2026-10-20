"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  X,
  Share2,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "color" | "tools" | "business" | "skincare";
  categoryLabel: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  featured?: boolean;
  content: string[];
  keyTakeaways: string[];
  recommendedTool: {
    name: string;
    brand: string;
    link: string;
  };
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "zone-toning-formulas",
    slug: "zone-toning-acidic-gloss-formulation-guide",
    title: "Mastering Zone Toning & Acidic Gloss Formulation: The 2026 Pro Guide",
    excerpt:
      "A deep dive into root shadowing, mid-length saturation, and porosity management using demi-permanent acidic glosses for long-lasting salon tones.",
    category: "color",
    categoryLabel: "Color & Chemistry",
    author: "Elena Rostova",
    authorRole: "Senior Master Colorist & Educator",
    readTime: "7 min read",
    date: "October 18, 2026",
    featured: true,
    content: [
      "Acidic demi-permanent formulas have revolutionized modern color services by depositing tone without lifting the natural melanin base. When dealing with level 9 and 10 pre-lightened canvas, cuticle alkalinity often causes immediate tone grabbing.",
      "Zone 1 (New Growth): Formulate half a level deeper with an ash-neutral base to prevent halo effect under bright salon lighting.",
      "Zone 2 (Mid-Lengths): Apply low-ammonia or acidic liquid gloss on damp hair to ensure even formulation absorption and maximum refraction.",
      "Zone 3 (Ends): Dilute gloss with clear base (1:1 ratio) to avoid overtone grab on hyper-porous ends.",
    ],
    keyTakeaways: [
      "Always equalize hair porosity before applying acidic glosses.",
      "Use cool deposit formulas for Zone 1 shadow root to eliminate orange-gold bounce.",
      "Keep processing under ambient room temperature; avoid overhead heaters which open cuticles too aggressively.",
    ],
    recommendedTool: {
      name: "Freecia Colorplex Bond Creator No. 1",
      brand: "Freecia",
      link: "/shop?category=Hair&search=Bond",
    },
  },
  {
    id: "retail-revenue-tactics",
    slug: "boosting-salon-front-desk-retail-margin",
    title: "How Elite Salons Boost Front-Desk Retail by 34% with Tiered Prescriptions",
    excerpt:
      "Transition your stylists from aggressive selling to professional prescriptive recommendations that double ticket size.",
    category: "business",
    categoryLabel: "Salon Business",
    author: "Devang Mehta",
    authorRole: "Salon Operations Consultant",
    readTime: "5 min read",
    date: "October 16, 2026",
    content: [
      "Over 70% of clients who leave with home-care products will re-book within a 6-week window. The barrier to retail has never been client interest—it is stylist discomfort with feeling 'salesy'.",
      "By replacing the retail counter pitch with a 'Chairside Prescription Pad', stylists simply note what was used at the shampoo bowl and why.",
      "Bundling three items (Cleanse, Treat, Shield) with wholesale GST credit purchasing ensures your gross margin stays above 48%.",
    ],
    keyTakeaways: [
      "Empower stylists with simple prescription forms rather than memorized sales pitches.",
      "Group products into three-step maintenance rituals.",
      "Leverage GST input credits to improve bottom-line retail profitability.",
    ],
    recommendedTool: {
      name: "L'Oréal Absolut Repair Oil 90ML",
      brand: "L'Oréal",
      link: "/shop?brand=Loreal",
    },
  },
  {
    id: "clipper-maintenance",
    slug: "magnetic-vs-rotary-clippers-torque-and-alignment",
    title: "Motor Torque & Blade Zero-Gapping: Extending Clipper Lifespan by 3X",
    excerpt:
      "Technical teardown of magnetic, pivot, and brushless motors, plus daily sterilization best practices for high-volume barbershops.",
    category: "tools",
    categoryLabel: "Tools & Equipment",
    author: "Marcus Vance",
    authorRole: "Master Barber & Gear Specialist",
    readTime: "6 min read",
    date: "October 14, 2026",
    content: [
      "Fading dense hair requires high-torque constant speed motors that will not bog down mid-stroke. Brushless motors maintain RPM regardless of battery discharge state.",
      "Zero-gapping blades requires micro-adjustment screws to sit exactly 0.5mm behind the guide comb to prevent skin nicking.",
      "Clean blades with an oil aerosol spray every 3 clients, and unscrew the cam drive weekly to remove compacted hair dander.",
    ],
    keyTakeaways: [
      "Never immerse cordless motor housings in liquid barbicide disinfectant.",
      "Check tooth alignment against an acrylic plate before zero-gapping.",
      "Weekly cam drive oiling prevents motor coil overheating.",
    ],
    recommendedTool: {
      name: "Alan Truman Atom 511 Cordless Clipper",
      brand: "Alan Truman",
      link: "/shop?brand=Alan%20Truman",
    },
  },
  {
    id: "backbar-cost-optimization",
    slug: "facial-consumables-and-bulk-backbar-margins",
    title: "Facial Kits vs. Commercial Cans: Optimizing Backbar Cost-Per-Treatment",
    excerpt:
      "Calculate your precise cost per square cm of treatment and discover when bulk 5kg backbar supplies outperform single-use kits.",
    category: "skincare",
    categoryLabel: "Skincare & Spa",
    author: "Pooja Singhania",
    authorRole: "Aesthetician & Spa Director",
    readTime: "5 min read",
    date: "October 12, 2026",
    content: [
      "Spa profitability hinge on knowing the exact consumable cost per facial session. Single-use client kits cost ₹450-₹650 per guest.",
      "By transitioning foundational steps (Cleansing, Scrubbing, Massage Cream) to authorized 1kg-5kg commercial backbar cans, cost drops to ₹95 per client without compromising formulation quality.",
      "Reserve specialized ampoules and sheet masks for the custom finishing step.",
    ],
    keyTakeaways: [
      "Consumable cost should never exceed 18% of your menu service price.",
      "Bulk commercial jars yield over 40 treatments when measured with silicone spatulas.",
      "Maintain airtight seals on peel-off alginate masks to preserve active stability.",
    ],
    recommendedTool: {
      name: "Lotus Professional Citrus Massage Cream",
      brand: "Lotus",
      link: "/shop?brand=Lotus",
    },
  },
  {
    id: "gst-wholesale-credit",
    slug: "demystifying-gst-input-tax-credit-for-salons",
    title: "Demystifying GST Input Tax Credit (ITC) on Salon Equipment & Stock",
    excerpt:
      "How registered salons can reclaim up to 18% on electrical appliances, chair stations, and monthly backbar wholesale orders.",
    category: "business",
    categoryLabel: "Salon Business",
    author: "CA Rajesh Parekh",
    authorRole: "Beauty Industry Tax Specialist",
    readTime: "4 min read",
    date: "October 09, 2026",
    content: [
      "Many salon proprietors pay retail prices inclusive of 18% GST without claiming Input Tax Credit, forfeiting thousands in monthly operating margin.",
      "When purchasing directly through Beupros wholesale with your verified GSTIN, the tax paid acts as a direct offset against GST collected on your styling and color services.",
      "Capital goods like clippers, hair dryers, and salon styling chairs qualify for full ITC within the same financial quarter.",
    ],
    keyTakeaways: [
      "Always ensure your B2B invoice reflects your active 15-digit GSTIN.",
      "Offset salon service output GST against wholesale purchase input GST.",
      "Maintain digital GSTR-2B reconciliation monthly.",
    ],
    recommendedTool: {
      name: "Ikonic Professional Curler Tong CT-22",
      brand: "Ikonic",
      link: "/shop?brand=Ikonic",
    },
  },
  {
    id: "keratin-vs-botox",
    slug: "keratin-smoothing-vs-hair-botox-technique",
    title: "Keratin Smoothing vs. Hair Botox: Formulation Differences & Diagnosis",
    excerpt:
      "A clinical comparison of cross-linking amino acids vs. deep cortex moisture restoration for over-processed blondes.",
    category: "color",
    categoryLabel: "Color & Chemistry",
    author: "Elena Rostova",
    authorRole: "Senior Master Colorist & Educator",
    readTime: "6 min read",
    date: "October 05, 2026",
    content: [
      "Clients frequently confuse keratin straightening with hair botox. Applying thermal keratin on severely compromised bleached hair can lead to breakage if heat is excessive.",
      "Keratin: Uses glyoxylic acid or formaldehyde derivatives that require 210°C-230°C iron passes to cross-link disulfide bonds and reshape hair.",
      "Hair Botox: A non-chemical deep reconstructing bath containing hyaluronic acid, caviar extract, and collagen that plumps the cortex without straightening.",
    ],
    keyTakeaways: [
      "Perform an elasticity pull test before selecting between Botox and Keratin.",
      "Never exceed 180°C on platinum bleached hair during smoothing passes.",
      "Prescribe sulfate-free, salt-free home care to extend treatment life beyond 4 months.",
    ],
    recommendedTool: {
      name: "Dorofey Detox Botox Pre-Shampoo 500ML",
      brand: "Dorofey",
      link: "/shop?category=Hair&search=Dorofey",
    },
  },
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts =
    activeCategory === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div
      className="blogs-hero-section"
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/images/wavy-bg-blogs-amber.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        paddingBottom: "5rem",
      }}
    >
      <div className="container-custom" style={{ paddingTop: "2.5rem" }}>
        {/* Header Hero Title */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(245, 158, 11, 0.18)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              backdropFilter: "blur(12px)",
              color: "#fbbf24",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={14} />
            Beupros Pro Salon Journal
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            EDITORIAL &amp; PRO SALON INSIGHTS
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Chemical formulation guides, salon retail profitability frameworks, clipper engineering,
            and B2B tax insights authored by licensed salon directors.
          </p>
        </div>

        {/* Featured Masterclass Lead Card */}
        <div
          style={{
            backgroundColor: "rgba(28, 13, 3, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1.5px solid rgba(245, 158, 11, 0.35)",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            marginBottom: "3rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "#f59e0b",
              color: "#000000",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "1rem",
            }}
          >
            <TrendingUp size={13} />
            Featured Technical Guide
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.25,
                  marginBottom: "1rem",
                }}
              >
                {featuredPost.title}
              </h2>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}
              >
                {featuredPost.excerpt}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  fontSize: "12.5px",
                  color: "#fde68a",
                  fontWeight: 600,
                  marginBottom: "1.75rem",
                }}
              >
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={13} /> {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{featuredPost.categoryLabel}</span>
              </div>

              <button
                onClick={() => setSelectedPost(featuredPost)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 26px",
                  borderRadius: "9999px",
                  backgroundColor: "#ffffff",
                  color: "#0a0c10",
                  fontWeight: 800,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  boxShadow: "0 6px 20px rgba(255, 255, 255, 0.25)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <span>Read Full Article</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Quick Formulation Peek Box */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fbbf24",
                  marginBottom: "1rem",
                }}
              >
                Key Takeaways Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {featuredPost.keyTakeaways.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "13px",
                      color: "#e2e8f0",
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="#f59e0b"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { id: "all", label: "All Pro Articles" },
            { id: "color", label: "Color & Formulation" },
            { id: "tools", label: "Tools & Equipment" },
            { id: "business", label: "Salon Business & Margin" },
            { id: "skincare", label: "Skincare & Backbar" },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "12.5px",
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? "#000000" : "#ffffff",
                  backgroundColor: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.14)",
                  backdropFilter: "blur(12px)",
                  border: isSelected
                    ? "1px solid #ffffff"
                    : "1px solid rgba(255, 255, 255, 0.25)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 4px 14px rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Blog Post Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: "rgba(24, 12, 3, 0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "20px",
                border: "1.5px solid rgba(245, 158, 11, 0.22)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.85rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#fbbf24",
                      backgroundColor: "rgba(245, 158, 11, 0.15)",
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    {post.categoryLabel}
                  </span>
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "rgba(255, 255, 255, 0.5)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.35,
                    marginBottom: "0.75rem",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: "13.5px",
                    color: "rgba(255, 255, 255, 0.75)",
                    lineHeight: 1.55,
                    marginBottom: "1.25rem",
                  }}
                >
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>
                    <span style={{ fontWeight: 700, color: "#ffffff" }}>{post.author}</span>
                    <span style={{ display: "block", fontSize: "10.5px", color: "#a1a1aa" }}>
                      {post.authorRole}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedPost(post)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12.5px",
                      fontWeight: 800,
                      color: "#fbbf24",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>Read</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            style={{
              backgroundColor: "rgba(20, 10, 3, 0.96)",
              border: "1.5px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "24px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: "1.5rem", paddingRight: "40px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#fbbf24",
                  marginBottom: "8px",
                }}
              >
                <Tag size={12} />
                {selectedPost.categoryLabel}
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.25,
                  marginBottom: "10px",
                }}
              >
                {selectedPost.title}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.65)",
                }}
              >
                <span>{selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            {/* Modal Content Paragraphs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontSize: "14.5px",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {selectedPost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div
              style={{
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "16px",
                padding: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              <h4
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#fbbf24",
                  marginBottom: "10px",
                }}
              >
                Pro Stylist Key Rules
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selectedPost.keyTakeaways.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "13px",
                      color: "#ffffff",
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      color="#f59e0b"
                      style={{ flexShrink: 0, marginTop: "3px" }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Wholesale Item */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "14px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                  }}
                >
                  Featured Formulation Gear
                </span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "2px 0 0 0" }}>
                  {selectedPost.recommendedTool.name}
                </p>
              </div>

              <Link
                href={selectedPost.recommendedTool.link}
                onClick={() => setSelectedPost(null)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  backgroundColor: "#ffffff",
                  color: "#0a0c10",
                  fontWeight: 800,
                  fontSize: "12px",
                  textDecoration: "none",
                }}
              >
                <span>Shop Wholesale</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
