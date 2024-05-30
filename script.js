const API_KEY = "eb0d690e179647af93af30b9042f708a";
const baseURL = "https://newsapi.org/v2/everything";

async function fetchData(query) {
  const url = `${baseURL}?q=${query}&language=es&apiKey=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return { articles: [] }; // Return an empty array in case of an error
  }
}

fetchData("all").then(data => renderMain(data.articles));

// Menu button
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");

if (menuBtn && mobilemenu) {
  menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
  });
}

// Render news
function renderMain(arr) {
  let mainHTML = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += ` <div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} loading="lazy" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${arr[i].description}
                        </div>
                        </a>
                     </div>`;
    }
  }
  document.querySelector("main").innerHTML = mainHTML;
}

const searchForm = document.getElementById("searchForm");
const searchFormMobile = document.getElementById("searchFormMobile");
const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
  });
}

if (searchFormMobile && searchInputMobile) {
  searchFormMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInputMobile.value);
    renderMain(data.articles);
  });
}

async function search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}
