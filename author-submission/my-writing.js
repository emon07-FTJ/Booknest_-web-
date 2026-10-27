const submissionList = document.getElementById("submission-list");

async function loadMySubmissions() {
    submissionList.textContent = "Loading your submissions...";

    const { data: { user }, error: authError } =
        await supabaseClient.auth.getUser();

    if (authError || !user) {
        submissionList.textContent = "Please log in to view your submissions.";
        return;
    }

    const { data, error } = await supabaseClient
        .from("submissions")
        .select("*")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        submissionList.textContent = "Could not load your submissions.";
        return;
    }

    submissionList.innerHTML = "";

    if (!data || data.length === 0) {
        submissionList.textContent = "You haven't submitted any writing yet.";
        return;
    }

    data.forEach((submission) => {
        const card = document.createElement("article");
        card.className = "submission-card";

        const title = document.createElement("h3");
        title.textContent = submission.title;

        const category = document.createElement("p");
        category.textContent = "Category: " + submission.category;

        const status = document.createElement("p");
        status.textContent = "Status: " + submission.status;

        const content = document.createElement("p");
        content.textContent = submission.content;

        card.append(title, category, status, content);
        submissionList.appendChild(card);
    });
}

loadMySubmissions();