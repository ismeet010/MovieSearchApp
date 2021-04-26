const API_KEY = "d0cec9930b3f4883c20b68867de4585b";

//Moviedb API
const SEARCHAPI= "https://api.themoviedb.org/3/search/movie?&api_key="+API_KEY+ "&query=";

//Moviedb api image link
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


const searchPage = document.getElementById("search-page");
const searchResult = document.getElementById("search-result");
const btn = document.getElementById("btn");
const form = document.getElementById("form");
const search = document.getElementById("search");
const results = document.getElementById("results");
const offlinePage = document.getElementById("offline-page");
const searchTitle = document.getElementById("search-title");
const message = document.getElementById("message");
const detailsPage = document.getElementById("details-page");
const cardName = document.getElementById("card-name");
const title = document.getElementById("title");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const date = document.getElementById("date");
const img = document.getElementById("card-img");
const description = document.getElementById("description");
const body = document.getElementById("body");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleEvents();
})

function handleEvents(){
    if(window.navigator.onLine){
        searchResult.style.display="block";
        searchPage.style.display="none";
        const title= search.value;
        if(title){
            searchTitle.innerText = title;
            showMovies(SEARCHAPI+title);
            search.value=""
        }else{
            searchTitle.innerText="No Title";
            searchPage.style.display="none";
            offlinePage.style.display="flex";
            message.innerHTML="Type something to search";
        }
    }else{
        searchPage.style.display="none";
        offlinePage.style.display="flex"
    }
}
function showMovies(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        if(data.results.length){
            data.results.forEach(element=>{
                if(element.poster_path){
                    const el= document.createElement('div')
                    const img= document.createElement('img');
                    const text= document.createElement('p');

                    text.innerHTML = `${element.title}`;
                    img.src=IMAGE_URL + element.poster_path;
                    el.appendChild(img);
                    el.appendChild(text);
                    el.onclick=()=>showDetails(element);
                    results.appendChild(el);
                }
            });
        }
        else{
            searchTitle.innerHTML= "No Results Found";
            searchPage.style.display="none";
            offlinePage.style.display="flex";
            message.innerHTML= "Sorry, no results found";
        }
    })

}

function showDetails(element){
    body.style.overflow="hidden";
    detailsPage.style.display="flex";
    img.src= IMAGE_URL+element.poster_path;
    title.innerHTML = `${element.title}`;
    cardName.innerHTML= `${element.title}`;
    date.innerHTML= `${element.release_date}`;
    rating.innerHTML= `${element.vote_average}`;
    description.innerHTML=`${element.overview}`;
    language.innerHTML=`${element.original_language}`;
}

function handleBack(){
    location.reload();
}

function handleClose(){
    detailsPage.style.display="none";
    body.style.overflow="auto";
}