import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoDb.js";
import ImportData from "./DataImport.js";
import { ErrorHandler, notFound } from "./Middleware/error.js";
import userRouter from "./Routes/userRoute.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());

// api 
app.use("/api/import", ImportData);
app.use("/api/users", userRouter);

// Serve static files from the public directory
// app.use(express.static("public"));

// Error handler
app.use(notFound);
app.use(ErrorHandler);

// Test later in postman 
// browse database on mongodb to reveal data set
// test the login on postman 
// test token in postman


/* 

// Define a route for serving the login page
app.get('/login', (req, res) => {
    // If the user is not authenticated, redirect to the register page
    if (!req.session.user) {
      return res.redirect("/register");
    }
  
    // If the user is authenticated, serve the screen page
    res.sendFile(__dirname + "/login.html");
  });

// Define a route for serving the screen page
app.get('/screen', (req, res) => {
    // If the user is not authenticated, redirect to the login page
    if (!req.session.user) {
      return res.redirect("/login");
    }
  
    // If the user is authenticated, serve the screen page
    res.sendFile(__dirname + "/screen.html");
  }); 

  */
 app.get("/", (req,res) => {
  res.send("Api is running");
 });
 
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server is running in port ${PORT}....`));