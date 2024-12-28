const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  fetchTrendingMovies,
  fetchMoviesByGenre,
} = require("../services/tmdbService");

const router = express.Router();

// Fetch trending movies (No authentication required)
router.get("/trending", async (req, res) => {
  try {
    const movies = await fetchTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Fetch movies by genre (Authentication required)
router.get("/genre/:genreId", authenticateToken, async (req, res) => {
  const { genreId } = req.params;

  try {
    const movies = await fetchMoviesByGenre(genreId);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies by genre" });
  }
});

module.exports = router;
