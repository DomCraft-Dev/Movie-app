//inputs & import==========================================================================
let inputText =document.getElementById("inputText");
let btnSearch =document.getElementById("btnSearch");
let moviesContainer =document.getElementById("moviesContainer");
let modal = document.getElementById("modal");
let modalContent =document.getElementById("modal-content");
let modalBody =document.getElementById("modal-body");
let closeModal = document.getElementById("close-modal");
const base_URL = "https://www.omdbapi.com/";
import { API_KEY } from "./config.js";
let movieData = "";

//function Search =========================================================================
async function getMovie(movie){
let url = `${base_URL}?s=${movie}&apikey=${API_KEY}`;
let res = await fetch(url);
let data =await res.json();

const {Search} = data;
if (!Search){
    moviesContainer.innerHTML = "<p>No movies Found</p>";
    return;
}
// ساخت HTML
const html = Search.map(m =>`<div class="movie-card" data-id="${m.imdbID}"><img src="${m.Poster}" alt="${m.Title}"><h3>${m.Title}</h3><p>${m.Year}</p></div>`).join("");
moviesContainer.innerHTML = html;
//Event برای هر کارت===================================================================================
document.querySelectorAll(".movie-card").forEach(card=>{
card.addEventListener("click", ()=>{
    const id = card.dataset.id;
    showMovieDetails(id);
    });
});
}
/*========================Detailes==================================================================*/
async function showMovieDetails(id) {
    let url = `${base_URL}?i=${id}&apikey=${API_KEY}`;
    let res = await fetch(url);
    let data =await res.json();

    const {Title , Year , Genre , Director , Plot , Poster , imdbRating} = data;
    modalBody.innerHTML = `
    <img src="${Poster}" alt="${Title}">
    <h2>${Title}</h2>
    <p><strong>سال:</strong> ${Year}</p>
    <p><strong>ژانر:</strong> ${Genre}</p>
    <p><strong>کارگردان:</strong> ${Director}</p>
    <p><strong>امتیاز:</strong> ⭐ ${imdbRating}</p>
    <p><strong>خلاصه:</strong> ${Plot}</p>
  `;
    modal.classList.remove("hidden");
}



/*========================Events==================================================================*/
btnSearch.addEventListener("click",function(){
movieData =inputText.value.trim();
if(!movieData) return;
getMovie(movieData);
});
inputText.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        movieData =inputText.value.trim();
if(!movieData) return;
    btnSearch.click();
    }
});
closeModal.addEventListener("click", ()=>{
    modal.classList.add("hidden");
});
modal.addEventListener("click", (e)=>{
    if(e.target === modal){
        modal.classList.add("hidden");
    }
})