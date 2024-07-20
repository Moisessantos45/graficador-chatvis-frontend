import React, { useState } from "react";
import useStoreApi from "@/Store/useApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { showToastNotification } from "@/utils/showToastNotification";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Sidebar = () => {
  const {
    data,
    selectedFileContent,
    isSelectOption,
    queryParam,
    setIsSelectOption,
    handleClickSelectFile,
    changeOptionService,
    createWordCloud,
    downloadCsv,
  } = useStoreApi();
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useQuery();
  const service = query.get("service");
  const serviceApi = query.get("processing_option");

  const handleOptionService = (option) => {
    if (data.length === 0) {
      showToastNotification("Please upload a file", false);
      navigate(`/upload/${id}?processing_option=${serviceApi}`);
      return;
    }
    setIsSelectOption(option);
    changeOptionService(option);
    navigate(
      `/action-panel/${id}?service=${encodeURIComponent(
        option
      )}&file=${encodeURIComponent(queryParam)}&processing_option=${serviceApi}`
    );
  };

  return (
    <aside
      className={`w-74 p-4 md:relative fixed z-20 md:bg-transparent bg-[#111422] md:border-none border-r border-solid border-r-[#232b48] top-0 md:h-auto h-screen  ${
        isVisible ? "left-0" : "-left-74 md:left-0"
      } transition-all duration-300 overflow-y-auto width_line`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-tabler icons-tabler-outline icon-tabler-menu-2 md:hidden fixed cursor-pointer md:top-14 top-12 ${
          isVisible ? "left-64" : "left-2 "
        } transition-all duration-300 `}
        onClick={() => setIsVisible(!isVisible)}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg>

      {/* <h1 className="text-xl font-bold mb-6">ChtVis</h1> */}
      <nav className=" mt-18 md:mt-0">
        <ul className="space-y-2 flex flex-col gap-1">
          <li
            onClick={() => handleOptionService("home")}
            className={`${
              isSelectOption === "home" && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Home
          </li>
          <li
            onClick={() => handleOptionService("chat")}
            className={`${
              ["chat", ""].includes(isSelectOption) && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Chat
          </li>
          <li
            onClick={() => handleOptionService("stringsChart")}
            className={`${
              isSelectOption === "stringsChart" && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Grafica de cuerdas
          </li>
          <li
            onClick={() => handleOptionService("timeChart")}
            className={`${
              isSelectOption === "timeChart" && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Grafica de tiempo
          </li>
          <li
            className={`${
              isSelectOption === "dailyChart" && "bg-slate-800"
            } rounded p-2 cursor-pointer hover:bg-slate-800`}
            onClick={() => handleOptionService("dailyChart")}
          >
            Grafica por dia
          </li>
          <li
            onClick={() => handleOptionService("codeMessagesChart")}
            className={`${
              isSelectOption === "codeMessagesChart" && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Grafica de codigo y mensajes
          </li>
          <li
            onClick={() => {
              handleOptionService("wordCloud");
              createWordCloud(id, serviceApi);
            }}
            className={`${
              isSelectOption === "wordCloud" && "bg-slate-800"
            } cursor-pointer rounded p-2 hover:bg-slate-800`}
          >
            Grafica de nube de palabras
          </li>
          <li
            onClick={() => {
              downloadCsv(id, serviceApi);
            }}
            className="cursor-pointer rounded p-2 hover:bg-slate-800"
          >
            Descargar CSV
          </li>
        </ul>
      </nav>

      <div className="space-y-0">
        <h2 className="text-lg font-semibold mb-4 mt-5">Message analysis</h2>
        <div className="space-y-2 h-auto md:h-72  overflow-y-auto width_line">
          {data.length > 0 &&
            data.map((item, i) => (
              <button
                key={i}
                className={`w-full bg_dark_blue hover:bg-[#2a3548] transition-colors duration-200 py-3 px-4 rounded-lg flex items-center justify-between ${
                  item.path === selectedFileContent.path &&
                  "bg_dark_blue_active"
                }`}
                onClick={() => handleClickSelectFile(item.path)}
              >
                <span className="font-semibold text-sm overflow-x-hidden">
                  {item.path}
                </span>
              </button>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
