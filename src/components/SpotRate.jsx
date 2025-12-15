import React from "react";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getTextColor = (change) => {
    if (change === "up") return "#22c55e";
    if (change === "down") return "#ef4444";
    return "#ffffff";
  };

  const renderSpotCard = (metal, data, isGold = true) => (
    <div style={{ position: "relative", marginTop: "20px", width: "100%" }}>
      {/* Header Badge */}
      <div
        style={{
          position: "absolute",
          top: "-22px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#a8802c",
          borderRadius: "24px",
          padding: isGold ? "6px 16px" : "8px 16px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: isGold ? "1.4vw" : "1.2vw",
            fontWeight: "800",
            letterSpacing: "1.5px",
            color: "#013b24",
            textTransform: "uppercase",
          }}
        >
          {metal} Spot
        </div>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: "#072919",
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          height: "160px"
        }}
      >

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: isGold ? "48px 24px 32px" : "42px 20px 28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* BID Section */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#94a3b8",
                letterSpacing: "2px",
              }}
            >
              BID
            </div>
            <div
              style={{
                fontSize: isGold ? "2vw" : "1.7vw",
                fontWeight: "700",
                color: getTextColor(data.bidChanged),
                lineHeight: 1,
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {data.bid}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: isGold ? "70px" : "55px",
              background: "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)",
              margin: "0 16px",
            }}
          />

          {/* ASK Section */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#94a3b8",
                letterSpacing: "2px",
              }}
            >
              ASK
            </div>
            <div
              style={{
                fontSize: isGold ? "2vw" : "1.7vw",
                fontWeight: "700",
                color: getTextColor(data.askChanged),
                lineHeight: 1,
                fontFamily: "system-ui, -apple-system, sans-serif",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {data.ask}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: isGold ? "70px" : "55px",
              background: "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent)",
              margin: "0 16px",
            }}
          />

          {/* TODAY Section */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "0.9vw",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#94a3b8",
                letterSpacing: "2px",
              }}
            >
              TODAY
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  fontSize: "0.8vw",
                  fontWeight: "600",
                  color: "#e2e8f0",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                L: {data.low}
              </div>
              <div
                style={{
                  fontSize: "0.8vw",
                  fontWeight: "600",
                  color: "#e2e8f0",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                H: {data.high}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "100%",
        backgroundColor: "transparent",
        marginBottom: "40px",
      }}
    >
      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {/* Gold Card - 65% width */}
        <div style={{ flex: "0 0 calc(60% - 10px)", minWidth: "320px" }}>
          {renderSpotCard("Gold", goldData, true)}
        </div>

        {/* Silver Card - 35% width */}
        <div style={{ flex: "0 0 calc(40% - 10px)", minWidth: "280px" }}>
          {renderSpotCard("Silver", silverData, false)}
        </div>
      </div>

      {/* Responsive styles for mobile */}
      <style>{`
        @media (max-width: 968px) {
          div[style*="flex: 0 0 calc(65% - 10px)"],
          div[style*="flex: 0 0 calc(35% - 10px)"] {
            flex: 0 0 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpotRate;