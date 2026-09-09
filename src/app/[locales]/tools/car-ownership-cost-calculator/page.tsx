import CarOwnershipCostContent from "@/components/tools/CarOwnershipCostContent";
import ToolPageShell from "@/components/tools/ToolPageShell";
import { tools } from "@/data/tools";
import { createToolMetadata } from "@/lib/tool-metadata";
import { notFound } from "next/navigation";

const tool = tools.find(
  ({ slug }) => slug === "car-ownership-cost-calculator",
)!;

export const metadata = createToolMetadata(tool, "en");

export default function CarOwnershipCostCalculatorPage({
  params,
}: {
  params: { locales: string };
}) {
  if (decodeURIComponent(params.locales) !== "en") notFound();

  return (
    <ToolPageShell
      category={tool.category}
      description={tool.description.en}
      locale="en"
      slug={tool.slug}
      title={tool.title.en}
    >
      <CarOwnershipCostContent locale="en" />
    </ToolPageShell>
  );
}
