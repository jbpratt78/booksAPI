const Book = require('../models/booksModel.js');

// Create and Save a new player
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a Player
    const book = new Book({
		cwid: req.body.cwid,
		cover: req.body.cover,
        isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author,    
		copies: req.body.copies,
		genre: req.body.genre,
		length: req.body.length
    });

    // Save Player in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the player."
        });
    });
};

// Retrieve and return all players from the database.
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
};

// Find a single player with a playerId
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.bookId
        });
    });
};


// Find all books with this cwid
exports.findAllWith = (req, res) => {
   Book.find( { cwid: req.params.cwid } )
    .then(books => {
        if(!books) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.cwid
            });            
        }
		
        res.send(books);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.cwid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.cwid
        });
    });
};

// Retrieve and return all players from the database.
/*exports.findAllWith = (req, res) => {
    Book.find( { cwid : req.query.cwid } )
    .then(books => {
		
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
};*/


// Update a player identified by the playerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Find player and update it with the request body
    Book.findByIdAndUpdate(req.params.bookId, {
        cwid: req.body.cwid,
		cover: req.body.cover,
		isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author,    
		copies: req.body.copies,
		genre: req.body.genre,
		length: req.body.length
    }, {new: true})
    .then(book => {
        if(!player) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.bookId
        });
    });
};

// Delete a player with the specified playerId in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.bookId
        });
    });
};
