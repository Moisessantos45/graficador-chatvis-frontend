import { useState, useEffect, useRef } from "react";

const Chat = ({ chats }) => {
  const [index, setIndex] = useState(0);
  const [extraClass, setExtraClass] = useState("");
  const chatContainerRef = useRef(null);
  // console.log(chats)
  useEffect(() => {
    if (chats.length > 0) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
        setTimeout(() => {
          setExtraClass("visible");
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }, 10);
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [chats]);

  return (
    <article
      className="bg-zinc-50 chat shadow-xl shadow-gray-300 rounded-lg hover:scale-100 transition-all m-auto sm:mt-0 mt-2"
      ref={chatContainerRef}
    >
      {chats.slice(0, index).map((chat, i) => (
        <div key={i} className={`mensaje ${extraClass}`}>
          <h2 className="font-bold text-slate-600">{chat.nombre}</h2>
          <p>{chat.texto}</p>
          <span className="font-bold text-slate-600">{chat.hora}</span>
        </div>
      ))}
    </article>
  );
};

export default Chat;
