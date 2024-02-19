import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PageNotFound from './pages/PageNotFound';
import Protected from './pages/Protected';
import './App.css';
import Book from './pages/Book';
import SingleBookPage from './pages/SingleBookPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Book />} />
          {/* <Route path="/" element={<Protected Component={Book} />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          <Route path="/book/:book_id" element={<SingleBookPage />} />
          <Route path="*" element={<PageNotFound />} /> {/* Fallback for 404 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
