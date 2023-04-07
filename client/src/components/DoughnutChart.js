
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  labels,
  chartData,
  backgroundColor,
  roundedToTwoDecimal_DatasetList,
  padding,
  redraw,
}) => {
  const chartColors = {
    tooltip: "#495057",
  };

  //need to override default tooltip for Doughnut type
  ChartJS.overrides.doughnut.plugins.tooltip = {
    callbacks: {
      title(tooltipItem, data) {
        return tooltipItem[0].label;
      },
      label(tooltipItem, data) {
        const amount = tooltipItem.formattedValue;
        const percentage =
          roundedToTwoDecimal_DatasetList[tooltipItem.dataIndex];
        return "$" + amount + " ( " + percentage + "% )";
      },
      labelTextColor(tooltipItem) {
        return "#495057";
      },
    },
    backgroundColor: "white",
    borderColor: chartColors.tooltip,
    borderWidth: 1,
    displayColors: false,
    padding: 10, //Padding inside the tooltip.
    caretPadding: 10, //distance from end of tooltip arrow to  the tooltip point.
    titleColor: chartColors.tooltip,
    titleAlign: "center",
    bodyAlign: "center",
    bodyFont: {
      weight: 600,
    },
  };
  const plugins = [
    // {
    //   id: "slice-Expand",
    //   beforeDraw(chart) {
    //     const dataset = chart._metasets[0].data;
    //     if (dataset.length > 4) {
    //       dataset[1].options.offset = 20;
    //     } else {
    //       dataset[0].options.offset = 15;
    //     }
    //   },
    // },
    // {
    //   //https://www.youtube.com/watch?v=YcRj52VovYQ
    //   id: "doughnut-Label-Line",
    //   beforeDraw(chart) {
    //     const { ctx, height, width } = chart;
    //     chart.data.datasets.forEach((dataset, i) => {
    //       chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
    //         const datapointValue = datapoint.$context.parsed;
    //         const percentage = dataSum && (datapointValue / dataSum) * 100;
    //         //chart does not rerender when toggle button so sales dataSum is used to calculate percentage for expense
    //         if (datapointValue && percentage >= 1) {
    //           // console.log(datapointValue);
    //           let { x, y } = datapoint.tooltipPosition();
    //           // draw line
    //           const controlNum = height * 0.07;
    //           const halfwidth = width / 2;
    //           const halfheight = height / 2;
    //           const xLine = x >= halfwidth ? x + controlNum : x - controlNum;
    //           const yLine = y >= halfheight ? y + controlNum : y - controlNum;
    //           const extraLine =
    //             x >= halfwidth ? controlNum * 1.5 : -controlNum * 1.5;
    //           ctx.beginPath();
    //           ctx.moveTo(x, y);
    //           ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    //           ctx.fill();
    //           ctx.moveTo(x, y);
    //           ctx.lineTo(xLine, yLine);
    //           ctx.lineTo(xLine + extraLine, yLine);
    //           // ctx.strokeStyle = dataset.backgroundColor[index];
    //           ctx.strokeStyle = "black";
    //           ctx.stroke();
    //           ctx.font = "12px Arial";
    //           //control the position of text label
    //           const textPosition = x >= halfwidth ? "left" : "right";
    //           const text =
    //             percentage < 2
    //               ? roundedToTwoDecimal_DatasetList[index]
    //               : roundedNoDecimal_DatasetList[index];
    //           const plusFivePx = x >= halfwidth ? 5 : -5; //move text away from line
    //           ctx.textAlign = textPosition;
    //           ctx.textBaseLine = "middle";
    //           // ctx.fillStyle = dataset.backgroundColor[index];
    //           ctx.fillStyle = "black";
    //           ctx.fillText(
    //             text + "%",
    //             xLine + plusFivePx,
    //             yLine - height * 0.02
    //           );
    //         }
    //       });
    //     });
    //   },
    // },
    // {
    //   //https://stackoverflow.com/questions/42585861/chart-js-increase-spacing-between-legend-and-chart
    //   id: "increase-legend-spacing",
    //   beforeInit(chart) {
    //     // Get reference to the original fit function
    //     const originalFit = chart.legend.fit;
    //     // Override the fit function
    //     chart.legend.fit = function fit() {
    //       // Call original function and bind scope in order to use `this` correctly inside it
    //       originalFit.bind(chart.legend)();
    //       this.width -= 10;
    //     };
    //   },
    // },
    // {
    //   id: "add-layout-padding",
    //   afterDraw(chart) {
    //     const {
    //       height
    //     } = chart;
    //     if (height > 200) {
    //       chart.config.options.layout.padding = height * 0.22;
    //     }
    //     else {
    //       chart.config.options.layout.padding = 20
    //     }
    //   }
    // },
    // ChartDataLabels,
  ];

  //options
  const options = {
    responsive: true,
    maintainAspectRation: false,
    // aspectRatio: control.aspectRatio,
    aspectRatio: 1,
    hoverOffset: 10, //https://www.chartjs.org/docs/latest/charts/doughnut.html#doughnut
    animation: {
      animateRotate: false,
      // animateScale: true //animate from center then outwards
    },
    plugins: {
      legend: {
        display: false,
      },
      // datalabels: {
      //   display: "auto", //the label is hidden if it overlap with another label
      //   font: {
      //     weight: "bold",
      //   },
      //   padding: 20,
      // },
      // elements: {
      //   point: {
      //     hoverRadius: 7,
      //     radius: 5,
      //   },
      // },
    },
    layout: {
      padding: padding,
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        cutout: "85%",
        // offset: 15, //space between arc
        // borderRadius: 5,
        // datalabels: {
        //   labels: {
        //     value: {
        //       color: function (context) {
        //         const index = context.dataIndex;
        //         let value = context.dataset.data[index];
        //         if (context.dataset.data.length > 4) {
        //           if (index > 2) {
        //             return (value = "black");
        //           } else {
        //             return (value = "white");
        //           }
        //         } else {
        //           return (value = "black");
        //         }
        //       },
        //       formatter: function (value, ctx) {
        //         return roundedNoDecimal_DatasetList[ctx.dataIndex] + "%";
        //       },
        //     },
        //   },
        //   clamp: true, //make sure the label is visible
        // },
      },
    ],
  };

  //set redraw back to false after chart has re-rendered
  setTimeout(() => {
    redraw = false;
  }, 1000);


  return (
    <div className="chart-container">
      <Doughnut
        data={data}
        options={options}
        plugins={plugins}
        redraw={redraw}
      />
    </div>
  );
};

export default DoughnutChart