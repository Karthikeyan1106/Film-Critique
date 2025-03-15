
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchList from "./WatchList";
import SelectedMovie from "./SelectedMovie";

function Main({watched,movies,loading,error,selectedId,handleSelectMovie,handleCloseMovie,onAddWatched,handleDeleteWatched}) {
    return (
        <main className="main">
            <Box>
                {!loading && !error && <MovieList handleSelectMovie={handleSelectMovie} movies={movies} />}
                {error && <p className="error">{error.message}</p>}
                {loading && <p className="loader">Loading...</p>}
            </Box>
            <Box watched={watched}>
                {selectedId ? <SelectedMovie selectedId={selectedId} handleCloseMovie={handleCloseMovie} onAddWatched={onAddWatched} watched={watched} /> :  (<><WatchedSummary watched={watched} />
                    <WatchList watched={watched} handleDeleteWatched={handleDeleteWatched} /></>)}
            </Box>
      </main>
  )
        
}

export default Main
