document.addEventListener("DOMContentLoaded", function(){
    const accountSettingForm = document.getElementById("account-setting-form")

    accountSettingForm?.addEventListener("submit", (event) => {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const dob = document.getElementById("dob").value;
        const pronoun = document.getElementById("pronoun").value;
        const receiveNewsletter = document.getElementById("receive-newsletter").value;

        localStorage.setItem("username", username);
        localStorage.setItem("dob",dob);
        localStorage.setItem("pronoun",pronoun);
        localStorage.setItem("receiveNewsletter", receiveNewsletter);

        // document.getElementById(username).insertAdjacentHTML("beforeend", `${username}`);

        alert("Successfully saved changes");
        window.location.href = "/IHDs-User.html";
    })
})