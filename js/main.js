var page = 1;
var perPage = 10;

function loadMovieData(title=null) {
    moviesApi = `/api/movies?page=${page}&perPage=${perPage}`;
    let pagination = document.querySelector(".pagination");
    if (title) {
        moviesApi += `&title=${title}`;
        page = 1;
        pagination.classList.add("d-none");
    }
    else {
        pagination.classList.remove("d-none");
    }

    fetch(moviesApi)
    .then((res) => res.json())
    .then((movies) => {
        console.log(movies);
        let movieRows = `
        ${movies.map(data => (
            `<tr data-id=${data._id}>
            <td>${data.year}</td>
            <td>${data.title}</td>
            <td>${data.plot ? data.plot : "N/A"}</td>
            <td>${data.rated ? data.rated : "N/A"}</td>
            <td>${Math.floor(data.runtime/60)}:${(data.runtime%60).toString().padStart(2,'0')}</td>
            </tr>`
        )).join('')}
        `
        document.querySelector("tbody").innerHTML = movieRows;
        document.querySelector("#current-page").innerHTML = page;
        document.querySelectorAll("#moviesTable tbody tr").forEach((row) => {
            row.addEventListener("click", (e) => {
                movieClick(row.getAttribute("data-id"));
            });
        });
    })
    .catch(() => {

    });
}

function movieClick(id) {
    fetch("/api/movies/"+id)
    .then((res) => res.json())
    .then((movie) => {
        document.querySelector(".modal-title").innerHTML = movie.title;
        document.querySelector(".modal-body").innerHTML = `
        <img class="img-fluid w-100" src="${movie.poster}"><br><br>
        <strong>Directed By: </strong>${movie.directors ? movie.directors.join(', ') : "N/A"}<br><br>
        <p>${movie.fullplot}</p>
        <strong>Cast: </strong>${movie.cast ? movie.cast.join(', ') : "N/A"}<br><br>
        <strong>Awards: </strong>${movie.awards.text}<br>
        <strong>IMDB Rating: </strong> ${movie.imdb.rating} (${movie.imdb.votes} votes)
        `
    });
    let myModal = new bootstrap.Modal(document.querySelector('#detailsModal'), {
        focus: true
      });
      
      myModal.show();
}

document.addEventListener("DOMContentLoaded", (e) => {
    let previous = document.querySelector("#previous-page");
    let next = document.querySelector("#next-page");
    let submit = document.querySelector("#searchForm");
    let clear = document.querySelector("button[type='reset']");
    submit.addEventListener("submit", (e) => {
        e.preventDefault();
        let form = e.target;
        title = form.querySelector("#title").value;
        console.log(title);
        loadMovieData(title);
    });
    clear.addEventListener("click", (e) => {
        loadMovieData();
    });
    previous.addEventListener("click", (e) => {
        if (page > 1) {
            page -= 1;
            loadMovieData();
        }
    });
    next.addEventListener("click", (e) => {
        page += 1;
        loadMovieData();
    });
});