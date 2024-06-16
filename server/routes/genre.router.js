const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  const query = `
  SELECT * FROM "movies_genres"
  WHERE "movie_id" = $1;
`;
pool.query(query, [movieId])
.then(result => {
  res.send(result.rows);
})
  .catch(err => {
    console.log('ERROR: Get all genres', err);
    res.sendStatus(500)
  })
  // Add query to get all genres
});

module.exports = router;