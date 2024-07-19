import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useStoreApi from "../../Store/useApi";

const GraficaViewDay = () => {
  const { graphData } = useStoreApi();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Cantidad de Mensajes por Día",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderWidth: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: "white",
              },
            },
            y: {
              grid: {
                color: "white",
              },
              beginAtZero: true,
            },
          },
          animation: {
            duration: 0,
          },
        },
      });
    }

    const datosPorDia = {};

    for (let i = 0; i <= indice; i++) {
      const dato = graphData[i];
      if (dato) {
        const dia = dato.fecha;
        datosPorDia[dia] = (datosPorDia[dia] || 0) + 1;
      }
    }

    const diasUnicos = Object.keys(datosPorDia).sort();
    const newData = {
      labels: diasUnicos,
      datasets: [
        {
          data: diasUnicos.map((dia) => datosPorDia[dia]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        },
      ],
    };

    chartInstance.current.data.labels = newData.labels;
    chartInstance.current.data.datasets[0].data = newData.datasets[0].data;
    chartInstance.current.data.datasets[0].backgroundColor =
      newData.datasets[0].backgroundColor;
    chartInstance.current.data.datasets[0].hoverBackgroundColor =
      newData.datasets[0].hoverBackgroundColor;
    chartInstance.current.update();
  }, [graphData, indice]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndice((prevIndice) => prevIndice + 1);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="w-11/12 md:w-7/12 md:max-h-[80vh] lg:h-auto sm:h-[70vh] h-[40vh] flex items-center justify-center flex-col shadow-sm rounded-lg shadow-gray-300 hover:scale-100 transition-all mx-auto md:mt-5 mt-14">
      <div
        className="flex items-center justify-center"
        style={{ width: "95%", height: "576px" }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </article>
  );
};

export default GraficaViewDay;
