// if signed-up --> set receiveNewsletter=True
document.addEventListener("DOMContentLoaded", function() {

    const newsletterForm = document.getElementById("newsletter"); 
    
    newsletterForm?.addEventListener("submit", (event) => {

        event.defaultPrevented();

        const username = document.getElementById("username").value;
        const usermail = document.getElementById("usermail").value;
        
        alert("Successfully signed up for newsletter");
        localStorage.setItem("username", username);
        localStorage.setItem("usermail", usermail);
        localStorage.setItem("receiveNewsletter", "on");
    })
})