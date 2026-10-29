const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const normalizeEmail = (value = "") => value.trim().toLowerCase();

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem("booknestUser") || "null");
    } catch (error) {
        console.error("Failed to read current user:", error);
        return null;
    }
};

const getSavedUsers = () => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem("booknestUsers") || "[]");
        const currentUser = getCurrentUser();

        if (Array.isArray(storedUsers) && storedUsers.length) {
            return storedUsers;
        }

        return currentUser ? [currentUser] : [];
    } catch (error) {
        console.error("Failed to read saved users:", error);
        return [];
    }
};

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = normalizeEmail(document.getElementById("loginEmail").value);
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        loginMessage.textContent = "Please fill in all fields.";
        loginMessage.className = "message error";
        return;
    }

    const savedUsers = getSavedUsers();
    const matchedUser = savedUsers.find(
        (user) =>
            normalizeEmail(user.email || "") === email &&
            String(user.password || "") === String(password)
    );

    if (matchedUser) {
        const currentUser = getCurrentUser();
        const profileFields = ["username", "phone", "location", "genre", "bio", "readingGoal"];
        const userToSave = { ...matchedUser };

        if (normalizeEmail(currentUser?.email || "") === email) {
            profileFields.forEach((field) => {
                if (Object.prototype.hasOwnProperty.call(currentUser, field)) {
                    userToSave[field] = currentUser[field];
                }
            });

            const userIndex = savedUsers.findIndex(
                (user) => normalizeEmail(user.email || "") === email
            );
            savedUsers[userIndex] = userToSave;
            localStorage.setItem("booknestUsers", JSON.stringify(savedUsers));
        }

        localStorage.setItem("booknestUser", JSON.stringify(userToSave));
        loginMessage.textContent = "Login successful! Redirecting to homepage...";
        loginMessage.className = "message success";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);
    } else {
        loginMessage.textContent =
            "Account not found. Please register first.";
        loginMessage.className = "message error";
    }
});