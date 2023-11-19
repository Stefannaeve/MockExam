import express from "express";
import bodyParser from "body-parser";
import dotenv from "nodemon";
import {MongoClient} from "mongodb";

const app = express();

// Gets the .env file
dotenv.config();

app.use(bodyParser.json());

// This gives you access to mongoDB
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const movies = [
    {
        id: 0,
        title: "Interstellar",
        status: "done"
    },
    {
        id: 1,
        title: "Oppenheimer",
        status: "done"
    },
    {
        id: 2,
        title: "Life of Brian",
        status: "doing"
    }
]

app.get("/api/movies", (req, res) => {
    res.send(movies);
});

app.post("/api/movies", (req, res) => {
    const {title} = req.body;
    const newTask = {title, status: "todo", id: movies.length};
    movies.push(newTask);
    res.send();
});

app.put("/api/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    movies.find(t => t.id === id).status = req.body.status;
    res.send();
})

app.use(express.static("../client/dist"));


app.listen(3000);