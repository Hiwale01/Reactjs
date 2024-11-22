import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import Pagination from "./Pagination";

const API_KEY = "62ec8a174a62a1fe3ea91e57dfad63f7";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trailerUrl, setTrailerUrl] = useState(""); // To store the trailer URL

  const fetchMovies = useCallback(async (page = 1) => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      ); // Fetch popular movies
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError("Error fetching movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${data.results[0].key}`);
      } else {
        setTrailerUrl(""); // No trailer available
      }
    } catch (error) {
      setTrailerUrl(""); // In case of an error fetching trailer
    }
  };

  useEffect(() => {
    fetchMovies(currentPage); // Fetch movies on initial load
  }, [currentPage, fetchMovies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Show movie details when clicked
    fetchTrailer(movie.id); // Fetch trailer when movie is selected
  };

  const handleBackToList = () => {
    setSelectedMovie(null); // Go back to movie list
  };

  return (
    <div className="app">
      <h1>Movieland</h1>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBack={handleBackToList} trailerUrl={trailerUrl} />
      ) : (
        <>
          <div className="search-container">
            <SearchBar
              searchTerm={searchTerm}
              onSearch={handleSearch}
            />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="empty">
              <h2>{error}</h2>
            </div>
          ) : (
            <MovieList movies={movies} onMovieClick={handleMovieClick} />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

export default App;
