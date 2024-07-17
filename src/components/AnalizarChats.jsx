import urlBackend from "../Config/UrlBackend";
import { useEffect, useState } from "react";

const AnalizarChats = ({ texto }) => {
  // console.log(texto);

  const [idea, setIdea] = useState("");
  const [loader, setLoader] = useState(true);

  const procesarTexto = (texto) => {
    // console.log(texto);
    return new Promise((resolve, reject) => {
      try {
        const cadena = texto
          .map((text) => {
            const palabras = text.texto.trim().split(/\s+/);
            if (palabras.length > 10) {
              return text.texto;
            }
          })
          .filter(Boolean)
          .join(" ");
        const textoProcesado = cadena.replace(/\n/g, " ").split(/\s*\.\.\.\s*/);
        const textoFinal = textoProcesado.join(" ").slice(0, 7000);
        const prompt = `dime cual fue el tema principal de este texto o de que se esta hablando: ${textoFinal}`;

        resolve(prompt);
      } catch (error) {
        reject(error);
      }
    });
  };
  useEffect(() => {
    try {
      const analizadorContent = async (texto) => {
        try {
          const prompt = await procesarTexto(texto);
          const response = await urlBackend.post("generate", { prompt });
          const data = response.data !== undefined ? response.data : "";
          setIdea(data);
        } catch (error) {
          setIdea("No se pudo procesar el texto, intente de nuevo");
        }
        setLoader(false);
      };

      analizadorContent(texto);
    } catch (error) {
      return;
    }
  }, []);
  if (loader) return <h1 className="ml-auto">Procesando...</h1>;

  return (
    <article className="w-12/12 sm:w-1/2 sm:h-[84vh] h-auto flex-wrap bg-zinc-50 flex justify-center m-aut items-center overflow-y-auto shadow-xl shadow-gray-300 rounded-lg hover:scale-100 transition-all p-1">
      <div className=" w-12/12 text-justify shadow-xl bg-gray-100 shadow-zinc-50 rounded-lg transition-all overflow-hidden flex flex-wrap p-2 h-full">
        <p className=" text-black">{idea !== "" ? idea : ""}</p>
      </div>
    </article>
  );
};

export default AnalizarChats;
