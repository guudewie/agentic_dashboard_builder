"use client";

import { KpiCardData } from "@/lib/registry/componentRegistry";
import { Block } from "@/types/types";
import { Paper, Typography } from "@mui/material";

interface KPIChartCardProps {
  block: Block<KpiCardData>;
}

export default function KPIChartCard({ block }: KPIChartCardProps) {
  const value = block.data[0].value;
  const label = block.data[0].label;

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: "center", minWidth: 200 }}>
      <Typography variant="h4" gutterBottom>
        {block.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {block.subtitle}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {block.explanation}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {block.query}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Typography
        variant="h3"
        component="div"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {value.toLocaleString()}
      </Typography>
    </Paper>
  );
}
