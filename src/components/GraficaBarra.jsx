import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";

const GraficaBarra = ({ datos }) => {
  // console.log(datos);
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
            scales: {
              y: {
                beginAtZero: true,
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

  // useEffect(() => {
  //   if (datos) {
  //     const dataPorHoraAM = {};
  //     const dataPorHoraPM = {};

  //     const updateChartData = (index) => {
  //       if (index < datos.length) {
  //         const dato = datos[index];
  //         const hora = obtenerHora(dato.hora);

  //         if (esHoraAM(dato.hora)) {
  //           dataPorHoraAM[hora] = (dataPorHoraAM[hora] || 0) + 1;
  //         } else {
  //           dataPorHoraPM[hora] = (dataPorHoraPM[hora] || 0) + 1;
  //         }
  //         const horasAM = Object.keys(dataPorHoraAM);
  //         const horasPM = Object.keys(dataPorHoraPM);

  //         horasAM.sort((a, b) => parseInt(a) - parseInt(b));
  //         horasPM.sort((a, b) => parseInt(a) - parseInt(b));

  //         const newChartData = {
  //           labels: [...horasAM, ...horasPM],
  //           datasets: [
  //             {
  //               label: "Cantidad de Datos (AM)",
  //               data: [
  //                 ...horasAM.map((hora) => dataPorHoraAM[hora] || 0),
  //                 ...horasPM.map((hora) => 0),
  //               ],
  //               backgroundColor: "rgba(75, 192, 192, 0.6)",
  //               borderWidth: 1,
  //             },
  //             {
  //               label: "Cantidad de Datos (PM)",
  //               data: [
  //                 ...horasAM.map((hora) => 0),
  //                 ...horasPM.map((hora) => dataPorHoraPM[hora] || 0),
  //               ],
  //               backgroundColor: "rgba(255, 99, 132, 0.6)",
  //               borderWidth: 1,
  //             },
  //           ],
  //         };

  //         setChartData(newChartData);
  //         setTimeout(() => updateChartData(index + 1), 500);
  //       }
  //     };

  //     updateChartData(0);
  //   }
  // }, [datos]);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    if (datos && chartRef.current) {
      const chartInstance = chartRef.current.chart;
      const dataPorHoraAM = {};
      const dataPorHoraPM = {};

      const updateChartData = (index) => {
        if (index < datos.length) {
          const dato = datos[index];
          const hora = obtenerHora(dato.hora);

          if (esHoraAM(dato.hora)) {
            dataPorHoraAM[hora] = (dataPorHoraAM[hora] || 0) + 1;
          } else {
            dataPorHoraPM[hora] = (dataPorHoraPM[hora] || 0) + 1;
          }

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
          setTimeout(() => updateChartData(index + 1), 300);
        }
      };

      updateChartData(lastIndex);
      setLastIndex(datos.length);
    }
  }, [datos]);

  return (
    <article className="w-11/12 margin sm:w-1/2 sm:h-99 h-96 flex flex-col items-center justify-center overflow-hidden shadow-xl shadow-gray-300 rounded-lg hover:scale-100 transition-all">
      <div
        className=" flex items-center"
        style={{ width: "95%", height: "100%" }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </article>
  );
};

export default GraficaBarra;
