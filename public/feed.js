let googleUser;



window.onload = (event) => {
  // Use this to retain user state between html pages.

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const noteImage = document.querySelector('#noteImage')
   console.log(noteTitle.value)
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    image: noteImage.value
  })
     

  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    noteText.value = '';
  });
}


// const deleteNote = (noteId) => {
//     if(confirm("Are you sure you want to delete this note?")){
//         //then put the card in the archive section

//         firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
//     } else {
//         alert("Deletion cancelled!");
//     }
// }

// const editNote = (noteId) => {
//     const editNoteModal = document.querySelector('#editNoteModal')
//     const notesRef = firebase.database().ref(`users/${googleUserId}`)
//     notesRef.on('value', (snapshot) => {
//         const data = snapshot.val()
//         const note = data[noteId]
//         document.querySelector('#editTitleInput').value = note.title;
//         document.querySelector('#editTextInput').value = note.text;
//         document.querySelector('#editNoteId').value = noteId;

//     })
//     editNoteModal.classList.toggle('is-active')
// }

// const closeEditModal = () => {
//     const editNoteModal = document.querySelector('#editNoteModal')
//     editNoteModal.classList.toggle('is-active')

// }

// const saveEditedNote = () => {
//     const noteTitle = document.querySelector("#editTitleInput").value;
//     const noteText = document.querySelector("#editTextInput").value;
//     const noteId = document.querySelector("#editNoteId").value;
//     const noteEdits = {
//         title: noteTitle,
//         text: noteText,
//     }
//     firebase.database().ref(`users/${googleUserId}/${noteId}`).update(noteEdits)
//     closeEditModal()

// }

// */