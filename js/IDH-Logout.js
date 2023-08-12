document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");
  
    logoutButton?.addEventListener("click", function () {
      
      localStorage.removeItem("isLogin");
      alert("Successfully log out");
      window.location.href = "/IDH-User.html";
    });
  });