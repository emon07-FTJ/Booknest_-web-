
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");

const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");

function showLogin() {
    loginForm.hidden = false;
    registerForm.hidden = true;

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
}

function showRegister() {
    loginForm.hidden = true;
    registerForm.hidden = false;

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    loginMessage.textContent = "";
    registerMessage.textContent = "";
}

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);

document.getElementById("open-register")
    .addEventListener("click", showRegister);

document.getElementById("open-login")
    .addEventListener("click", showLogin);

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    loginMessage.className = "message";

    if (!email || !password) {
        loginMessage.textContent = "Please fill in all fields.";
        loginMessage.classList.add("error");
        return;
    }

    if (password.length < 6) {
        loginMessage.textContent =
            "Password must contain at least 6 characters.";
        loginMessage.classList.add("error");
        return;
    }

    loginMessage.textContent =
        "Form validation successful. Real login requires a backend.";
    loginMessage.classList.add("success");
});

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword =
        document.getElementById("confirm-password").value;

    registerMessage.className = "message";

    if (!name || !email || !password || !confirmPassword) {
        registerMessage.textContent = "Please fill in all fields.";
        registerMessage.classList.add("error");
        return;
    }

    if (password.length < 6) {
        registerMessage.textContent =
            "Password must contain at least 6 characters.";
        registerMessage.classList.add("error");
        return;
    }

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        registerMessage.classList.add("error");
        return;
    }

    registerMessage.textContent =
        "Form validation successful. Account creation requires a backend.";
    registerMessage.classList.add("success");
});
