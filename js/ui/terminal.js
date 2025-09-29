const terminal = {
    renderTerminal: async () => {
        try {
            terminalActive = true;
            await chart.injectTradingViewScript();
            sectionContainerEl.innerHTML = `
            <h1 class="section-title">TradingView Chart</h1>
            
            <div id="info-panel">
                <div id="price-container">
                    Current Price: <span id="chart-current-price">$100.00</span> 
                    <span id="chart-price-change">(+0.00%)</span>
                </div>
                <div id="symbol-contianer">
                    Symbol: <strong>MOCKSTOCK</strong> | Timeframe: <strong>1D</strong>
                </div>
            </div>
            
            <div id="controls">
                <button id="chart-start-realtime">Start Real-time Data</button>
                <button id="chart-stop-realtime">Stop Real-time Data</button>
                <button id="chart-reset">Reset Chart</button>
            </div>
            
            <div id="chart-main-container"></div>`


            chartCurrentPriceEl = document.getElementById('chart-current-price');
            chartPriceChange = document.getElementById('chart-price-change');

            document.getElementById('chart-start-realtime').addEventListener('click', chart.startRealTimeData);
            document.getElementById('chart-stop-realtime').addEventListener('click', chart.stopRealTimeData);
            document.getElementById('chart-reset').addEventListener('click', chart.resetChart);

            chart.initializeChart();
        } catch (error) {
            console.log(`Error loading TradingView: ${error}`);
        }
    },
}