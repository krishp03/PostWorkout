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

$('#select').change(function() {
    opt = $(this).val();
    if (opt =="Diet") {
        $('#msgbox').html('<br><label  class="ds">Protein: </label> <input placeholder = "Grams of protein" id = "protein" class="input is-medium" type="text" id="noteTitle"><br><label class="ds">Fat: </label> <input  placeholder = "Grams of Fat" id = "fat" class="input is-medium" type="text" id="noteTitle"><br><label class="ds">Carbs: </label> <input placeholder = "Grams of Carbs" id = "carbs" class="input is-medium" type="text" id="noteTitle">');
    }else if (opt == "Workout") {
        $('#msgbox').html('<br> <label  class="ds">Number of Sets: </label> <input  placeholder = "Number of sets" id = "sets" class="input is-medium" type="text" id="noteTitle">');
    }else if(opt == "0"){
    $('#msgbox').html('')
    }
});

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const noteImage = document.querySelector('#noteImage');

  const select = document.querySelector('#select');
  const noteLabel = select.options[select.selectedIndex];
  console.log(noteLabel.value)

    
}
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    image: noteImage.value,
    label: noteLabel.value
  })
     
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    noteImage.value = '';
    noteLabel.value = '';
  });


