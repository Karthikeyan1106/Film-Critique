function MovieList({ movies,handleSelectMovie }) {
  
  return (
      <ul className="list">
              {movies?.map((movie) => (
                 <li key={movie.imdbID} onClick={()=>handleSelectMovie(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
       
    )
}

export default MovieList
