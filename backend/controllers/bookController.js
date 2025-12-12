
import bookModel from '../models/bookModel.js';
import Book from '../models/bookModel.js'; // for addBook


// function for add book
const addBook = async (req, res) => {
    try {

        const {name, description, price, category, publisher, author, bestseller, language, edition} = req.body;

        const image = req.file;
        

        if (!image) {
            return res.json({
                success: false,
                message: "No image uploaded. Use field name 'image'."
            });
        }

        const imageUrl = `/uploads/${image.filename}`;

        const book = await Book.create({
            name,
            description,
            price: Number(price),
            category,
            publisher,
            author,
            bestseller: bestseller === 'true' ? true : false,
            language,
            edition,
            image: imageUrl,
            date : Date.now()
        });

        
        res.json({
            success: true,
            message: "Book added successfully",
            book
        });
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// function for list book
const listBook = async (req, res) => {
    try {

        const books = await bookModel.find({})
        res.json({success:true, books})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// function for removing book
const removeBook = async (req, res) => {
    try {
        
        await bookModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message:"Book removed"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// function for single book info
const singleBook = async (req, res) => {
    try {
        
        const { bookId } = req.body
        const book = await bookModel.findById(bookId)
        res.json({success: true, book})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {addBook, listBook, removeBook, singleBook}