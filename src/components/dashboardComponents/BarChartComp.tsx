// components/charts/MUIBarChart.tsx
"use client";

import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { BarChartData } from "@/lib/registry/componentRegistry";
import { Block } from "@/types/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

      {/* Explanation Accordion */}
      {block.explanation && (
        <Accordion
          sx={{
            mb: 1,
            "&:before": { display: "none" },
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InfoOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="subtitle2" fontWeight={500}>
                Explanation
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {block.explanation}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* SQL Query Accordion */}
      {block.query && (
        <Accordion
          sx={{
            "&:before": { display: "none" },
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CodeIcon fontSize="small" color="action" />
              <Typography variant="subtitle2" fontWeight={500}>
                SQL Query
              </Typography>
              <Chip label="SQL" size="small" sx={{ ml: 1 }} />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <SyntaxHighlighter
              language="sql"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 4px 4px",
                fontSize: "0.875rem",
              }}
            >
              {block.query}
            </SyntaxHighlighter>
          </AccordionDetails>
        </Accordion>
      )}
    </Paper>
  );
}

// // components/charts/MUIBarChart.tsx
// "use client";

// import { BarChart } from "@mui/x-charts/BarChart";
// import { Box, Typography } from "@mui/material";
// import { BarChartData } from "@/lib/registry/componentRegistry";
// import { Block } from "@/types/types";

// interface BarChartCompProps {
//   block: Block<BarChartData>;
// }

// export default function BarChartComp({ block }: BarChartCompProps) {
//   return (
//     <Box
//       sx={{ width: "100%", p: 2, bgcolor: "background.paper", borderRadius: 2 }}
//     >
//       <Typography variant="h4" gutterBottom>
//         {block.title}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         {block.subtitle}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         {block.explanation}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         {block.query}
//       </Typography>
//       <BarChart
//         dataset={block.data}
//         xAxis={[{ scaleType: "band", dataKey: "label" }]}
//         series={[{ dataKey: "value", color: "#1976d2" }]}
//         height={300}
//         margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//       />
//     </Box>
//   );
// }
