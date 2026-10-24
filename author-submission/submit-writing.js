const form = document.getElementById("submission-form");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    const submission = {
        id: Date.now(),
        author: author,
        title: title,
        category: category,
        content: content,
        status: "Pending"
    };

    let submissions = [];

    try {
        submissions = JSON.parse(
            localStorage.getItem("booknestSubmissions") || "[]"
        );

        if (!Array.isArray(submissions)) {
            submissions = [];
        }
    } catch (error) {
        submissions = [];
    }

    submissions.push(submission);

    localStorage.setItem(
        "booknestSubmissions",
        JSON.stringify(submissions)
    );

    message.textContent =
        "Your writing has been submitted successfully for Admin review!";
    message.style.color = "#247342";

    form.reset();
});