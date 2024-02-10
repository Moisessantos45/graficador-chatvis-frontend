// const Home = () => {
//   const [files, setFiles] = useState([]);
//   const [fileTexts, setTexts] = useState([]);
//   const [csvDataList, setCsvDataList] = useState([]);
//   const [messageChat, setChat] = useState(false);
//   const [fecha, setFecha] = useState([]);
//   const [realTimeChats, setRealTimeChats] = useState([]);
//   const [NombreChat, setNombre] = useState([]);
//   const [graficaSeleccionada, setGraficaSeleccionada] = useState("");

//   const handleChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//     const fileNames = selectedFiles.map((file) => {
//       const textoSeparado = file.name.split(" ");
//       const palabras = textoSeparado.slice(4);
//       return palabras.join(" ");
//     });
//     setNombre(fileNames);
//     console.log("Nombres de los archivos seleccionados:", fileNames);
//   };

//   const procesarTexto = (text) => {
//     const chatCompleto = [];
//     text.split(/\d{1,2}\/\d{1,2}\/\d{4}/).forEach((text) => {
//       if (text && text.trim() !== "") {
//         const [dateTime, resto] = text.split(" - ");
//         const [fecha, hora] = dateTime.split(",");
//         const [nombre, texto] = resto.split(":");
//         chatCompleto.push({
//           fecha,
//           hora,
//           nombre,
//           texto,
//         });
//       }
//     });

//     return chatCompleto;
//   };

//   const simplificarObjeto = (chatCompleto) => {
//     let interacciones = 0;
//     return chatCompleto.slice(3).map((mensaje, i) => {
//       if (mensaje.texto) {
//         interacciones++;
//       }
//       return {
//         source: mensaje.nombre,
//         value: interacciones,
//         target: i < chatCompleto.length - 4 ? chatCompleto[i + 4].nombre : "",
//       };
//     });
//   };
//   const obtener_fecha_hora = (datos) => {
//     const chatTiempo = [];
//     const lineas = datos.split("\n");

//     lineas.forEach((linea) => {
//       const partes = linea.split(" - ");
//       if (partes.length === 2) {
//         const [fechaHora, mensaje] = partes;
//         const [fecha, hora] = fechaHora.split(", ");
//         chatTiempo.push({ fecha, hora });
//       }
//     });

//     return chatTiempo;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const processedTexts = [];
//     const csvDataList = [];
//     const fechaData = [];

//     for (const file of files) {
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const content = event.target.result;
//         const chatData = procesarTexto(content);
//         processedTexts.push(chatData);
//         const copiaConFechaYHora = obtener_fecha_hora(content);
//         fechaData.push(copiaConFechaYHora);
//         const dataCsv = simplificarObjeto(chatData);
//         csvDataList.push(dataCsv);

//         if (csvDataList.length === files.length) {
//           setCsvDataList(csvDataList);
//           setTexts(processedTexts);
//           setFecha(fechaData);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleDownloadCsv = () => {
//     if (csvDataList.length > 0) {
//       const csvContent = `source,value,target\n${csvDataList
//         .map((item) => `${item.source},${item.value},${item.target}`)
//         .join("\n")}`;

//       const blob = new Blob([new TextEncoder().encode(csvContent)], {
//         type: "text/csv;charset=utf-8;",
//       });

//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "chat.csv";

//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//   };
//   const handleStart = () => {
//     setChat(true);
//   };

//   const handleStop = () => {
//     setChat(false);
//   };

//   const handleReset = () => {
//     setTexts([]);
//     setCsvDataList([]);
//   };
//   const mostrarGrafica = (tipoGrafica) => {
//     setGraficaSeleccionada(tipoGrafica);
//   };

//   return (
//     <>
//       <main className="flex flex-col gap-1 h-screen">
//         <div className="bg-teal-300 w-full h-14 flex justify-center gap-2 items-center">
//           <form className="flex gap-2" onSubmit={handleSubmit}>
//             <label
//               htmlFor="file"
//               className="bg-gray-300 rounded-lg w-40 h-8 text-center font-bold flex items-center justify-center"
//             >
//               Selecciona chat
//             </label>
//             <input
//               type="file"
//               id="file"
//               className="hidden"
//               onChange={handleChange}
//               multiple
//             />
//             <button
//               type="submit"
//               className="bg-indigo-700 rounded-lg w-24 text-white h-8"
//             >
//               Subir
//             </button>
//           </form>
//           <button
//             className="bg-sky-600 flex justify-center items-center h-8 w-32 rounded-lg"
//             onClick={handleDownloadCsv}
//           >
//             Descargar CSV
//           </button>
//           <button
//             className="bg-green-400 flex justify-center items-center h-8 w-32 rounded-lg"
//             onClick={handleStop}
//           >
//             Reanudar chat
//           </button>
//           <button
//             className="bg-transparent border-2 border-red-600 flex justify-center items-center h-8 w-32 rounded-lg hover:bg-red-500 hover:bg-opacity-50"
//             onClick={handleStart}
//           >
//             Detener Chat
//           </button>
//           <button
//             className="bg-transparent border-2 border-red-600 flex justify-center items-center h-8 w-32 rounded-lg hover:bg-red-500 hover:bg-opacity-50"
//             onClick={handleReset}
//           >
//             Reiniciar Chat
//           </button>
//           {graficaSeleccionada !== "d3" && graficaSeleccionada !== "" && (
//             <button onClick={() => mostrarGrafica("d3")}>Gráfica de d3</button>
//           )}
//           <button onClick={() => mostrarGrafica("barra")}>
//             Gráfica de Horas
//           </button>
//           <button onClick={() => mostrarGrafica("fecha")}>
//             Gráfica de Días
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-1">
//           {fileTexts.map((fileText, index) => (
//             <div key={index} className="flex flex-wrap">
//               {(graficaSeleccionada === "d3" ||
//                 (graficaSeleccionada === "" && csvDataList[index])) && (
//                 <Grafica data={csvDataList[index]} nameFile={NombreChat} />
//               )}
//               {graficaSeleccionada === "fecha" && fecha.length > 0 && (
//                 <GraficaBarraFecha datos={fecha[index]} />
//               )}
//               {graficaSeleccionada === "barra" && fecha.length > 0 && (
//                 <GraficaBarra datos={fecha[index]} />
//               )}
//               {messageChat ? (
//                 <Chat chats={realTimeChats} />
//               ) : (
//                 fileText.length > 0 && <Chat chats={fileText} />
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// };