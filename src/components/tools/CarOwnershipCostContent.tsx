import CarOwnershipCostCalculator from "./CarOwnershipCostCalculator";
import { safeJsonLd } from "@/lib/site";
import Script from "next/script";

export default function CarOwnershipCostContent({
  locale,
}: {
  locale: "en" | "zh";
}) {
  const isEnglish = locale === "en";
  const faqs = isEnglish
    ? [
        {
          question: "Does the result include depreciation?",
          answer:
            "No. Depreciation depends heavily on purchase price, age, mileage and resale conditions. Add an estimated monthly amount under car loan or other costs if you want it reflected in your budget.",
        },
        {
          question: "Are electric cars always cheaper to run?",
          answer:
            "Electric cars often have lower energy and routine maintenance costs, but charging location, insurance, parking, tyres and purchase price can change the total.",
        },
        {
          question: "How accurate is the model search?",
          answer:
            "It uses the Transport Department's first-registered vehicle open data. Some historical, imported or uncommon variants may be absent. Always confirm the details—and an electric car's rated power—against its Hong Kong vehicle registration document.",
        },
      ]
    : [
        {
          question: "計算結果包括車輛折舊嗎？",
          answer:
            "不包括。折舊受買入價、車齡、里程和二手市場影響很大。如需計入，可以把預計金額填入車貸供款或其他費用。",
        },
        {
          question: "電動車的養車費一定較低嗎？",
          answer:
            "電動車的能源和例行保養一般較低，但充電地點、保險、停車、輪胎及車價都會影響總成本。",
        },
        {
          question: "車型搜尋資料準確嗎？",
          answer:
            "搜尋採用香港運輸署首次登記車輛開放數據；部分舊車、進口車或少見版本可能未有記錄。請按香港牌簿核對資料，電動車尤其要確認牌簿上的額定功率。",
        },
      ];
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Script
        id={`car-cost-faq-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqStructuredData) }}
      />
      <CarOwnershipCostCalculator locale={locale} />

      <div className="mt-14 space-y-12 border-t border-gray-200 pt-10 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {isEnglish
              ? "How much does it cost to own a car?"
              : "養一部車每月要多少錢？"}
          </h2>
          <div className="mt-4 space-y-4 leading-7">
            {isEnglish ? (
              <>
                <p>
                  The real cost of a car is more than fuel. Insurance, parking,
                  registration, routine servicing, tyres and tolls can add up to
                  a significant monthly amount. This calculator converts annual
                  bills into a monthly average so that different cars are
                  easier to compare in Hong Kong.
                </p>
                <p>
                  Select a vehicle type, model year and matching government
                  record to fill in its licence band. Running-cost fields remain
                  editable because consumption, servicing and tyres depend on
                  the exact variant and usage.
                </p>
              </>
            ) : (
              <>
                <p>
                  養車支出不只有入油或充電，汽車保險、停車場、牌照費、定期保養、輪胎和道路費用，累積起來可能比能源開支更高。計算機會把年度費用換算成每月平均，方便你比較香港不同車型。
                </p>
                <p>
                  選擇車輛類型、年份及相符的運輸署登記資料後，系統會按汽缸容量或確認後的額定功率自動帶入香港牌費。能耗、保養及輪胎開支會因版本和用車習慣而異，因此仍由你自行調整。
                </p>
              </>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish ? "What the calculation includes" : "養車費用包括哪些項目？"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(
              isEnglish
                ? [
                    ["Fuel or charging", "Monthly distance × consumption × local energy price."],
                    ["Insurance and parking", "Recurring monthly premiums and parking charges."],
                    ["Licence and maintenance", "Annual registration, servicing and repair budget divided by 12."],
                    ["Tyres and road costs", "Tyre replacement allowance, tolls, road charges and miscellaneous costs."],
                  ]
                : [
                    ["燃油或充電", "每月里程 × 平均能耗 × 當地能源價格。"],
                    ["保險及停車", "每月汽車保費、住宅或工作地點的停車費。"],
                    ["牌照及保養", "年度牌照、登記、定期保養及維修預算除以 12。"],
                    ["輪胎及道路費", "輪胎折算、隧道或高速公路費，以及其他雜項支出。"],
                  ]
            ).map(([title, description]) => (
              <div key={title} className="rounded-2xl bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-6">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish
              ? "How Hong Kong vehicle licence fees are calculated in 2026"
              : "2026 香港私家車牌費如何計算？"}
          </h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#effaf8] text-gray-950">
                <tr>
                  <th className="px-4 py-3">{isEnglish ? "Vehicle" : "車輛類型"}</th>
                  <th className="px-4 py-3">{isEnglish ? "Licence basis" : "計費基準"}</th>
                  <th className="px-4 py-3">{isEnglish ? "2026 annual fee" : "2026 年費（連徵款）"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="px-4 py-4 text-gray-950">{isEnglish ? "Petrol / hybrid" : "汽油／混能私家車"}</th>
                  <td className="px-4 py-4">{isEnglish ? "Engine cylinder capacity" : "引擎汽缸容量"}</td>
                  <td className="px-4 py-4">HK$5,074–HK$14,694</td>
                </tr>
                <tr>
                  <th className="px-4 py-4 text-gray-950">{isEnglish ? "Light diesel" : "輕質柴油私家車"}</th>
                  <td className="px-4 py-4">{isEnglish ? "Engine cylinder capacity" : "引擎汽缸容量"}</td>
                  <td className="px-4 py-4">HK$6,972–HK$16,592</td>
                </tr>
                <tr>
                  <th className="px-4 py-4 text-gray-950">{isEnglish ? "Pure electric" : "純電動私家車"}</th>
                  <td className="px-4 py-4">{isEnglish ? "Rated power on registration document" : "牌簿上的額定功率"}</td>
                  <td className="px-4 py-4">HK$1,614–HK$5,114</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {isEnglish ? "Fee bands include the annual HK$114 Traffic Accident Victims Assistance Fund levy. " : "以上級別已包括每年 HK$114 交通意外傷亡者援助基金徵款。"}
            <a
              href="https://www.td.gov.hk/filemanager/common/td341_2_2026_eng.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#16877e] underline underline-offset-4"
            >
              {isEnglish ? "View the Transport Department fee schedule" : "查看香港運輸署最新收費表"}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish ? "Frequently asked questions" : "養車費用常見問題"}
          </h2>
          <div className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 px-5">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-4">
                <summary className="cursor-pointer list-none pr-6 font-semibold text-gray-950 marker:hidden">
                  {question}
                  <span className="float-right text-[#16877e] group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 leading-7">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
