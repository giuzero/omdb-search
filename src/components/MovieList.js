import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function MovieList() {

  const [searchKeyword, setSearchKeyword] = useState('')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let lastSearch = localStorage.getItem("searchKeyword")
    if (lastSearch) {
      getMovies(lastSearch)
    }
  }, [])

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value)
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setSearchKeyword(event.target.value)
      getMovies(searchKeyword)
    }
  };

  const getMovies = (toLookFor) => {

    localStorage.setItem("searchKeyword", toLookFor);

    const lookupURL = `https://www.omdbapi.com/?s=${toLookFor}&apikey=e0838af9`
    fetch(lookupURL)
      .then(res => res.json())
      .then(jres => {
        if (jres.Error) { setMovies([]) }
        else { setMovies(jres.Search) }
      })
  }

  const movieList = movies.map(movie => {
    return (

      <div key={movie.imdbID} className='movieItem'>
        <NavLink to={`/${movie.imdbID}`}>
          <img className='poster' src={movie.Poster} alt={movie.Title} />
          <div className="overlay">
            <div className="title">{movie.Title}</div>
          </div>
        </NavLink>
      </div>)
  })

  return (
    <div className='input-container'>
      <div className='row '>
        <div className="col">
          <input type="text" className="form-control m-5 p-3 gx-1" placeholder="Search a Movie!" onChange={handleSearch} onKeyDown={handleEnter}></input>
        </div>
        <div className="col">
          <button className="p-3 m-5 btn btn-primary gx-1" onClick={() => getMovies(searchKeyword)}>search</button>
        </div>
      </div>
      <div className="p-4">
        <div className="row row-cols-sm-4 gx-5">
          {movieList}
        </div></div></div>

  )

}