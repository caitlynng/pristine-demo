import { Chart } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({ firstDataset, secondDataset, labels }) => {
  const chart_colors = {
    sales_line: "#495057",
    expenses_line: "#adb5bd",
    tooltip_bgc: "#343a40",
    expenses_hoverPoint: "#adb5bd",
    axesLabel: "#6c757d",
    lineShadow: "#f2f2f2",
    chart_bgc: "#f8f9fa",
  };

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

  let controlSwitch = false;
  const control = {
    legendDisplay: controlSwitch,
    gridyAxisDisplay: true,
    gridxAxisDisplay: controlSwitch,
    ticksYaxisDisplay: true,
    plugins: [ labelBackDrop],
  };

  const plugins = control.plugins;

  const options = {
    responsive: true,
    maintainAspectRation: false,
    animation: false,
    onHover: (context) => {
      // console.log(context)
      context.chart.update();
    },
    hover: {
      mode: "point", //https://www.chartjs.org/docs/latest/configuration/interactions.html#modes
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
        // display: control.legendDisplay,
        display: true,
        position: "bottom",
        // onHover: function (event, legendItem, legend) {
        //   console.log(event)
        //   const datasetIndex = legendItem.datasetIndex;
        //   let elementList = [];
        //   for (let i = 0; i < this.chart.getDatasetMeta(datasetIndex).data.length; i++) {
        //     elementList.push({
        //       'datasetIndex': datasetIndex,
        //       'index': i,
        //     });
        //   }
        //   this.chart.setActiveElements(elementList);
        //   this.chart.update();
        // }
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
          top: 10,
          bottom: 10,
          left: 25,
          right: 25,
        },
        bodyFont: {
          size: 15,
          weight: 600,
        },
        titleColor: "white",
        titleAlign: "center",
        titleSpacing: 3,
        callbacks: {
          title: function (context) {
            let title = context[0].label || "";
            if (title.length > 3) {
              return format(new Date(title), "MMM d");
            } else {
              return format(new Date(title), "MMM");
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
          display: control.gridxAxisDisplay,
          drawBorder: false,
          lineWidth: 1.5,
        },
        ticks: {
          // offset: true,
          maxTicksLimit: 12,
          font: {
            weight: 600,
            size: 11,
            // lineHeight: 1.3,
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
            if (typeof item === "string") {
              const date = new Date(item);
              if (index === 0) {
                return format(date, "MMM d yyyy").split(" ");
              }
              return format(date, "d");
            } else {
              const date = new Date();
              date.setMonth(item - 1);

              return date.toLocaleString("en-US", { month: "short" });
            }
          },
        },
      },
      yAxis: {
        display: control.gridyAxisDisplay,
        grid: {
          display: control.gridyAxisDisplay,
          drawBorder: false,
        },
        position: "left",
        ticks: {
          display: control.ticksYaxisDisplay,
          color: chart_colors.axesLabel,
          maxTicksLimit: 5,
          // padding: 20,
          font: {
            weight: 600,
            size: 11,
          },
          callback(value, index) {
            return this.getLabelForValue(value) + "   ";
          },
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: firstDataset,
        backgroundColor: chart_colors.sales_line,
      },
      {
        label: "Expenses",
        data: secondDataset,
        backgroundColor: chart_colors.expenses_line
      },
    ],
  };
  return (
    <div className="chart-container">
      <Chart options={options} data={data} plugins={plugins} redraw={true} type="bar" />
    </div>
  );
}

export default BarChart