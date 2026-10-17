"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Search, Truck, ShieldCheck, Navigation, Award, ChevronRight } from "lucide-react";

interface StoreHub {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  status: "Open Now" | "Closes at 8 PM";
  type: "Flagship Hub" | "Express Trade Center" | "Academy & Pro Store";
  services: string[];
}

const storeHubs: StoreHub[] = [
  {
    id: "delhi-cp",
    name: "Beupros Flagship Pro Hub — Connaught Place",
    city: "New Delhi",
    state: "Delhi NCR",
    address: "Block E, Inner Circle, Connaught Place, New Delhi",
    pincode: "110001",
    phone: "+91 11 4982 7100",
    hours: "9:00 AM – 8:30 PM (Mon–Sat) • 10:00 AM – 6:00 PM (Sun)",
    status: "Open Now",
    type: "Flagship Hub",
    services: ["2-Hour Click & Collect", "Colorist Mixing Bar", "Shear & Blade Sharpening", "Live Masterclass Studio"],
  },
  {
    id: "mumbai-bandra",
    name: "Beupros West Pro Hub — Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Waterfield Road, Off Linking Road, Bandra West, Mumbai",
    pincode: "400050",
    phone: "+91 22 6821 3400",
    hours: "9:30 AM – 8:30 PM (Mon–Sat) • 10:30 AM – 6:00 PM (Sun)",
    status: "Open Now",
    type: "Academy & Pro Store",
    services: ["2-Hour Click & Collect", "Appliance Warranty Testing", "Bulk Salon Order Desk", "Color Formulation Lab"],
  },
  {
    id: "bengaluru-indiranagar",
    name: "Beupros South Flagship — Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru",
    pincode: "560038",
    phone: "+91 80 4390 1200",
    hours: "9:00 AM – 8:00 PM (Mon–Sat) • Closed Sundays",
    status: "Open Now",
    type: "Flagship Hub",
    services: ["2-Hour Click & Collect", "Certified Stylist Concierge", "Electric Tool Repair", "Nail Tech Demo Bar"],
  },
  {
    id: "hyderabad-jubilee",
    name: "Beupros Regional Center — Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    address: "Road No. 36, Near Peddamma Temple, Jubilee Hills, Hyderabad",
    pincode: "500033",
    phone: "+91 40 4567 8900",
    hours: "9:00 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Same-Day Priority Pickup", "Color Bar Inventory", "Wholesale Account Setup"],
  },
  {
    id: "chennai-tnagar",
    name: "Beupros Trade Counter — T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Pondy Bazaar, Sir Thyagaraya Road, T. Nagar, Chennai",
    pincode: "600017",
    phone: "+91 44 2815 6700",
    hours: "9:30 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Curbside Pro Pickup", "Spa & Esthetician Consumables", "Salon Furniture Showroom"],
  },
  {
    id: "kolkata-parkstreet",
    name: "Beupros East Pro Center — Park Street",
    city: "Kolkata",
    state: "West Bengal",
    address: "Park Street, Camac Street Intersection, Kolkata",
    pincode: "700016",
    phone: "+91 33 2289 4500",
    hours: "10:00 AM – 7:30 PM (Mon–Sat)",
    status: "Open Now",
    type: "Academy & Pro Store",
    services: ["2-Hour Click & Collect", "Live Color Demo Arena", "Barber Tools Specialist Desk"],
  },
  {
    id: "pune-koregaon",
    name: "Beupros Pro Hub — Koregaon Park",
    city: "Pune",
    state: "Maharashtra",
    address: "North Main Road, Koregaon Park, Pune",
    pincode: "411001",
    phone: "+91 20 6712 8900",
    hours: "9:00 AM – 8:00 PM (Mon–Sat)",
    status: "Open Now",
    type: "Express Trade Center",
    services: ["Instant Trade Pickup", "Hair Smoothing Demo Booth", "Commercial 5L Can Dispensing"],
  },
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredStores = storeHubs.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.pincode.includes(searchQuery);

    const matchesType =
      selectedType === "all" ||
      (selectedType === "pickup" && store.services.some((s) => s.includes("Pickup") || s.includes("Collect"))) ||
      (selectedType === "flagship" && store.type === "Flagship Hub") ||
      (selectedType === "academy" && store.type === "Academy & Pro Store");

    return matchesSearch && matchesType;
  });

  return (
    <div style={{ backgroundColor: "#ffffff", paddingBottom: "6rem" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e5e5e5",
          padding: "3.5rem 0",
        }}
      >
        <div className="container-custom">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", color: "#666666", marginBottom: "0.5rem" }}>
            <MapPin size={16} /> Regional Pro Hub Network
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              color: "#000000",
            }}
          >
            Beupros Stores & Regional Pro Hubs
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#555555", maxWidth: "680px" }}>
            Order online and pick up at your local pro hub in 2 hours. Access live color matching bars, equipment testing, and wholesale account specialists.
          </p>
        </div>
      </div>

      <div className="container-custom" style={{ paddingTop: "2.5rem" }}>
        {/* Controls Row: Search & Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #eeeeee",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "9999px",
              padding: "0.6rem 1.25rem",
              border: "1px solid #d4d4d4",
              width: "100%",
              maxWidth: "420px",
            }}
          >
            <Search size={18} color="#666666" />
            <input
              type="text"
              placeholder="Search by city, state, or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: "0.9rem",
                width: "100%",
              }}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Hubs" },
              { id: "pickup", label: "2-Hour Pickup" },
              { id: "flagship", label: "Flagship Hubs" },
              { id: "academy", label: "Academy & Demos" },
            ].map((tab) => {
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: isActive ? "#000000" : "#ffffff",
                    color: isActive ? "#ffffff" : "#444444",
                    border: isActive ? "1.5px solid #000000" : "1.5px solid #d4d4d4",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Store Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredStores.map((store) => (
            <div
              key={store.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e5e5",
                borderRadius: "16px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#000000";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      backgroundColor: "#f5f5f5",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      color: "#333333",
                    }}
                  >
                    {store.type}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a" }}>
                    ● {store.status}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.3, marginBottom: "0.6rem" }}>
                  {store.name}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem", color: "#555555", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <MapPin size={16} color="#000000" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{store.address} — {store.pincode}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Phone size={16} color="#000000" style={{ flexShrink: 0 }} />
                    <a href={`tel:${store.phone}`} style={{ color: "#000000", fontWeight: 600 }}>{store.phone}</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Clock size={16} color="#000000" style={{ flexShrink: 0 }} />
                    <span>{store.hours}</span>
                  </div>
                </div>

                {/* Services Pills */}
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "0.85rem", marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "#888888", marginBottom: "0.4rem" }}>
                    Hub Amenities & Services:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {store.services.map((svc) => (
                      <span
                        key={svc}
                        style={{
                          fontSize: "0.72rem",
                          backgroundColor: "#f9fafb",
                          border: "1px solid #e5e7eb",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.6rem", borderTop: "1px solid #eeeeee", paddingTop: "1rem" }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-black"
                  style={{ flex: 1, padding: "0.6rem", fontSize: "0.82rem", textAlign: "center" }}
                >
                  <Navigation size={14} /> Get Directions
                </a>
                <Link
                  href="/shop"
                  className="btn-pill-white"
                  style={{ padding: "0.6rem 0.9rem", fontSize: "0.82rem" }}
                >
                  Shop This Hub
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trade Pickup Notice Banner */}
        <div
          style={{
            marginTop: "4.5rem",
            backgroundColor: "#f8faf9",
            borderRadius: "16px",
            border: "1px solid #d1fae5",
            padding: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#16a34a", fontWeight: 800, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              <Truck size={16} /> 2-Hour Express In-Store Pickup
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Need Supplies For Today&apos;s Appointments?
            </h3>
            <p style={{ fontSize: "0.92rem", color: "#444444", lineHeight: 1.5 }}>
              Place your order online before 4:00 PM, choose &quot;In-Store Pro Pickup&quot;, and your packed order will be waiting at the trade desk with zero shipping fees.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#333333" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <ShieldCheck size={18} color="#16a34a" />
              <span>Verify your pro license or salon name at counter</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Award size={18} color="#16a34a" />
              <span>Instant batch verification & color shade inspections</span>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <Link href="/shop" className="btn-pill-black" style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem" }}>
                Start Pro Order <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
