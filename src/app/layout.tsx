import Banner from "@/components/Banner";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const defaultTitle: any = "Otto Notes｜加拿大移民生活｜多倫多工作";
export const metadata: Metadata = {
  title: defaultTitle,
  description:
    "軟體工程師 x 數據分析師｜香港情侶加拿大移民生活分享，多倫多留學讀書、工作心得。",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
          crossOrigin="anonymous"
        ></script>
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className="mx-auto max-w-full bg-white py-4">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF3RTWK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <main className="mx-auto max-w-5xl">
          <Banner />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
