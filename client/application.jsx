import {BrowserRouter} from "react-router-dom";

function homePage(){

    return <div>
        <h1>Home Page</h1>
        <MovieList/>
    </div>

}

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState('');

    const addMovie = () => {
        if (newMovie) {
            setMovies([...movies, newMovie]);
            setNewMovie('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                placeholder="Add a new movies"
            />
            <button onClick={addMovie}>Add Movie</button>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                ))}
            </ul>
        </div>
    );
}

export function Application(){
    return <BrowserRouter>
        <h1>Movie Application</h1>

    </BrowserRouter>
}