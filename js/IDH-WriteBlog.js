import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref as dbRef,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import app from "./IDH-Common.js";

const auth = getAuth(app);
const database = getDatabase(app);

// Thumbnail ------------------------------------------------------------------
const storage = getStorage(app);
const dropzone = document.getElementById("dropzone-file");
dropzone?.addEventListener("change", (e) => {
  const [file] = dropzone.files;
  if (file) {
    const url = URL.createObjectURL(file);
    dropzone.parentElement.style.backgroundImage = `url('${url}')`;
    dropzone.parentElement.style.backgroundSize = `cover`;
    dropzone.parentElement.style.backgroundPosition = `center`;
    dropzone.parentElement.style.backgroundRepeat = `no-repeat`;
  }
});

// Editor ---------------------------------------------------------------------
const editor = new EditorJS({
  holder: "editor",
  placeholder: "Let`s write an awesome story!",
  tools: {
    header: {
      class: Header,
    },
    image: SimpleImage,
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    embed: Embed,
    quote: Quote,
  },
});

// Upload ---------------------------------------------------------------------
const saveButton = document.getElementById("save");
saveButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const title = document.getElementById("first_name").value;
  const thumbnail = document.getElementById("dropzone-file").files[0];
  const content = await editor.save();
  if (title.trim() === "" || !thumbnail || content.blocks.length === 0) {
    Toastify({
      text: "Please fill all fields",
      duration: 3000,
      style: {
        background: "red",
        color: "rgb(255, 255, 255)",
      },
    }).showToast();
    return;
  }

  const storageRef = ref(storage, `${thumbnail.name}`);
  await uploadBytes(storageRef, thumbnail).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      const currentUser = auth.currentUser;

      const data = {
        title,
        thumbnail: url,
        content,
        uid: currentUser.uid,
      };

      const postListRef = dbRef(database, "/posts");
      console.log(postListRef);
      const newPostRef = push(postListRef);
      set(newPostRef, data).then(() => {
        Toastify({
          text: "Post successfully",
          duration: 3000,
          style: {
            background: "rgb(252, 232, 57)",
            color: "rgb(0, 0, 0)",
          },
          callback: function () {
            window.location.href = "/IDH-User.html";
          },
        }).showToast();
      });
    });
  });
});
