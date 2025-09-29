const profileData = {
    name: "Mohamad Obeid",
    email: "mohamad.obeid.2@st.ul.edu.lb",
    clientId: "CP-7842-2024",
    joinDate: "March 15, 2023",
    tier: "Premium",
    status: "Active",
    phone: "+1 (555) 123-4567",
    country: "Lebanon",
    lastLogin: "2 hours ago"
};

const profile = {
    renderProfile: () => {
    
        sectionContainerEl.innerHTML = `
            <div class="section-header">
                <h1 class="section-title">Profile</h1>
                <p class="section-subtitle">Manage your account information and preferences</p>
            </div>
            
            <div class="profile-grid">
                <!-- Profile Card -->
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="avatar">
                            ${profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div class="profile-info">
                            <h2 class="profile-name">${profileData.name}</h2>
                            <p class="profile-email">${profileData.email}</p>
                            <div class="status-badge ${profileData.status.toLowerCase()}">
                                ${profileData.status}
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-details">
                        <div class="detail-item">
                            <span class="detail-label">Client ID</span>
                            <span class="detail-value">${profileData.clientId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Member Since</span>
                            <span class="detail-value">${profileData.joinDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Account Tier</span>
                            <span class="detail-value tier-${profileData.tier.toLowerCase()}">${profileData.tier}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Phone</span>
                            <span class="detail-value">${profileData.phone}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Country</span>
                            <span class="detail-value">${profileData.country}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Last Login</span>
                            <span class="detail-value">${profileData.lastLogin}</span>
                        </div>
                    </div>
                </div>
    
                <!-- Stats Card -->
                <div class="stats-card">
                    <h3>Account Overview</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-icon">📈</div>
                            <div class="stat-info">
                                <span class="stat-value">247</span>
                                <span class="stat-label">Trades This Month</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">💰</div>
                            <div class="stat-info">
                                <span class="stat-value">78.5%</span>
                                <span class="stat-label">Success Rate</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">🕒</div>
                            <div class="stat-info">
                                <span class="stat-value">2.4Y</span>
                                <span class="stat-label">Trading Experience</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-info">
                                <span class="stat-value">Gold</span>
                                <span class="stat-label">Trader Level</span>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- Quick Actions -->
                <div class="actions-card">
                    <h3>Quick Actions</h3>
                    <div class="actions-grid">
                        <button class="action-btn">
                            <span class="action-icon">✏️</span>
                            Edit Profile
                        </button>
                        <button class="action-btn">
                            <span class="action-icon">🔒</span>
                            Security Settings
                        </button>
                        <button class="action-btn">
                            <span class="action-icon">📧</span>
                            Contact Support
                        </button>
                        <button class="action-btn">
                            <span class="action-icon">📊</span>
                            Trading Reports
                        </button>
                    </div>
                </div>
            </div>`;
    }
}