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
    <div style={{ position: "relative", marginTop: "30px", width: "100%" }}>
      {/* Header Badge */}
      <div
        style={{
          position: "absolute",
          top: "-28px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#a8802c",
          borderRadius: "30px",
          padding: "10px 28px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: isGold ? "2.6vw" : "2.2vw",
            fontWeight: "900",
            letterSpacing: "2px",
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
          borderRadius: "30px",
          height: "240px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "70px 40px 40px",
          }}
        >
          {/* BID */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "1.8vw",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#94a3b8",
                letterSpacing: "3px",
              }}
            >
              BID
            </div>
            <div
              style={{
                fontSize: isGold ? "3.8vw" : "3.2vw",
                fontWeight: "800",
                color: getTextColor(data.bidChanged),
              }}
            >
              {data.bid}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "2px",
              height: "100px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {/* ASK */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "1.8vw",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#94a3b8",
                letterSpacing: "3px",
              }}
            >
              ASK
            </div>
            <div
              style={{
                fontSize: isGold ? "3.8vw" : "3.2vw",
                fontWeight: "800",
                color: getTextColor(data.askChanged),
              }}
            >
              {data.ask}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "2px",
              height: "100px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {/* TODAY */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: "1.8vw",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#94a3b8",
                letterSpacing: "3px",
              }}
            >
              TODAY
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "1.8vw", fontWeight: "700", color: "#e2e8f0" }}>
                L: {data.low}
              </div>
              <div style={{ fontSize: "2vw", fontWeight: "700", color: "#e2e8f0" }}>
                H: {data.high}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 58%" }}>{renderSpotCard("Gold", goldData, true)}</div>
        <div style={{ flex: "0 0 40%" }}>{renderSpotCard("Silver", silverData, false)}</div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          div[style*="flex: 0 0 58%"],
          div[style*="flex: 0 0 40%"] {
            flex: 0 0 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpotRate;
