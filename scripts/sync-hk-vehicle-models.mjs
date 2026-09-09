import { mkdir, writeFile } from "node:fs/promises";

const datasetApi =
  "https://data.gov.hk/en-data/api/3/action/package_show?id=hk-td-wcms_11-first-reg-vehicle";
const outputPath = new URL(
  "../src/data/generated/hk-vehicle-models.json",
  import.meta.url,
);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  return rows;
}

function numberOrNull(value) {
  const number = Number(String(value).replaceAll(",", ""));
  return Number.isFinite(number) && number > 0 ? number : null;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "Otto Notes vehicle data updater" },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

const packageResponse = await fetch(datasetApi);
if (!packageResponse.ok) throw new Error(`Dataset API: ${packageResponse.status}`);
const packageData = await packageResponse.json();
const resources = packageData.result.resources.filter(
  (resource) =>
    resource.format === "CSV" &&
    resource.name.includes("(English)") &&
    /particulars_of_first_registered_vehicle_[a-z]+_20\d{2}_eng\.csv$/i.test(
      resource.url,
    ),
);

const records = new Map();
for (let offset = 0; offset < resources.length; offset += 20) {
  const batch = resources.slice(offset, offset + 20);
  const files = await Promise.all(
    batch.map(async (resource) => ({
      resource,
      text: await fetchText(resource.url),
    })),
  );

  for (const { text } of files) {
    const rows = parseCsv(text.replace(/^\uFEFF/, ""));
    const headers = rows.shift()?.map((header) => header.trim()) ?? [];
    const column = (name) => headers.indexOf(name);
    const classIndex = column("Vehicle Class");
    const makeIndex = column("Vehicle Make");
    const modelIndex = column("Vehicle Model");
    const fuelIndex = column("Fuel Type");
    const capacityIndex = column("Cylinder Capacity Of Engine (c.c.)");
    const powerIndex = column("Rated Power (kW)");
    const bodyIndex = column("Body Type");
    const yearIndex = column("Year Of Manufacture");

    for (const row of rows) {
      if (row[classIndex]?.trim().toLowerCase() !== "private car") continue;
      const make = row[makeIndex]?.trim().replace(/\s+/g, " ");
      const model = row[modelIndex]?.trim().replace(/\s+/g, " ");
      const fuel = row[fuelIndex]?.trim();
      const year = numberOrNull(row[yearIndex]);
      if (!make || !model || !fuel || !year) continue;

      const engineCc = numberOrNull(row[capacityIndex]);
      const ratedPowerKw = powerIndex >= 0 ? numberOrNull(row[powerIndex]) : null;
      const bodyType = row[bodyIndex]?.trim() || null;
      const key = [make, model, year, fuel, engineCc, ratedPowerKw].join("|");
      const existing = records.get(key);
      if (existing) {
        existing.registrations += 1;
      } else {
        records.set(key, {
          make,
          model,
          year,
          fuel,
          engineCc,
          ratedPowerKw,
          bodyType,
          registrations: 1,
        });
      }
    }
  }

  process.stdout.write(
    `Processed ${Math.min(offset + batch.length, resources.length)}/${resources.length} files\n`,
  );
}

const vehicles = [...records.values()].sort(
  (a, b) =>
    b.year - a.year ||
    a.make.localeCompare(b.make) ||
    a.model.localeCompare(b.model) ||
    b.registrations - a.registrations,
);
const payload = {
  source: "Hong Kong Transport Department — Particulars of first registered vehicles",
  sourceUrl:
    "https://data.gov.hk/en-data/dataset/hk-td-wcms_11-first-reg-vehicle",
  updatedAt: new Date().toISOString(),
  resourceCount: resources.length,
  vehicleCount: vehicles.length,
  vehicles,
};

await mkdir(new URL("../src/data/generated/", import.meta.url), {
  recursive: true,
});
await writeFile(outputPath, `${JSON.stringify(payload)}\n`, "utf8");
console.log(`Wrote ${vehicles.length} unique vehicle records to ${outputPath.pathname}`);
