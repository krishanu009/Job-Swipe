import React, { useEffect, useState } from "react";
import "../styling/home.css";
import axios from "axios";
import { RadarChart } from "@mui/x-charts/RadarChart";
import { BarChart } from "@mui/x-charts/BarChart";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function Home({userInfo}) {
  const [applicationCountData, setApplicationCountData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [radarMax,setRadarMax] = useState(0);
  useEffect(() => {
    processAnalyticsData();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  function valueFormatter(value) {
    return `${value}`;
  }
  const chartSetting = {
    xAxis: [{ label: "Applications", labelStyle: { fill: "white" } }],
    height: 400,
    margin: { left: 0 },
  };

  async function getJobAnalyticeData() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GET_JOB_ANALYTICS_DATA,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("CandidateToken")}`,
          },
        }
      );
      console.log("getJobAnalyticeData", response.data);
      setApplicationCountData(response.data.months);
    } catch (e) {
      console.log("err@ getJobAnalyticeData", e);
    }
  }

  async function getUserJobData() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GET_USER_JOB_DATA,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("CandidateToken")}`,
          },
        }
      );
      console.log("getUserJobData", response.data.data);

      return response.data.data;
    } catch (e) {
      console.log("err@ getUserJobData", e);
    }
  }

  async function processAnalyticsData() {
    try {
     await getJobAnalyticeData();
    let userData = await getUserJobData();
     let newRadarData = [];
     let newOpenings =  await getMyJobs() || 0;
     newRadarData.push(newOpenings);
     newRadarData.push(userData?.summary?.shortlisted);
     newRadarData.push(userData?.summary?.underReview);
     newRadarData.push(userData?.summary?.rejected);
     let totalApplications = parseFloat(userData?.summary?.shortlisted) + parseFloat(userData?.summary?.underReview) + parseFloat(userData?.summary?.rejected)
     newRadarData.push(totalApplications);
     console.log("newRadarData",newRadarData);
     setRadarMax(Math.max( parseFloat(userData?.summary?.shortlisted),parseFloat(userData?.summary?.underReview),parseFloat(userData?.summary?.rejected),totalApplications,newOpenings))
     setRadarData(newRadarData);
     console.log("radarMax",Math.max( parseFloat(userData?.summary?.shortlisted),parseFloat(userData?.summary?.underReview),parseFloat(userData?.summary?.rejected),totalApplications,newOpenings));
      //  setApplicationCountData(jobData);
      // setApplicationCountData([
      //   {
      //     month: "Jan",
      //     count: "2",
      //   },
      // ]);
    } catch (e) {
      console.log("err@ processAnalyticsData", e);
    }
  }

  const getMyJobs = async () => {
      let payload = {
        "userId":userInfo._id
       }
      await axios.post(process.env.REACT_APP_GET_JOBS_FOR_ME, payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("CandidateToken") },
      })
      .then((res) => {
      
        console.log("getMyJobs", res.data);
        
        let newJobData = res.data.jobs;
        
         
       return newJobData.length;
        
      })
      .catch((e) => {
        console.log("getMyJobs e",e);
   
      
      });
    }

  return (
    <div class="p-16 mt-8 grid grid-cols-2 gap-2">
      <div class="border-2 border-white">
        <ThemeProvider theme={darkTheme}>
          <RadarChart
            height={300}
            series={[
              { label: "Lisa", data: radarData, color: "#4FC3F7" },
            ]}
            radar={{
              max: radarMax,
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
                dataKey: "month",
              },
            ]}
            xAxis={[
              {
                label: "count",
              },
            ]}
            series={[
              {
                dataKey: "count",
                label: "Job postings",

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
