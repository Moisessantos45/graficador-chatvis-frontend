import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";

const GraficaBarraFecha = ({ datos }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Cantidad de Datos por Día',
              data: [],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            responsive: true,
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 0, // Desactivamos la animación para evitar problemas de actualización
          },
        },
      });
    }

    const datosPorDia = {};

    for (let i = 0; i <= indice; i++) {
      const dato = datos[i];
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
        },
      ],
    };

    chartInstance.current.data.labels = newData.labels;
    chartInstance.current.data.datasets[0].data = newData.datasets[0].data;
    chartInstance.current.update();
  }, [datos, indice]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndice((prevIndice) => prevIndice + 1);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="w-11/12 sm:w-1/2 sm:h-99 h-96 flex items-center justify-center flex-col shadow-xl rounded-lg shadow-gray-300 hover:scale-100 transition-all">
      <div className="flex items-center justify-center" style={{ width: '95%', height: '576px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </article>
  );
};


export default GraficaBarraFecha;
