import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const DonutChart = ({
  data,
  width = 160,
  height = 160,
  innerRadius = 40,
  outerRadius = 75,
}) => {
  const ref = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // clear previous renders

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#004225", "#6BA368", "#C4A35A"]); // Bushels, Footprint, Transport

    const arcs = pie(data);

    svg.attr("width", width).attr("height", height);
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    // Tooltip div
    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#ffffff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "6px 10px")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("box-shadow", "0px 2px 5px rgba(0,0,0,0.2)")
      .style("display", "none");

    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(`<strong>${d.data.label}</strong>: ${d.data.value}%`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.offsetX + 15}px`)
          .style("top", `${event.offsetY - 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });
    // Optional: Add labels inside slices
    g.selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.value}%`)
      .style("font-size", 11)
      .style("fill", "#fff");
  }, [data, width, height, innerRadius, outerRadius]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg ref={ref}></svg>
    </div>
  );
};

export default DonutChart;
