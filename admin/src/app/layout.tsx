import type { Metadata } from "next";
import { AdminSidebar } from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Beupros Admin Portal | Salon Approvals & Catalog Management",
  description: "Administrative console for Beupros professional wholesale salon trade network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Montserrat', -apple-system, sans-serif; background-color: #f9fafb; color: #111111; min-height: 100vh; }
          a { text-decoration: none; color: inherit; }
          button { font-family: inherit; cursor: pointer; }
          input, select, textarea { font-family: inherit; outline: none; }
          
          /* Admin Button Styles */
          .btn-admin-black {
            background-color: #111111;
            color: #ffffff;
            border: 1.5px solid #111111;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.15s ease;
          }
          .btn-admin-black:hover {
            background-color: #262626;
            border-color: #262626;
          }

          .btn-admin-white {
            background-color: #ffffff;
            color: #111111;
            border: 1.5px solid #d1d5db;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.15s ease;
          }
          .btn-admin-white:hover {
            background-color: #f3f4f6;
            border-color: #9ca3af;
          }

          .btn-admin-approve {
            background-color: #10b981;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transition: background-color 0.15s ease;
          }
          .btn-admin-approve:hover {
            background-color: #059669;
          }

          .btn-admin-reject {
            background-color: #ef4444;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transition: background-color 0.15s ease;
          }
          .btn-admin-reject:hover {
            background-color: #dc2626;
          }

          @media (max-width: 768px) {
            .admin-layout { flex-direction: column !important; }
            aside { width: 100% !important; min-height: auto !important; }
          }
        `}</style>
      </head>
      <body>
        <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
          <AdminSidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
