console.log("running")
let googleUserId;

window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUserId = user.uid;
            getPosts(googleUserId);
        } else {
            // If not logged in, navigate back to login page.
            window.location = 'index.html';
        };
    });
};

const getPosts = (userId) => {
    console.log("getPosts running")
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        renderDataAsHtml(data);
    });
};

const renderDataAsHtml = (data) => {
    let cards = ``;
    for (const noteItem in data) {
        const note = data[noteItem];
        // For each note create an HTML card
        cards += createCard(note)
    };
    // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#app').innerHTML = cards;
};

const createCard = (post) => {
    console.log(post.title);
    return `
    <div class="column is-one-quarter">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${post.title}</p>
        </header>
        <header class="card-header">
          <p class="card-header-title">${post.label}</p>
        </header>
        
        <div class="card-content">
          <div class="content">${post.text}</div>
        </div>
         <footer class = "footer-1">
          <p class="card-footer">Protein: ${post.protein}</p>
            <p class="card-footer">Carbs: ${post.carbs}</p>
          <p class="card-footer">Fat: ${post.fat}</p>

        </footer>

      </div>
    </div>
  `;
}