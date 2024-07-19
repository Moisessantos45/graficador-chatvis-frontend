import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStoreApi from "../Store/useApi";
import ChatView from "../components/ChatView";
import GraficaCodeMessage from "../components/Sections/GraficaCodeMessage";
import GraficaViewCuerdas from "../components/Sections/GraficaViewCuerdas";
import GraficaViewDay from "../components/Sections/GraficaViewDay";
import GraficaViewTime from "../components/Sections/GraficaViewTime";
import GraficaViewWordCloud from "../components/Sections/GraficaViewWordCloud";
import Sidebar from "../components/UI/Sidebar";
import Loader from "../components/Loader";
import Home from "./Admin/Home";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UserActionPanel = () => {
  const { isSelectOption, isLoad, setIsLoad, setIsSelectOption } =
    useStoreApi();
  const query = useQuery();
  const option = query.get("service");

  useEffect(() => {
    setIsSelectOption(option);
    setIsLoad(true);
  }, [option]);

  if (!isLoad) return <Loader />;
  return (
    <div className="flex bg-[#111422] text-white h-auto">
      <Sidebar />
      {isSelectOption === "home" && <Home />}
      {isSelectOption === "chat" && <ChatView />}

      {isSelectOption === "stringsChart" && <GraficaViewCuerdas />}

      {isSelectOption === "timeChart" && <GraficaViewTime />}

      {isSelectOption === "dailyChart" && <GraficaViewDay />}

      {isSelectOption === "codeMessagesChart" && <GraficaCodeMessage />}
      {isSelectOption === "wordCloud" && <GraficaViewWordCloud />}
    </div>
  );
};

export default UserActionPanel;
