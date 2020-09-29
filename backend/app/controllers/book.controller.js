const db = require("../models");
const Book = db.books;

//Add and save new book
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message: "Content can't be empty"});
        return;
    }
    //Create new book
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        
    });
   
    //Save book in database
    book
    .save(book)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while creating book"
        });
    });

};



//Get all books from the database
exports.findAll = (req,res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Book.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || " Error occured while retrieving books"
        });
    });
};

//Get one book with id
exports.findOne = (req,res) =>{
    const id = req.params.id;

    Book.findById(id)
    .then (data => {
        if(!data)
        res.status(404).send({message: "Can't find book with id "+id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error while retrieving book with id" +id});
    });
};

//Update book information with id
exports.update=(req,res)=> {
    if(!req.body){
        return res.status(400).send({
            message: "Data can't be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({
                    message: `Can't update Book with id=${id}`
                });
            }else res.send ({message: "Book was updated successfully"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updatiing book with id =" + id
            });
        });
};

//Delete book with specified id
exports.delete = (req, res) =>{
    const id = req.params.id;

    Book.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Cant delete book with id = ${id}`
            });
        }else {
            res.send({
                message: "Book was deleted successfully"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Cant delete book with id="+id
        });
    });

};