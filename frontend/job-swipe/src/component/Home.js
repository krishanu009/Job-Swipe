import React from "react";
import "../styling/home.css";
import { RadarChart } from "@mui/x-charts/RadarChart";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function Home() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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

    </div>
    
  );
}

export default Home;
