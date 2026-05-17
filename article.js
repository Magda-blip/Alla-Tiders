//  GET ARTICLE ID FROM URL
const params = new URLSearchParams(window.location.search);
const articleId = Number(params.get("id"));

//  GET ARTICLES FROM LOCALSTORAGE
const articles = JSON.parse(localStorage.getItem("articles")) || [];
const article = articles.find(a => a.id === articleId);

//  DISPLAY ARTICLE
const articleContent = document.getElementById("articleContent");

if (article) {
    articleContent.innerHTML = `
        ${article.image ? `<img src="${article.image}" class="w-full mb-4">` : ""}
        <h1 class="text-4xl font-serif font-bold mb-2">${article.title}</h1>
        <p class="text-gray-500 text-sm mb-4">${article.date}</p>
        <p class="text-gray-800 leading-relaxed">${article.content}</p>
    `;
} else {
    articleContent.innerHTML = "<p>Artikeln hittades inte.</p>";
}

//  LIKES & DISLIKES
const likesKey = `likes_${articleId}`;
const dislikesKey = `dislikes_${articleId}`;

let likes = Number(localStorage.getItem(likesKey)) || 0;
let dislikes = Number(localStorage.getItem(dislikesKey)) || 0;

const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");

likeCount.textContent = likes;
dislikeCount.textContent = dislikes;

document.getElementById("likeBtn").addEventListener("click", function () {
    likes++;
    localStorage.setItem(likesKey, likes);
    likeCount.textContent = likes;
});

document.getElementById("dislikeBtn").addEventListener("click", function () {
    dislikes++;
    localStorage.setItem(dislikesKey, dislikes);
    dislikeCount.textContent = dislikes;
});

//  COMMENTS
const commentsKey = `comments_${articleId}`;
let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

function renderComments() {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";

    comments.forEach(comment => {
        const div = document.createElement("div");
        div.className = "border-b pb-3";
        div.innerHTML = `
            <p class="text-sm text-gray-500">${comment.date}</p>
            <p>${comment.text}</p>
        `;
        commentsList.appendChild(div);
    });
}

document.getElementById("commentBtn").addEventListener("click", function () {
    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    if (!text) return;

    const newComment = {
        text: text,
        date: new Date().toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    };

    comments.push(newComment);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    renderComments();
    input.value = "";
});

// 6. START APP
renderComments();