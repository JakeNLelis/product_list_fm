import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dessert Shop - Product List",
  description:
    "Browse and order delicious desserts from our curated collection",
  icons: {
    icon: [
      {
        url: "/images/favicon-32x32.png",
        href: "/images/favicon-32x32.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatText.className} font-sans antialiased bg-rose-100`}
      >
        {children}
      </body>
    </html>
  );
}
