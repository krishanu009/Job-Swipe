import React, { useEffect, useState } from "react";
import "../styling/home.css";
import { RadarChart } from "@mui/x-charts/RadarChart";
import { BarChart } from "@mui/x-charts/BarChart";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function Home() {
  const [applicationCountData, setApplicationCOuntData] = useState([]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  function valueFormatter(value) {
    return `${value}mm`;
  }
   const chartSetting = {
    xAxis: [{ label: "Applications", labelStyle: { fill: "white" } }],
    height: 400,
    margin: { left: 0 },
  };

  return (
    <div class="p-16 mt-8 grid grid-cols-2 gap-2">
      <div class="border-2 border-white">
            <ThemeProvider theme={darkTheme}>
              <RadarChart
                height={300}
                series={[{ label: "Lisa", data: [120, 98, 86, 99, 85] , color: "#4FC3F7"}]}
                radar={{
                  max: 120,
                  metrics: [
                    "New Openings",
                    "Shortlisted",
                  
                    "Under review",
                    "Rejected",
                    "Applications",
                  ],
                }}
              />
            </ThemeProvider>
          </div>

          <div class="border-2 border-white">
            <ThemeProvider theme={darkTheme}>
               <BarChart
          dataset={applicationCountData}
          yAxis={[
            {
              scaleType: "band",
              dataKey: "position",
            },
          ]}
          
          xAxis={[
            {
              label: "Applications",
            },
          ]}
          series={[
            {
              dataKey: "applicaitons",
              label: "Applicaitons",

              valueFormatter,
              color: "#0EA5E9",
            },
          ]}
          layout="horizontal"
          grid={{ vertical: true }}
          {...chartSetting}
          sx={{
            // All text elements
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              fill: "white !important",
              fontSize: "12px",
            },
            // Axis labels (rainfall mm)
            "& .MuiChartsAxis-label": {
              fill: "white !important",
              fontSize: "14px",
            },
            // Legend text - THIS IS THE KEY FIX
            "& .MuiChartsLegend-series text": {
              fill: "white !important",
              fontSize: "14px",
              fontWeight: "bold",
            },
            // Alternative legend selector
            "& .MuiChartsLegend-root .MuiChartsLegend-series": {
              fill: "white !important",
              color: "white",
            },
            // Another possible legend selector
            "& .MuiChartsLegend-label": {
              fill: "white !important",
            },
            // Axis lines
            "& .MuiChartsAxis-line": {
              stroke: "white !important",
            },
            // Grid lines
            "& .MuiChartsGrid-line": {
              stroke: "rgba(255, 255, 255, 0.2) !important",
            },
          }}
        />
            </ThemeProvider>
          </div>

    </div>
    
  );
}

export default Home;
