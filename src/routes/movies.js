const { Router } = require('express');
const _ = require('underscore');

const router = Router();

const movies = require('../sample.json')

router.get('/', (req, res) => {
  res.json(movies);
})

router.post('/', (req, res) => {
  const { title, director, year, rating } = req.body
  if (title && director && year && rating) {
    const id = movies.length + 1;
    const newMovie = { ...req.body, id }
    console.log(newMovie);
    movies.push(newMovie);
    res.json({message: "saved", success: true, movies}).status(200);
  } else {
    res.json({message: "wrong request", success: false}).status(500)
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  _.each(movies, (movie, i) => {
    if (movie.id == id) {
      movies.splice(i, 1)
    }
  });
  res.json({movies})
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body
  if (title && director && year && rating) {
    _.each(movies, (movie, i) => {
      if (movie.id == id) {
        movie.title = title,
        movie.director = director,
        movie.year = year,
        movie.rating = rating
      }
    });
    res.json({message: "Actualzado con exito", success: true, movies})
  } else {
    res.json({message: "Fallo al actualizar", success: false})
  }
})

module.exports = router;
