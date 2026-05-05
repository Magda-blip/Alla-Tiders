// 1. HÄMTA ELEMENT (DOM)
const articlesContainer = document.getElementById("articles");
const form = document.getElementById("articleForm");

// 2. DATA


// 3. FUNKTIONER
function saveArticles() {
    localStorage.setItem("articles", JSON.stringify(articles));
}

function loadArticles() {
    const data = localStorage.getItem("articles");

    if (data) {
        articles = JSON.parse(data);
    } else {
        // första gången → spara dina startartiklar
        saveArticles();
    }
}

function renderArticles() {
    articlesContainer.innerHTML = "";

    articles.forEach(article => {
        const articleElement = document.createElement("article");

        articleElement.innerHTML = `
            ${article.image ? `<img src="${article.image}" class="mb-2">` : ""}

            <h2 class="text-3xl font-serif font-bold mb-2">
                ${article.title}
            </h2>

            <p class="text-gray-700">
                ${article.content.substring(0, 60)}
            </p>
        `;

        articlesContainer.appendChild(articleElement);
    });
}


// 4. EVENT LISTENERS
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;
    const newArticle = {
        id: Date.now(),
        title: title,
        content: content

    };



    articles.push(newArticle);

    saveArticles();
    renderArticles();

    form.reset();
});



// 5. STARTA APPEN
loadArticles();
renderArticles();