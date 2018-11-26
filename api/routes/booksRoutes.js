module.exports = (app) => {
    const books = require('../controllers/booksController.js');

    // Create a new player
    app.post('/books/:cwid', books.create);

    // Retrieve all players
    app.get('/books', books.findAll);
	
	// Retrieve all books with cwid
    app.get('/books/:cwid', books.findAllWith);

    // Retrieve a single player with playerId
    app.get('/books/:cwid/:bookId', books.findOne);

    // Update a player with playerId
    app.put('/books/:cwid/:bookId', books.update);

    // Delete a player with playerId
    app.delete('/books/:cwid/:bookId', books.delete);
}