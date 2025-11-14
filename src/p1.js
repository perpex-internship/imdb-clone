import React from "react";
import "./moviecard.css";

// ✅ Reusable MovieCard component
const MovieCard = ({ movie }) => {
  const { title, year, rating, poster } = movie;

  return (
    <div className="movie-card">
      <img src={poster} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>
        <p className="movie-year">Year: {year}</p>
        <div className="movie-rating">
          <span className="star">★</span> {rating}/10
        </div>
      </div>
    </div>
  );
};

// ✅ Example usage with static sample data
const MovieGallery = () => {
  const movies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      poster:
        "./public/logo192.png",
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      poster:
        "",
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      poster:
        "",
    },
    {
      id: 4,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.8,
      poster:
        "./logo.svg",
    },
  ];

  return (
    <div className="movie-gallery">
      <h1>🎬 Movie Gallery</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGallery;
