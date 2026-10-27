const form = document.getElementById("submission-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
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

    const { data: { user }, error: authError } =
        await supabaseClient.auth.getUser();

    if (authError || !user) {
        message.textContent = "Please log in before submitting your writing.";
        message.style.color = "#b42318";
        return;
    }

    const { error } = await supabaseClient
        .from("submissions")
        .insert({
            author_id: user.id,
            author_name: author,
            title: title,
            category: category,
            content: content
        });

    if (error) {
        console.error(error);
        message.textContent = "Submission failed. Please try again.";
        message.style.color = "#b42318";
        return;
    }

    message.textContent =
        "Your writing has been submitted successfully for Admin review!";
    message.style.color = "#247342";

    form.reset();
});