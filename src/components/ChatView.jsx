import { useEffect, useRef, useState } from "react";
import useStoreApi from "../Store/useApi";

const ChatView = () => {
  const { selectedFileContent } = useStoreApi();
  const [nameChat, setNameChat] = useState("");
  const [index, setIndex] = useState(0);
  const [extraClass, setExtraClass] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (selectedFileContent.data && selectedFileContent.data.length > 0) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= selectedFileContent.data.length) {
            clearInterval(timer);
          }
          return nextIndex;
        });
        setTimeout(() => {
          setExtraClass("visible");
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }, 10);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [selectedFileContent]);

  useEffect(() => {
    if (selectedFileContent.path && selectedFileContent.path.includes("__")) {
      setNameChat(selectedFileContent.path.split("__")[0].replace(/_/g, " "));
    } else {
      setNameChat(selectedFileContent.path);
    }
  }, [selectedFileContent]);

  return (
    <div className="flex-1 flex flex-col">
      <header className="p-4 flex justify-between items-center sm:mt-0 mt-12">
        <div>
          <h2 className="text-2xl font-bold">Chat with {nameChat}</h2>
          <p className="text-gray-400">Online</p>
          <p className="text-gray-400">
            {selectedFileContent.data && selectedFileContent.data.length}{" "}
            messages
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          className="flex flex-col space-y-2 chat_message"
          ref={chatContainerRef}
        >
          {selectedFileContent.data &&
            selectedFileContent.data.slice(0, index).map((item, i) => (
              <div
                key={i}
                className={`self-start bg-gray-700 p-3 rounded-lg max-w-md mensaje ${extraClass}`}
              >
                <span className="text-xs text-gray-400">{item.nombre}</span>
                <p>{item.mensaje}</p>
                <span className="text-xs text-gray-400">{item.hora}</span>
              </div>
            ))}
          {/* <div className="self-end bg-blue-600 p-3 rounded-lg max-w-md">
            <p>Hi John! I need some assistance with my account.</p>
            <span className="text-xs text-gray-300">10:05 AM</span>
          </div>
          <div className="self-start bg-gray-700 p-3 rounded-lg max-w-md">
            <p>Sure, Id be happy to help. Whats the issue?</p>
            <span className="text-xs text-gray-400">10:06 AM</span>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default ChatView;
