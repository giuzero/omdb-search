import './App.css';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element = {<MovieList/>}/>
          <Route path='/:idMovie' element = {<Movie/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
