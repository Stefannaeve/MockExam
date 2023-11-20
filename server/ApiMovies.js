import express from "express";

export const apiMovies = express.Router();



 // * Initializes and configures routes for movie-related API endpoints.
 // *
 // * This function sets up a router with GET and POST routes for handling
 // * movie data. The GET route fetches all movies from the database, while
 // * the POST route allows for adding a new movie. It should be called with
 // * a database connection object to integrate these routes into the main server.
 // *
 // * @param {Object} db - The database connection used for movie data operations.
export function createMoviesRouter(db) {
    apiMovies.get("", async (req, res) => {
        const movies = await db
            .collection("Movies")
            .find()
            .toArray();
        res.json(movies);
    });

    apiMovies.post("", async (req, res) => {
        const {title} = req.body;
        await db
            .collection("Movies")
            .insertOne({title});
        res.sendStatus(204);
    });
}