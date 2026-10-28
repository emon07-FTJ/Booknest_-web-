const submissionList = document.getElementById("my-submission-list") || document.getElementById("submission-list");

const getClient = () => window.supabaseClient || (typeof supabaseClient !== "undefined" ? supabaseClient : null);

async function loadMySubmissions() {
    if (!submissionList) return;
    submissionList.innerHTML = "<p>Loading your submissions...</p>";

    const client = getClient();
    if (!client) {
        submissionList.innerHTML = "<p style='color:#b42318;'>Could not connect to database.</p>";
        return;
    }

    try {
        const { data: { user }, error: authError } = await client.auth.getUser();

        if (authError || !user) {
            submissionList.innerHTML = '<p>Please <a href="../login.html" style="color: #234b3c; font-weight: bold; text-decoration: underline;">log in</a> to view your submissions.</p>';
            return;
        }

        const { data, error } = await client
            .from("submissions")
            .select("*")
            .eq("author_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Load submissions error:", error);
            submissionList.innerHTML = `<p style="color:#b42318;">Could not load your submissions: ${error.message}</p>`;
            return;
        }

        submissionList.innerHTML = "";

        if (!data || data.length === 0) {
            submissionList.innerHTML = '<p>You haven\'t submitted any writing yet. <a href="submit-writing.html" style="color: #234b3c; font-weight: bold;">Submit your writing now →</a></p>';
            return;
        }

        data.forEach((submission) => {
            const card = document.createElement("article");
            card.className = "submission-card";
            card.style.border = "1px solid #e0e0e0";
            card.style.borderRadius = "8px";
            card.style.padding = "16px";
            card.style.marginBottom = "14px";
            card.style.background = "#fafafa";

            const title = document.createElement("h3");
            title.textContent = submission.title;
            title.style.marginTop = "0";

            const category = document.createElement("p");
            category.innerHTML = "<strong>Category:</strong> " + submission.category;

            const status = document.createElement("p");
            const statusColor = submission.status === "Accepted" ? "#247342" : (submission.status === "Declined" ? "#b42318" : "#b54708");
            status.innerHTML = `<strong>Status:</strong> <span style="font-weight: bold; color: ${statusColor};">${submission.status || 'Pending'}</span>`;

            const date = document.createElement("p");
            date.style.fontSize = "0.85rem";
            date.style.color = "#666";
            date.textContent = "Submitted: " + (submission.created_at ? new Date(submission.created_at).toLocaleDateString() : "Recently");

            const content = document.createElement("p");
            content.style.whiteSpace = "pre-line";
            content.textContent = submission.content;

            card.append(title, category, status, date, content);
            submissionList.appendChild(card);
        });
    } catch (err) {
        console.error("Unexpected error loading submissions:", err);
        submissionList.innerHTML = `<p style="color:#b42318;">Unexpected error: ${err.message || err}</p>`;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadMySubmissions);
} else {
    loadMySubmissions();
}