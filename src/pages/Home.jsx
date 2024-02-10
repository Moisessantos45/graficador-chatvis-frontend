import { useState } from "react";
import Swal from "sweetalert2";
import Chat from "../components/Chat";
import Grafica from "../components/Grafica";
import GraficaBarra from "../components/GraficaBarra";
import GraficaBarraFecha from "../components/GraficaBarraFecha";
import AnalizarChats from "../components/AnalizarChats";
import bg_d3 from "../img/grafica_d3.png";
import bg_barra_hora from "../img/grafico_barras_horas.png";
import bg_barra_fecha from "../img/grafico_barras_fecha.png";
import bg_csv from "../img/file_csv.png";
import word_cloud from "../img/word_cloud.png";
import icon_down from "../img/arrow-down.png";
import icon_code from "../img/grafica_codes_mensage.png";
import WordCloud from "../components/WordCloud";
import GraficaLineBar from "../components/GraficaLineBar";
import OpcionesWeb from "../components/OpcionesWeb";
import GraficaDatos from "../components/GraficaDatos";
import Mensajes from "../utils/Mensajes";
// import procesarTexto from "../utils/ProcesarTexto";
import procesarTexto, {
  separarCadena,
  simplificarObjeto,
  busqueda,
  obtener_fecha_hora,
} from "../utils/ProcesarTexto";
import Tooltip_mui from "../components/Tooltip";
// import TooltipDinamicos from "../utils/TooltipsDinamicos";

const mostrarAlerta = (texto) => {
  Swal.fire({
    icon: "error",
    width: 300,
    title: texto,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};

const Home = () => {
  const [files, setFiles] = useState([]);
  const [fileTexts, setTexts] = useState([]);
  const [csvDataList, setCsvDataList] = useState([]);
  const [messageChat, setChat] = useState(false);
  const [fecha, setFecha] = useState([]);
  const [realTimeChats, setRealTimeChats] = useState([]);
  const [NombreChat, setNombre] = useState([]);
  const [graficaSeleccionada, setGraficaSeleccionada] = useState("");
  const [barra, setBarra] = useState(false);
  const [mostrarTooltip, setTooltip] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [tooltipSeleccionado, setTooltipSeleccionado] = useState("");
  const [width, setWidth] = useState("");
  const [heigth, setHeigth] = useState("");
  const [dataTooltip, setDataToolptip] = useState([]);
  const [mostrarBtn, setMostrarBtn] = useState(false);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const fileNames = selectedFiles.map((file) => {
      const textoSeparado = file.name.split(" ");
      const palabras = textoSeparado.slice(4);
      return palabras.join(" ").replace(/\.txt$/, "");
    });
    setNombre(fileNames);
    // console.log("Nombres de los archivos seleccionados:", fileNames);
  };

  //procesar texto

  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedTexts = [];
    const csvDataList = [];
    const fechaData = [];

    for (const file of files) {
      if (file.type !== "text/plain") {
        mostrarAlerta("Archivo no valido");
        continue;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target.result;
        const chatData = procesarTexto(content);
        if (chatData == null) return mostrarAlerta("Archivo no valido");
        processedTexts.push(chatData);
        const copiaConFechaYHora = obtener_fecha_hora(content);
        fechaData.push(copiaConFechaYHora);
        const dataCsv = simplificarObjeto(chatData);
        csvDataList.push(dataCsv);

        if (csvDataList.length === files.length) {
          setCsvDataList(csvDataList);
          setTexts(processedTexts);
          setFecha(fechaData);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadCsv = (i) => {
    if (csvDataList.length > 0) {
      // const dataListD3 = csvDataList.flat();
      const dataListD3 = csvDataList[i];
      // console.log("funcion", fileTexts[i]);
      // const Participantes = Array.from(
      //   new Set(fileTexts[i].map((item) => item.nombre))
      // ).map((nombre) => {
      //   return fileTexts.find((item) => item.nombre?.trim() === nombre?.trim());
      // });
      let Participantes = fileTexts[i]
        .filter(
          (objeto, index, self) =>
            index ===
            self
              .map((mapObj) => mapObj.nombre?.trim())
              .indexOf(objeto.nombre?.trim())
        )
        .filter((text) => text.texto !== undefined);

      const csvContent = `Source,Value,Target,TamMensaje,Codigo,Integrantes ${
        Participantes.length
      }\n${dataListD3
        .map(
          (item, posi) =>
            `"${item.source}","${item.value}","${item.target}","${
              fileTexts[i][posi]?.texto?.trim()?.length
            }","${busqueda(fileTexts[i][posi]?.texto?.trim())}"`
        )
        .join("\n")}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chat.csv";

      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const handleStart = () => {
    setChat(true);
  };

  const handleStop = () => {
    setChat(false);
  };

  const handleReset = () => {
    setTexts([]);
    setCsvDataList([]);
    setFiles([]);
    setTexts([]);
    setFecha([]);
    setNombre([]);
  };

  const mostrarGrafica = (tipoGrafica, pos) => {
    setGraficaSeleccionada(tipoGrafica);
    // setChatSeleccionado(pos)
  };

  const mostrarOpciones = () => {
    setBarra(!barra);
  };

  const mostrar_tooltip = (e, ancho, alto, tipo) => {
    setTooltip(true);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
    setTooltipSeleccionado(tipo);
    setWidth(ancho);
    setHeigth(alto);
  };
  // if (fileTexts.length < 0 || loader) return <Loader />;
  // console.log(TooltipDinamicos)
  return (
    <>
      <main className="flex flex-col gap-1 min-h-[89.5vh]">
        <div
          className={`bg-zinc-50 z-10 border border-b-1-slate-950 border-b-2 w-full h-20 sm:h-14 flex justify-center gap-2 items-center transition-all ${
            barra ? "sm:-translate-y-14 -translate-y-20" : ""
          }`}
        >
          <form className="flex gap-2" onSubmit={handleSubmit}>
            {fileTexts.length == 0 && (
              <>
                <label
                  htmlFor="file"
                  className="bg-gray-300 text-slate-700 rounded-lg w-40 h-8 text-center font-bold flex items-center justify-center label_file outline-dotted outline-2 outline-indigo-200 hover:outline-indigo-600 hover:text-indigo-600 relative"
                  onMouseOver={(e) => {
                    mostrar_tooltip(e, "w-44", "h-7", "file");
                    setDataToolptip({
                      texto: "Select the file for plotting.",
                      tipo: "file",
                    });
                  }}
                  onMouseOut={() => setTooltip(false)}
                  onClick={() => setTooltip(false)}
                >
                  <i className="fa-solid fa-file m-1"></i>
                  New File
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleChange}
                  multiple
                />
                <button
                  type="submit"
                  className="bg-indigo-700 rounded-lg w-36 float-right justify-center items-center font-bold text-slate-700 label_file hover:outline-indigo-600 hover:outline-2 hover:outline hover:text-indigo-600 relative"
                  onMouseOver={(e) => {
                    setTooltip(true);
                    setMouseX(e.clientX);
                    setMouseY(e.clientY);
                    setTooltipSeleccionado("subir");
                    setWidth("w-44");
                    setHeigth("h-12");
                    setDataToolptip({
                      texto: "Upload the file for processing.",
                      tipo: "subir",
                    });
                  }}
                  onClick={() => setTooltip(false)}
                  onMouseOut={() => setTooltip(false)}
                >
                  <i className="fa-solid fa-file-import w-10 m-1"></i>
                  To Process
                </button>
              </>
            )}
          </form>
          {fileTexts.length > 0 ? (
            <>
              {mostrarBtn && (
                <button
                  className="hover:bg-green-400 flex justify-center text-slate-700 font-bold items-center h-10 sm:h-8 w-32 rounded-lg label_file hover:outline-indigo-600 hover:outline-2 hover:outline hover:text-indigo-600"
                  onClick={() => {
                    handleStop();
                    setTooltip(false);
                    setMostrarBtn(false);
                  }}
                  onMouseOver={(e) => {
                    mostrar_tooltip(e, "w-56", "h-12", "ReanudarChat");
                    setDataToolptip({
                      texto: "Resume the graphing and analysis process.",
                      tipo: "ReanudarChat",
                    });
                  }}
                  onMouseOut={() => setTooltip(false)}
                >
                  Resume Chat
                </button>
              )}

              <button
                className="bg-transparent  flex justify-center text-slate-700 font-bold items-center h-10 sm:h-8 w-32 rounded-lg hover:bg-red-500 hover:bg-opacity-50 label_file hover:outline-indigo-600 hover:outline-2 hover:outline hover:text-indigo-600"
                onClick={() => {
                  handleStart();
                  setTooltip(false);
                  setMostrarBtn(true);
                }}
                onMouseOver={(e) => {
                  mostrar_tooltip(e, "w-56", "h-12", "DetenerProceso");
                  setDataToolptip({
                    texto: "Stop the graphing or analysis process.",
                    tipo: "DetenerProceso",
                  });
                }}
                onMouseOut={() => setTooltip(false)}
              >
                Stop Chat
              </button>
              <button
                className="bg-transparentflex justify-center text-slate-700 font-bold items-center h-10 sm:h-8 w-32 rounded-lg hover:bg-red-500 hover:bg-opacity-50 label_file hover:outline-indigo-600 hover:outline-2 hover:outline hover:text-indigo-600"
                onClick={() => {
                  handleReset();
                  setTooltip(false);
                }}
                onMouseOver={(e) => {
                  mostrar_tooltip(e, "w-56", "h-12", "ReiniciarProceso");
                  setDataToolptip({
                    texto: "Restart all web processes.",
                    tipo: "ReiniciarProceso",
                  });
                }}
                onMouseOut={() => setTooltip(false)}
              >
                Restart Chat
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <img
          src={icon_down}
          alt=""
          className={` transition-all absolute z-40 w-8 h-8 right-2 sm:top-12 top-11 cursor-pointer ${
            !barra ? "sm:translate-y-14 translate-y-20 rotate-180" : ""
          }`}
          onClick={mostrarOpciones}
        />
        <div
          className={`flex flex-wrap z-20 justify-center width transition-all ${
            barra ? "-translate-y-14" : ""
          }`}
        >
          {fileTexts.map((fileText, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center sm:p-0 p-2 mt-3 sm:m-2 w-full flex-col sm:flex-row"
            >
              <div className="flex w-11/12 sm:w-10/12 sm:h-10 h-12 m-auto sm:m-0 items-center font-bold text-xl">
                {NombreChat ? (
                  <>
                    <h1 className="flex">{NombreChat[index]}</h1>
                    <figure className=" flex m-2 gap-2 w-full items-center sm:w-4/12 justify-evenly">
                      {graficaSeleccionada !== "d3" &&
                        graficaSeleccionada !== "" && (
                          <img
                            src={bg_d3}
                            alt=""
                            className=" w-8 h-8 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                            onClick={() => {
                              mostrarGrafica("d3", index);
                              setTooltip(false);
                            }}
                            onMouseOver={(e) => {
                              mostrar_tooltip(e, "w-52", "h-11", "d3");
                              setDataToolptip({
                                texto: "Conversation relationship graph.",
                                tipo: "d3",
                              });
                            }}
                            onMouseOut={() => setTooltip(false)}
                          />
                        )}
                      <img
                        src={icon_code}
                        className=" w-8 h-8 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                        onClick={() => {
                          mostrarGrafica("dataCode", index);
                          setTooltip(false);
                        }}
                        onMouseOver={(e) => {
                          mostrar_tooltip(e, "w-60", "h-20", "dataCode");
                          setDataToolptip({
                            texto:
                              "Display a bar chart with percentages of normal messages and messages containing code.",
                            tipo: "dataCode",
                          });
                        }}
                        onMouseOut={() => setTooltip(false)}
                      />
                      {fecha.length > 0 &&
                      fecha[index][2]?.hora &&
                      /\d{1,2}:\d{2}\s*[ap]\.\s*m\./i.test(
                        fecha[index][2]?.hora
                      ) ? (
                        <img
                          src={bg_barra_hora}
                          alt=""
                          className="w-8 h-8 cursor-pointer shadow-xl shadow-gray-300 hover:shadow-md rounded-md"
                          onClick={() => {
                            mostrarGrafica("barra", index);
                            setTooltip(false);
                          }}
                          onMouseOver={(e) => {
                            mostrar_tooltip(e, "w-56", "h-12", "barra");
                            setDataToolptip({
                              texto: "Show a chart of messages sent per day.",
                              tipo: "barra",
                            });
                          }}
                          onMouseOut={() => setTooltip(false)}
                        />
                      ) : (
                        ""
                      )}

                      <img
                        src={bg_barra_fecha}
                        alt=""
                        className=" w-8 h-8 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                        onClick={() => {
                          mostrarGrafica("fecha", index);
                          setTooltip(false);
                        }}
                        onMouseOver={(e) => {
                          mostrar_tooltip(e, "w-56", "h-12", "fecha");
                          setDataToolptip({
                            texto: "Show a chart of messages sent by date.",
                            tipo: "fecha",
                          });
                        }}
                        onMouseOut={() => setTooltip(false)}
                      />
                      <img
                        src={bg_csv}
                        alt=""
                        className=" w-8 h-8 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                        onClick={() => {
                          handleDownloadCsv(index);
                          setTooltip(false);
                        }}
                        onMouseOver={(e) => {
                          mostrar_tooltip(e, "w-60", "h-16", "descargarCvs");
                          setDataToolptip({
                            texto: "Convert current data into CSV format.",
                            tipo: "descargarCvs",
                          });
                        }}
                        onMouseOut={() => setTooltip(false)}
                      />
                      <img
                        src={word_cloud}
                        className=" w-8 h-8 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                        onClick={() => {
                          mostrarGrafica("cloud", index);
                          setTooltip(false);
                        }}
                        onMouseOver={(e) => {
                          mostrar_tooltip(e, "w-56", "h-12", "cloud");
                          setDataToolptip({
                            texto:
                              "Create a word cloud with the most repeated words.",
                            tipo: "cloud",
                          });
                        }}
                        onMouseOut={() => setTooltip(false)}
                      />
                      <i
                        className="fa-solid fa-file-signature w-8 h-8 text-3xl m-1 cursor-pointer shadow-xl shadow-gray-300  hover:shadow-md rounded-md"
                        onClick={() => {
                          mostrarGrafica("analisis", index);
                          setTooltip(false);
                        }}
                        onMouseOver={(e) => {
                          mostrar_tooltip(e, "w-56", "h-12", "analisis");
                          setDataToolptip({
                            texto: "Generate the main chat idea through AI.",
                            tipo: "analisis",
                          });
                        }}
                        onMouseOut={() => setTooltip(false)}
                      ></i>
                    </figure>
                  </>
                ) : (
                  " "
                )}
              </div>
              {(graficaSeleccionada === "d3" ||
                (graficaSeleccionada === "" && csvDataList[index])) && (
                <Grafica data={csvDataList[index]} />
              )}
              {graficaSeleccionada === "fecha" && fecha.length > 0 && (
                <GraficaBarraFecha datos={fecha[index]} />
              )}
              {graficaSeleccionada === "barra" && fecha.length > 0 && (
                <GraficaBarra datos={fecha[index]} />
              )}
              {graficaSeleccionada === "cloud" && fecha.length > 0 && (
                <WordCloud cadena={fileText} />
              )}
              {/* {fecha.length > 0 && <GraficaLineBar data={fecha[index]} />} */}
              {graficaSeleccionada == "analisis" && fileText.length > 0 && (
                <AnalizarChats texto={fileText} />
              )}
              {graficaSeleccionada == "dataCode" && fileText.length > 0 && (
                <GraficaDatos objeto={fecha[index]} dias={fileText} />
              )}
              {messageChat ? (
                <Chat chats={realTimeChats} />
              ) : (
                fileText.length > 0 && <Chat chats={fileText} />
              )}
              {/* {fileText.length > 0 && <WordCloud cadena={fileText} />} */}
            </div>
          ))}
        </div>
        {fileTexts.length == 0 && <OpcionesWeb active={barra} />}
        {fileTexts.length > 0 && <Mensajes />}
      </main>
      {mostrarTooltip && tooltipSeleccionado == dataTooltip.tipo ? (
        <Tooltip_mui
          text={dataTooltip.texto}
          mouseX={mouseX}
          mouseY={mouseY}
          width={width}
          heigth={heigth}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
