const page = {
    renderPage: (pname) => {

        if (!pageEl) { // 1st render
            page.renderRoot();
        } else {
            pageEl.innerHTML = "";
        }

        if (pname === "login") {
            page.renderLogin();
        } else if (pname === "portal") {
            page.renderPortal();
        }
    },
    renderRoot: () => {
        rootEl.innerHTML = `<div id="page"></div>`;
        pageEl = document.getElementById("page");
        ui.renderAlert();
    },
    renderLogin: () => {
        pageEl.innerHTML = `<div id="login"></div>`;
        ui.renderLoginForm();
    },
    renderPortal: () => {
        pageEl.innerHTML = `<div id="portal"></div>`;
        portalPageEl = document.getElementById("portal");
        ui.renderHeader();
        ui.renderSidebar();
        ui.renderBottombar();
        ui.renderSection("terminal");
    }
};