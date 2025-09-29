let realTimeCallback = null;
let realTimeInterval = null;
let currentPrice = 100;
let historicalData = [];

const chart = {
    injectTradingViewScript: () => {
        return new Promise((resolve, reject) => {

            const injected = document.getElementById("trading-view");
            if (injected) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.id = "trading-view";
            script.type = "text/javascript";
            script.src = "https://s3.tradingview.com/tv.js";
            script.async = true;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = (error) => {
                reject(error);
            };

            document.head.appendChild(script);
        });
    },
    initializeChart: () => {

        if (!terminalActive) return;

        chart.generateHistoricalData();

        // Note that the datafeed will not work due to free package limitations
        // This is only for showing structure
        const datafeed = {
            onReady: (callback) => {
                console.log('Datafeed is ready');
                setTimeout(() => {
                    callback({
                        supports_search: true,
                        supports_group_request: false,
                        supports_timescale_marks: false,
                        supports_time: true,
                        supported_resolutions: ['1D', 'D']
                    });
                }, 0);
            },
            searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
                onResultReadyCallback([]);
            },
            resolveSymbol: (symbolName, onResolve, onError) => {
                const symbolInfo = {
                    name: symbolName,
                    description: "Mock Stock Data",
                    type: "stock",
                    session: "24x7",
                    timezone: "Etc/UTC",
                    ticker: symbolName,
                    minmov: 1,
                    pricescale: 100,
                    has_intraday: false,
                    has_daily: true,
                    has_weekly_and_monthly: false,
                    supported_resolutions: ['1D', 'D'],
                    volume_precision: 2,
                    data_status: "streaming"
                };
                setTimeout(() => onResolve(symbolInfo), 0);

            },
            getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
                onHistoryCallback(historicalData, { noData: historicalData.length === 0 });
            },
            subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
                // Subscribe to real-time data
                console.log('Subscribing to real-time data');
                realTimeCallback = onRealtimeCallback;
                chart.startRealTimeData();
            },
            unsubscribeBars: (subscriberUID) => {
                // Unsubscribe from real-time data
                console.log('Unsubscribing from real-time data');
                realTimeCallback = null;
                chart.stopRealTimeData();
            }
        };

        try {
            new TradingView.widget({
                container_id: "chart-main-container",
                width: "100%",
                height: "500px",
                symbol: "NASDAQ:AAPL",
                interval: "D",
                timezone: "Etc/UTC",
                theme: storage.get("theme"),
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                hide_top_toolbar: false,
                hide_legend: true,
                save_image: false,
                studies: [],
                datafeed,
            });

            const iframe = document.querySelector('iframe');
            iframe.onload = function () {
                console.log('TradingView widget created successfully');
                chart.startRealTimeData();
            };

        } catch (error) {
            console.error('Error creating TradingView widget:', error);
        }

    },
    generateHistoricalData: () => {
        let _historicalData = [];

        let basePrice = 100;
        const baseTime = Date.now() - (30 * 24 * 60 * 60 * 1000);

        for (let i = 0; i < 30; i++) {
            const time = baseTime + (i * 24 * 60 * 60 * 1000);

            const changePercent = (Math.random() * 4 - 2) / 100;
            const open = basePrice;
            const close = basePrice * (1 + changePercent);

            const minPrice = Math.min(open, close);
            const maxPrice = Math.max(open, close);

            const high = maxPrice + (Math.random() * basePrice * 0.01);
            const low = minPrice - (Math.random() * basePrice * 0.01);

            const volume = Math.floor(Math.random() * 9000) + 1000;

            _historicalData.push({
                time: Math.floor(time / 1000),
                open: open,
                high: high,
                low: low,
                close: close,
                volume: volume
            });

            basePrice = close;
        }

        historicalData = _historicalData;
        currentPrice = historicalData[historicalData.length - 1].close;
    },
    startRealTimeData: () => {
        if (realTimeInterval) {
            return;
        }

        chart.initializeChart();
        realTimeInterval = setInterval(chart.updatePrice, 2000);
    },
    stopRealTimeData: () => {
        if (realTimeInterval) {
            clearInterval(realTimeInterval);
            realTimeInterval = null;
        }
    },
    resetChart: () => {

        chart.stopRealTimeData();
        chart.initializeChart();

        // Update display
        document.getElementById('chart-current-price').textContent = currentPrice.toFixed(2);
        document.getElementById('chart-price-change').textContent = '(0.00%)';
        document.getElementById('chart-price-change').className = '';
    },
    updatePrice: () => {

        if (!chartCurrentPriceEl) return;

        //if (!realTimeCallback) return;

        // -0.5% to +0.5%
        const changePercent = (Math.random() * 1 - 0.5) / 100;
        const newPrice = currentPrice * (1 + changePercent);
        const now = Math.floor(Date.now() / 86400000) * 86400;

        const bar = {
            time: now,
            open: currentPrice,
            high: Math.max(currentPrice, newPrice),
            low: Math.min(currentPrice, newPrice),
            close: newPrice,
            volume: Math.floor(Math.random() * 1000) + 100
        };

        //realTimeCallback(bar);

        currentPrice = newPrice;
        const priceChange = ((newPrice - 100) / 100 * 100).toFixed(2);
        const changeClass = priceChange >= 0 ? 'price-up' : 'price-down';
        const changeSign = priceChange >= 0 ? '+' : '';

        chartCurrentPriceEl.textContent = `$${newPrice.toFixed(2)}`;
        chartPriceChange.textContent = `(${changeSign}${priceChange}%)`;
        chartPriceChange.className = changeClass;

    }
}