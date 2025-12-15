import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  // Helper function to get bid and ask values based on metal type
  const getBidAskValues = (metal) => {
    if (
      metal === "gold" ||
      metal === "gold kilobar" ||
      metal === "gold ten tola"
    ) {
      return {
        bid: parseFloat(goldData.bid) || 0,
        ask: parseFloat(goldData.ask) || 0,
      };
    } else if (metal === "silver") {
      return {
        bid: parseFloat(silverData.bid) || 0,
        ask: parseFloat(silverData.ask) || 0,
      };
    }
    return { bid: 0, ask: 0 };
  };

  // Helper function to calculate purity power
  const calculatePurityPower = (purityInput) => {
    if (!purityInput || isNaN(purityInput)) return 1;
    return purityInput / Math.pow(10, purityInput.toString().length);
  };

  // Helper function to conditionally round values
  const formatValue = (value, weight) => {
    // Format the value based on the weight
    const formattedValue =
      weight === "GM"
        ? value.toFixed(2).toLocaleString()
        : Math.round(value).toLocaleString();

    return formattedValue;
  };

  // Helper function to get the correct metal name
  const getMetalName = (metal) => {
    switch (metal.toLowerCase()) {
      case "gold":
        return "GOLD";
      case "gold kilobar":
        return "GOLD";
      case "gold ten tola":
        return "GOLD";
      default:
        return metal.charAt(0).toUpperCase() + metal.slice(1);
    }
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: "transparent",
        marginTop: "20px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "#a8802c",
              "& th": {
                borderBottom: "none",
              },
            }}
          >
            <TableCell
              sx={{
                color: "#013b24",
                fontWeight: "bold",
                fontSize: "1.8vw",
                textAlign: "center",
              }}
              colSpan={2}
            >
              COMMODITY
            </TableCell>
            <TableCell
              sx={{
                color: "#013b24",
                fontWeight: "bold",
                fontSize: "1.8vw",
                textAlign: "left",
              }}
            >
              UNIT
            </TableCell>
            <TableCell
              sx={{
                color: "#013b24",
                fontWeight: "bold",
                fontSize: "1.8vw",
                textAlign: "left",
              }}
            >
              ASK (AED)
            </TableCell>
          </TableRow>
          <Box sx={{ height: "15px" }} />
        </TableHead>
        <TableBody>
          {commodities.map((commodity, index) => {
            const { bid, ask } = getBidAskValues(commodity.metal.toLowerCase());
            const {
              unit,
              weight,
              buyCharge,
              sellCharge,
              buyPremium,
              sellPremium,
              purity,
            } = commodity;

            // Ensure all values are numbers
            const unitMultiplier =
              {
                GM: 1,
                KG: 1000,
                TTB: 116.64,
                TOLA: 11.664,
                OZ: 31.1034768,
              }[weight] || 1;

            const weightValue = parseFloat(weight) || 0;
            const purityValue = parseFloat(purity) || 0;
            const purityPower = calculatePurityPower(purityValue);
            const buyChargeValue = parseFloat(buyCharge) || 0;
            const sellChargeValue = parseFloat(sellCharge) || 0;
            const buyPremiumValue = parseFloat(buyPremium) || 0;
            const sellPremiumValue = parseFloat(sellPremium) || 0;

            const biddingValue = bid + buyPremiumValue;
            const askingValue = ask + sellPremiumValue;
            const biddingPrice = (biddingValue / 31.103) * 3.674;
            const askingPrice = (askingValue / 31.103) * 3.674;

            // Calculation of buyPrice and sellPrice
            const buyPrice =
              biddingPrice * unitMultiplier * unit * purityPower +
              buyChargeValue;
            const sellPrice =
              askingPrice * unitMultiplier * unit * purityPower +
              sellChargeValue;

            // Check if this is the first or last row
            const isFirstRow = index === 0;
            const isLastRow = index === commodities.length - 1;

            return (
              <React.Fragment key={index}>
                <TableRow
                  sx={{
                    "& td": {
                      borderBottom: "none",
                      padding: "7px",
                    },
                    background: "#072919",
                    "& tr td": {
                      border: "2px solid #D2AD36",
                    },
                    // Apply border radius only to first and last rows
                    ...(isFirstRow && {
                      "& td:first-of-type": {
                        borderTopLeftRadius: "8px",
                      },
                      "& td:last-of-type": {
                        borderTopRightRadius: "8px",
                      },
                    }),
                    ...(isLastRow && {
                      "& td:first-of-type": {
                        borderBottomLeftRadius: "8px",
                      },
                      "& td:last-of-type": {
                        borderBottomRightRadius: "8px",
                      },
                    }),
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    {getMetalName(commodity.metal)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1.2vw",
                      textAlign: "left",
                      paddingLeft: "0px",
                      fontWeight: "bold",
                    }}
                  >
                    {commodity.metal.toLowerCase() === "gold ten tola"
                      ? "TEN TOLA"
                      : purity}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1.8vw",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {unit} {weight}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {formatValue(sellPrice, weight)}
                  </TableCell>
                </TableRow>
                {/* Add gap between rows */}
                <Box sx={{ height: "4px" }} />
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommodityTable;