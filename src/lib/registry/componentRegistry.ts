import { z } from "zod";
import dynamic from "next/dynamic";

//#################################//
//###########  TYPES  #############//
//#################################//

// Bar chart schema
export const CategoryValueDataSchema = z.array(
  z.object({
    label: z.string().describe("The category name or time period"),
    value: z.coerce.number().describe("The numerical metric to display"),
  }),
);
export type BarChartData = z.infer<typeof CategoryValueDataSchema>;

// KPI card schema
export const SingleValueSchema = z
  .array(
    z.object({
      label: z.string().describe("Metric the value represents"),
      value: z.coerce.number().describe("value to display"),
    }),
  )
  .length(1);
export type KpiCardData = z.infer<typeof SingleValueSchema>;

//#################################//
//########## REGISTRY #############//
//#################################//

// Component registry
export const componentRegistry = [
  {
    id: "bar_chart",
    label: "Bar Chart",
    description: "Compares quantities across categories.",
    component: dynamic(
      () => import("@/components/dashboardCharts/BarChartComp"),
    ),
    dataSchemaString: "Array<{ label: string, value: number }>",
    dataSchema: CategoryValueDataSchema,
  },
  {
    id: "kpi_card",
    label: "KPI Card",
    description: "Displays a single high-level metric.",
    component: dynamic(
      () => import("@/components/dashboardCharts/KpiCardComp"),
    ),
    dataSchemaString: "Array<{ value: number }>",
    dataSchema: SingleValueSchema,
  },
];

type RegistryInputSchemas = (typeof componentRegistry)[number]["dataSchema"];
export type AllInputTypesType = z.infer<RegistryInputSchemas>;
