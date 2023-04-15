import { Chart, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAppContext } from "../context/appContext.js";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // registerables,
} from "chart.js";

ChartJS.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // ...registerables
);

const ChartJs = ({ chartType, viewBy }) => {
  const {
    dashboardLineChart_ExpensesData,
    dashboardLineChart_SalesData,
    dashboardLineChart_Date,
    screenSize,
  } = useAppContext();

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (dashboardLineChart_Date.day && dashboardLineChart_Date.day.length) {
      switch (viewBy) {
        case "Daily":
          setChartData({
            expData: dashboardLineChart_ExpensesData?.day,
            salesData: dashboardLineChart_SalesData?.day,
            date: dashboardLineChart_Date?.day,
          });
          break;

        case "Monthly":
          setChartData({
            expData: dashboardLineChart_ExpensesData?.month,
            salesData: dashboardLineChart_SalesData?.month,
            date: dashboardLineChart_Date?.month,
          });
          break;

        case "Yearly":
          setChartData({
            expData: dashboardLineChart_ExpensesData?.year,
            salesData: dashboardLineChart_SalesData?.year,
            date: dashboardLineChart_Date?.year,
          });
          break;
        default:
          setChartData({
            expData: dashboardLineChart_ExpensesData?.day,
            salesData: dashboardLineChart_SalesData?.day,
            date: dashboardLineChart_Date?.day,
          });
      }
    }
  }, [
    viewBy,
    dashboardLineChart_Date,
    dashboardLineChart_ExpensesData,
    dashboardLineChart_SalesData,
    screenSize,
  ]);

  const chart_colors = {
    // sales_line: "#495057",
    sales_line: "#0ebac5",
    expenses_line: "#adb5bd",
    // expenses_line: "#495057",
    tooltip_bgc: "#343a40",
    expenses_hoverPoint: "#adb5bd",
    axesLabel: "#6c757d",
    lineShadow: "#7b838a",
    chart_bgc: "white",
  };

  // const lollipop = {
  //   id: "lollipop-gridline", //https://www.youtube.com/watch?v=EFZenVv5q_0
  //   beforeDatasetDraw(chart) {
  //     const {
  //       ctx,
  //       scales: { xAxis, yAxis },
  //       chartArea: { top },
  //     } = chart;
  //     ctx.save();

  //     const xPosition = xAxis._gridLineItems;

  //     if (xPosition) {
  //       const angle = Math.PI / 180;

  //       xPosition.forEach((circle, index) => {
  //         lightArc(index);
  //         darkArc(index);
  //       });
  //       function lightArc(value) {
  //         ctx.beginPath();
  //         ctx.fillStyle = chart_colors.lineShadow;
  //         ctx.arc(xPosition[value].tx1, top, 7, angle * 0, angle * 360, false);
  //         ctx.fill();
  //         ctx.closePath();
  //       }

  //       function darkArc(value) {
  //         ctx.beginPath();
  //         ctx.fillStyle = chart_colors.sales_line;
  //         ctx.arc(xPosition[value].tx1, top, 3, angle * 0, angle * 360, false);
  //         ctx.fill();
  //         ctx.closePath();
  //       }
  //     }
  //   },
  // };
  const labelBackDrop = {
    id: "labelBackDrop",
    afterEvent(chart, args) {
      const points = chart.getElementsAtEventForMode(
        args.event,
        "nearest",
        { intersect: true },
        true
      );
      const backdropColorArray = [chart_colors.chart_bgc];
      const colorArray = ["#666"];
      if (points[0]) {
        const dataset = points[0].datasetIndex;
        const datapoint = points[0].index;
        const index = Math.ceil(
          chart.data.datasets[dataset].data.length /
            chart.scales.xAxis.ticks.length
        );

        for (let i = 1; i < chart.scales.xAxis.ticks.length; i++) {
          if (datapoint / index === i) {
            backdropColorArray.push(chart_colors.sales_line);
            colorArray.push("white");
          } else {
            backdropColorArray.push(chart_colors.chart_bgc);
            colorArray.push(chart_colors.axesLabel);
          }
        }
      }
      chart.config.options.scales.xAxis.ticks.color = colorArray;
      chart.config.options.scales.xAxis.ticks.backdropColor =
        backdropColorArray;
    },
  };
  const tooltipLine = {
    id: "tooltipAnnotationLine",
    afterDraw(chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.tooltip._active[0];
        const ctx = chart.ctx;
        ctx.save();
        const x = activePoint.element.x;
        // const y = activePoint.element.y;
        const topY = chart.scales.yAxis.top + 10;
        const bottomY = chart.scales.yAxis.bottom + 20;
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#212529";
        ctx.stroke();
        ctx.restore();
      }
    },
  };
  const lineShadow = {
    //https://stackoverflow.com/questions/43439191/chartjs-v2-stroke-shadow
    id: "add-line-shadow",
    beforeDraw(chart) {
      let ctx = chart.ctx;
      let _stroke = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = chart_colors.lineShadow;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 5;
        _stroke.apply(this, arguments);
        ctx.restore();
      };
    },
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: true,
    animation: false,
    onHover: (context) => {
      // console.log(context)
      context.chart.update();
    },
    hover: {
      mode: "nearest", //https://www.chartjs.org/docs/latest/configuration/interactions.html#modes
      intersect: false,
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 40,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            weight: "500",
          },
          usePointStyle: true,
          pointStyle: "line", //https://www.chartjs.org/docs/latest/configuration/legend.html#legend-label-configuration
          padding: 20,
        },
      },
      tooltip: {
        //https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-callbacks
        backgroundColor: chart_colors.tooltip_bgc,
        displayColors: false,
        // bodyColor: 'black',
        borderColor: "rgba(100, 100, 111, 0.1)",
        borderWidth: 1,
        yAlign: "bottom",
        xAlign: "center",
        cornerRadius: 10,
        caretPadding: 15,
        caretSize: 6,
        padding: {
          top: 5,
          bottom: 5,
          left: 10,
          right: 10,
        },
        bodyFont: {
          size: 14,
          weight: 600,
        },
        titleColor: "white",
        titleAlign: "center",
        titleSpacing: 3,
        callbacks: {
          title: function (context) {
            let title = context[0].label || "";
            if (viewBy === "Daily") {
              return format(new Date(title), "MMM d");
            } else if (viewBy === "Monthly") {
              return format(new Date(title), "MMM");
            } else {
              return format(new Date(title), "yyyy");
            }
          },

          label: function (context) {
            let label = context.dataset.label || "";
            if (label && context.parsed.y !== null) {
              let amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(context.parsed.y)
                .replace(/\.00$/, "");
              label = label + " :  " + amount;
            }
            return label;
          },
          labelTextColor: function (context) {
            return "white";
          },
        },
      },
    },
    scales: {
      xAxis: {
        type: "category",
        grid: {
          display: false,
          drawBorder: false,
          lineWidth: 1.5,
        },
        ticks: {
          maxTicksLimit: 12,
          font: {
            weight: 600,
            size: 11,
          },
          color: chart_colors.axesLabel,
          showLabelBackdrop: true,
          backdropPadding: {
            x: 10,
            y: 3,
          },
          padding: 20,
          backdropColor: [chart_colors.chart_bgc],
          // autoSkip: false,
          maxRotation: 0, //https://stackoverflow.com/questions/35022830/chart-js-change-label-orientation-on-x-axis-for-line-charts
          minRotation: 0,
          callback(value, index) {
            const item = this.getLabelForValue(value);
            if (viewBy === "Daily") {
              const date = new Date(item);
              // if (index === 0) {
              //   return format(date, "MMM d yyyy").split(" ");
              // }
              return format(date, "d");
            }
            if (viewBy === "Monthly") {
              const date = new Date(item);
              // if (index === 0) {
              //   return format(date, "MMM yyyy").split(" ");
              // }
              return format(date, "MMM");
            }
          },
        },
      },
      yAxis: {
        grid: {
          display: false,
          drawBorder: false,
        },
        position: "left",
        // max: (scale) =>
        //   scale.chart.data.datasets.reduce((acc, curr) => {
        //     const max = Math.max(...curr.data);
        //     acc = max > acc ? (max + max*0.1).toFixed(2) : acc;
        //     return acc;
        //   }, 0),
        ticks: {
          // display: control.ticksYaxisDisplay,
          // color: chart_colors.axesLabel,
          maxTicksLimit: 5,
          // padding: 20,
          font: {
            weight: 600,
            size: 11,
          },
          callback(value, index) {
            const ticksValue = this.getLabelForValue(value);
            return "$" + ticksValue + "   ";
          },
        },
      },
    },
  };

  const plugins = [lineShadow, labelBackDrop, tooltipLine];

  const datasetStyle = {
    pointRadius: 0,
    borderWidth: 1.5,
    tension: 0.4,
    pointHoverRadius: 7,
    pointHoverBorderWidth: 4,
    pointHoverBorderColor: chart_colors.sales_line,
    pointHoverBackgroundColor: "#FFFFFF",
  };
  const data = {
    labels: chartData.date,
    datasets: [
      {
        label: "Sales",
        data: chartData.salesData,
        borderColor: chart_colors.sales_line,
        ...datasetStyle,
      },
      {
        label: "Expenses",
        data: chartData.expData,
        borderColor: chart_colors.expenses_line,
        ...datasetStyle,
      },
    ],
  };
  return (
    <div className="chart-container">
      <div
        style={{
          minWidth: "600px",
          minHeight: "200px",
          overflow: "auto",
        }}
      >
        <Chart
          options={options}
          data={data}
          plugins={plugins}
          type={chartType}
        />
      </div>
    </div>
  );
};

export default ChartJs;
