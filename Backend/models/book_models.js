const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    booksid: { type: String, required: true },
    rating: { type: Number, required: true }
});

const Rating = mongoose.model('rating', ratingSchema);

async function giveRating(username, booksid, rating) {
    try {
        const ratingDocument = new Rating({ username, booksid, rating });
        await ratingDocument.save();
        console.log('Rating saved successfully');
        return ratingDocument;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
 async function getBook(username,booksid){
    const ratingDocument = new Rating({ username, booksid});
    await ratingDocument.User;
    console.log('Rating saved successfully');
    return ratingDocument;

 }
 const getratingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    booksid: { type: String, required: true }
    // Add more fields as needed
});

// Create a Mongoose model based on the schema
const getRating = mongoose.model('Rating', getratingSchema);

// Define a function to find a book by username and booksid
async function findOneByUsernameAndBooksid(username, booksid) {
    try {
        // Find the rating document that matches the provided username and booksid
const getRating = mongoose.model('Rating', getratingSchema);
        const ratingDocument = await getRating.findOne({ username, booksid });
        
        if (ratingDocument) {
            console.log('Book found:', ratingDocument);
            return ratingDocument;
        } else {
            console.log('Book not found');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
async function updateRating(username, booksid, rating) {
    try {
        const ratingDocument = await Rating.findOneAndUpdate({ username, booksid }, { rating }, { new: true });
        console.log('Rating updated successfully');
        return ratingDocument;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

module.exports = { giveRating , getBook , findOneByUsernameAndBooksid , updateRating};
