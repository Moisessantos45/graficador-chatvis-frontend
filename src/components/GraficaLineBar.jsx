import { Bar } from "react-chartjs-2";
import tinycolor from "tinycolor2";

const GraficaLineBar = ({ data }) => {
  console.log(data)
  let counts = {};
  const Utils = {
    CHART_COLORS: {
      red: "rgb(255, 99, 132)",
      blue: "rgb(54, 162, 235)",
    },
    transparentize: function (color, opacity) {
      var alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return tinycolor(color).setAlpha(alpha).toRgbString();
    },
  };

  for (let i = 0; i < data.length; i++) {
    let hour = data[i].hora.split(":")[0];
    if (!counts[hour]) {
      counts[hour] = 0;
    }
    counts[hour]++;
  }

  let labels = Object.keys(counts);
  labels.sort();

  let dataset = Object.values(counts);

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: "Cantidad por hora",
        data: dataset,
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
    ],
  };

  let config = {
    type: "bar",
    data: chartData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Cantidad de veces por hora",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
    <article className="w-12/12 sm:w-1/2 sm:h-[84vh] flex flex-col m-auto">
      <Bar data={chartData} options={config.options} />
    </article>
    </>
  );
};


export default GraficaLineBar;
