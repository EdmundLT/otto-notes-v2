import CarOwnershipCostContent from "@/components/tools/CarOwnershipCostContent";
import ToolPageShell from "@/components/tools/ToolPageShell";
import { tools } from "@/data/tools";
import { createToolMetadata } from "@/lib/tool-metadata";

const tool = tools.find(
  ({ slug }) => slug === "car-ownership-cost-calculator",
)!;

export const metadata = createToolMetadata(tool, "zh");

export default function CarOwnershipCostCalculatorPage() {
  return (
    <ToolPageShell
      category={tool.category}
      description={tool.description.zh}
      locale="zh"
      slug={tool.slug}
      title={tool.title.zh}
    >
      <CarOwnershipCostContent locale="zh" />
    </ToolPageShell>
  );
}
