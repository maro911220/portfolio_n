import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";

// 폰트 설정
const suit = localFont({
  src: [
    {
      path: "./fonts/SUIT-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SUIT-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SUIT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const bungee = localFont({
  src: "./fonts/Bungee-Regular.woff2",
});

// 메타 정보
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://maropofo.vercel.app";
const title = "Maro Portfolio";
const description = "MARO의 포트폴리오 페이지 입니다.";

// 사이트 메타데이터 설정
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title,
    siteName: title,
    url,
    description,
    images: [
      {
        url: "/tumb.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};

// RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" suppressHydrationWarning>
      <body className={`${suit.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
