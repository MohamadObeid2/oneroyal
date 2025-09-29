const theme = {
    set: (currentTheme = "light") => {
        if (currentTheme === null) {
            currentTheme = "light";
        }
        storage.set("theme", currentTheme);
        document.documentElement.setAttribute("data-theme", currentTheme);
    },
    get: () => {
        return storage.get("theme");
    },
    toggle: () => {
        let currentTheme = theme.get() === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        theme.set(currentTheme);
        theme.updateBtn();
        chart.initializeChart();
    },
    updateBtn: () => {
        if (theme.get() === "light") {
            themeBtnEl.innerHTML = icons.moon;
            themeBtnEl.style.color = "#4361ee";
        } else {
            themeBtnEl.innerHTML = icons.sun;
            themeBtnEl.style.color = "#f59e0b";
        }
    },
}