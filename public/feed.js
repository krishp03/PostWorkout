let googleUserId;



window.onload = (event) => {
  // Use this to retain user state between html pages.

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getPosts();
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getPosts = () => {
    const ref = firebase.database().ref();
    ref.on('value', (snapshot) => {
        users = snapshot.val().users;
        for(let uid in users){
            if(uid === googleUserId){
                continue;
            }
            else{
                const postsRef = firebase.database().ref(`users/${uid}`);
                postsRef.on('value', (postSnapshot) => {
                const post = postSnapshot.val();
                renderDataAsHtml(post);
     });
            }
        }
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
};