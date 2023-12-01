import app from "./IHDs-Common.js";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const database = getDatabase(app);
const postRef = query(
  ref(database, "posts"),
  orderByChild("time")
);
onValue(postRef, (snapshot) => {
  const data = snapshot.val();
  document.querySelector("#polaroid-display").innerHTML = "";
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      document.querySelector("#polaroid-display").innerHTML += `
        <a class="post" href="/IHDs-Blog.html?id=${key}" class="no-underline">
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
