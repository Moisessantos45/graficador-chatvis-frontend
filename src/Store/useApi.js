import { create } from "zustand";
import axios from "axios";
import {
  processFiles,
  calculateInteractions,
  formatDates,
} from "@/utils/procesarTexto";
import { convertToCSV } from "@/utils/createCsv";
import { showToastNotification } from "@/utils/showToastNotification";
import { processMessages } from "@/utils/createWordCloud";

const api = import.meta.env.VITE_BACKEND_URL_API;

const useStoreApi = create((set, get) => ({
  data: [],
  selectedFileContent: {},
  graphData: [],
  optionService: "",
  isSelectOption: "",
  queryParam: "",
  isLoad: false,
  progressBar: 0,
  setData: (data) => set({ data }),
  setSelectedFileContent: (selectedFileContent) => set({ selectedFileContent }),
  setGraphData: (graphData) => set({ graphData }),
  setOptionService: (optionService) => set({ optionService }),
  setIsSelectOption: (isSelectOption) => set({ isSelectOption }),
  setQueryParam: (queryParam) => set({ queryParam }),
  setIsLoad: (isLoad) => set({ isLoad }),
  getDataApi: async (id) => {
    try {
      const response = await axios.get(`${api}/api/chatvis/v1/get-data/${id}`);
      const data = response.data.data;
      set({ data, selectedFileContent: data[0], queryParam: data[0].path });
    } catch (error) {
      showToastNotification("Error getting data", false);
    }
  },
  uploadFiles: async (files, option, id) => {
    try {
      let data;
      if (option === "browser") {
        data = await processFiles(files);
      } else {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
        const response = await axios.post(
          `${api}/api/chatvis/v1/upload/${id}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              set({ progressBar: percentCompleted });
            },
          }
        );

        data = response.data.data;
      }

      set({
        data,
        selectedFileContent: data[0],
        queryParam: data[0].path.replace(/.json/g, ""),
        isLoad: true,
        progressBar: 100,
      });
      showToastNotification("Files uploaded successfully", true);
    } catch (error) {
      showToastNotification("Error uploading files", false);
      set({ progressBar: 0 });
    }
  },
  handleClickSelectFile: (fileName) => {
    const { data } = get();
    const selectedFileContent = data.find((file) => file.path === fileName);
    set({ selectedFileContent, queryParam: selectedFileContent.path });
  },
  changeOptionService: (option) => {
    const { selectedFileContent } = get();
    const data = selectedFileContent.data;

    const optionHandlers = {
      stringsChart: () => calculateInteractions(data),
      timeChart: () => data.map(({ hora }) => ({ hora })),
      dailyChart: () => formatDates(data),
      codeMessagesChart: () => formatDates(data),
    };

    const handler = optionHandlers[option];
    if (handler) {
      const graphData = handler();
      set({ graphData });
    } else {
      showToastNotification("Option not found", false);
    }
  },
  createWordCloud: async (id,option) => {
    const { selectedFileContent } = get();
    const path = selectedFileContent.path;
    const data = selectedFileContent.data;
    try {
      if (option === "browser") {
        const messages = data.map((item) => item.mensaje);
        const processedWords = processMessages(messages);
        set({ graphData: processedWords });
        return;
      }
      const response = await axios.get(
        `${api}/api/chatvis/v1/create-wordCloud?id=${id}&path=${path}`
      );
      const content = response.data.data;

      set({ graphData: content });
      showToastNotification("Word cloud created successfully", true);
    } catch (error) {
      showToastNotification("Error creating word cloud", false);
    }
  },
  downloadCsv: async (id,opcion) => {
    try {
      const { selectedFileContent } = get();
      const path = selectedFileContent.path;
      let csv;
      if (opcion === "browser") {
        csv = convertToCSV(selectedFileContent.data);
      } else {
        const response = await axios.get(
          `${api}/api/chatvis/v1/download?id=${id}&path=${path}`,
          {
            responseType: "blob",
          }
        );
        csv = response.data;
      }
      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${path.replace(/\.json$/, "")}.csv`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
      showToastNotification("File downloaded successfully", true);
    } catch (error) {
      showToastNotification("Error downloading file", false);
    }
  },
}));

export default useStoreApi;
