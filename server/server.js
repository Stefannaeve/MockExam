import express from "express";
import bodyParser from "body-parser";
import { createMoviesRouter, apiMovies } from "./ApiMovies.js";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import * as path from "path";

const app = express();

// Gets the .env file
dotenv.config();

app.use(bodyParser.json());
// Use the link api movies to connect to ApiMovies.js
// app.use means that you are constantly using the link
app.use("/api/movies", apiMovies);

// This gives you access to mongoDB
const url = process.env.URL_FROM_MONGODB;
const client = new MongoClient(url);

client.connect().then((connection) => {
    const db = connection.db("ExamTest");
    createMoviesRouter(db);
});

app.use(express.static("../client/dist"));

app.use((req, res, next) =>  {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    }else {
        next();
    }
});


app.listen(process.env.PORT || 3000);