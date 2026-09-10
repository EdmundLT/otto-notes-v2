import data from "@/data/generated/hk-vehicle-models.json";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type") ?? "petrol";
  const make = params.get("make") ?? "";
  const model = params.get("model") ?? "";
  const year = Number(params.get("year")) || 0;
  const fuelRecords = data.vehicles.filter((record) => type === "electric" ? record.fuel === "Electric" : type === "diesel" ? record.fuel.includes("Diesel") : record.fuel === "Petrol");
  const brands = [...new Set(fuelRecords.map((record) => record.make))].sort();
  const makeRecords = make ? fuelRecords.filter((record) => record.make === make) : [];
  const models = [...new Set(makeRecords.map((record) => record.model))].sort();
  const modelRecords = model ? makeRecords.filter((record) => record.model === model) : [];
  const years = [...new Set(modelRecords.map((record) => record.year))].sort((a, b) => b - a);
  const yearRecords = year ? modelRecords.filter((record) => record.year === year) : [];
  const variants = [...new Map(yearRecords.sort((a, b) => b.registrations - a.registrations).map((record) => [type === "electric" ? record.ratedPowerKw : record.engineCc, record])).values()].sort((a, b) => (a.engineCc ?? a.ratedPowerKw ?? 0) - (b.engineCc ?? b.ratedPowerKw ?? 0));
  return NextResponse.json(
    {
      brands,
      models,
      years,
      variants,
      meta: {
        source: data.source,
        updatedAt: data.updatedAt,
        vehicleCount: data.vehicleCount,
      },
    },
    {
      // Every query-string combination represents a different step in the
      // cascading selector. Netlify's shared cache does not vary this route by
      // these application query parameters, so caching can return the initial
      // brands-only response for later model/year requests.
      headers: { "Cache-Control": "no-store, max-age=0" },
    },
  );
}
