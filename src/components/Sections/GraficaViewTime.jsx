import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";
import useStoreApi from "../../Store/useApi";

const GraficaViewTime = () => {
  const { graphData } = useStoreApi();
  const chartRef = useRef(null);

  const obtenerHora = (horaCompleta) => {
    const match = /(\d+):(\d+)\s*([aApP][mM])?/.exec(horaCompleta);
    if (match) {
      let hora = parseInt(match[1]);
      if (esHoraAM(horaCompleta) && hora === 12) {
        hora = 0;
      }
      return hora.toString();
    }
    return null;
  };

  const esHoraAM = (horaCompleta) => {
    return /a|A/.test(horaCompleta);
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cantidad de Datos (AM)",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Cantidad de Datos (PM)",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      let chartInstance = chartRef.current.chart;
      if (chartInstance) {
        chartInstance.data = chartData;
        chartInstance.update();
      } else {
        const ctx = chartRef.current.getContext("2d");
        chartInstance = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "#fff",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
              x: {
                ticks: {
                  color: "#fff",
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "#fff",
                },
              },
            },
            animation: {
              duration: 500,
              easing: "easeInOutQuad",
            },
          },
        });
        chartRef.current.chart = chartInstance;
      }
    }
  }, [chartData]);

  useEffect(() => {
    const chartInstance = chartRef.current.chart;
    const dataPorHoraAM = {};
    const dataPorHoraPM = {};

    graphData.forEach((dato) => {
      const hora = obtenerHora(dato.hora);

      if (esHoraAM(dato.hora)) {
        dataPorHoraAM[hora] = (dataPorHoraAM[hora] || 0) + 1;
      } else {
        dataPorHoraPM[hora] = (dataPorHoraPM[hora] || 0) + 1;
      }
    });

    const horasAM = Object.keys(dataPorHoraAM);
    const horasPM = Object.keys(dataPorHoraPM);

    horasAM.sort((a, b) => parseInt(a) - parseInt(b));
    horasPM.sort((a, b) => parseInt(a) - parseInt(b));

    chartInstance.data.labels = [...horasAM, ...horasPM];
    chartInstance.data.datasets[0].data = [
      ...horasAM.map((hora) => dataPorHoraAM[hora] || 0),
      ...horasPM.map((hora) => 0),
    ];
    chartInstance.data.datasets[1].data = [
      ...horasAM.map((hora) => 0),
      ...horasPM.map((hora) => dataPorHoraPM[hora] || 0),
    ];

    chartInstance.update();
  }, []);

  return (
    <article className="w-11/12 md:w-7/12 flex flex-col items-center justify-center overflow-hidden shadow-sm shadow-gray-300 rounded-lg hover:scale-100 transition-all mx-auto md:mt-5 mt-14 bg-[#111422] md:h-[80vh] min-h-[40vh]">
      <div className="flex items-center w-full h-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </article>
  );
};

export default GraficaViewTime;
