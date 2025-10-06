import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
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

const desktopOS = [
  {
    label: 'Windows',
    value: 72.72,
  },
  {
    label: 'OS X',
    value: 16.38,
  },
  {
    label: 'Linux',
    value: 3.83,
  },
  {
    label: 'Chrome OS',
    value: 2.42,
  },
  {
    label: 'Other',
    value: 4.65,
  },
];

const mobileOS = [
  {
    label: 'Android',
    value: 70.48,
  },
  {
    label: 'iOS',
    value: 28.8,
  },
  {
    label: 'Other',
    value: 0.71,
  },
];

const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];
const valueFormatterPieChart = (item) => `${item.value}%`;
const chartSetting = {
  xAxis: [{ label: 'rainfall (mm)',labelStyle: { fill: 'white' }, }],
  height: 400,
  margin: { left: 0 },
};

    
    
  return (
    

    <div class="p-16 mt-8 grid grid-cols-2 gap-2">
  <div className='border-2 border-white'>
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

  <div className='p-16 ml-16 flex flex-col justify-center items-center h-full border-2 border-white'> 
    <PieChart
  series={[
    {
      data: desktopOS.map((item, index) => ({
        ...item,
        color: ['#0EA5E9', '#4ECDC4', '#657275ff', '#96CEB4', '#FFEAA7'][index] // Custom colors
      })),
      highlightScope: { fade: 'global', highlight: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      valueFormatter: valueFormatterPieChart,
    },
  ]}
  height={300}
  width={300}
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
</div>
  );
}

export default RecruiterHome