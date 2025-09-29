const main = () => {

    theme.set(theme.get());
    
    const loggedIn = auth.isloggedIn();
    if (loggedIn) {
        page.renderPage("portal");
    } else {
        page.renderPage("login");
    }
}

main();