import express from "express";

export const apiMovies = express.Router();



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