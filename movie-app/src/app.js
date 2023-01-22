// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

const movies = require("../data/movies").movies;

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  // Get a movie with specified id
  // Save movie details
  // Update a specific movie
  // Delete a specific movie
  // If no route present capture in the else part

  if (req.url === "/api/v1/movies" && req.method === 'GET') {
    res.writeHead (200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(movies));
  }
  else if (req.url === "/api/v1/movies" && req.method === 'POST') {
    let req_body = await getRequestData(req);
    movies.push(JSON.parse(req_body));
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(JSON.parse(req_body)));
  }
  else if (req.url.match(/\api\/v1\/movies\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[4];
    const movie = movies.find(p => p.id === parseInt(id));

    if (!movie) {
      res.writeHead(404, { "Content-Type": "application/json"});
      res.end('No movie with id present');
    }
    else {
      let req_body = await getRequestData(req);
      if (req_body != null) {
        let updateData = JSON.parse(req_body);
        movie.id = updateData.id != null ? updateData.id : movie.id;
        movie.movieName = updateData.movieName != null ? updateData.movieName : movie.movieName;
        movie.director = updateData.director != null ? updateData.director : movie.director;
        movie.rating = updateData.rating != null ? updateData.rating : movie.rating;
        // update the movie list
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify(movie));
      }
      else {
        res.writeHead(404, { "Content-Type": "application/json"});
        res.end("Invalid arguments");
      }
    }
  }
  else if (req.url.match(/\api\/v1\/movies\/([0-9]+)/) && req.method === "DELETE") {
      id = req.url.split("/")[4];
      const movie = movies.find(p => p.id === parseInt(id));

      if (!movie) {
        res.writeHead(404, { "Content-Type": "application/json"});
        res.end('No movie with id present');
      }
      else {
        const index = movies.indexOf(movie);
        movies.splice(index, 1);
        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify('Deleted'));
      }

  }
});

// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
