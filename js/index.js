import {loaderAnimations, loadMovies} from "./movies-app.js"

"use strict";

(async () => {
    // STARTING LOADER ANIMATION UPON INITIAL PAGE LOAD OR REFRESH
    loaderAnimations();
    // INITIAL FETCH TO LOAD TO POPULATE MOVIES ONTO HTML.
    await loadMovies();










})();