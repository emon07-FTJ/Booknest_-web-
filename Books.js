const books = [
    {
        id: 1,
        title: "The Secret Garden",
        author: "Frances Hodgson Burnett",
        category: "Fiction",
        year: 1911,
        description: "A classic story about a hidden garden and friendship."
    },
    {
        id: 2,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        category: "Fantasy",
        year: 1997,
        description: "A young wizard discovers a new world of magic."
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        year: 1988,
        description: "An introduction to questions about the universe."
    },
    {
        id: 4,
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        category: "History",
        year: 1947,
        description: "A historical diary written during World War II."
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        category: "Fantasy",
        year: 1937,
        description: "A fantasy adventure about a hobbit and a journey."
    },
    {
        id: 6,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Fiction",
        year: 1813,
        description: "A classic novel about relationships and society."
    }
];

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const clearButton = document.getElementById("clear-button");
const booksContainer = document.getElementById("books-container");
const emptyMessage = document.getElementById("empty-message");
const resultCount = document.getElementById("result-count");

function displayBooks(bookList) {
    booksContainer.innerHTML = "";

    resultCount.textContent =
        bookList.length + (bookList.length === 1 ? " book found" : " books found");

    emptyMessage.hidden = bookList.length !== 0;

    bookList.forEach(function (book) {
        const card = document.createElement("article");
        card.className = "book-card";

        const cover = document.createElement("div");
        cover.className = "book-cover";
        cover.textContent = book.title;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("p");
        category.className = "book-category";
        category.textContent = "Category: " + book.category;

        const year = document.createElement("p");
        year.textContent = "Publication Year: " + book.year;

        const description = document.createElement("p");
        description.textContent = book.description;

        card.appendChild(cover);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(category);
        card.appendChild(year);
        card.appendChild(description);

        booksContainer.appendChild(card);
    });
}

function filterBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(function (book) {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks);
}

searchInput.addEventListener("input", filterBooks);
categoryFilter.addEventListener("change", filterBooks);

clearButton.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "All";
    filterBooks();
});

displayBooks(books);