import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginTop: "25px",
      }}
    >
      {/* NEWS Label */}
      <Typography
        sx={{
          color: "#013b24",
          fontWeight: "bold",
          fontSize: "2.2rem",
          backgroundColor: "#a8802c",
          padding: "6px 14px",
          whiteSpace: "nowrap",
        }}
      >
        NEWS
      </Typography>

      {/* Scrolling Ticker */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          backgroundColor: "#072919",
          padding: "6px 10px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline-block",
            animation: "scroll 40s linear infinite",
            color: "white",
          }}
        >
          {newsItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                marginRight: "4vw",
                display: "inline-block",
                fontSize: "2.2rem",
                color: "white",
              }}
            >
              {item.description}
            </Typography>
          ))}
        </Box>

        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default NewsTicker;
