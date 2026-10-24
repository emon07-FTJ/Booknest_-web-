const submissionList = document.getElementById("submission-list");

function getSubmissions() {
    try {
        const data = JSON.parse(
            localStorage.getItem("booknestSubmissions") || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}

function saveSubmissions(submissions) {
    localStorage.setItem(
        "booknestSubmissions",
        JSON.stringify(submissions)
    );
}

function updateStatus(id, newStatus) {
    const submissions = getSubmissions();

    const updatedSubmissions = submissions.map(function (submission) {
        if (submission.id === id) {
            return {
                ...submission,
                status: newStatus
            };
        }

        return submission;
    });

    saveSubmissions(updatedSubmissions);
    displaySubmissions();
}

function displaySubmissions() {
    const submissions = getSubmissions();

    submissionList.replaceChildren();

    if (submissions.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No writing submissions yet.";
        submissionList.appendChild(emptyMessage);
        return;
    }

    submissions.forEach(function (submission) {
        const card = document.createElement("article");
        card.className = "submission-card";

        const title = document.createElement("h3");
        title.textContent = submission.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + submission.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + submission.category;

        const status = document.createElement("span");
        status.className = "status";

        if (submission.status === "Accepted") {
            status.classList.add("accepted");
        } else if (submission.status === "Declined") {
            status.classList.add("declined");
        }

        status.textContent = "Status: " + submission.status;

        const content = document.createElement("p");
        content.className = "submission-content";
        content.textContent = submission.content;

        card.append(title, author, category, status, content);

        if (submission.status === "Pending") {
            const actions = document.createElement("div");
            actions.className = "actions";

            const acceptButton = document.createElement("button");
            acceptButton.className = "accept-btn";
            acceptButton.textContent = "Accept";

            acceptButton.addEventListener("click", function () {
                updateStatus(submission.id, "Accepted");
            });

            const declineButton = document.createElement("button");
            declineButton.className = "decline-btn";
            declineButton.textContent = "Decline";

            declineButton.addEventListener("click", function () {
                updateStatus(submission.id, "Declined");
            });

            actions.append(acceptButton, declineButton);
            card.appendChild(actions);
        }

        submissionList.appendChild(card);
    });
}

displaySubmissions();