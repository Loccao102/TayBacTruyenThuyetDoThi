import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tây Bắc — Nhật Ký Di Sản",
  description: "Khám phá di sản và văn hóa các dân tộc vùng cao Tây Bắc qua cuốn sổ tương tác đa giác quan."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#25120d"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="paper-grain" />
        {children}
      </body>
    </html>
  );
}
