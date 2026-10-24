const submissionList = document.getElementById("my-submission-list");

function displayMySubmissions() {
    let submissions = [];

    try {
        const savedData = localStorage.getItem("booknestSubmissions");
        submissions = JSON.parse(savedData || "[]");

        if (!Array.isArray(submissions)) {
            submissions = [];
        }
    } catch (error) {
        submissions = [];
    }

    submissionList.replaceChildren();

    if (submissions.length === 0) {
        const message = document.createElement("p");
        message.textContent = "You have not submitted any writing yet.";
        submissionList.appendChild(message);
        return;
    }

    submissions.slice().reverse().forEach(function (submission) {
        const card = document.createElement("div");
        card.className = "submission-card";

        const title = document.createElement("h3");
        title.textContent = submission.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + submission.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + submission.category;

        const status = document.createElement("p");
        status.className = "status";

        const currentStatus = submission.status || "Pending";
        status.textContent = "Status: " + currentStatus;

        if (currentStatus === "Accepted") {
            status.classList.add("accepted");
        } else if (currentStatus === "Declined") {
            status.classList.add("declined");
        }

        const contentHeading = document.createElement("h4");
        contentHeading.textContent = "Your Writing";

        const content = document.createElement("p");
        content.className = "submission-content";
        content.textContent = submission.content;

        card.append(
            title,
            author,
            category,
            status,
            contentHeading,
            content
        );

        submissionList.appendChild(card);
    });
}

displayMySubmissions();