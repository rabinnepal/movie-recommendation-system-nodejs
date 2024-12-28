const axios = require("axios");
const { tmdbApiKey } = require("../config/dotenv");

const tmdbBaseURL = "https://api.themoviedb.org/3";

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${tmdbBaseURL}/trending/movie/week`, {
      params: { api_key: tmdbApiKey },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${tmdbBaseURL}/discover/movie`, {
      params: {
        api_key: tmdbApiKey,
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

module.exports = { fetchTrendingMovies, fetchMoviesByGenre };
