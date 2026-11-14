import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";

const thmanyahRegular = localFont({
  src: [
    {
      path: "../public/fonts/Thmanyah/thmanyahserifdisplay-Regular.otf",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-regular",
});
const thmanyahMedium = localFont({
  src: [
    {
      path: "../public/fonts/Thmanyah/thmanyahserifdisplay-Medium.otf",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-medium",
});
const thmanyahBold = localFont({
  src: [
    {
      path: "../public/fonts/Thmanyah/thmanyahserifdisplay-Bold.otf",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-bold",
});

export const metadata: Metadata = {
  title: "مُـبادرة",
  description: "تصفح والمشاركة في المبادرات المحلية",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${thmanyahRegular.variable} ${thmanyahMedium.variable} ${thmanyahBold.variable} h-full font-thmanyah-regular antialiased text-slate-900 bg-primary`}
    >
      <body className="h-dvh w-dvw flex flex-col bg-slate-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
