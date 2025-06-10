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
import theme from "./ui/theme";
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
    grade: "NATIONAL",
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

const SourcingOpportunitiesMap = ({ data }) => {
  const svgRef = useRef();
  const [view, setView] = useState("heatmap");
  const [zoomLevel, setZoomLevel] = useState(1);
  const isDisabled = true; // or from state
  console.log("data", data);
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
      .style("background", theme.palette.primary.main)
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
            const stateSources =
              data.length > 0 &&
              data.filter(
                (s) =>
                  projection([s.longitude, s.latitude]) &&
                  d3.geoContains(d, [s.longitude, s.latitude])
              );
            const avgCI = d3.mean(stateSources, (s) => s.ci_score) || 0;
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
          .attr("font-size", "6px")
          .attr("fill", "#333")
          .style("pointer-events", "none");

        if (view === "mysources") {
          g.selectAll("g.pin")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "pin")
            .attr("transform", (d) => {
              const coords = projection([d.longitude, d.latitude]);
              return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
            })
            .each(function (d) {
              const group = d3.select(this);
              // Find color for grade inline:
              const gradeColor =
                [
                  { label: "SOURCE", color: "#7D8F69" },
                  { label: "CUSTOM", color: "#F4C430" },
                  { label: "NATIONAL", color: "#DC6B19" },
                  { label: "NO SCORE", color: "#ccc" },
                ].find((g) => g.label === d.grade)?.color || "#ccc";

              if (d.type === "Grower") {
                group
                  .append("circle")
                  .attr("r", 6)
                  .attr("fill", "#fff")
                  .attr("stroke", gradeColor)
                  .attr("stroke-width", 2);
              } else if (d.type === "Retailer") {
                const size = 24;
                group
                  .append("foreignObject")
                  .attr("x", -size / 2)
                  .attr("y", -size / 2)
                  .attr("width", size)
                  .attr("height", size)
                  .html(() => {
                    return `
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${size}px; height:${size}px; display:flex; align-items:center; justify-content:center;">
            <svg viewBox="0 0 100 100" width="20" height="20">
              <circle cx="50" cy="50" r="36" fill="#fff" stroke="${gradeColor}" stroke-width="8"/>
              ${Array.from({ length: 16 })
                .map((_, i) => {
                  const angle = (i * 360) / 16;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 50 + Math.cos(rad) * 42;
                  const y1 = 50 + Math.sin(rad) * 42;
                  const x2 = 50 + Math.cos(rad) * 50;
                  const y2 = 50 + Math.sin(rad) * 50;
                  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${gradeColor}" stroke-width="6" stroke-linecap="round" />`;
                })
                .join("")}
            </svg>
          </div>
        `;
                  });
              }
            })

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

  const handledownloadtemplate = () => {
    const csvContent = `producer_id,verdova_org_id,fmid_co_name,fmid_first_name,fmid_middle_name,fmid_last_name,fmid_addr_1,fmid_addr_2,fmid_city,fmid_ste_cd,fmid_zip_cd,fmid_ein_cd,fmid_county,latitude,longitude,crop_year,ci_score_provisional_gc02e_per_MJ,ci_score_provisional_gc02e_per_bu,ci_score_provisional_reduction_percent,ci_score_provisional_date,ci_score_final_gc02e_per_MJ,ci_score_final_gc02e_per_bu,ci_score_final_reduction_percent,ci_score_final_date,ci_score_parameter,ci_score_parameter_units,status,error`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
      { label: "SOURCE", color: "#800000" },
      { label: "NATIONAL", color: "#257d43" },
      { label: "CUSTOM", color: "#F4C430" },
      { label: "NO SCORE", color: "#ccc" },
    ];
    const source = [
      {
        label: "Grower",
        customIcon: (
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#fff",
              borderRadius: "50%",
              border: "2px solid #808080",
              mr: 0.5,
            }}
          />
        ),
      },
      {
        label: "Retailer",
        customIcon: (
          <Box
            sx={{
              width: 16,
              height: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 0.5,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle (grey stroke), white fill */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="#fff"
                stroke="#808080"
                strokeWidth="10"
              />

              {/* Evenly spaced gear-like edges using short radial lines */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const rad = (angle * Math.PI) / 180;
                const innerRadius = 44;
                const outerRadius = 50;
                const x1 = 50 + Math.cos(rad) * 45;
                const y1 = 50 + Math.sin(rad) * 45;
                const x2 = 50 + Math.cos(rad) * 50;
                const y2 = 50 + Math.sin(rad) * 50;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#808080"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          </Box>
        ),
      },
    ];

  
    return (
      <>
        <Stack
          direction="row"
          spacing={1}
          mt={{ xs: 0, md: 1 }}
          flexWrap="wrap"
          display={{ xs: "block", md: "flex" }}
          padding={2}
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="row" gap={1} p={2} mt={1}>
            {scale.map((s, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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

          <Box display="flex" flexDirection="column" p={{ xs: 0, md: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" fontWeight="bold" mb={0.5}>
                Source :
              </Typography>
              {source.map((s, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 1,
                    mb: 0.5,
                  }}
                >
                  {s.customIcon}
                  <Typography variant="caption">{s.label}</Typography>
                </Box>
              ))}
            </Box>
            <Box
              flexWrap={"wrap"}
              gap={{ xs: 1, md: 1 }}
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <Typography variant="caption" fontWeight="bold" mb={0.5}>
                Grade Level:
              </Typography>
              {gradeLegend.map((item) => (
                <Box
                  key={item.label}
                  display="flex"
                  alignItems="center"
                  marginLeft={1}
                  mb={0.5}
                >
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

  const handleViewChange = (e, newView) => {
    if (newView === null) {
      newView = "heatmap";
    }
    newView && setView(newView);
  };
    const handleUploadDTN = () => {
      console.log("handleUploadDTN function called");
    };

  return (
    <Paper elevation={2} sx={{ borderRadius: 4, p: 2, height: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "16px" }}>
          Sourcing Opportunities
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="heatmap">
            Heat Map <CheckIcon fontSize="small" sx={{ ml: 1 }} />
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
          No heat map information is available.
          <Typography
            component="span"
            onClick={isDisabled ? undefined : handleUploadDTN()}
            style={{
              color: isDisabled ? "#888888" : "#800000",
              cursor: isDisabled ? "not-allowed" : "pointer",
              marginLeft: "20px",
              fontWeight: "bold",
              textDecoration: isDisabled ? "none" : "underline",
              pointerEvents: isDisabled ? "none" : "auto",
            }}
          >
            Upload DTN file
          </Typography>
          <Typography
            component="span"
            onClick={handledownloadtemplate}
            sx={{
              mt: 1,
              ml: 1,
              fontSize: 12,
              color: "text.link",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            (Download Template)
          </Typography>
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
        <svg ref={svgRef} width="100%" height="600px" />
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
