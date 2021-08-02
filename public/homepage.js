let googleUserId;
console.log("running");
window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUserId = user.uid;
        } else {
            console.log("not logged in")
            // If not logged in, navigate back to login page.
            window.location = 'index.html';
        };
    });
};