const {Book, GenreBook} = require('../models/index');

const BookController = {
    insert(req,res){
        Book.create({...req.body})
        .then(book=>{
           book.addGenre(req.body.GenreId)
           res.send(book)
        })  
        .catch(err => console.error(err))
        // const { GenreId, ...data} = req.body
        // const book = await Book.create(data);
        // if (GenreId && GenreId.length > 0) {
        //         book.setGenres(GenreId)
        //     }
        // return res.status(200).send({ message: 'Comic creado con éxito', book })      
    },
    async insertMany(req,res){
        try {
          const books =req.body;
          const booksResponse =[]
          books.forEach(async book=>{
            const bookCreated = await Book.create({...book});
            bookCreated.addGenre(book.GenreId);
            booksResponse.push(bookCreated)
          });
          res.send('books created')
        }
        catch (error) {
            console.log(error)
        }
    } ,
    async delete(req, res) {
        try {
            await Book.destroy({
                where: {
                    id: req.params.id
                }
            })
            await GenreBook.destroy({
                where: {
                    BookId: req.params.id
                }
            })
            res.send({ message: 'The book has been removed'})
        }
         catch (error) {
            console.log(error)
        }
    },
    async update(req, res) {
      try {
        await Book.update(
          { ...req.body },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        const book = await Book.findByPk(req.params.id)
        book.setGenres(req.body.GenreId);
        res.send("Libro actualizado con éxito");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "no ha sido posible actualizado el libro" });
      }
    },
}

module.exports = BookController;