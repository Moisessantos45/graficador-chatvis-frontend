import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloud = ({ cadena }) => {
  // console.log(cadena);
  const svgRef = useRef();
  const ProcesarPalabras = (cadenaPalabras) => {
    return new Promise((resolve, reject) => {
      try {
        const oracion = cadenaPalabras.map((text) => text.texto).join(" ");
        const textoProcesado = oracion
          .replace(/\n/g, " ")
          .split(/\s*\.\.\.\s*/);
        const textoFinal = textoProcesado.join(" ");
        resolve(textoFinal);
      } catch (error) {
        reject(error);
      }
    });
  };

  const crearLista = (text) => {
    return new Promise((resolve, reject) => {
      try {
        const lista = [];
        const palabrasLimite = 80;
        let palabrasEncontradas = 0;

        text.split(" ").forEach((item) => {
          if (
            palabrasEncontradas < palabrasLimite &&
            item.length > 5 &&
            !lista.some((obj) => obj.text === item && !obj.text.startsWith("<"))
          ) {
            lista.push({
              text: item,
              size: Math.floor(Math.random() * 500),
            });
            palabrasEncontradas++;
          }
        });
        resolve(lista);
      } catch (error) {
        reject(error);
      }
    });
  };

  const graficarWords = (words) => {
    const svg = d3.select(svgRef.current);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const layout = cloud()
      .size([550, 400])
      .words(words)
      .padding(5)
      .rotate(() => ~~(Math.random() * 12) * 90)
      .fontSize(20)
      .on("end", drawWords);

    layout.start();

    function drawWords(words) {
      const text = svg
        .append("g")
        .attr("margin", "auto")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .attr("display", "flex")
        .attr("align-self", "center")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => d.size * (Math.random() * 2) + "px")
        .style("fill", (d, i) => colorScale(i))
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);

      // Inicialmente establece la opacidad en 0
      text.style("opacity", 0);

      // Usa una transición para cambiar la opacidad a 1
      text
        .transition()
        .duration(2000) // Controla la duración de la transición
        .delay((d, i) => i * 200) // Añade un retraso basado en el índice del elemento para que las palabras aparezcan una por una
        .style("opacity", 1);
    }
  };

  ProcesarPalabras(cadena)
    .then((textoProcesado) => {
      return crearLista(textoProcesado);
    })
    .then((words) => {
      graficarWords(words);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <article className=" scroll w-12/12 sm:w-6/12 heigth flex-wrap flex items-center justify-center m-1 overflow-y-auto shadow-xl rounded-lg shadow-gray-300 hover:scale-100 transition-all">
      <svg
        ref={svgRef}
        className=" flex w-11/12 m-auto h-full justify-center items-center p-1"
      />
    </article>
  );
};

export default WordCloud;
