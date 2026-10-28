const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const normalizeEmail = (value = "") => value.trim().toLowerCase();

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = normalizeEmail(document.getElementById("loginEmail").value);
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        loginMessage.textContent = "Please fill in all fields.";
        loginMessage.className = "message error";
        return;
    }

    loginMessage.textContent = "Logging in...";
    loginMessage.className = "message";

    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error(error);
            loginMessage.textContent = error.message || "Login failed. Please check your credentials.";
            loginMessage.className = "message error";
            return;
        }

        const isAdmin = typeof window.isAdminEmail === "function" && window.isAdminEmail(email);
        if (isAdmin) {
            loginMessage.textContent = "👑 Admin login verified! Redirecting to Homepage...";
        } else {
            loginMessage.textContent = "Login successful! Redirecting to homepage...";
        }
        loginMessage.className = "message success";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);
    } catch (err) {
        console.error(err);
        loginMessage.textContent = "Something went wrong. Please try again.";
        loginMessage.className = "message error";
    }
});
