import Banner from "@/components/Banner";
import "../../styles/globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { GoogleAdSense } from "nextjs-google-adsense";
import { metadataDescription, metadataTitle } from "meta";



export const metadata: Metadata = {
  title: metadataTitle,
  description:metadataDescription,
   
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2632815382162562"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        
        <GoogleAdSense publisherId="pub-2632815382162562" />
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
      </body>
        <Footer />
    </html>
  );
}
