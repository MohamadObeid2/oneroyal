const storage = {
    get: (key) => {
        return sessionStorage.getItem(key);
    },
    set: (key, data) => {
        sessionStorage.setItem(key, data);
    },
    rem: (key) => {
        sessionStorage.removeItem(key);
    }
}