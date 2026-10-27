const submissionList = document.getElementById("submission-list");

async function loadSubmissions() {
    submissionList.textContent = "Loading submissions...";

    const { data, error } = await supabaseClient
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        submissionList.textContent = "Could not load submissions.";
        return;
    }

    submissionList.innerHTML = "";

    if (!data || data.length === 0) {
        submissionList.textContent = "No submissions found.";
        return;
    }

    data.forEach((submission) => {
        const card = document.createElement("article");
        card.className = "submission-card";

        const title = document.createElement("h3");
        title.textContent = submission.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + submission.author_name;

        const category = document.createElement("p");
        category.textContent = "Category: " + submission.category;

        const status = document.createElement("p");
        status.textContent = "Status: " + submission.status;

        const content = document.createElement("p");
        content.textContent = submission.content;

        card.append(title, author, category, status, content);

        if (submission.status === "Pending") {
            const acceptButton = document.createElement("button");
            acceptButton.textContent = "Accept";
            acceptButton.addEventListener("click", () => {
                updateStatus(submission.id, "Accepted");
            });

            const declineButton = document.createElement("button");
            declineButton.textContent = "Decline";
            declineButton.addEventListener("click", () => {
                updateStatus(submission.id, "Declined");
            });

            card.append(acceptButton, declineButton);
        }

        submissionList.appendChild(card);
    });
}

async function updateStatus(id, newStatus) {
    const { error } = await supabaseClient
        .from("submissions")
        .update({ status: newStatus })
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Could not update status. Check admin permissions.");
        return;
    }

    loadSubmissions();
}

loadSubmissions();