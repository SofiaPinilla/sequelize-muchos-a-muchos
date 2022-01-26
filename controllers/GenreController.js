const { Genre } = require('../models/index')

const GenreController = {
    create(req,res){
        Genre.create({...req.body})
        .then(genre => res.send(genre))
        .catch(err => console.error(err))
    }
}

module.exports = GenreController;