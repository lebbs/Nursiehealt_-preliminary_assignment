//const { mongoose } = require(".");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          title: String,
          author: String,
          description: String
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Book = mongoose.model("book", schema);
      return Book;
    };
//module.exports = mongoose => {
  //  const Book = mongoose.model(
    //    "book",
      //  mongoose.Schema(
        //    {
          //      title: String,
            //    author: String,
              //  description: String

            //},
            //{timestamps: true}
        //)
    //);
    //return Book;
//};


