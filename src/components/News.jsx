import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        marginTop: "7px",
      }}
    >
      {/* NEWS Label */}
      <Typography sx={{
        color: "#013b24", fontWeight: "bold", fontSize: "1.6rem",
        backgroundColor: "#a8802c",
        padding: "5px 10px",
      }}>
        NEWS
      </Typography>

      {/* Scrolling ticker */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          backgroundColor: "#072919",
          padding: "5px 10px",
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
                color: "white",
                fontSize: "1.6rem",
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
