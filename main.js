// GET ELEMENTS (DOM)
const articlesContainer = document.getElementById("articles");
const form = document.getElementById("articleForm");

// DATA
let articles = [];

// FUNKTIONS
function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
}

function loadArticles() {
    const data = localStorage.getItem("articles");
    if (data) {
        articles = JSON.parse(data);
    } else {
        saveArticles();
    }
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-50";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function deleteArticle(id) {
    articles = articles.filter(article => article.id !== id);
    saveArticles();
    renderArticles();
    showToast("Artikel raderad!");
}

function renderArticles() {
    articlesContainer.innerHTML = "";

    articles.forEach(article => {
        const articleElement = document.createElement("article");
        articleElement.className = "border-b pb-4";

        articleElement.innerHTML = `
            ${article.image ? `<img src="${article.image}" class="mb-2 w-full object-cover">` : ""}

            <h2 class="text-3xl font-serif font-bold mb-2 cursor-pointer hover:underline" 
                onclick="window.location.href='article.html?id=${article.id}'">
                ${article.title}
            </h2>

            <p class="text-gray-500 text-sm mb-1">${article.date}</p>

            <p class="text-gray-700">
                ${article.content.substring(0, 60)}${article.content.length > 60 ? "..." : ""}
            </p>

            <button onclick="deleteArticle(${article.id})" 
                class="mt-2 text-sm text-red-600 hover:underline">
                Radera
            </button>
        `;

        articlesContainer.appendChild(articleElement);
    });
}

// EVENT LISTENERS
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;

    const newArticle = {
        id: Date.now(),
        title: title,
        content: content,
        image: image,
        date: new Date().toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    };

    articles.push(newArticle);
    saveArticles();
    renderArticles();
    showToast("Artikel skapad!");
    form.reset();
});

// START APP
loadArticles();
renderArticles();