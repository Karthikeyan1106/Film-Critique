import {useEffect, useState } from "react";
import StarRating from "./StarRating";
const KEY = "9fa2f771";


function SelectedMovie({ selectedId, handleCloseMovie,onAddWatched,watched }) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched.map(movie => movie.imdbId).includes(selectedId);
    
    const watchedUserRating = watched.find(movie => movie.imdbId === selectedId)?.userRating

    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;
    
    function handleAdd() {
        const newMovie = {
            imdbId: selectedId,
            title, year, poster, imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating
        }
        onAddWatched(newMovie);
        handleCloseMovie();
    }

    
    
    useEffect(() => {
    const forCleanUp = function (e) {
      if (e.code === 'Escape') {
        handleCloseMovie();
      }
    }
    document.addEventListener('keydown', forCleanUp)
    return () => {
      document.removeEventListener('keydown',forCleanUp)
    }
     }, [handleCloseMovie])
    
    useEffect(() => {
        async function fetchWatched() {
            setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await response.json();
            setMovie(data);
            setIsLoading(false);
        }
        fetchWatched();
    }, [selectedId])

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`

        return () => {
            document.title = 'Film Critique'
        }
    },[title])
    
    return (
        <div className="details">
           {isLoading ? <p className="loader">Loading...</p> : (<> <header>
                <button className="btn-back" onClick={handleCloseMovie}>&larr;</button>
                <img src={poster} alt={`Poster of ${movie} movie`} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                        <span>⭐</span>
                        {imdbRating} IMdb rating
                    </p>
                </div>
            </header>
            <section>
                <div className="rating">
                        {!isWatched ? <><StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+Add to list</button>}</> : <p>You rated this movie {watchedUserRating}</p>}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
            {selectedId}</>)}
        </div>
    )
}

export default SelectedMovie
