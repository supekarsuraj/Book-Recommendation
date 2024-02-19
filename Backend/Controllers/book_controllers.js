const express = require('express');
const bookModul=require('../models/book_models');
// const fetch = require('node-fetch');


const searchbookBytitle= async(req,res)=>
{
    console.log("searchbookbytitleis called")
    const { title } = req.query;
    console.log(title);
    try {
       
        const apikey='AIzaSyCD_XiAzdWVOVwiPwyA7MG7wDd4QVXfv0Y';
        
        if (!title) {
            return res.status(400).json({ error: 'Title is null' });
        }
      
        const response = await fetch(` https://www.googleapis.com/books/v1/volumes?q=${title}&key=${apikey}`).then((value)=>{
            // console.log(value.json());
        //    ?q=flowers+inauthor:keyes&key=yourAPIKey
            return value.json();

        }).then((response)=>{
            // const data =  response.json();
            console.log(response)
            res.json(response);

        })
       
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const giveRating = async (req,res)=>{
    console.log(36, req.user)
    const username=req.user.username;
    console.log(username)
    const booksid=req.body.booksid;
    const rating=req.body.rating;
    console.log(41,req.body)
    try {
        const dataa=await bookModul.findOneByUsernameAndBooksid(username,booksid);
        
        if (dataa) {
            // Update existing rating
            // Assuming bookModul.updateRating is a function to update rating
            await bookModul.updateRating(username, booksid, rating);
            res.send({ message: `Rating updated for book ${booksid}`, username: username });
        } else {
            // Save new rating
            const data = await bookModul.giveRating(username, booksid, rating);
            if (data) {
                res.send({ message: `Rating added for book ${booksid}`, username: username });
            } else {
                res.send({ message: "Unable to add rating" });
            }
        }
        
    } catch (error) {
        res.send({message:"something wen't wrong"})
        
    }


}
  
    // const rating=req.body.rating;
    
        
    
    async function getRating(req,res) {
        const username=req.user.username;
    
        const booksid=req.query.booksid;
        try {
            const ratingDocument = await bookModul.findOneByUsernameAndBooksid(username, booksid);
            
            if (ratingDocument) {
                console.log('Book found:', ratingDocument);
                res.send({message: "Your data", data: ratingDocument});
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


        
    

module.exports={searchbookBytitle , giveRating , getRating}//this is my  book_controllers.js in controller folder