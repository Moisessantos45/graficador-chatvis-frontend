import { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloud = ({ cadena }) => {
  const svgRef = useRef();

  const procesarPalabras = (cadenaPalabras) => {
    const oracion = cadenaPalabras.map((text) => text.texto).join(" ");
    const textoProcesado = oracion
      .replace(/\n/g, " ")
      .split(/\s*\.\.\.\s*/)
      .join(" ");
    return textoProcesado;
  };

  const crearLista = (text) => {
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

    return lista;
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
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size * (Math.random() * 2)}px`)
        .style("fill", (d, i) => colorScale(i))
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);

      text
        .style("opacity", 0)
        .transition()
        .duration(2000)
        .delay((d, i) => i * 200)
        .style("opacity", 1);
    }
  };

  useEffect(() => {
    const textoProcesado = procesarPalabras(cadena);
    const words = crearLista(textoProcesado);
    graficarWords(words);
  }, [cadena]);

  return (
    <article className="scroll w-12/12 sm:w-6/12 flex-wrap flex items-center justify-center m-auto overflow-y-auto shadow-xl rounded-lg shadow-gray-300 transition-all heigth">
      <svg
        ref={svgRef}
        className="flex w-11/12 m-auto h-full justify-center items-center p-1"
      />
    </article>
  );
};

export default WordCloud;
