import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { format } from "date-fns"; // Import date-fns
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import saimaLogo from "../assets/TIBER_Logo.png";
import Carousel from "../components/Carousel";
import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";
import TradingViewWidget from "../components/TradingView";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();
  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        setNews(newsRes.data.news.news);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    fetchTVScreenData(adminId)
      .then((response) => {
        if (response.status === 200) {
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true);
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
              ...data,
              bidChanged:
                prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
                  ? data.bid > prevData[data.symbol].bid
                    ? "up"
                    : "down"
                  : null,
            },
          }));
        } else {
          console.warn("Received malformed market data:", data);
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFormattedDateParts = (date) => {
    const day = format(date, "EEEE");
    const dayOfMonth = format(date, "dd");
    const month = format(date, "MMM").toUpperCase();
    const year = format(date, "yyyy");

    console.log("Date Parts:", { day, dayOfMonth, month, year }); // Debug log

    return {
      day,
      date: dayOfMonth,
      month,
      year,
    };
  };

  const getFormattedTimeWithoutSeconds = (date) => {
    return format(date, "HH:mm");
  };

  const { day, date, month, year } = getFormattedDateParts(dateTime);

  return (
    <Box sx={{ minHeight: "100vh", color: "white", padding: "0px" }}>
      <Box className="flex flex-row items-center justify-between mb-10 p-10 py-0 mt-3">
        {/* Date */}
        <Box>
          <Typography
            className="text-white font-semibold text-xl"
            sx={{ fontSize: "2.5vw" }}
          >
            {day.toUpperCase()}
          </Typography>
          <Box className="flex flex-row" sx={{ overflow: "visible", whiteSpace: "nowrap" }}>
            <Typography
              className="text-white font-bold mx-2"
              sx={{ fontSize: "1.5vw", fontWeight: "600" }}
            >
              {date}
            </Typography>
            <Typography
              className="text-white font-bold mx-2"
              sx={{ fontSize: "1.5vw", fontWeight: "600", marginLeft: "0.5rem" }}
            >
              {month}
            </Typography>
            <Typography
              className="text-white font-bold mx-2"
              sx={{ fontSize: "1.5vw", fontWeight: "600", marginLeft: "0.5rem" }}
            >
              {year}
            </Typography>
          </Box>
        </Box>

        {/* Logo */}
        <img src={saimaLogo} alt="" className="w-[190px] h-[200px]" />

        {/* Time */}
        <Box className="flex flex-col items-center">
          <AccessTime sx={{ color: "#FFF", fontSize: "2vw", marginBottom: "0.5rem" }} />
          <Typography
            fontWeight="bold"
            sx={{ color: "#FFF", fontSize: "2.3vw" }}
          >
            {getFormattedTimeWithoutSeconds(dateTime)}
          </Typography>
        </Box>
      </Box>

      <Grid
        container
        spacing={4}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        className="p-10 py-0"
      >
        <Grid item xs={12} md={8}>
          <SpotRate />
          <CommodityTable commodities={commodities} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Carousel />
          <TradingViewWidget />
          <Box className="flex flex-col justify-center items-center">
            <Typography sx={{ fontSize: "1.2vw", marginTop: "0px" }}>
              Powered by www.aurify.ae
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <NewsTicker newsItems={news} />
      {showLimitModal && <LimitExceededModal />}
    </Box>
  );
}

export default TvScreen;