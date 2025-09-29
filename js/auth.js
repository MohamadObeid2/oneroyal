const user = {
    name: "M.Obeid",
    username: "testLogin",
    password: "testPassword",
    session: "session1"
};

const auth = {
    isloggedIn: () => {
        const session = storage.get("session");
        if (session === user.session) {
            return true;
        } else {
            return false;
        }
    },
    login: (username, password) => {
        const verified = user.username === username && user.password === password;
        if (verified) {
            storage.set("session", user.session);
            auth.alert(true, "Welcome to OneRoyal Platform!");
            return true;
        } else {
            auth.alert(false, "Wrong username or password!");
            return false;
        }
    },
    logout: () => {
        storage.rem("session");
    },
    getClientName: () => {
        return user.name;
    },
    alert: (verified, msg) => {
        clearTimeout(alertTimer);
        const alertTextEl = document.getElementById("alert-text");
        alertTextEl.innerText = msg;
        let bgcolor = "#28a745";
        if (!verified) {
            bgcolor = "#dc3545";
        }
        alertEl.style.backgroundColor = bgcolor;
        alertEl.style.transform = "translateY(0)";
        const showAlert = () => alertEl.style.transform = "translateY(-100%)";
        alertTimer = setTimeout(showAlert, 4000);
    }
}