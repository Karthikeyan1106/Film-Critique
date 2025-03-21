import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];
// const tempQuery = 'interstellar';
const KEY = "9fa2f771";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState("");

 

  useEffect(() => {
    const controller = new AbortController();

    async function apiFetch() {
      try {
        setIsLoading(true);
        setError("");
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal: controller.signal});
      if (!response.ok) throw new Error('Something went wrong in fetching the movies');
        const data = await response.json();
        
        if (data.Response === 'False') throw new Error('Movie not found');
      setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
        setError(err)
        }
      } finally {
      setIsLoading(false);
      }
      
    }
    if (query.length<3) {
      setMovies([]);
      setError("");
      return
    }
    apiFetch();

    return () => {
      controller.abort();
    }
  }, [query])
  
  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched=>watched.filter(w=>w.imdbId !== id))
  }
  

  return (
    <>
      <NavBar query={query} setQuery={setQuery} movies={movies} />
      <Main watched={watched} movies={movies} loading={isLoading} error={error} selectedId={selectedId} handleSelectMovie={handleSelectMovie}
        handleCloseMovie={handleCloseMovie} onAddWatched={handleWatched} handleDeleteWatched={handleDeleteWatched} />
    </>
  );
}
