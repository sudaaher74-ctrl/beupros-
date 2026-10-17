"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/AdminHeader";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  salePrice: number;
  mrp: number;
  discount: string;
  discountPercent: number;
  image: string;
  availability: string;
  description: string;
}

const categories = [
  "All Categories",
  "Hair",
  "Beauty",
  "Tools",
  "Commercial Cans",
  "Nails",
  "Pedi & Mani",
  "Accessories",
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand: "",
    category: "Hair",
    salePrice: 500,
    mrp: 650,
    image: "",
    availability: "In Stock",
    description: "",
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "20");
      if (search) params.set("search", search);
      if (selectedCategory !== "All Categories") params.set("category", selectedCategory);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      brand: "",
      category: "Hair",
      salePrice: 500,
      mrp: 650,
      image: "",
      availability: "In Stock",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setIsEditing(true);
    setFormData(p);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}" from the catalog?`)) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch {
      alert("Failed to delete product");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        const d = await res.json();
        alert(d.error || "Failed to save product");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <>
      <AdminHeader
        title="Product Catalog Inventory"
        subtitle={`Total Products: ${total.toLocaleString()} active trade items`}
      />

      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Top Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            backgroundColor: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", flex: 1 }}>
            {/* Search */}
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={15} color="#9ca3af" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by title, brand, SKU..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{ width: "100%", padding: "8px 10px 8px 32px", fontSize: "13px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              style={{ padding: "8px 12px", fontSize: "13px", borderRadius: "6px", border: "1.5px solid #d1d5db", backgroundColor: "#ffffff" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button onClick={handleOpenAdd} className="btn-admin-black" style={{ padding: "8px 16px" }}>
            <Plus size={16} /> Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>Loading products...</div>
          ) : products.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#6b7280" }}>No products found.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563" }}>
                    <th style={{ padding: "12px 18px", width: "60px" }}>Image</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Product Title & Brand</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Category</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Wholesale Price</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>MRP</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Discount</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700 }}>Status</th>
                    <th style={{ padding: "12px 18px", fontWeight: 700, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "10px 18px" }}>
                        <div style={{ width: "42px", height: "42px", position: "relative", backgroundColor: "#f9fafb", borderRadius: "6px", overflow: "hidden", border: "1px solid #eeeeee" }}>
                          <Image src={p.image || "/placeholder.png"} alt={p.name} fill sizes="42px" style={{ objectFit: "contain", padding: "2px" }} />
                        </div>
                      </td>
                      <td style={{ padding: "10px 18px", maxWidth: "300px" }}>
                        <div style={{ fontWeight: 800, color: "#6b7280", fontSize: "10.5px", textTransform: "uppercase" }}>{p.brand}</div>
                        <div style={{ fontWeight: 700, color: "#111111", lineHeight: 1.3 }} className="line-clamp-2">{p.name}</div>
                      </td>
                      <td style={{ padding: "10px 18px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#f3f4f6", padding: "2px 8px", borderRadius: "4px" }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: "10px 18px", fontWeight: 800, color: "#111111", fontSize: "14px" }}>
                        ₹{p.salePrice.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "10px 18px", color: "#6b7280" }}>
                        ₹{p.mrp.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "10px 18px" }}>
                        {p.discount ? (
                          <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "11px" }}>{p.discount}</span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td style={{ padding: "10px 18px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#065f46", backgroundColor: "#ecfdf5", padding: "2px 6px", borderRadius: "4px" }}>
                          {p.availability || "In Stock"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 18px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            style={{ backgroundColor: "#f3f4f6", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}
                            title="Edit Product"
                          >
                            <Edit size={15} color="#4b5563" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            style={{ backgroundColor: "#fef2f2", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}
                            title="Delete Product"
                          >
                            <Trash2 size={15} color="#ef4444" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderTop: "1px solid #e5e7eb", fontSize: "13px" }}>
            <div style={{ color: "#6b7280" }}>
              Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> ({total.toLocaleString()} products)
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn-admin-white"
                style={{ padding: "6px 12px", opacity: page <= 1 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="btn-admin-white"
                style={{ padding: "6px 12px", opacity: page >= totalPages ? 0.5 : 1 }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 100,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              maxWidth: "580px",
              width: "100%",
              padding: "2rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
                {isEditing ? "Edit Catalog Product" : "Add New Trade Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", background: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. L'Oréal Professionnel Inoa Ammonia-Free Color 60g"
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={formData.brand || ""}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Loreal"
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                    Category *
                  </label>
                  <select
                    value={formData.category || "Hair"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db", backgroundColor: "#ffffff" }}
                  >
                    <option value="Hair">Hair</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Tools">Tools</option>
                    <option value="Commercial Cans">Commercial Cans</option>
                    <option value="Nails">Nails</option>
                    <option value="Pedi & Mani">Pedi & Mani</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                    Wholesale Sale Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice || ""}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                    Retail MRP (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.mrp || ""}
                    onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                  Product Image URL
                </label>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or /placeholder.png"
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
                  Description & Salon Usage
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Professional product details..."
                  rows={3}
                  style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1.5px solid #d1d5db" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-admin-white">
                  Cancel
                </button>
                <button type="submit" className="btn-admin-black">
                  {isEditing ? "Save Updates" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
