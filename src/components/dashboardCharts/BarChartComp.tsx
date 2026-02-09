// components/charts/MUIBarChart.tsx
"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";
import { BarChartData } from "@/lib/registry/componentRegistry";
import { Block } from "@/types/types";

interface BarChartCompProps {
  block: Block<BarChartData>;
}

export default function BarChartComp({ block }: BarChartCompProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      {/* Title and Subtitle */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {block.title}
        </Typography>
        {block.subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {block.subtitle}
          </Typography>
        )}
      </Box>

      {/* Chart */}
      <Box sx={{ mb: 3 }}>
        <BarChart
          dataset={block.data}
          xAxis={[{ scaleType: "band", dataKey: "label" }]}
          series={[{ dataKey: "value", color: "#1976d2" }]}
          height={300}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
    </Paper>
  );
}
