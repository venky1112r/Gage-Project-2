import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ContractsChart = ({ data, view }) => {
  const containerRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const isMobile = width < 500;
      const height = isMobile ? width * 0.8 : width * 0.3;
      setSize({ width, height });
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!size.width || !data.length) return;

    const { width, height } = size;
    const isMobile = width < 500;

    const margin = {
      top: isMobile ? 40 : 60,
      right: isMobile ? 30 : 60,
      bottom: isMobile ? 50 : 60,
      left: isMobile ? 40 : 60,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const showPending = view === "pending";

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${isMobile ? 10 : 20})`);

    // Delivered Legend
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", "#ADC178");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 11)
      .attr("font-size", isMobile ? "10px" : "12px")
      .text("DELIVERED BUSHELS");

    // Pending Legend (conditionally)
    if (showPending) {
      legend
        .append("rect")
        .attr("x", isMobile ? 0 : 180)
        .attr("y", isMobile ? 20 : 0)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", "#ccc");

      legend
        .append("text")
        .attr("x", isMobile ? 20 : 200)
        .attr("y", isMobile ? 31 : 11)
        .attr("font-size", isMobile ? "10px" : "12px")
        .text("PENDING BUSHELS");
    }

    // CI Score Legend
    legend
      .append("line")
      .attr("x1", isMobile ? 0 : 370)
      .attr("y1", isMobile ? 50 : 8)
      .attr("x2", isMobile ? 20 : 390)
      .attr("y2", isMobile ? 50 : 8)
      .attr("stroke", "#7F4F24")
      .attr("stroke-width", 2);

    legend
      .append("circle")
      .attr("cx", isMobile ? 10 : 380)
      .attr("cy", isMobile ? 50 : 8)
      .attr("r", 3)
      .attr("fill", "#7F4F24");

    legend
      .append("text")
      .attr("x", isMobile ? 30 : 400)
      .attr("y", isMobile ? 55 : 13)
      .attr("font-size", isMobile ? "10px" : "12px")
      .text("AVERAGE CI SCORE");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Fixed grade order
    const gradeOrder = [
      "Grower",
      "Retailer",
      "Other",
      "No Score Grower",
      "No Score Retailer",
    ];

    const orderedData = gradeOrder
      .map((grade) => data.find((d) => d.grade === grade))
      .filter(Boolean); // skip grades not present in data

    const x0 = d3
      .scaleBand()
      .domain(gradeOrder)
      .range([0, innerWidth])
      .padding(0.3);

    const x1 = d3
      .scaleBand()
      .domain(["delivered", "pending"])
      .range([0, x0.bandwidth()])
      .padding(0.2);

    const maxTotal = d3.max(orderedData, (d) =>
      Math.max(d.bushels || 0, showPending ? d.pending || 0 : 0)
    );

    const yMax = Math.ceil((maxTotal + 5_000_000) / 1_000_000) * 1_000_000;

    const yLeft = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]);
    const yRight = d3.scaleLinear().domain([0, 40]).range([innerHeight, 0]);

    // Bars - Delivered
    g.selectAll(".delivered-bar")
      .data(orderedData)
      .enter()
      .append("rect")
      .attr("x", (d) => x0(d.grade) + x1("delivered"))
      .attr("y", (d) => yLeft(d.bushels))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => innerHeight - yLeft(d.bushels))
      .attr("fill", "#ADC178");

    // Delivered Labels
    g.selectAll(".delivered-label")
      .data(orderedData)
      .enter()
      .append("text")
      .text((d) => `${(d.bushels / 1_000_000).toFixed(1)}M`)
      .attr("x", (d) => x0(d.grade) + x1("delivered") + x1.bandwidth() / 2)
      .attr("y", (d) => yLeft(d.bushels) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "10px" : "12px")
      .attr("font-weight", "bold");

    // Bars - Pending (if applicable)
    if (showPending) {
      g.selectAll(".pending-bar")
        .data(orderedData)
        .enter()
        .append("rect")
        .attr("x", (d) => x0(d.grade) + x1("pending"))
        .attr("y", (d) => yLeft(d.pending || 0))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => innerHeight - yLeft(d.pending || 0))
        .attr("fill", "#ccc");

      g.selectAll(".pending-label")
        .data(orderedData)
        .enter()
        .append("text")
        .text((d) =>
          d.pending && d.pending > 0 ? `${(d.pending / 1_000_000).toFixed(1)}M` : ""
        )
        .attr("x", (d) => x0(d.grade) + x1("pending") + x1.bandwidth() / 2)
        .attr("y", (d) => yLeft(d.pending || 0) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", isMobile ? "10px" : "12px")
        .attr("fill", "#333")
        .attr("font-weight", "bold");
    }

    // CI Score Line
    const line = d3
      .line()
      .x((d) => x0(d.grade) + x0.bandwidth() / 2)
      .y((d) => yRight(d.ciScore));

    g.append("path")
      .datum(orderedData)
      .attr("fill", "none")
      .attr("stroke", "#7F4F24")
      .attr("stroke-width", 2)
      .attr("d", line);

    g.selectAll(".dot")
      .data(orderedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x0(d.grade) + x0.bandwidth() / 2)
      .attr("cy", (d) => yRight(d.ciScore))
      .attr("r", 4)
      .attr("fill", "#7F4F24")
      .on("mouseover", (event, d) => {
        const tooltip = tooltipRef.current;
        tooltip.style.visibility = "visible";
        tooltip.textContent = `${d.grade}: CI Score ${d.ciScore}`;
      })
      .on("mousemove", (event) => {
        const tooltip = tooltipRef.current;
        tooltip.style.left = `${event.offsetX + 10}px`;
        tooltip.style.top = `${event.offsetY + 10}px`;
      })
      .on("mouseout", () => {
        const tooltip = tooltipRef.current;
        tooltip.style.visibility = "hidden";
      });

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(x0).tickFormat((d) =>
          isMobile && d.length > 10
            ? d
                .split(" ")
                .map((w) => w[0])
                .join("")
            : d
        )
      )
      .selectAll("text")
      .style("font-size", isMobile ? "10px" : "12px");

    g.append("g").call(
      d3
        .axisLeft(yLeft)
        .ticks(isMobile ? 4 : 6)
        .tickFormat((d) => `${(d / 1_000_000).toFixed(1)}M`)
    );

    g.append("g")
      .attr("transform", `translate(${innerWidth},0)`)
      .call(d3.axisRight(yRight).ticks(isMobile ? 4 : 6));

    // Y-axis left label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left / 4}, ${
          margin.top + innerHeight / 2
        }) rotate(-90)`
      )
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "10px" : "12px")
      .attr("font-weight", "bold")
      .text("BUSHELS");

    // Y-axis right label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width - margin.right / 4}, ${
          margin.top + innerHeight / 2
        }) rotate(90)`
      )
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "10px" : "12px")
      .attr("font-weight", "bold")
      .text("CI SCORE");

    // X-axis label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left + innerWidth / 2}, ${height - 20})`
      )
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "10px" : "12px")
      .attr("font-weight", "bold")
      .text("GRADE LEVEL");
  }, [size, data, view]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        position: "relative",
        marginTop: "0px",
        paddingBottom: "0px",
      }}
    >
      <svg ref={svgRef} />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "5px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          visibility: "hidden",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default ContractsChart;
