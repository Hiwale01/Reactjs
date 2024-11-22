import React from "react";
import "./MovieCard.css";

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        className="movie-card-image"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-card-details">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <button className="trailer-button">Watch Trailer</button>
      </div>
    </div>
  );
}

export default MovieCard;
