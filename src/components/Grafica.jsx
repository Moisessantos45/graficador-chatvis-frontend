import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Graficas = ({ data }) => {
  const svgRef = useRef(null);
  const [tiempoReal, setRealTimeData] = useState([]);
  const [indice, setCurrentIndex] = useState(0);

  useEffect(() => {
    const width = 1080;
    const height = width;
    const innerRadius = Math.min(width, height) * 0.5 - 50;
    const outerRadius = innerRadius + 10;

    const names = d3.sort(
      d3.union(
        data.map((d) => d.source),
        data.map((d) => d.target)
      )
    );
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const { source, target, value } of tiempoReal) {
      matrix[index.get(source)][index.get(target)] += value;
      matrix[index.get(target)][index.get(source)] += value;
    }

    const chord = d3
      .chordDirected()
      .padAngle(10 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const ribbon = d3
      .ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);

    const colors = d3.schemeCategory10;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr(
        "style",
        "width: 95%; height: 95%; font: 20px sans-serif; font-weight: bold;"
      );

    const chords = chord(matrix);

    const group = svg.append("g").selectAll().data(chords.groups).join("g");

    group
      .append("path")
      .attr("fill", (d) => colors[d.index])
      .attr("d", arc);

    group
      .append("text")
      .each((d) => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr(
        "transform",
        (d) => `
        rotate(${(d.angle * 180) / Math.PI - 90})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(90)" : "rotate(100)"}
      `
      )
      .attr("text-anchor", (d) => (d.angle > Math.PI ? "end" : null))
      .text((d) => names[d.index]);

    group.append("title").text(
      (d) => `${names[d.index]}
${d3.sum(
  chords,
  (c) => (c.source.index === d.index) * c.source.value
)} outgoing →
${d3.sum(
  chords,
  (c) => (c.target.index === d.index) * c.source.value
)} incoming ←`
    );

    svg
      .append("g")
      .attr("fill-opacity", 0.85)
      .style("mix-blend-mode", "multiply")
      .selectAll()
      .data(chords)
      .join("path")
      .attr("fill", (d) => colors[d.target.index])
      .attr("d", ribbon)
      .append("title")
      .text(
        (d) =>
          `${names[d.source.index]} → ${names[d.target.index]} ${
            d.source.value
          }`
      );

    return () => {
      svg.selectAll("*").remove();
    };
  }, [tiempoReal]);

  useEffect(() => {
    if (indice < data.length) {
      const timeoutId = setTimeout(() => {
        setRealTimeData([...tiempoReal, data[indice]]);
        setCurrentIndex(indice + 1);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data, tiempoReal, indice]);

  return (
    <>
      <article className="w-12/12 sm:w-1/2 h-80 sm:h-100 flex-wrap bg-zinc-50 flex justify-center sm:m-1 overflow-y-auto shadow-xl shadow-gray-300 rounded-lg hover:scale-100 transition-all scroll m-auto">
        <svg
          ref={svgRef}
          className=" flex justify-center items-center m-autograf"
        ></svg>
      </article>
    </>
  );
};

export default Graficas;
