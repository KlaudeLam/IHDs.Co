document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    
    // syntax registerForm? = if registerForm exists
    registerForm?.addEventListener("submit", (event) => {
        
        event.preventDefault();

        const usermail = document.getElementById("usermail").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
    
        if (password !== confirmPassword) {
            alert("Password and Confirm Password must be the same");
            return;
        }
    
        localStorage.setItem("usermail", usermail);
        localStorage.setItem("password", password);

        alert("Successfully sign up");
        window.location.href = "/IHDs-AccountSetting.html";
        });
});