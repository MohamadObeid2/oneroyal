const ui = {
    renderAlert: () => {

        rootEl = document.getElementById("root");
        alertEl = document.createElement("alert");
        alertEl.id = "alert";
        alertEl.innerHTML = `<div id="alert-text"></div>`
        rootEl.appendChild(alertEl);
    },
    renderLoginForm: () => {

        loginPageEl = document.getElementById("login");
        loginPageEl.innerHTML = `
        <div id="login-form-container">
            <h1 id="login-title">Login Form</h1>
            <div id="login-input-container">
                <input id="username" placeholder="Username">
                <input id="password" type="password" placeholder="Password">
            </div>
            <button id="login-btn">Login</button>
        </div>`;

        const loginHandler = () => {

            const usernameEl = document.getElementById("username");
            const passwordEl = document.getElementById("password");

            const verified = auth.login(usernameEl.value, passwordEl.value);
            if (verified) {
                page.renderPage("portal");
            }
        }

        document.getElementById('password').addEventListener('keyup', (e) => e.key === "Enter" && loginHandler());
        document.getElementById('login-btn').addEventListener('click', loginHandler);
    },
    renderHeader: () => {

        const headerContainerEl = document.createElement("div");
        headerContainerEl.id = "header-container";
        headerContainerEl.innerHTML = `
        <div id="topbar-container">
            <div id="logo-contianer">
                <span id="logo">OneRoyal</span>
            </div>
            <div id="user">
                <button id="theme-toggle" class="theme-toggle"></button>
                <span id="username-btn">Hi, ${auth.getClientName()}</span>
                <button id="logout">Logout</button>
            </div>
        </div>`;
        portalPageEl.appendChild(headerContainerEl);
        themeBtnEl = document.getElementById('theme-toggle');

        const itemHandler = (e) => {
            ui.renderSection("profile");
        }

        const logoutHandler = () => {
            sectionContainerEl = null;
            loginPageEl = null;
            portalPageEl = null;
            mainContainerEl = null;
            auth.logout();
            page.renderPage("login");
        }

        document.getElementById('logo').addEventListener('click', itemHandler);
        document.getElementById('logout').addEventListener('click', logoutHandler);
        themeBtnEl.addEventListener('click', theme.toggle);
        theme.updateBtn();
    },
    renderBottombar: () => {

        bottombarEl = document.createElement("div");
        bottombarEl.classList = "bottombar-container";
        bottombarEl.innerHTML = `
        <div class="bottombar-items">
            <button class="bottombar-item" data-section="profile">
                <div class="bottombar-icon">${icons.profile}</div>
                <span class="bottombar-label">Profile</span>
            </button>
            <button class="bottombar-item" data-section="accounts">
                <div class="bottombar-icon">${icons.accounts}</div>
                <span class="bottombar-label">Accounts</span>
            </button>
            <button class="bottombar-item" data-section="terminal">
                <div class="bottombar-icon">${icons.terminal}</div>
                <span class="bottombar-label">Terminal</span>
            </button>
        </div>`
        portalPageEl.appendChild(bottombarEl);

        document.querySelectorAll('.bottombar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                ui.renderSection(section);
                ui.updateActiveState(section);
            });
        });
    },
    renderSidebar: () => {

        mainContainerEl = document.createElement("div");
        mainContainerEl.id = "main-container";
        portalPageEl.appendChild(mainContainerEl);

        const sidebarContainerEl = document.createElement("div");
        sidebarContainerEl.id = "sidebar-container";
        sidebarContainerEl.innerHTML = `
        <div id="sidebar-main-container">
            <div class="sidebar-item">
                <button id="profile">
                    <div class="icon">${icons.profile}</div>
                    Profile
                </button>
            </div>
            <div class="sidebar-item">
                <button id="accounts">
                    <div class="icon">${icons.accounts}</div>
                    Accounts
                </button>
            </div>
            <div class="sidebar-item">
                <button id="terminal">
                    <div class="icon">${icons.terminal}</div>
                    Terminal
                </button>
            </div>
        </div>`;

        mainContainerEl.appendChild(sidebarContainerEl);

        const sectionHandler = (e) => {
            let section = e.target.id;
            ui.renderSection(section);
            ui.updateActiveState(section);
        }

        document.getElementById('profile').addEventListener('click', sectionHandler);
        document.getElementById('accounts').addEventListener('click', sectionHandler);
        document.getElementById('terminal').addEventListener('click', sectionHandler);
    },
    renderSection: (section) => {
        terminalActive = false;

        if (!sectionContainerEl) {
            sectionContainerEl = document.createElement("div");
            sectionContainerEl.id = "section-container";
            mainContainerEl.appendChild(sectionContainerEl);
        }

        ui.updateActiveState(section);
        sectionContainerEl.innerHTML = "";

        if (section === "profile") {
            profile.renderProfile();
        } else if (section === "accounts") {
            accounts.renderAccounts();
        } else if (section === "terminal") {
            terminal.renderTerminal();
        }
    },
    updateActiveState: (section) => {

        document.querySelectorAll('.bottombar-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        document.querySelectorAll('.sidebar-item button').forEach(btn => {
            btn.classList.toggle('active', btn.id === section);
        });
    },
}