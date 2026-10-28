async function loadHomeBooks() {
    const grid = document.getElementById("bookGrid");
    if (!grid) return;

    try {
        if (!window.supabaseClient) return;

        const { data, error } = await window.supabaseClient
            .from("books")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            return;
        }

        if (!data || data.length === 0) return;

        grid.innerHTML = "";

        data.forEach((book) => {
            const article = document.createElement("article");
            article.className = "book-card";
            article.setAttribute("data-category", book.category || "Other");
            article.setAttribute("data-title", (book.title || "").toLowerCase());

            const cover = document.createElement("div");
            cover.className = "book-cover";

            const img = document.createElement("img");
            img.src = book.cover_url || "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80";
            img.alt = book.title || "Book cover";
            img.loading = "lazy";
            cover.appendChild(img);

            const heart = document.createElement("button");
            heart.className = "heart-btn";
            heart.setAttribute("aria-label", "Add to favourites");
            heart.setAttribute("aria-pressed", "false");
            heart.textContent = "♡";
            cover.appendChild(heart);

            const info = document.createElement("div");
            info.className = "book-info";

            const cat = document.createElement("span");
            cat.className = "book-category";
            cat.textContent = (book.category || "OTHER").toUpperCase();
            info.appendChild(cat);

            const title = document.createElement("h3");
            title.textContent = book.title || "Untitled";
            info.appendChild(title);

            const author = document.createElement("p");
            author.className = "book-author";
            author.textContent = book.author || "Unknown";
            info.appendChild(author);

            const bottom = document.createElement("div");
            bottom.className = "book-bottom";

            const rating = document.createElement("span");
            rating.className = "rating";
            rating.textContent = "★ " + (book.rating || 4.5);
            bottom.appendChild(rating);

            const details = document.createElement("button");
            details.className = "details-btn";
            details.setAttribute("data-id", book.id || "");
            details.setAttribute("data-title", book.title || "");
            details.setAttribute("data-author", book.author || "");
            details.setAttribute("data-description", book.description || "");
            details.textContent = "View Details ↗";
            bottom.appendChild(details);

            info.appendChild(bottom);
            article.appendChild(cover);
            article.appendChild(info);
            grid.appendChild(article);
        });

        // Re-bind events if script.js expects them
        if (typeof filterBooks === "function") {
            document.querySelectorAll(".heart-btn").forEach(button => {
                button.onclick = null;
            });
            document.querySelectorAll(".details-btn").forEach(button => {
                button.onclick = null;
            });
        }
    } catch (e) {
        console.error(e);
    }
}

loadHomeBooks();
