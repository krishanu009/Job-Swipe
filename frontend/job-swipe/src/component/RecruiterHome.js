import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
function RecruiterHome() {
  const [applicationCountData, setApplicationCOuntData] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobApplicationsData, setJobApplicationsData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const [selectedjobDropdown, setSelectedJobDropdown] = useState("all");

  useEffect(() => {
    getJobApplications();
  }, []);

  useEffect(() => {
    processAnalyticsData();
  }, [jobApplicationsData]);

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

  const processAnalyticsData = () => {
    try {

      let newPieChartData = [
    {
      label: "New Applications",
      value: 0,
    },
    {
      label: "Shortlisted",
      value: 0,
    },
    {
      label: "Rejected",
      value: 0,
    },
    
  ];
      let newApplicationCountData = jobApplicationsData.map((el) => ({
        position: el.position,
        shortlisted: el.shortlisted,
        rejected: el.rejected,
        applicaitons:
          parseFloat(el.applicantsCount) +
          parseFloat(el.shortlisted || 0) +
          parseFloat(el.rejected || 0),
        reminingApplications: parseFloat(el.applicantsCount),

        

      }));
      console.log("newApplicationCountData", newApplicationCountData);

      newApplicationCountData.forEach(el=> {
        console.log("el",el);
        newPieChartData[0].value += parseFloat(el.reminingApplications);
        newPieChartData[1].value += parseFloat(el.shortlisted);
        newPieChartData[2].value += parseFloat(el.rejected);
      })
      console.log("newPieChartData", newPieChartData);
      setApplicationCOuntData(newApplicationCountData);
      setPieChartData(newPieChartData);
    } catch (e) {
      console.log("err@ processAnalyticsData", e);
    }
  };

  //     const applicationCountData = [
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 5,
  //     position: 'Data analyst 1',
  //   },
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 9,
  //     position: 'SDE 1',
  //   },
  //   {
  //     london: 59,
  //     paris: 57,
  //     newYork: 86,
  //     applicaitons: 2,
  //     position: 'DevOps 1',
  //   },

  // ];
  function valueFormatter(value) {
    return `${value}mm`;
  }

  // const pieChartData = [
  //   {
  //     label: "New Applications",
  //     value: 72.72,
  //   },
  //   {
  //     label: "Shortlisted",
  //     value: 16.38,
  //   },
  //   {
  //     label: "Rejected",
  //     value: 3.83,
  //   },
  //   // {
  //   //   label: 'Chrome OS',
  //   //   value: 2.42,
  //   // },
  //   // {
  //   //   label: 'Other',
  //   //   value: 4.65,
  //   // },
  // ];

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
      </div>

      <div className="p-16 ml-16  h-full border-2 border-white">
        {/* <div>
          <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none"
      >
        Actions
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Newsletter
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Purchases
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Downloads
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Team Account
            </a>
          </div>
        </div>
      )}
    </div>
          
        </div> */}
        <div className="flex flex-col justify-center items-center">
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
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
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
    </div>
  );
}

export default RecruiterHome;
