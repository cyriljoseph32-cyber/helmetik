import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { fontSans, fontDisplay, fontThai } from "@/lib/fonts";
import { locales, isLocale, localeHtmlLang } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#08131f",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);

  return (
    <html
      lang={localeHtmlLang[typedLocale]}
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontThai.variable} ${typedLocale === "th" ? "lang-th" : ""}`}
    >
      <body className="min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <Header locale={typedLocale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  );
}
