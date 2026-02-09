import { Block } from "@/types/types";

export const exampleBlocks: Block[] = [
  {
    id: "bar_chart-1770576173836-zpq4vgf",
    componentId: "bar_chart",
    data: [
      { label: "Action", value: 24500 },
      { label: "Comedy", value: 23100 },
      { label: "Drama", value: 19800 },
      { label: "Horror", value: 15300 },
      { label: "Romance", value: 12700 },
    ],
    query:
      "SELECT category AS label, CAST(total_sales AS FLOAT) AS value FROM sales_by_film_category ORDER BY value DESC",
    explanation:
      "Displaying total sales for each film category to identify the most profitable genres.",
    title: "Total Sales by Film Category",
    subtitle: "Ranking genres by total revenue",
  },
  {
    id: "bar_chart-1770576720556-y4tfu6v",
    componentId: "bar_chart",
    data: [
      { label: "Action", value: 25000 },
      { label: "Comedy", value: 22000 },
      { label: "Drama", value: 19000 },
      { label: "Horror", value: 16000 },
      { label: "Romance", value: 14000 },
    ],
    query:
      "SELECT category AS label, CAST(total_sales AS FLOAT) AS value FROM sales_by_film_category ORDER BY value DESC;",
    explanation:
      "Displaying total sales revenue for each film category from the pre-computed sales_by_film_category view.",
    title: "Sales Revenue by Film Category",
    subtitle: "Using pre-computed view for efficiency",
  },
];
