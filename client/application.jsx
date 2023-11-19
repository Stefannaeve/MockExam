import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";

import "./application.css";
import {
    HashRouter,
    json,
    Link,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function FrontPage() {
    return (
        <>
            <h2>Welcome to the Movie application</h2>
            <ul>
                <li>
                    <Link to={"/listMovies"}>List movies</Link>
                </li>
                <li>
                    <Link to={"/movies/new"}>Create new movie</Link>
                </li>
            </ul>
        </>
    );
}
function TaskListEntry({movie, reload}) {
    async function handleStartTask() {
        await fetch(`/api/movies/${movie.id}`, {
            method: "PUT",
            body: JSON.stringify({status: "doing"}),
            headers: {
                "content-type": "application/json"
            }
        })
        reload();
    }

    async function handleFinishTask() {
        await fetch(`/api/todos/${movie.id}`, {
            method: "PUT",
            body: JSON.stringify({status: "done"}),
            headers: {
                "content-type": "application/json"
            }
        })
        reload();
    }

    return <div>
        <h3>{movie.title} ({movie.status}): ID: {movie.id}</h3>
        {movie.status === "todo" && <button onClick={handleStartTask}>Start task</button>}
        {movie.status === "doing" && <button onClick={handleFinishTask}>Finish task</button>}
    </div>;
}

function AddTaskButton({reload}) {
    const dialogRef = useRef();
    const [taskTitle, setTaskTitle] = useState("");

    function handleClick() {
        dialogRef.current.showModal();
    }

    function handleCancel() {
        dialogRef.current.close();
    }

    async function handleSubmit() {
        await fetch("/api/movies", {
            method: "POST",
            body: JSON.stringify({title: taskTitle}),
            headers: {
                "content-type": "application/json"
            }
        })
        reload();
    }

    return <>
        <dialog ref={dialogRef}>
            <form method={"dialog"}>
                <h2>Add a new task</h2>
                <div>
                    Task title:<br />
                    <input
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </dialog>
        <button onClick={handleClick}>Add new task</button>
    </>;
}

function ListMovies({movies}) {
    const [tasks, setTasks] = useState();
    useEffect(() => {
        loadMovies();
    }, []);

    async function loadMovies() {
        const res = await fetch("/api/movies")
        setTasks(await res.json());
    }


    return <>
        <h1>The task application</h1>
        <AddTaskButton reload={loadMovies}/>
        {tasks && tasks.map(t => <TaskListEntry movie={t} reload={loadMovies}/>)}
        {!tasks && <div>Loading...</div>}
    </>;
}

function CreateMovie({onCreateMovie}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();

    const movie = {title, year, plot};

    function handleSubmitMovie(e) {
        e.preventDefault();
        onCreateMovie(movie);
        navigate("/movies");
    }

    return (
        <>
            <h2>Create new movie</h2>
            <form onSubmit={handleSubmitMovie}>
                <div>
                    <label>
                        Title:
                        <br/>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Year:
                        <br/>
                        <input value={year} onChange={(e) => setYear(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Plot:
                        <br/>
                        <textarea value={plot} onChange={(e) => setPlot(e.target.value)}/>
                    </label>
                </div>
                <button>Submit</button>
                <pre>{JSON.stringify(movie, null, "  ")}</pre>
            </form>
        </>
    );
}

export function Application() {
    const [movies, setMovies] = useState([]);

    async function fetchMovies() {
        const res = await fetch("/api/movies");
        setMovies(await res.json());
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    async function handleCreateMovie(movie) {
        await fetch("/api/movies", {
            method: "post",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return (
        <HashRouter>
            <header>
                <h1>Movie Application with API</h1>
            </header>
            <nav>
                <Link to={"/"}>Home page</Link>
            </nav>
            <main>
                <Routes>
                    <Route path={"/"} element={<FrontPage/>}/>
                    <Route
                        path={"/movies/new"}
                        element={<CreateMovie onCreateMovie={handleCreateMovie}/>}
                    />
                    <Route path={"/listMovies"} element={<ListMovies movies={movies}/>}/>
                    <Route path={"*"} element={<h2>Not found</h2>}/>
                </Routes>
            </main>
            <footer>By Johannes Brodwall for Kristiania 2023</footer>
        </HashRouter>
    );
}
