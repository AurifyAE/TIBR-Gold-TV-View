import React, { useEffect, useRef } from 'react';

const TradingViewWidget = React.memo(() => {
    const container = useRef(null);
    const scriptAdded = useRef(false); // Track if script is already added

    useEffect(() => {
        if (scriptAdded.current) return; // Prevent re-adding
        scriptAdded.current = true;

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
      {
        "allow_symbol_change": true,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "hide_volume": false,
        "hotlist": false,
        "interval": "60",
        "locale": "en",
        "save_image": true,
        "style": "1",
        "symbol": "CAPITALCOM:GOLD",
        "theme": "dark",
        "timezone": "Etc/UTC",
        "backgroundColor": "#0F0F0F",
        "gridColor": "rgba(242, 242, 242, 0.06)",
        "watchlist": [],
        "withdateranges": false,
        "compareSymbols": [],
        "studies": [],
        "autosize": true
      }
    `;

        container.current.appendChild(script);
    }, []);

    return (
        <div className='mt-3' style={{ height: '30vh', width: '30vw' }}>
            <div
                className="tradingview-widget-container"
                ref={container}
                style={{ height: '100%', width: '100%' }}
            >
                <div
                    className="tradingview-widget-container__widget"
                    style={{ height: 'calc(100% - 32px)', width: '100%' }}
                ></div>
            </div>
        </div>
    );
});

export default TradingViewWidget;