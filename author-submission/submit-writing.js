const form = document.getElementById("submission-form");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const getClient = () => window.supabaseClient || (typeof supabaseClient !== "undefined" ? supabaseClient : null);

// Auto-fill author if logged in
async function checkAuthAndPrefill() {
    try {
        const client = getClient();
        if (!client) return;

        const { data: { user } } = await client.auth.getUser();
        if (user) {
            const authorInput = document.getElementById("author");
            if (authorInput && !authorInput.value) {
                authorInput.value = user.user_metadata?.username || user.email?.split("@")[0] || "";
            }
        }
    } catch (e) {
        console.error("Auth check error:", e);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAuthAndPrefill);
} else {
    checkAuthAndPrefill();
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const client = getClient();
    if (!client) {
        message.textContent = "Supabase client not loaded. Please check your internet connection.";
        message.style.color = "#b42318";
        return;
    }

    const author = document.getElementById("author").value.trim();
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value.trim();

    if (!author || !title || !category || content.length < 20) {
        message.textContent =
            "Please complete all fields. Writing must be at least 20 characters.";
        message.style.color = "#b42318";
        return;
    }

    message.textContent = "Checking login status...";
    message.style.color = "#444";

    try {
        const { data: { user }, error: authError } = await client.auth.getUser();

        if (authError || !user) {
            message.innerHTML = 'You must be logged in to submit writing. <a href="../login.html" style="color: #b42318; font-weight: bold; text-decoration: underline;">Click here to Login</a>';
            message.style.color = "#b42318";
            return;
        }

        message.textContent = "Submitting your writing...";
        if (submitBtn) submitBtn.disabled = true;

        const { data, error } = await client
            .from("submissions")
            .insert({
                author_id: user.id,
                author_name: author,
                title: title,
                category: category,
                content: content,
                status: "Pending"
            })
            .select();

        if (error) {
            console.error("Submission failed:", error);
            message.textContent = "Submission failed: " + (error.message || "Please check your database table.");
            message.style.color = "#b42318";
            return;
        }

        message.innerHTML = '🎉 Your writing has been submitted successfully for Admin review! <a href="my-writing.html" style="color: #247342; font-weight: bold; text-decoration: underline;">View My Submissions →</a>';
        message.style.color = "#247342";

        form.reset();
        checkAuthAndPrefill();
    } catch (err) {
        console.error("Submission error:", err);
        message.textContent = "Error: " + (err.message || "Something went wrong.");
        message.style.color = "#b42318";
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
});