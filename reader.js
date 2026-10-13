const pages = [
    {
        chapter: "Chapter One",
        content: "Mary Lennox was a lonely child who had spent most of her life in India. After a great change in her life, she travelled to a large house in the English countryside."
    },
    {
        chapter: "Chapter One",
        content: "The house was called Misselthwaite Manor. It had many rooms, long corridors and beautiful gardens. Mary found the place strange and full of mysteries."
    },
    {
        chapter: "Chapter Two",
        content: "One morning, Mary went outside and met a friendly gardener. He told her about the gardens and the birds that lived nearby."
    },
    {
        chapter: "Chapter Two",
        content: "Mary became curious about a hidden garden. Nobody seemed to visit it anymore, and its door had remained closed for many years."
    },
    {
        chapter: "Chapter Three",
        content: "Mary decided to learn more about the secret garden. She began exploring the grounds and hoped to discover the mystery behind the locked door."
    }
];

let currentPage = 0;

const chapterTitle = document.getElementById("chapter-title");
const pageContent = document.getElementById("page-content");
const pageNumber = document.getElementById("page-number");
const pageStatus = document.getElementById("page-status");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

function displayPage() {
    const page = pages[currentPage];

    chapterTitle.textContent = page.chapter;
    pageContent.textContent = page.content;

    pageNumber.textContent =
        `Page ${currentPage + 1} of ${pages.length}`;

    pageStatus.textContent =
        `${currentPage + 1} / ${pages.length}`;

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
}

previousButton.addEventListener("click", function () {
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
});

nextButton.addEventListener("click", function () {
    if (currentPage < pages.length - 1) {
        currentPage++;
        displayPage();
    }
});

displayPage();