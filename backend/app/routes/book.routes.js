module.exports = app => {
    const books = require("../controllers/book.controller.js");
    
    var router = require("express").Router();

    //Add new book
    router.post("/", books.create);
 
    //Gett all books
    router.get("/",books.findAll);

    //Get one book with id
    router.get("/:id",books.findOne);

    //Delete book with id
    router.delete("/:id",books.delete);

    //Update book with id
    router.put("/:id",books.update);

    app.use ("/api/books", router);
}