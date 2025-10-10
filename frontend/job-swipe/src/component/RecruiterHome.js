import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
function RecruiterHome() {
  const [applicationCountData, setApplicationCOuntData] = useState([
    {
      london: 59,
      paris: 57,
      newYork: 86,
      applicaitons: 5,
      month: "Data analyst 1",
    },
    {
      london: 59,
      paris: 57,
      newYork: 86,
      applicaitons: 9,
      month: "SDE 1",
    },
    {
      london: 59,
      paris: 57,
      newYork: 86,
      applicaitons: 2,
      month: "DevOps 1",
    },
  ]);

  const [jobApplicationsData,setJobApplicationsData] = useState([]);

  useEffect(() => {
      getJobApplications();
  },[])

  useEffect(()=>{
  processAnalyticsData();
  },[jobApplicationsData]);

  const getJobApplications = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_CREATED_JOB, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("RecruiterToken")}`,
        },
      });
      console.log("getJobApplications", response.data.data);
      setJobApplicationsData(response.data.data);
    } catch (e) {
      console.log("err@ getJobApplications", e);
    }
  };

  const processAnalyticsData = () =>
  {
    try{
      
          // let newApplicationCountData = jobApplicationsData.map(el => (
          //    month = el.position;

          // ))
    }
    catch(e)
    {
      console.log("err@ processAnalyticsData",e);
    }
  }

  //     const applicationCountData = [
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 5,
  //     month: 'Data analyst 1',
  //   },
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 9,
  //     month: 'SDE 1',
  //   },
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 2,
  //     month: 'DevOps 1',
  //   },

  // ];
  function valueFormatter(value) {
    return `${value}mm`;
  }

  const pieChartData = [
    {
      label: "New Applications",
      value: 72.72,
    },
    {
      label: "Shortlisted",
      value: 16.38,
    },
    {
      label: "Rejected",
      value: 3.83,
    },
    // {
    //   label: 'Chrome OS',
    //   value: 2.42,
    // },
    // {
    //   label: 'Other',
    //   value: 4.65,
    // },
  ];

  const valueFormatterPieChart = (item) => `${item.value}%`;
  const chartSetting = {
    xAxis: [{ label: "Applications", labelStyle: { fill: "white" } }],
    height: 400,
    margin: { left: 0 },
  };

  return (
    <div class="p-16 mt-8 grid grid-cols-2 gap-2">
      <div className="border-2 border-white">
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
      </div>

      <div className="p-16 ml-16 flex flex-col justify-center items-center h-full border-2 border-white">
        <PieChart
          series={[
            {
              data: pieChartData.map((item, index) => ({
                ...item,
                color: [
                  "#0EA5E9",
                  "#4ECDC4",
                  "#657275ff",
                  "#96CEB4",
                  "#FFEAA7",
                ][index], // Custom colors
              })),
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              valueFormatter: valueFormatterPieChart,
            },
          ]}
          height={300}
          width={300}
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
      </div>
    </div>
  );
}

export default RecruiterHome;
