import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {

    let { idMovie } = useParams()

    const [movieData, setMovieData] = useState({})

    useEffect(() => {
        console.log(idMovie)
        getMovie(idMovie)
    }, [idMovie])

    const getMovie = (id) => {
        const lookupURL = `https://www.omdbapi.com/?i=${id}&apikey=e0838af9`

        fetch(lookupURL)
            .then(res => res.json())
            .then(jres => {
                setMovieData(jres)
            }
            )

    }

    return (
        <div className="movie-detail-container" align="center">
            <h1>{movieData.Title}</h1>
            <h3>by {movieData.Director}</h3>
            <img src={movieData.Poster} alt={movieData.Title} />
            <p>Released on {movieData.Released}</p>
            <article>{movieData.Plot}</article>
        </div>
    )
}