import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";


// Configure dotenv
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



//middlewares --------------------------
//middleware for allow extrect json data out of req body
app.use(express.json({ limit: "50mb" }));
//allowes to parsse cookie
app.use(cookieParser());
//allows cross origin calls
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));

//routes ------------------------------
//authentication route
app.use("/api/auth", authRoutes);
//message route
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

  //start app ------------------------------
  server.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
    connectDB();
  });
