"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PWD:VXLFDMz1yx0J7W19
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_record_1 = __importDefault(require("./routes/financial-record"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
const mongoURI = "mongodb+srv://balikisjubril9:VXLFDMz1yx0J7W19@personalfinancetracker.y5gsa.mongodb.net/";
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.error('FAILED TO CONNECT TO MONGODB', err));
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});
app.use("/financial-record", financial_record_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
