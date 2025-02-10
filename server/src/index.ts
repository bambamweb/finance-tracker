// PWD:VXLFDMz1yx0J7W19
import express, {Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

 const mongoURI: string = 
 "mongodb+srv://balikisjubril9:VXLFDMz1yx0J7W19@personalfinancetracker.y5gsa.mongodb.net/personalfinancetracker"

mongoose
.connect(mongoURI)
.then(() => console.log("CONNECTED TO MONGODB"))
.catch((err) =>console.error('FAILED TOCONNECT TO MONGODB',err));

app.use("/financial-records", financialRecordRouter);

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})
