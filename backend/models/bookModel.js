import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bestseller: {
        type: Boolean,
    },
    language: {
        type: String,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
    }

});

const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export  default bookModel;

// const result = await cloudinary.uploader.upload(image.path, {
        //     resource_type: "image"
        // });

        // const imageUrl = result.secure_url;