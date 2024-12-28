require("dotenv").config();

const config = {
  tmdbApiKey: process.env.TMDB_API_KEY,
  port: process.env.PORT || 5000,
};

module.exports = config;
