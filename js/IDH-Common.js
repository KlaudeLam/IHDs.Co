// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRnpQxfKCQEKHALkTbouIapSss_L6N-cI",
  authDomain: "idhco-c0614.firebaseapp.com",
  databaseURL: "https://idhco-c0614-default-rtdb.firebaseio.com",
  projectId: "idhco-c0614",
  storageBucket: "idhco-c0614.appspot.com",
  messagingSenderId: "162374943476",
  appId: "1:162374943476:web:030f7995a6141aeb5fd4a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

const routeMeta = [
  {
    route: "/IDH-Login.html",
    requireAuth: false, //can dang nhap: ko can
    requireGuest: true, //can la guest = can (dang nhap thi ko the access trang nay nua)
  },
  {
    route: "/IDH-Signup.html",
    requireAuth: false, //can dang nhap: ko can
    requireGuest: true, //can la guest = can (dang nhap thi ko the access trang nay nua)
  },
  {
    route: "/IDH-AccountSetting.html",
    requireAuth: true, 
  },
  {
    route: "/IDH-WriteBlog.html",
    requireAuth: true, 
  },
  {
    route: "/IDH-User.html",
    requireAuth: true,
  },
  {
    route: "/IDH-AboutUs.html",
    requireAuth: false, //can dang nhap: ko can
  },
  {
    route: "/IDH-HappinessBlogspot.html",
    requireAuth: false, //can dang nhap: ko can
  },
  {
    route: "/IDH-Homepage.html",
    requireAuth: false, //can dang nhap: ko can
  },
  {
    route: "/IDH-Blog.html",
    requireAuth: false, //can dang nhap: ko can
  },
];

function getRouteMeta() {
  const path = window.location.pathname;
  return routeMeta.find((r) => r.route == path);
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const meta = getRouteMeta();
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    if (meta?.requireGuest) {
      window.location.href = "/IDH-Homepage.html";
    }
  } else {
    // User is signed out
    if (meta?.requireAuth) {
      window.location.href = "/IDH-Login.html";
    }
  }
  stopLoading();
});

function stopLoading() {
  document.getElementById("loading").remove();

  document.body.classList.remove("is-loading");
}
