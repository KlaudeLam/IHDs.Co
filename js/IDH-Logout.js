import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import app from "./IDH-Common.js";

const auth = getAuth(app);

const logoutBtn = document.querySelector("#logout-button > a");
logoutBtn?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});
