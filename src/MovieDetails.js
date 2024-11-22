import React from "react";
import "./MovieDetails.css"; // Ensure you have the corresponding CSS

function MovieDetails({ movie, onBack, trailerUrl }) {
  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={onBack}>
        Back to Movie List
      </button>
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-details-image"
          />
        </div>
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
            <button className="trailer-button">Watch Trailer</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
