import { useEffect, useRef, useState,useMemo } from "react";
import * as d3 from "d3";
import useStoreApi from "@/Store/useApi";

const GraficaViewCuerdas = () => {
  const { graphData } = useStoreApi();
  const svgRef = useRef(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoized chart dimensions and settings
  const chartConfig = useMemo(() => ({
    width: 720,
    height: 720,
    innerRadius: 216, // 720 * 0.3
    outerRadius: 226, // innerRadius + 10
    labelRadius: 241, // outerRadius + 15
    colors: d3.scaleOrdinal(d3.schemeCategory10)
  }), []);

  // Memoized D3 generators
  const generators = useMemo(() => ({
    chord: d3.chordDirected()
      .padAngle(10 / chartConfig.innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending),
    arc: d3.arc()
      .innerRadius(chartConfig.innerRadius)
      .outerRadius(chartConfig.outerRadius),
    ribbon: d3.ribbonArrow()
      .radius(chartConfig.innerRadius - 1)
      .padAngle(1 / chartConfig.innerRadius)
  }), [chartConfig.innerRadius, chartConfig.outerRadius]);

  // Chart rendering effect
  useEffect(() => {
    if (!svgRef.current || realTimeData.length === 0) return;

    const names = Array.from(
      new Set(realTimeData.flatMap((d) => [d.source, d.target]))
    ).sort(d3.ascending);
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));

    // Build matrix
    realTimeData.forEach(({ source, target, value }) => {
      matrix[index.get(source)][index.get(target)] += value;
      matrix[index.get(target)][index.get(source)] += value;
    });

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, chartConfig.width, chartConfig.height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    svg.selectAll("*").remove();
    
    const mainGroup = svg.append("g")
      .attr("transform", `translate(${chartConfig.width/2}, ${chartConfig.height/2 - 80})`);

    const chords = generators.chord(matrix);

    // Draw groups
    const group = mainGroup.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    // Add paths
    group.append("path")
      .attr("fill", d => chartConfig.colors(d.index))
      .attr("d", generators.arc)
      .attr("stroke", "#111422");

    // Add labels
    group.append("text")
      .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", "0.35em")
      .attr("transform", d => `
        rotate(${(d.angle * 180) / Math.PI - 90})
        translate(${chartConfig.labelRadius})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index])
      .style("font-size", "10px")
      .style("fill", "#E0E0E0");

    // Add ribbons
    mainGroup.append("g")
      .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("d", generators.ribbon)
      .attr("fill", d => chartConfig.colors(d.target.index))
      .attr("stroke", "#111422")
      .append("title")
      .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  }, [realTimeData, chartConfig, generators]);

  // Animation effect
  useEffect(() => {
    if (currentIndex >= graphData.length) return;

    const timeoutId = setTimeout(() => {
      setRealTimeData(prevData => [...prevData, graphData[currentIndex]]);
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [graphData, currentIndex]);

  return (
    <div className="sm:max-w-2xl mx-auto w-11/12 p-4 shadow-sm shadow-gray-300 rounded-lg hover:scale-100 transition-all sm:h-[95vh] md:mt-5 mt-14">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default GraficaViewCuerdas;
