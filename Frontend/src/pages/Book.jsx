import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './book.css';

const Book = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${import.meta.env.VITE_APP_API_URL}/api/find?title=${searchTerm}`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.items.length == 0){
            setBooks([]);
            setMessage('No movies found with the given name');
        }else{
            setBooks(data.items);
            setMessage('');
        }
      })
      .catch(error => console.error(error));
  };
  function getTitle(txt, max){
    if(txt && txt.length > max){
        return txt.substr(0, max) + "...";
    }
    return txt || "";
  }
  return (
    <>
    <div className='books-page'>
        <div className="search-container">
            <div className="search-box">
                <input type="text" placeholder="Search by /title /author /genere" id="movie_name" name="movie_name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button onClick={() => handleSearch()} className="btn">Search</button>
            </div>
            <div className="item-list" id="item-list">
                
            </div>
        </div>
        <div className="item-list" id="item-list">
            <div className="item-list">
                {message && <p>{message}</p>}
                {books.map(item => (
                <div key={item.id} className="item" title={item?.volumeInfo?.title}>
                    {/* item?.volumeInfo?.imageLinks?.thumbnail */}
                    <img src={ item?.volumeInfo?.imageLinks?.thumbnail} alt={item.Title} />
                    <p>{getTitle(item?.volumeInfo?.title, 10)}</p>
                    <button className="add-to-playlist" onClick={() => navigate(`/book/${item.id}`)}>
                    Know more
                    </button>
                </div>
                ))}
            </div>
        </div>
    </div>
    </>
  );
};
export default Book;
