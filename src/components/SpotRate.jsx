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
          top: metal === 'Gold' ? "-28px" : "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#a8802c",
          borderRadius: "30px",
          padding: "5px 2.5vw",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: metal === 'Gold' ? "1.5vw" : "1vw",
            fontWeight: "700",
            letterSpacing: "1.2px",
            whiteSpace: 'nowrap',
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
          height: "auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: " 40px 15px 20px 15px",
          }}
        >
          {/* BID */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: metal === 'Gold' ? "1.8vw" : "1.5vw",

                fontWeight: "600",
                // marginBottom: "16px",
                color: "#94a3b8",
                letterSpacing: "1px",
              }}
            >
              BID
            </div>
            <div
              style={{
                fontSize: metal === 'Gold' ? "2vw" : "1.5vw",
                fontWeight: "600",
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
              marginTop: 'auto',
              height: "65px",
              background: 'white'
            }}
          />

          {/* ASK */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: metal === 'Gold' ? "1.8vw" : "1.5vw",
                fontWeight: "600",
                // marginBottom: "16px",
                color: "#94a3b8",
                letterSpacing: "1px",
              }}
            >
              ASK
            </div>
            <div
              style={{
                fontSize: metal === 'Gold' ? "2vw" : "1.5vw",
                fontWeight: "600",
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
              marginTop: 'auto',
              height: "65px",
              background: 'white'
            }}
          />

          {/* TODAY */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <div
              style={{
                fontSize: metal === 'Gold' ? "1.8vw" : "1.5vw",
                fontWeight: "600",
                color: "#94a3b8",
                letterSpacing: "1px",
              }}
            >
              TODAY
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "1.2vw", fontWeight: "700", color: "#e2e8f0" }}>
                L: {data.low}
              </div>
              <div style={{ fontSize: "1.2vw", fontWeight: "700", color: "#e2e8f0" }}>
                H: {data.high}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

  return (
    <div style={{ width: "100%",height:'100%' }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ flex: "0 0 53%" }}>{renderSpotCard("Gold", goldData, true)}</div>
        <div style={{ flex: "0 0 45%" }}>{renderSpotCard("Silver", silverData, false)}</div>
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
