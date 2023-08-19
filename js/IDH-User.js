import app from "./IDH-Common.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    document.getElementById("display-name").innerHTML = user.displayName;
    document.getElementById(
      "avatar"
    ).style.backgroundImage = `url('${user.photoURL}')`;
    console.log(user);
  }
});
