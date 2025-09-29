const accountsData = [
    {
        id: "ACC-7842-001",
        type: "Standard",
        balance: 15420.75,
        currency: "USD",
        equity: 16280.50,
        margin: 1240.25,
        freeMargin: 15040.25,
        leverage: "1:100",
        status: "Active",
        profit: 859.75,
        openTrades: 8
    },
    {
        id: "ACC-7842-002",
        type: "ECN Pro",
        balance: 28500.00,
        currency: "EUR",
        equity: 31245.80,
        margin: 2545.20,
        freeMargin: 28700.60,
        leverage: "1:200",
        status: "Active",
        profit: 2745.80,
        openTrades: 12
    },
    {
        id: "ACC-7842-003",
        type: "Islamic",
        balance: 8500.00,
        currency: "USD",
        equity: 8920.00,
        margin: 420.00,
        freeMargin: 8080.00,
        leverage: "1:50",
        status: "Inactive",
        profit: 420.00,
        openTrades: 0
    }
];

const accounts = {
    renderAccounts: () => {

        const totalBalance = accountsData.reduce((sum, acc) => sum + acc.balance, 0);
        const totalEquity = accountsData.reduce((sum, acc) => sum + acc.equity, 0);
        const totalProfit = accountsData.reduce((sum, acc) => sum + acc.profit, 0);

        sectionContainerEl.innerHTML = `
            <div class="section-header">
                <h1 class="section-title">Accounts</h1>
                <p class="section-subtitle">Manage your trading accounts and monitor performance</p>
            </div>
    
            <!-- Summary Cards -->
            <div class="summary-cards">
                <div class="summary-card">
                    <div class="summary-icon total-balance">💰</div>
                    <div class="summary-info">
                        <span class="summary-value">$${totalBalance.toLocaleString()}</span>
                        <span class="summary-label">Total Balance</span>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon total-equity">📊</div>
                    <div class="summary-info">
                        <span class="summary-value">$${totalEquity.toLocaleString()}</span>
                        <span class="summary-label">Total Equity</span>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon total-profit">📈</div>
                    <div class="summary-info">
                        <span class="summary-value profit">+$${totalProfit.toLocaleString()}</span>
                        <span class="summary-label">Total Profit</span>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon active-accounts">✅</div>
                    <div class="summary-info">
                        <span class="summary-value">${accountsData.filter(acc => acc.status === 'Active').length}</span>
                        <span class="summary-label">Active Accounts</span>
                    </div>
                </div>
            </div>
    
            <!-- Accounts List -->
            <div class="accounts-list">
                ${accountsData.map(account => `
                <div class="account-card ${account.status.toLowerCase()}">
                    <div class="account-header">
                        <div class="account-info">
                            <h3 class="account-id">${account.id}</h3>
                            <div class="account-meta">
                                <span class="account-type">${account.type}</span>
                                <span class="account-leverage">${account.leverage}</span>
                                <span class="account-status ${account.status.toLowerCase()}">${account.status}</span>
                            </div>
                        </div>
                        <div class="account-balance">
                            <span class="balance-amount">${account.currency} ${account.balance.toLocaleString()}</span>
                            <span class="profit-amount ${account.profit >= 0 ? 'positive' : 'negative'}">
                                ${account.profit >= 0 ? '+' : ''}${account.currency} ${account.profit.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    
                    <div class="account-details">
                        <div class="detail-row">
                            <div class="detail-col">
                                <span class="detail-label">Equity</span>
                                <span class="detail-value">${account.currency} ${account.equity.toLocaleString()}</span>
                            </div>
                            <div class="detail-col">
                                <span class="detail-label">Margin</span>
                                <span class="detail-value">${account.currency} ${account.margin.toLocaleString()}</span>
                            </div>
                            <div class="detail-col">
                                <span class="detail-label">Free Margin</span>
                                <span class="detail-value">${account.currency} ${account.freeMargin.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-col">
                                <span class="detail-label">Open Trades</span>
                                <span class="detail-value">${account.openTrades}</span>
                            </div>
                            <div class="detail-col">
                                <span class="detail-label">Currency</span>
                                <span class="detail-value">${account.currency}</span>
                            </div>
                            <div class="detail-col">
                                <span class="detail-label">Status</span>
                                <span class="detail-value status-${account.status.toLowerCase()}">${account.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="account-actions">
                        <button class="btn-secondary">View Details</button>
                        <button class="btn-primary">Trade</button>
                        <button class="btn-outline">Deposit</button>
                    </div>
                </div>
                `).join('')}
            </div>
    
            <!-- Quick Action Buttons -->
            <div class="action-buttons">
                <button class="btn-large-primary">
                    New Account
                </button>
                <button class="btn-large-outline">
                    Fund Accounts
                </button>
            </div>`;
    }
}