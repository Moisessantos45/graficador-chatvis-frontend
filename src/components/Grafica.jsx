import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Graficas = ({ data }) => {
  const svgRef = useRef(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!svgRef.current || realTimeData.length === 0) return;

    const width = 720;
    const height = width;
    const innerRadius = Math.min(width, height) * 0.3;
    const outerRadius = innerRadius + 10;

    const names = Array.from(
      new Set(realTimeData.flatMap((d) => [d.source, d.target]))
    ).sort(d3.ascending);
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));

    for (const { source, target, value } of realTimeData) {
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
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    svg.selectAll("*").remove();
    const mainGroup = svg
      .append("g")
      .attr("transform", `translate(${360}, ${280})`);

    const chords = chord(matrix);

    const group = mainGroup
      .append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    group
      .append("path")
      .attr("fill", (d) => colors[d.index])
      .attr("d", arc);

    const labelRadius = outerRadius + 15;

    group
      .append("text")
      .each((d) => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr(
        "transform",
        (d) => `
        rotate(${(d.angle * 180) / Math.PI - 90})
        translate(${labelRadius})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `
      )
      .attr("text-anchor", (d) => (d.angle > Math.PI ? "end" : null))
      .text((d) => names[d.index])
      .style("font-size", "10px");

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

    mainGroup
      .append("g")
      .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("d", ribbon)
      .attr("fill", (d) => colors[d.target.index])
      .append("title")
      .text(
        (d) =>
          `${names[d.source.index]} → ${names[d.target.index]} ${
            d.source.value
          }`
      );
  }, [realTimeData]);

  useEffect(() => {
    if (currentIndex < data.length) {
      const timeoutId = setTimeout(() => {
        setRealTimeData((prevData) => [...prevData, data[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [data, currentIndex]);

  return (
    <div className="sm:max-w-2xl mx-auto w-12/12 bg-zinc-50 p-4 shadow-xl shadow-gray-300 rounded-lg hover:scale-100 transition-all h-[90vh]">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default Graficas;
