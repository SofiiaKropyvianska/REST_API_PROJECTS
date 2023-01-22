// Import the axios library
const axios = require('axios')
const movies = require("../data/movies").movies;

const getMovies = (done) => {
  return JSON.stringify(movies);
}

const getMoviesById = (movieId, done) => {
  let movie = movies.find(p => p.id === movieId);
  if (!movie) {
    done("Requested movie doesn't exist..!", null);
  }

  return done(null, JSON.stringify(movie));}

const saveMovie = function (newMovie, done) {
  let movieExist = movies.find(p => p.id ===  parseInt(newmovie.id));
  if (!movieExist) {
    movies.push(newmovie);
    return done(null, JSON.stringify(movies));
  }
  return done("movie already exists..!", null);
}

const updateMovie = function (movieId, updateData, done) {
  const movie = movies.find(p => p.id === parseInt(movieId));

  if (!movie) {
    done('No movie with id present', null);
  }
  else {
    if (updateData != null) {
      movie.id = updateData.id != null ? updateData.id : movie.id;
      movie.movieName = updateData.movieName != null ? updateData.movieName : movie.movieName;
      movie.director = updateData.director != null ? updateData.director : movie.director;
      movie.rating = updateData.rating != null ? updateData.rating : movie.rating;
      // update the movie list
      done(null, JSON.stringify(movie))
    }
    else {
      done("Invalid arguments", null);
    }
  }
}

const deleteMovieById = function (movieId, done) {
  // delete a movie    
  let movie = movies.find(p => p.id ===  parseInt(movieId));
  
  if (!movie) {
    done("Requested movie doesn't exist..!", null);
  }
  else {
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    done(null, JSON.stringify(movies));
  }
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
