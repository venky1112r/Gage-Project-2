import React from "react";
import { Box, Typography, Paper } from "@mui/material";
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const SummaryCard = ({
  label,
  value,
  delta,
  isPositive,
  subLabel,
  labelVariant = "subtitle2",
  valueVariant = "h4",
}) => {
  // const [intPart, decimalPart] = Number(value).toFixed(2).split(".");
  // const isContractedCIScore = label === "Contracted CI Score";
let intPart = value;
  let decimalPart = null;

  if (!isNaN(Number(value))) {
    [intPart, decimalPart] = Number(value).toFixed(2).split('.');
  }

  const isContractedCIScore = typeof label === 'string' && label.includes('Contracted CI Score');

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 4,
        p: 2,
         width: "100%", 
        // minWidth: 200,
        height: { xs: "auto", md: "100%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant={labelVariant} fontWeight="bold" sx={{ fontSize: "16px"}}>
            {label}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            color={isPositive ? "#007f5c" : "#d32f2f"}
            ml={1}
          >
            {/* {isPositive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} */}
            <Typography variant="body2" ml={0.5}>
              {delta}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="flex-end" flexWrap="nowrap">
          {isContractedCIScore ? (
            <>
              <Typography
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 1,
                  color: "primary.main",
                }}
              >
                {intPart}
              </Typography>
              {decimalPart && (
                <Typography
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2rem" },
                    color: "#003320",
                    lineHeight: 1,
                    paddingBottom:"5px",
                  }}
                >
                  .{decimalPart}
                </Typography>
              )}
            </>
          ) : (
            <Typography
  color="primary.main"
  sx={{
    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
    paddingTop: '5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    // wordBreak: 'keep-all',
  }}
>
  {value}
</Typography>

          )}
        </Box>
      </Box>

      {/* {subLabel && (
        <Typography variant="caption" color="red" mt={1}>
          {subLabel}
        </Typography>
      )} */}
    </Paper>
  );
};

export default SummaryCard;
