import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GraficaNone = ({data}) => {
    const svgRef = useRef(null);
    const [tiempoReal, setRealTimeData] = useState([]);
    const [indice, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const width = 280;
      const height = width;
      const innerRadius = Math.min(width, height) * 0.5 - 20;
      const outerRadius = innerRadius + 6;
  
      const names = Array.from(
        d3.union(tiempoReal.flatMap((d) => [d.source, d.target]))
      );
      const index = new Map(names.map((name, i) => [name, i]));
  
      const matrix = Array.from(index, () => new Array(names.length).fill(0));
      for (const { source, target, value } of tiempoReal) {
        matrix[index.get(source)][index.get(target)] += value;
        matrix[index.get(target)][index.get(source)] += value; 
      }
  
      const chord = d3
        .chordDirected()
        .padAngle(12 / innerRadius)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);
  
      const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  
      const ribbon = d3
        .ribbonArrow()
        .radius(innerRadius - 0.5)
        .padAngle(1 / innerRadius);
  
      const colors = d3.schemeCategory10;
  
      const formatValue = (x) => `${x.toFixed(0)}B`;
  
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "width: 100%; height: auto; font: 15px sans-serif;");
  
      const chords = chord(matrix);
  
      const textId = d3.create("text").attr("id", "text");
  
      svg
        .append("path")
        .attr("id", textId.attr("id"))
        .attr("fill", "none")
        .attr(
          "d",
          d3.arc()({ outerRadius, startAngle: 0, endAngle: 2 * Math.PI })
        );
  
      const group = svg
        .append("g")
        .attr("fill-opacity", 0.75)
        .selectAll()
        .data(chords.groups)
        .join("g");
  
      group
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => colors[d.index])
        .attr("stroke", "#fff");
  
      group
        .append("text")
        .attr("dy", -3)
        .append("textPath")
        .attr("xlink:href", textId.attr("id"))
        .attr(
          "startOffset",
          (d) =>
            d.startAngle * outerRadius +
            ((d.endAngle - d.startAngle) * outerRadius) / 2
        )
        .text((d) => names[d.index]);
  
      const link = svg
        .append("g")
        .attr("fill-opacity", 0.75)
        .selectAll()
        .data(chords)
        .join("path")
        .attr("d", ribbon)
        .attr("fill", (d) => colors[d.source.index])
        .style("mix-blend-mode", "multiply")
        .append("title")
        .text(
          (d) =>
            `${names[d.source.index]} owes ${names[d.target.index]} ${formatValue(
              d.source.value
            )}`
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
        <article className="w-full h-2/3 flex">
          <svg ref={svgRef}></svg>
        </article>
      </>
    );
  };

export default GraficaNone
