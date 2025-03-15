import WatchMovie from "./WatchMovie"

function WatchList({watched,handleDeleteWatched}) {
    return (
        <ul className="list">
                {watched.map((movie) => (
                  <WatchMovie key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
                ))}
              </ul>
    )
}

export default WatchList
