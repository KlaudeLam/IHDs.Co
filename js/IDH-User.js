import app from "./IDH-Common.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    document.getElementById("display-name").innerHTML = user.displayName;
    document.getElementById(
      "avatar"
    ).style.backgroundImage = `url('${user.photoURL}')`;

    const database = getDatabase(app);
    const postRef = query(
      ref(database, "posts"),
      orderByChild("uid"),
      equalTo(auth.currentUser.uid)
    );
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      document.querySelector("#polaroid-display").innerHTML = "";
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          document.querySelector("#polaroid-display").innerHTML += `
            <a class="post" href="/IDH-Blog.html?id=${key}" class="no-underline">
              <img
                src="${element.thumbnail}"
                alt=""
              />
              <div class="caption text-black">
                ${element.title}
              </div>
            </a>
          `;
        }
      }
    });
  }
});
