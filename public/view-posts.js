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
        cards += createCard(note, noteItem)
    };
    // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#app').innerHTML = cards;
};

const createCard = (post, noteId) => {
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
         
        <p class="card-footer">Protein: ${post.protein}</p>
            <p class="card-footer">Carbs: ${post.carbs}</p>
          <p class="card-footer">Fat: ${post.fat}</p>
         </div>

         <footer class = "card-footer">
         

            <a href = "#" class = "card-footer-item" onclick = "editNote('${noteId}')">
            Edit
            </a>
            <a href = "#" class = "card-footer-item" onclick = "deleteNote('${noteId}')">
            Delete
            </a>
            </footer>
      </div>
    </div>
  `;
}


const deleteNote = (noteId) => {
    //retrieves the users Id for the note
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove()
}

const editNote = (noteId) => {
    const editNoteModal = document.querySelector('#editNoteModal')
    const notesRef = firebase.database().ref(`users/${googleUserId}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        const note = data[noteId]
        document.querySelector('#editTitleInput').value = note.title;
        document.querySelector('#editTextInput').value = note.text;
        document.querySelector('#editNoteId').value = noteId;

    })
    editNoteModal.classList.toggle('is-active')
}

const closeEditModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal')
    editNoteModal.classList.toggle('is-active')

}

const saveEditedNote = () => {
    const noteTitle = document.querySelector("#editTitleInput").value;
    const noteText = document.querySelector("#editTextInput").value;
    const noteId = document.querySelector("#editNoteId").value;
    const noteEdits = {
        title: noteTitle,
        text: noteText,
    }
    firebase.database().ref(`users/${googleUserId}/${noteId}`).update(noteEdits)
    closeEditModal()    

}