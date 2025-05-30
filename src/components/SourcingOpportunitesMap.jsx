import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {
  Paper,
  Box,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const sources = [
  {
    name: "Hart LLC",
    type: "Retailer",
    ciScore: 11.9,
    grade: "CUSTOM",
    lat: 43.9,
    lon: -100.7,
    color: "#F4C430", // yellow ring
  },
  {
    name: "Randal",
    type: "Grower",
    ciScore: 20.1,
    grade: "SOURCE",
    lat: 46.8,
    lon: -96.7,
    color: "#7D8F69", // green ring
  },
  {
    name: "Adams",
    type: "Retailer",
    ciScore: 14.9,
    grade: "CUSTOM",
    lat: 44.1,
    lon: -99.1,
    color: "#DC6B19", // orange ring
  },
];

const stateAbbr = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  10: "DE",
  11: "DC",
  12: "FL",
  13: "GA",
  15: "HI",
  16: "ID",
  17: "IL",
  18: "IN",
  19: "IA",
  20: "KS",
  21: "KY",
  22: "LA",
  23: "ME",
  24: "MD",
  25: "MA",
  26: "MI",
  27: "MN",
  28: "MS",
  29: "MO",
  30: "MT",
  31: "NE",
  32: "NV",
  33: "NH",
  34: "NJ",
  35: "NM",
  36: "NY",
  37: "NC",
  38: "ND",
  39: "OH",
  40: "OK",
  41: "OR",
  42: "PA",
  44: "RI",
  45: "SC",
  46: "SD",
  47: "TN",
  48: "TX",
  49: "UT",
  50: "VT",
  51: "VA",
  53: "WA",
  54: "WV",
  55: "WI",
  56: "WY",
};

const SourcingOpportunitiesMap = () => {
  const svgRef = useRef();
  const [view, setView] = useState("heatmap");   
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(800 * zoomLevel);
    const path = d3.geoPath().projection(projection);
    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        tooltip.style("opacity", 0);
      });
    svg.call(zoom);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px 10px")
      .style("background", "#2d2d2d")
      .style("color", "#fff")
      .style("border-radius", "4px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(
      (us) => {
        const states = topojson.feature(us, us.objects.states).features;

        svg
          .attr("viewBox", `0 0 ${width} ${height}`)
          .style("max-width", "100%");

        const ciScale = d3
          .scaleThreshold()
          .domain([5, 15, 25, 50, 100])
          .range([
            "#fdf7f0",
            "#f5e2c4",
            "#e8c39e",
            "#d49b72",
            "#b96c3e",
            "#803000",
          ]);

        g.selectAll("path")
          .data(states)
          .enter()
          .append("path")
          .attr("fill", (d) => {
            if (view === "heatmap") return "#eee";
            const stateSources = sources.filter(
              (s) =>
                projection([s.lon, s.lat]) && d3.geoContains(d, [s.lon, s.lat])
            );
            const avgCI = d3.mean(stateSources, (s) => s.ciScore) || 0;
            return ciScale(avgCI);
          })
          .attr("stroke", "#fff")
          .attr("d", path);

        g.selectAll("text")
          .data(states)
          .enter()
          .append("text")
          .text((d) => stateAbbr[d.id.toString().padStart(2, "0")])
          .attr("x", (d) => path.centroid(d)[0])
          .attr("y", (d) => path.centroid(d)[1])
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .attr("font-size", "10px")
          .attr("fill", "#333")
          .style("pointer-events", "none");

        if (view === "mysources") {
          g.selectAll("circle")
            .data(sources)
            .enter()
            .append("circle")
            .attr("cx", (d) => projection([d.lon, d.lat])?.[0])
            .attr("cy", (d) => projection([d.lon, d.lat])?.[1])
            .attr("r", 10)
            .attr("fill", "none")
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 3)
            .on("mouseover", (event, d) => {
              tooltip.transition().duration(200).style("opacity", 1);
              tooltip
                .html(
                  `<strong>Source:</strong> ${d.name}<br/>
                 <strong>Type:</strong> ${d.type}<br/>
                 <strong>CI Score:</strong> ${d.ciScore} (${d.grade})`
                )
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 40 + "px");
            })
            .on("mouseout", () =>
              tooltip.transition().duration(300).style("opacity", 0)
            );
        }
      }
    );

    return () => tooltip.remove();
  }, [view, zoomLevel]);

  const renderLegend = () => {
    const scale = [
      { label: "0-30", color: "#f5f5dc" },
      { label: "31-70", color: "#e0cab2" },
      { label: "71-100+", color: "#d7a97b" },
      // { label: "0-30", color: "#c1814a" },
      // { label: "31-70", color: "#a15c2f" },
      // { label: "71-100+", color: "#7b2d26" },
    ];
    const gradeLegend = [
      { label: "SOURCE", color: "#7D8F69" },
      { label: "CUSTOM", color: "#F4C430" },
      { label: "NATIONAL", color: "#DC6B19" },
      { label: "NO SCORE", color: "#ccc" },
    ];
    const source = [
      { label: "Grower", color: "#8B0000" },
      { label: "Retailer", color: "#A0522D" },
    ];
    return (
      <>
        <Stack
          direction="row"
          spacing={1}
          mt={2}
          flexWrap="wrap"
          display={{ xs: "none", md: "flex" }}
          padding={2}
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="row" gap={1} p={2} mt={1}>
            {scale.map((s, idx) => (
              <Box key={idx} sx={{ display: "flex",flexDirection: "column", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 18,
                    bgcolor: s.color,
                    borderRadius: 2,
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption">{s.label}</Typography>
              </Box>
            ))}
          </Box>
          
          <Box display="flex" flexDirection="column" p={2}>
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <Typography variant="caption" fontWeight="bold" mb={0.5}>
                Source :
              </Typography>
              {source.map((s, idx) => (
                <Box key={idx} sx={{ display: "flex", alignItems: "center", marginLeft: 1 ,mb:0.5 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: s.color,
                      borderRadius: 1,
                      mr: 0.5,
                    }}
                  />
                  <Typography variant="caption">{s.label}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant="caption" fontWeight="bold" mb={0.5}>
                Grade Level:
              </Typography>
              {gradeLegend.map((item) => (
                <Box key={item.label} display="flex" alignItems="center" marginLeft={1} mb={0.5}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: `3px solid ${item.color}`,
                      mr: 0.5,
                    }}
                  />
                  <Typography variant="caption">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </>
    );
  };

  const handleViewChange =(e, newView)=>{
    if(newView === null){
      newView = "heatmap"
    }
    newView && setView(newView)
  }
  return (
    <Paper elevation={2} sx={{ borderRadius: 4, p: 2 ,height: "100%"}}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "18px" }}>
          Sourcing Opportunities
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="heatmap">
            Heat Map{" "}
              <CheckIcon fontSize="small" sx={{ ml: 1 }} />
          </ToggleButton>
          <ToggleButton value="mysources">
            My sources{" "}
            {view === "mysources" && (
              <CheckIcon fontSize="small" sx={{ ml: 1 }} />
            )}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === "heatmap" && (
        <Typography sx={{ fontSize: 14, mb: 1 }}>
          No heat map information is available.{" "}
          <span
            style={{ color: "#800000", cursor: "pointer", marginLeft: "20px" , fontWeight: "bold" }}
          >
            Upload DTN file
          </span>
        </Typography>
      )}

      {view === "mysources" && renderLegend()}

      <Box
        sx={{
          overflowX: "auto",
          position: "relative",
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <svg ref={svgRef} width="100%" height="500px" />
        {/* Zoom Controls */}
        <Box
          position="absolute"
          bottom={10}
          right={10}
          display="flex"
          flexDirection="row"
          gap={1}
          border={"1px solid #ddd"}
          borderRadius={2}
        >
          <IconButton
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.5))}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default SourcingOpportunitiesMap;
