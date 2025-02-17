// PWD:VXLFDMz1yx0J7W19
import express, {Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"], 
    })
);
  

 const mongoURI: string = 
"mongodb+srv://balikisjubril9:VXLFDMz1yx0J7W19@personalfinancetracker.y5gsa.mongodb.net/"

mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB"))
.catch((err) =>console.error('FAILED TO CONNECT TO MONGODB',err));

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
})

app.use("/financial-records", financialRecordRouter);

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})
