import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

import app from "./isLogin.js";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  // syntax loginForm? = if loginForm exists
  loginForm?.addEventListener("submit", (event) => {

    event.preventDefault();

    const usermail = document.getElementById("usermail").value;
    const password = document.getElementById("password").value;

    const registeredUsermail = localStorage.getItem("usermail");
    const registeredPassword = localStorage.getItem("password");

    if (usermail !== registeredUsermail || password !== registeredPassword) {
      alert("Incorrect usermail or password");
      return;
    }

    localStorage.setItem("isLogin", true);
    alert("Successfully log in");
    window.location.href = "/IDH-User.html";
  });

  const logInWithGoogle = document.getElementById("google-log-in");

  logInWithGoogle?.addEventListener("click", (event) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  })
});