let googleUser;

window.onload = (event) => {
    // Use this to retain user state between html pages.

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
        } else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
};

$('#select').change(function () {
    opt = $(this).val();
    if (opt == "Diet") {
        $('#msgbox').html('<br><label  class="ds">Protein: </label> <input placeholder = "Grams of protein" id = "protein" class="input is-medium" type="text" id="noteTitle"><br><label class="ds">Fat: </label> <input  placeholder = "Grams of Fat" id = "fat" class="input is-medium" type="text" id="noteTitle"><br><label class="ds">Carbs: </label> <input placeholder = "Grams of Carbs" id = "carbs" class="input is-medium" type="text" id="noteTitle">');
    } else if (opt == "Workout") {
        $('#msgbox').html('<br> <label  class="ds">Number of Sets: </label> <input  placeholder = "Number of sets" id = "sets" class="input is-medium" type="text" id="noteTitle">');
    } else if (opt == "0") {
        $('#msgbox').html('')
    }
});

const checkIfValid = () => {
    const select = document.querySelector('#select');
    if (select.selectedIndex === 0) {
        alert("Select a category");
    } else {
        try {
            document.querySelector('#noteTitle').value;
            document.querySelector('#noteText').value;
            if (select.selectedIndex === 2) {
                document.querySelector('#sets').value;
            }
            else {
                document.querySelector('#protein').value;
                document.querySelector('#carbs').value;
                document.querySelector('#fat').value;
            }
            handleNoteSubmit();
        } catch (error) {
            console.log(error);
            alert("you left one(or more) fields empty")
        }
    }
}

const handleNoteSubmit = () => {
    // 1. Capture the form data
    const noteTitle = document.querySelector('#noteTitle');
    const noteText = document.querySelector('#noteText');
    var protein = document.querySelector('#protein')
    var carbs = document.querySelector('#carbs')
    var fat = document.querySelector('#fat')
    var sets = document.querySelector('#sets')

    if (select.selectedIndex === 2) {
        protein = ""
        carbs = ""
        fat = ""
        sets = sets.value

    }
    else {
        sets = ""
        protein = protein.value
        fat = fat.value
        carbs = carbs.value
    }
    const noteLabel = select.options[select.selectedIndex];
    console.log(select.selectedIndex)


    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: noteTitle.value,
        text: noteText.value,
        label: noteLabel.value,
        protein: protein,
        carbs: carbs,
        fat: fat,
        sets: sets
    })




        // 3. Clear the form so that we can write a new note
        .then(() => {
            if (select.selectedIndex === 1) {
                protein.value = "";
                carbs.value = "";
                fat.value = "";
                noteTitle.value = "";
                noteText.value = "";
                noteText.value = "";
                select.selectedIndex = null;
            }
            else if (select.selectedIndex === 2) {
                sets.value = "";
                noteTitle.value = "";
                noteText.value = "";
                noteText.value = "";
                select.selectedIndex = null;
            }


        });
    $('#msgbox').html('')
    
}
