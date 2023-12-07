"use strict";

// ************ LOADER *******************
function loaderAnimations() {
    window.addEventListener("load", () => {
        let loadingDiv = document.getElementById("loadingDiv")
        let body = document.getElementById("body")
        body.style.visibility = "hidden"
        loadingDiv.style.visibility = "visible"
    })
}

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
                            <input id="movieId" value="${movie.id}">
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

// *********** WHEN EDIT BTN IS THIS FUNCTION IS TRIGGERED AND popUpModal FUNCTION IS CALLED ************

function popUpModal(id) {
    fetch(`http://localhost:3000/movies/${id}`)
        .then(resp => resp.json())
        .then(movieData => {
            console.log(movieData.id)
            // movieData.title
            populateEditModal(movieData);
            document.getElementById("saveEdits").addEventListener("click", function () {
                // e.preventDefault();
                console.log("line 60: " + movieData.id)

                fetch(`http://localhost:3000/movies/${movieData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            id: movieData.id,
                            title: document.getElementById("userEditedTitle").value,
                            director: document.getElementById("userEditedDir").value,
                            year: document.getElementById("userEditedYear").value,
                            actors: document.getElementById("userEditedActors").value,
                            plot: document.getElementById("userEditedPlot").value,
                            genre: document.getElementById("userEditedGenre").value,
                            rating: document.getElementById("userEditedRating").value,
                            poster: document.getElementById("userEditedPoster").value

                        }
                    )
                })
                    .then(resp => resp.json())
                    .then(movieData => console.log(movieData))
                    .catch(error => console.error(error));

                document.getElementById("myModal").modal('hide');
                clearEditModal();
                loadMovies();
            })
            document.getElementById("deleteMovie").addEventListener("click", function () {
                // e.preventDefault();
                deleteMovieById(movieData.id);
                $('#myModal').modal('hide');
                loadMovies();

            })
            document.getElementById("editCloseBtn").addEventListener("click", function () {
                clearEditModal(movieData);
                $('#myModal').modal('hide');

            })
        })
}


export {
    loaderAnimations,
    loadMovies,

}