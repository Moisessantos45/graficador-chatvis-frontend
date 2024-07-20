import useStoreApi from "@/Store/useApi";
import { v4 as uuidv4 } from "uuid";
import WordCloudItem from "@/components/UI/WordCloudItem";
import { words } from "@/utils/dataStatic";
import DashboardItem from "@/components/UI/DashboardItem";

const Home = () => {
  const { data } = useStoreApi();
  return (
    <div className="min-h-screen bg-transparent text-white p-8 w-full sm:mt-7 md:mt-2 lg:mt-5 mt-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          WhatsApp chat analysis dashboard
        </h1>
      </div>
      <div className="w-12/12 mx-auto bg-transparent p-6 rounded-lg mb-8 border border-solid border-[#232b48]">
        <h2 className="text-xl mb-2">
          Analyze and visualize your WhatsApp messages
        </h2>
        <p>
          Track your message trends, simulate chats in real-time, and gain
          insights from your conversations.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {data &&
          data.map((item) => (
            <DashboardItem
              key={uuidv4()}
              path={item.path}
              dataLength={item.data.length}
            />
          ))}
      </div>
      <div className="w-12/12 bg-transparent p-6 rounded-lg mb-8 border border-solid border-[#232b48] mx-auto">
        <h2 className="text-xl mb-4">Word cloud</h2>
        <div className="space-y-3">
          {words.map((item) => (
            <WordCloudItem
              key={uuidv4()}
              word={item.word}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
