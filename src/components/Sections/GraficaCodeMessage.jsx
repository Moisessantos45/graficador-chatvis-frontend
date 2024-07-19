import { useState, useEffect } from "react";
import useStoreApi from "@/Store/useApi";
import { codeKeywords } from "@/utils/dataStatic";

const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return "Invalid Date";
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

const GraficaCodeMessage = () => {
  const { graphData } = useStoreApi();
  const [dailyData, setDailyData] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const dailyCounts = graphData.reduce((acc, message) => {
        const dateKey = new Date(message.fecha).toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            codeCount: 0,
            messageCount: 0,
            totalCount: 0,
          };
        }

        const isCode = codeKeywords.some((keyword) =>
          message.texto.includes(keyword)
        );
        if (isCode) {
          acc[dateKey].codeCount++;
        } else {
          acc[dateKey].messageCount++;
        }
        acc[dateKey].totalCount++;

        return acc;
      }, {});

      // Calculate percentages
      const processedData = Object.values(dailyCounts).map((data) => ({
        ...data,
        codePercentage: (data.codeCount / data.totalCount) * 100,
        messagePercentage: (data.messageCount / data.totalCount) * 100,
      }));

      const sortedData = processedData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setDailyData(sortedData);

      // Set total messages
      setTotalMessages(graphData.length);
    }
  }, [graphData]);

  return (
    <div className="flex-1 w-11/12 flex flex-col gap-2 rounded-xl overflow-x-auto hide-scrollbar-x p-6 md:mt-5 mt-14 mx-auto">
      <p className="text-white text-base font-medium leading-normal">
        Message Volume Over Time
      </p>
      <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
        {totalMessages}
      </p>
      <p className="text-[#919dca] text-base font-normal leading-normal">
        Last {dailyData.length} days
      </p>
      <div className="flex justify-around mb-4">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 bg-[#232b48] mr-2"></span>
          <p className="text-white">Mensajes normales</p>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 bg-[#4caf50] mr-2"></span>
          <p className="text-white">Mensajes de código</p>
        </div>
      </div>
      <div className="grid min-h-[180px] lg:grid-cols-12 md:grid-cols-8 grid-cols-6 gap-3 items-end justify-items-center px-5">
        {dailyData.map((data, index) => (
          <div key={index} className="w-full text-center">
            <div className="relative w-full h-40 md:max-h-32 max-h-20 flex flex-col justify-end">
              {/* Barra para los mensajes normales */}
              <div
                className="border-[#919dca] bg-[#232b48] border-t-2 w-full"
                style={{ height: `${data.messagePercentage}%` }}
              />
              {/* Barra para los mensajes de código */}
              <div
                className="absolute top-0 left-0 border-[#4caf50] bg-[#4caf50] w-full"
                style={{ height: `${data.codePercentage}%` }}
              />
            </div>
            <p className="text-[#919dca] text-[13px] font-bold leading-normal tracking-[0.015em]">
              {formatDate(data.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraficaCodeMessage;
