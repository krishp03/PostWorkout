let name;
console.log("running");
window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            name = user.displayName;
            document.querySelector(".name").innerHTML = `Welcome, ${name}!`
            console.log(user)
        } else {
            console.log("not logged in")
            // If not logged in, navigate back to login page.
            window.location = 'index.html';
        };
    });
};