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
import app from "./IHDs-Common.js";

const auth = getAuth(app);
const database = getDatabase(app);

// Thumbnail ------------------------------------------------------------------
// Preview thumbnail ngay lúc đăng bài
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
      class: EditorjsList,
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
// Tạo nút lưu (thiếu: sau khi nhấn post thì disable)
const saveButton = document.getElementById("save");
saveButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const title = document.getElementById("first_name").value;
  // Lấy thumbnail
  const thumbnail = document.getElementById("dropzone-file").files[0];
  // Lấy content
  const content = await editor.save();
  // Kiểm tra có mục nào chưa điền chưa (Toastify)
  if (title.trim() === "" || !thumbnail || content.blocks.length === 0) {
    // Cách dùng Toastify để tạo thông báo
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
  // Lưu ảnh theo syntax của firebase
  const storageRef = ref(storage, `${thumbnail.name}`);
  // uploadbytes đưa ảnh lên
  await uploadBytes(storageRef, thumbnail).then((snapshot) => {
    // Lấy link mà mình có thể xem ngay ảnh trên firebase (để mn đều xem đc ảnh)
    getDownloadURL(snapshot.ref).then((url) => {
      const currentUser = auth.currentUser;

      const data = {
        title,
        thumbnail: url,
        content,
        uid: currentUser.uid,
        name: currentUser.displayName,
        time: Date.now(),
      };

      const postListRef = dbRef(database, "/posts");
      console.log(postListRef);
      // push set: đưa dữ liệu lên realtime database
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
            window.location.href = "/IHDs-User.html";
          },
        }).showToast();
      });
    });
  });
});
