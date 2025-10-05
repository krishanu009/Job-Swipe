import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

function RecruiterHome() {
    const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Feb',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];
function valueFormatter(value) {
  return `${value}mm`;
}
const chartSetting = {
  xAxis: [{ label: 'rainfall (mm)',labelStyle: { fill: 'white' }, }],
  height: 400,
  margin: { left: 0 },
};

    
    
  return (
    <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
      <BarChart
        dataset={dataset}
        yAxis={[{ 
          scaleType: 'band', 
          dataKey: 'month',
        }]}
        xAxis={[
          { 
            label: 'rainfall (mm)',
          }
        ]}
        series={[{ 
          dataKey: 'seoul', 
          label: 'Seoul rainfall', 
          
          valueFormatter,
          color: '#0EA5E9',
        }]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
        sx={{
          // All text elements
          '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
            fill: 'white !important',
            fontSize: '12px',
          },
          // Axis labels (rainfall mm)
          '& .MuiChartsAxis-label': {
            fill: 'white !important',
            fontSize: '14px',
          },
          // Legend text - THIS IS THE KEY FIX
          '& .MuiChartsLegend-series text': {
            fill: 'white !important',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          // Alternative legend selector
          '& .MuiChartsLegend-root .MuiChartsLegend-series': {
            fill: 'white !important',
            color:'white'
          },
          // Another possible legend selector
          '& .MuiChartsLegend-label': {
            fill: 'white !important',
          },
          // Axis lines
          '& .MuiChartsAxis-line': {
            stroke: 'white !important',
          },
          // Grid lines
          '& .MuiChartsGrid-line': {
            stroke: 'rgba(255, 255, 255, 0.2) !important',
          },
        }}
      />
    </div>
  );
}

export default RecruiterHome