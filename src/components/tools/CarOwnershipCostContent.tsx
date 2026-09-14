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
        {
          question: "How do I calculate the cost of owning a car in Hong Kong?",
          answer:
            "Add monthly fuel or charging, insurance, parking, tolls and loan payments, then add one twelfth of annual licence, maintenance, tyre and miscellaneous costs. Depreciation should be estimated separately if you want the full economic cost.",
        },
        {
          question: "How much does it cost to own a car per month?",
          answer:
            "There is no single figure. A useful budget includes parking, fuel or charging, insurance, licence, servicing, tyres and tolls. Enter your actual mileage and quotations above to calculate a personal monthly estimate rather than relying on an average.",
        },
        {
          question: "Can I afford a car on a HK$30,000 monthly income?",
          answer:
            "It depends on housing, debt, savings and how often you drive. Compare the calculator's total—including loan payments—with the money left after essential expenses, while keeping an emergency fund and room for irregular repairs.",
        },
        {
          question: "Is there a minimum salary required to buy a car?",
          answer:
            "Hong Kong has no general statutory minimum salary for buying a car with cash. Finance approval is separate: lenders assess income, credit history, existing debt and repayment ability under their own criteria.",
        },
        {
          question: "How much does a car cost to run for a year?",
          answer:
            "Multiply recurring monthly costs by 12, then add annual licence, maintenance, tyres and other yearly bills. Add depreciation separately if you want to compare the true long-term cost of different cars.",
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
        {
          question: "養車費用如何計算？",
          answer:
            "先加總每月油費或充電費、保險、停車、路費及車貸，再把每年牌費、維修保養、輪胎和其他費用除以 12。若要計算完整用車成本，應另外加入車輛折舊。",
        },
        {
          question: "養車一個月要多少錢？",
          answer:
            "香港養車沒有單一標準答案，主要取決於停車場、每月里程、油耗或電耗、保險、牌費、保養、輪胎及隧道費。把實際報價和駕駛習慣輸入上方計算機，會比套用平均數更準確。",
        },
        {
          question: "月入 3 萬可以養車嗎？",
          answer:
            "要視乎住屋、債務、儲蓄目標和用車頻率。可先用計算機得出包括車貸在內的每月總支出，再與扣除必要生活費後的可用收入比較，並預留緊急維修及保險加價的緩衝。",
        },
        {
          question: "「窮人養車」應該如何控制開支？",
          answer:
            "所謂「窮人養車」，較實際的理解是以有限預算養車。應先比較固定停車費、保險、牌費及預計維修，再選擇可靠、油耗合理而零件供應充足的車款；同時保留緊急維修預算，不要只以低車價作決定。",
        },
        {
          question: "月薪要多少才有資格買車？",
          answer:
            "在香港以現金買車一般沒有法定最低月薪。若申請汽車貸款，銀行或財務機構會按收入、信貸紀錄、現有債務及還款能力個別審批。",
        },
        {
          question: "養車一年要花多少錢？",
          answer:
            "把每月油費或充電、停車、保險、路費及供款乘以 12，再加全年牌費、保養、輪胎和其他支出。如要比較不同車款的長期成本，亦應另外估算折舊。",
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

        <section id="monthly-car-budget">
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish
              ? "How to budget for monthly car expenses in Hong Kong"
              : "香港每月養車費用預算教學"}
          </h2>
          <div className="mt-4 space-y-4 leading-7">
            <p>
              {isEnglish
                ? "Start with costs that recur every month: parking, fuel or charging, insurance, tunnel and road charges, and any car-loan repayment. Then divide annual licence, servicing, tyre and miscellaneous budgets by 12. This gives a comparable monthly ownership figure even when bills are paid at different times of the year."
                : "計算養車一個月多少錢，可先列出每月固定或經常支出，包括停車場、油費或充電費、汽車保險、隧道及道路費，以及車貸供款；再把全年牌費、維修保養、輪胎和雜費除以 12。即使不同帳單在一年內不同時間繳付，也能換算成容易比較的每月養車預算。"}
            </p>
            <p>
              {isEnglish
                ? "Purchase price and monthly loan instalments are not the same as depreciation. If you want to compare the true cost of keeping a new car with a used car, estimate the future resale value and spread the expected loss over the ownership period."
                : "買車價、每月供款和折舊並不是同一回事。若要比較新車與二手車的真正成本，可估算日後轉售價，把預期價值損失平均分配到持有月份；計算現金流時則填入實際車貸供款。"}
            </p>
          </div>
        </section>

        <section id="fuel-cost-calculation">
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish ? "Fuel consumption and petrol cost calculation" : "油耗計算器：每公里油費如何計算？"}
          </h2>
          <div className="mt-5 rounded-2xl bg-[#effaf8] p-5 sm:p-6">
            <p className="font-semibold text-gray-950">
              {isEnglish
                ? "Monthly fuel cost = monthly distance × L/100 km × price per litre ÷ 100"
                : "每月油費 = 每月公里 × 每百公里油耗 × 每公升油價 ÷ 100"}
            </p>
            <p className="mt-3 leading-7">
              {isEnglish
                ? "For example, 1,000 km a month at 7.5 L/100 km and HK$18 per litre costs about HK$1,350. For an electric car, use the same formula with kWh/100 km and the electricity price per kWh. Actual consumption changes with traffic, air conditioning, load, driving style and charging losses."
                : "例如每月行駛 1,000 公里、平均油耗 7.5 L/100 km、油價每公升 HK$18，每月油錢約為 HK$1,350。電動車亦可用相同方法，把油耗換成 kWh/100 km，並輸入每度電價。實際能耗會受塞車、冷氣、載重、駕駛方式及充電損耗影響。"}
            </p>
          </div>
        </section>

        <section id="income-and-car-budget">
          <h2 className="text-2xl font-bold text-gray-950">
            {isEnglish ? "Can your income support a car?" : "月入 3 萬養車是否可行？"}
          </h2>
          <div className="mt-4 space-y-4 leading-7">
            <p>
              {isEnglish
                ? "Income alone does not answer whether a car is affordable. Two people earning the same amount can have very different housing costs, family commitments, debt and savings goals. Calculate the full monthly car cash flow first, then check whether the remaining income still covers essentials, regular saving and an emergency buffer."
                : "月入 3 萬是否可以養車，不能只看薪金一個數字。同樣收入的人，住屋開支、家庭責任、現有債務及儲蓄目標可以相差很大。較實際的做法是先計出完整每月汽車現金流，再確認餘下收入仍足以支付必要生活費、恆常儲蓄及緊急預備金。"}
            </p>
            <p>
              {isEnglish
                ? "A low-budget ownership plan should prioritise a reliable car, affordable parking and insurance, manageable fuel use and a repair reserve. Choosing an older or cheaper car can reduce purchase cost but may increase maintenance risk, so compare the total rather than the vehicle price alone."
                : "網上常見的「窮人養車」搜尋，其實是在問有限預算下如何控制養車費。應優先考慮可靠性、可負擔的停車及保險、合理油耗，以及維修備用金。較舊或較便宜的車可以降低買入成本，但維修風險可能較高，因此不要只比較車價，亦要把牌費、保養、輪胎和折舊一併考慮。"}
            </p>
          </div>
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

        <section aria-labelledby="related-car-cost-topics">
          <h2 id="related-car-cost-topics" className="text-2xl font-bold text-gray-950">
            {isEnglish ? "Related car-cost topics" : "其他人也搜尋了以下項目"}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(
              isEnglish
                ? [
                    ["How much does a car cost per month?", "#monthly-car-budget"],
                    ["Fuel cost calculator", "#fuel-cost-calculation"],
                    ["Cost per kilometre", "#fuel-cost-calculation"],
                    ["Can I afford a car on HK$30,000?", "#income-and-car-budget"],
                  ]
                : [
                    ["養車一個月多少錢", "#monthly-car-budget"],
                    ["油耗計算器", "#fuel-cost-calculation"],
                    ["每公里油費計算", "#fuel-cost-calculation"],
                    ["月入三萬養車", "#income-and-car-budget"],
                    ["窮人養車", "#income-and-car-budget"],
                    ["養車一年要花多少錢", "#monthly-car-budget"],
                  ]
            ).map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4 font-semibold text-gray-900 transition hover:bg-[#effaf8] hover:text-[#16877e]"
              >
                {label}
                <span aria-hidden="true" className="text-[#16877e]">↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
