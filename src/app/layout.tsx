import Banner from "@/components/Banner";
import "../../styles/globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { GoogleAdSense } from "nextjs-google-adsense";
import { safeJsonLd, siteConfig } from "@/lib/site";

const defaultTitle = "Otto Notes｜加拿大生活、移民資訊與實用工具";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s｜Otto Notes",
  },
  description: siteConfig.zhDescription,
  applicationName: siteConfig.name,
  authors: [{ name: "Otto Notes", url: siteConfig.url }],
  creator: "Otto Notes",
  publisher: "Otto Notes",
  keywords: [
    "加拿大生活",
    "加拿大移民",
    "多倫多生活",
    "加拿大工作",
    "加拿大讀書",
    "實用計算器",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.zhDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.zhDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.zhDescription,
        inLanguage: ["zh-Hant-HK", "en-US"],
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
    ],
  };

  return (
    <html lang="zh-Hant">
      <head>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NF3RTWK');`,
          }}
        ></Script>
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        /> */}
        <GoogleAdSense publisherId="pub-2632815382162562" />
      </head>
      <body className="mx-auto flex min-h-screen max-w-full flex-col overflow-x-hidden bg-white py-4">
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF3RTWK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <main className="mx-auto w-full max-w-5xl flex-1">
          <Banner />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
