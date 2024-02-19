import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography as MuiTypography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Button as MuiButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from 'react-toastify';
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InB1c2hrcmFqIiwiaWF0IjoxNzA4MjU5MTM1LCJleHAiOjE3MTA4NTExMzV9.l8o6mfaIFZmBXV5AcX8Z895TkyJOgDoM1u9h3UybLf4

const SingleBookPage = () => {
  let { book_id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    id: book_id,
    title: "",
    description: "",
    image: "",
    author: "",
    publisher: "",
  });
  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getBook = () => {
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      fetch(`https://www.googleapis.com/books/v1/volumes/${book_id}`, options)
        .then(response => response.json())
        .then(data => {
          setBook({
            id: data?.id,
            title: data?.volumeInfo?.title,
            description: data?.volumeInfo?.description,
            image: data?.volumeInfo?.imageLinks?.thumbnail,
            author: data?.volumeInfo?.authors?.[0], // Assuming only one author for simplicity
            publisher: data?.volumeInfo?.publisher,
          });
        })
        .catch(error => console.error(error));
        let token = localStorage.getItem('token')
        if(!token) return;
        options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        };
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/getrating?booksid=${book.id}`, options)
        .then(response => response.json())
        .then(data => {
          console.log(71, data)
          setRating(data?.data?.rating)
          // setBook({
          //   id: data?.id,
          //   title: data?.volumeInfo?.title,
          //   description: data?.volumeInfo?.description,
          //   image: data?.volumeInfo?.imageLinks?.thumbnail,
          //   author: data?.volumeInfo?.authors?.[0], // Assuming only one author for simplicity
          //   publisher: data?.volumeInfo?.publisher,
          // });
        })
        .catch(error => console.error(error));
    };
    getBook();
  }, [book_id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Implement logic to update the rating on your server/database if needed
    console.log(`Book ${book.id} rated: ${newRating}`);
  };

  const handleSubmitRating = async () => {
    // Implement logic to submit the rating to the server/database
    let token = localStorage.getItem('token')
    if(!token){
      setOpen(true);
      return;
    }
    if(rating == 0)
      return;
    let postData = {
      booksid: book.id,
      rating: rating,
    }
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/giverating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // toast.success("hvghv")
    alert("Rating updated succesfully")
    const data = await response.json();
    console.log(59, data)
    ;
    console.log(`Submitting rating ${rating} for Book ${book.id}`);
  };

  return (
    <div>
      {/* <ToastContainer/> */}
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={book.title}
                height="auto"
                image={book.image}
                style={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <MuiTypography variant="h4" gutterBottom>
                  {book.title}
                </MuiTypography>
                <MuiTypography variant="body2" color="textSecondary">
                  <strong>Author:</strong> {book.author}
                </MuiTypography>
                <MuiTypography variant="body2" color="textSecondary">
                  <strong>Publisher:</strong> {book.publisher}
                </MuiTypography>
                <MuiTypography variant="body1" style={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
                  <div dangerouslySetInnerHTML={{ __html: book.description }} />
                </MuiTypography>
                <div style={{ marginTop: '20px' }}>
                  <MuiTypography variant="h6">Rate this book:</MuiTypography>
                  <Rating
                    name="book-rating"
                    value={rating}
                    precision={1}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                  />
                </div>
                <MuiButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitRating}
                  style={{ marginTop: '20px' }}
                >
                  Submit Rating
                </MuiButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            You are not logedin
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            Login required to give rating
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button variant="solid" color="primary" onClick={() => navigate('/signin')}>
              Login
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Container>
    
    </div>
  );
};

export default SingleBookPage;
