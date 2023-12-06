"use strict";

// ************ LOADER *******************
// function loaderAnimations() {

window.addEventListener("load", () => {
    let loadingDiv = document.getElementById("loadingDiv")
    let body = document.getElementById("body")
    body.style.visibility = "hidden"
    loadingDiv.style.visibility = "visible"
})

// }
function removeLoader() {
    let body = document.getElementById("body")
    let loadingDiv = document.getElementById("loadingDiv")
    loadingDiv.remove();
    body.style.visibility = "visible"
}

// *******************************************************************************************************

// *********** POPULATING MOVIE CARDS ON HTML **************
const loadMovies = async () => {
    try {
        const allMoviesUrl = "http://localhost:3000/movies";
        const moviesResp = await fetch(allMoviesUrl);
        const movieData = await moviesResp.json();
        console.log(moviesResp.status)
        console.log(movieData);
        let moviesHTML = movieData.map(movie => {
            //language=html
            return `
                <section class="d-flex col-12 col-sm-6 col-lg-4 col-xl-4 col-xxl-2 mx-auto mt-2">
                    <div class="card mx-auto px-2" style="width: 100%;" id="cardId">
                        <h5 class="card-title" id="movie-title">${movie.title}</h5>
                        <img src="${movie.poster}" class="card-img-top mx-auto" style="width: 80%; height: 80%"
                             alt="...">
                        <div class="card-body">
                            <p class="card-text" id="movie-dir"><b>Director:</b> ${movie.director}</p>
                            <p class="card-text" id="movie-year"><b>Year:</b> ${movie.year}</p>
                            <div class="d-flex justify-content-evenly">
                                <button type="button" class="edit btn" id="editBtn"
                                        style="color: white; background-color: darkslategray" data-bs-toggle="modal"
                                        data-bs-target="#myModal" onclick="popUpModal(${movie.id})">Edit
                                </button>
                                <button type="button" class="movieDetails btn" id="movieDetailsBtn"
                                        style="color: white; background-color: darkslategray" data-bs-toggle="modal"
                                        data-bs-target="#movieDetailsModal" onclick="movieDetailsModal(${movie.id})">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </section>`
        })
        document.getElementById("movie-cards").innerHTML = moviesHTML.join("");

    } catch (error) {
        console.log(error);
        document.getElementById("movie-cards").innerHTML = `<p style="color: white; font-size: 30px" class="d-flex justify-content-center">Umm.... Something went wrong! Our techs are working on it. Please try again later.</p>`;

    } finally {
        removeLoader();
    }
}

// ********** CALLING loadMovies FOR INITIAL LOADING OF MOVIES ************
loadMovies();