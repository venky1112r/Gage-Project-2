import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data, width = 160, height = 160, innerRadius = 40, outerRadius = 75 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // clear previous renders

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['#004225', '#6BA368', '#C4A35A']); // Bushels, Footprint, Transport

    const arcs = pie(data);

    svg.attr('width', width).attr('height', height);
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    // Optional: Add labels inside slices
    g.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.value}%`)
      .style('font-size', 11)
      .style('fill', '#fff');

  }, [data, width, height, innerRadius, outerRadius]);

  return <svg ref={ref}></svg>;
};

export default DonutChart;
