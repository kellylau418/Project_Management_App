import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
// route imports

// configurations
dotenv.config() //loads env var from .env
const app = express(); //express = framework for nodejs to build api and web servers
//instead of manually handling http requests, express help define routes and attach handlers
//to create an express app, can now use middlewares and routes

//app.use() to apply middleware, middleware is like a filter placed on all requests coming through
app.use(express.json()); //parse req as json
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// routes, app.get(path, handler) defines route handler => when someone makes a get request to this path, run the handler fcn
app.get('/', (req, res) => {
    res.send("This is home route");

}); //default route

//mount a group of routes under a specific path
app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)


// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); //app.listen(ports) starts the http server (starts localhost:8080 or sth)
//in this case: app.listen(port, callback fcn), in which callback fcn is ran when server started successfully