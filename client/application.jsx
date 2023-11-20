import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";

import "./application.css";
import {
    BrowserRouter,
    HashRouter,
    json,
    Link,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

    // * - 'async' Keyword:
    //     *   - Placed before a function declaration or expression to indicate that the function
    // *     is asynchronous. This means the function returns a Promise, allowing for asynchronous
    // *     operations like API calls, file reading, etc.
    // *   - Inside an async function, you can use the 'await' keyword.
    // * - 'await' Keyword:
    //     *   - Used to wait for a Promise to resolve before continuing the execution of the code.
    // *   - It can only be used inside an async function.
    // *   - It pauses the execution of the async function, waiting for the Promise to resolve,
    // *     and then resumes the async function's execution and returns the resolved value.
    // *   - Helps in writing asynchronous code in a more synchronous manner, making it easier
    // *     to read and maintain.

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
    // * Asynchronously handles the task of updating a movie's status to 'doing'.
    //     * - Makes an asynchronous PUT request to '/api/movies/{movie.id}'.
    //     * - Updates the status of the specified movie to 'doing'.
    //     * - The movie's ID is dynamically included in the URL.
    //     * - Sends the updated status in JSON format in the request body.
    //     * - Sets the 'content-type' header to 'application/json'.
    //     * - Calls the 'reload' function after the update to refresh the data.
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

    // * Asynchronously handles the task of updating a movie's status to 'done'.
    //     * - Makes an asynchronous PUT request to '/api/todos/{movie.id}'.
    //     * - Updates the status of the specified movie to 'done'.
    //     * - The movie's ID is dynamically included in the URL.
    //     * - Sends the updated status in JSON format in the request body.
    //     * - Sets the 'content-type' header to 'application/json'.
    //     * - Calls the 'reload' function after the update to refresh the data.
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

    // * Renders a movie item with action buttons based on its status.
    //     * - Displays the movie's title, status, and ID in a heading.
    //     * - Shows a 'Start task' button if the movie's status is 'to do'.
    //     *   - This button, when clicked, triggers the handleStartTask function.
    // * - Shows a 'Finish task' button if the movie's status is 'doing'.
    //     *   - This button, when clicked, triggers the handleFinishTask function.
    return <div>
        <h3>{movie.title} ({movie.status}): ID: {movie.id}</h3>
        {movie.status === "todo" && <button onClick={handleStartTask}>Start task</button>}
        {movie.status === "doing" && <button onClick={handleFinishTask}>Finish task</button>}
    </div>;
}

function AddTaskButton({reload}) {
    const dialogRef = useRef();
    const [taskTitle, setTaskTitle] = useState("");

    // * Handles the click event to open a modal dialog.
    //     * - Utilizes the 'dialogRef' reference to access the dialog DOM element.
    //     * - Calls 'showModal()' on the dialog reference to open the modal dialog.
    function handleClick() {
        dialogRef.current.showModal();
    }

    // * Handles the action to close the modal dialog.
    //     * - Utilizes the 'dialogRef' reference to access the dialog DOM element.
    //     * - Calls 'close()' on the dialog reference to close the modal dialog.
    function handleCancel() {
        dialogRef.current.close();
    }

    // * Asynchronously handles the submission of a new task.
    //     * - Makes an asynchronous POST request to '/api/movies'.
    //     * - Sends a new task with the 'taskTitle' in the request body, formatted as JSON.
    //     * - Sets the 'content-type' header to 'application/json' to indicate the nature of the request body.
    //     * - Calls the 'reload' function after the submission to refresh the data.
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

    // * Renders a dialog for adding a new task and a button to trigger it.
    //     * - Contains a dialog element with a form for task submission.
    //     *   - The dialog is accessed via 'dialogRef' for programmatic control.
    //     * - The form includes:
    //         *   - A heading 'Add a new task'.
    //     *   - An input field for the task title, binding its value to 'taskTitle' state.
    //     *   - A submit button that triggers 'handleSubmit' to process the task addition.
    //     *   - A cancel button that triggers 'handleCancel' to close the dialog.
    //     * - Also renders an external button to open the dialog, linked to 'handleClick'.
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


    // * Intended to asynchronously load movies and update the state, but currently not fully implemented.
    //     * - Temporarily sets the 'tasks' state with the existing 'movies' data.
    //     * - Contains commented-out code for fetching movies from '/api/movies':
    // *   - The commented-out code suggests an intended fetch request to the server to get movie data.
    //     *   - The response would then be used to update the 'movies' state.
    async function loadMovies() {
        setTasks(movies)
        //const res = await fetch("/api/movies");
        //         setMovies(await res.json());
    }
    // * useEffect hook to initiate the loading of movies on component mount.
    //     * - Invokes the loadMovies function when the component mounts.
    //     * - The empty dependency array '[]' ensures this effect runs only once after the initial render.
    //     * - Note: The current implementation of loadMovies sets 'tasks' with existing 'movies' data.
    useEffect(() => {
        loadMovies();
    }, []);

    // * Renders the main layout of the task application.
    //     * - Displays a main heading for the application.
    //     * - Includes an 'AddTaskButton' component, passing 'loadMovies' as a prop for reloading tasks.
    //     * - Conditionally renders 'TaskListEntry' components for each task if 'tasks' is not null:
    // *   - Each 'TaskListEntry' is passed a task object and the 'loadMovies' function.
    // * - Shows a loading message if 'tasks' is null, indicating data is being loaded or not available.
    return <>
        <h1>The task application</h1>
        <AddTaskButton reload={loadMovies}/>
        {tasks && tasks.map(t => <TaskListEntry movie={t} reload={loadMovies}/>)}
        {!tasks && <div>Loading...</div>}
    </>;
}

function CreateMovie({onCreateMovie}) {
    // useState hook for managing the 'title' state.
    // 'title' is the current state, and 'setTitle' is the function to update this state.
    // Initially, 'title' is set to an empty string.
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    const movie = {title};

    // * Handles the submission of the movie form.
    //     * @param {Object} e - The event object from the form submission.
    //     * - Prevents the default form submission behavior.
    //     * - Calls onCreateMovie with the 'movie' state to handle the movie creation.
    //     * - Navigates to the '/listMovies' route after submission.
    function handleSubmitMovie(e) {
        e.preventDefault();
        onCreateMovie(movie);
        navigate("/listMovies");
    }

    // * Renders the 'Create new movie' form component.
    //     * - Displays a heading for the form.
    //     * - Contains a form element with an onSubmit event handler linked to handleSubmitMovie.
    //     * - Includes an input field for the movie title, which updates the 'title' state on change.
    //     * - A submit button to trigger the form submission.
    //     * - Displays the current 'movie' state in a formatted JSON structure for debugging or preview.
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

                <button>Submit</button>
                <pre>{JSON.stringify(movie, null, "  ")}</pre>
            </form>
        </>
    );
}

export function Application() {
    const [movies, setMovies] = useState([]);

    // * Asynchronously fetches movies from the server.
    //     * - Makes an asynchronous call to '/api/movies' to retrieve movie data.
    //     * - Waits for the response and then converts it to JSON format.
    //     * - Updates the 'movies' state with the fetched data using setMovies.
    async function fetchMovies() {
        const res = await fetch("/api/movies");
        setMovies(await res.json());
    }

    // * useEffect hook to fetch movies on component mount.
    //     * - Invokes the fetchMovies function when the component mounts.
    //     * - The empty dependency array '[]' ensures this effect runs only once after the initial render.
    useEffect(() => {
        fetchMovies();
    }, []);

// * Asynchronously handles the creation of a new movie.
//     * @param {Object} movie - The movie object to be created.
//     * - Makes an asynchronous POST request to '/api/movies'.
//     * - Sends the 'movie' object in the request body, formatted as JSON.
//     * - Sets the 'Content-Type' header to 'application/json' to indicate the nature of the request body
    async function handleCreateMovie(movie) {
        await fetch("/api/movies", {
            method: "post",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // * Renders the main layout of the Movie Application with navigation and routing.
    //     * - Wraps the entire layout in a BrowserRouter for client-side routing.
    //     * - Contains a header with the application's title.
    //     * - Includes a navigation bar with a link to the Home page.
    //     * - The main content area uses Routes for defining different page components based on the URL:
    //         *   - A default route ('/') that renders the 'FrontPage' component.
    //     *   - A route for '/movies/new' that renders 'CreateMovie', passing 'handleCreateMovie' as a prop.
    //     *   - A route for '/listMovies' that renders 'ListMovies', passing 'movies' as a prop.
    //     *   - A catch-all route ('*') for undefined paths, displaying a 'Not found' message.
    //     * - A footer with attribution to the creator of the application.
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}
