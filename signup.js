const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

const normalizeEmail = (value = "") => value.trim().toLowerCase();

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const email = normalizeEmail(document.getElementById("signupEmail").value);
    const password = document.getElementById("signupPassword").value;

    if (username === "" || email === "" || password === "") {
        signupMessage.textContent = "Please fill in all fields.";
        signupMessage.className = "message error";
        return;
    }

    if (password.length < 6) {
        signupMessage.textContent = "Password must be at least 6 characters.";
        signupMessage.className = "message error";
        return;
    }

    if (!window.supabaseClient) {
        signupMessage.textContent = "Database connection error. Please check your internet connection or Supabase config.";
        signupMessage.className = "message error";
        return;
    }

    signupMessage.textContent = "Creating account...";
    signupMessage.className = "message";

    try {
        const { data, error } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) {
            console.error("Supabase SignUp Error:", error);
            signupMessage.textContent = error.message || "Sign up failed. Please try again.";
            signupMessage.className = "message error";
            return;
        }

        // Supabase returns an empty identities array if user is already registered
        if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            signupMessage.textContent = "An account with this email already exists. Please login instead.";
            signupMessage.className = "message error";
            return;
        }

        // When "Confirm Email" is enabled in Supabase dashboard
        if (data && data.user && !data.session) {
            signupMessage.textContent = "Check your email for confirmation link, or disable 'Confirm email' in Supabase dashboard.";
            signupMessage.className = "message success";
            signupForm.reset();
            return;
        }

        // If session is active (email confirmation is disabled)
        if (data && data.user) {
            try {
                await window.supabaseClient.from("profiles").upsert({
                    id: data.user.id,
                    user_id: data.user.id,
                    email: email,
                    username: username,
                    full_name: username
                }, { onConflict: "id" });
            } catch (pErr) {
                console.warn("Profile table insert:", pErr);
            }
        }

        signupMessage.textContent = "Account created successfully! Redirecting to login...";
        signupMessage.className = "message success";
        signupForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    } catch (err) {
        console.error("SignUp Exception:", err);
        signupMessage.textContent = "Error: " + (err.message || "Something went wrong.");
        signupMessage.className = "message error";
    }
});