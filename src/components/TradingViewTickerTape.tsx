const TICKER_CONFIG = {
  symbols: [
    { description: "Nasdaq 100", proName: "NASDAQ:NDX" },
    { description: "Apple", proName: "NASDAQ:AAPL" },
    { description: "Microsoft", proName: "NASDAQ:MSFT" },
    { description: "Nvidia", proName: "NASDAQ:NVDA" },
    { description: "Amazon", proName: "NASDAQ:AMZN" },
    { description: "Alphabet", proName: "NASDAQ:GOOGL" },
  ],
  showSymbolLogo: true,
  colorTheme: "dark",
  theme: "dark",
  isTransparent: false,
  displayMode: "regular",
  locale: "en",
  width: "100%",
  height: 52,
};

const TICKER_SRC = `https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#${encodeURIComponent(
  JSON.stringify(TICKER_CONFIG),
)}`;

export function TradingViewTickerTape() {
  return (
    <section
      aria-label="Live market data"
      className="ticker-tape border-y border-[color:var(--c-line-strong)] bg-[color:var(--ink-900)]"
    >
      <div className="ticker-tape-inner">
        <div className="tradingview-widget-container min-w-0 flex-1">
          <iframe
            title="TradingView live market ticker"
            src={TICKER_SRC}
            loading="lazy"
            className="ticker-tape-iframe"
          />
        </div>
      </div>
    </section>
  );
}
