window.onload = event => {
      // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      window.location = 'index.html';
    }
  });
}

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(document.querySelector("#app").innerHTML);
      document.querySelector("#app").innerHTML = renderDataAsHtml(data);
  });
}

const renderDataAsHtml = (data) => {
    let cards = ``;
    for (const noteItem in data) {
        const note = data[noteItem];
        console.log(note);
        cards += createCard(note);
    }
    return cards;
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
    `;
}