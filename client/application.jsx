import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function homePage() {

    return <div>
        <h1>Home Page</h1>
        <ul>
            <li><Link to={"/movies"}>Movies</Link></li>
            <li><Link to={"/addMovies"}>Movies</Link></li>
        </ul>
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

        // <form onSubmit={}>
            <div>
                <input
                    type="text"
                    value={newMovie}
                    onChange={(e) => setNewMovie(e.target.value)}
                    placeholder="Add a new movie"
                />
                <button onClick={addMovie}>Add Movie</button>
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index}>{movie}</li>
                    ))}
                </ul>
            </div>
        // </form>
    );
}

// <li><Link to="/">Home</Link></li>
// <TodoRoutes/>

export function Application() {
    return <BrowserRouter>
        <header>
            <h1>Movie Application</h1>
        </header>
        <nav>
            <Link to={"/"}>Home</Link>
        </nav>
        <main>
            <Routes>
                <Route path={"/"} element={<homePage/>}/>
            </Routes>
            <Routes>
                <Route path={"/addMovies"} element={<addMovie/>}/>
            </Routes>
        </main>
        <footer>
            By Stefan the Awesome
        </footer>
    </BrowserRouter>
}