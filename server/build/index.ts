"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PWD:VXLFDMz1yx0J7W19
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_record_1 = __importDefault(require("./routes/financial-record"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
const mongoURI = "mongodb+srv://balikisjubril9:VXLFDMz1yx0J7W19@personalfinancetracker.y5gsa.mongodb.net/personalfinancetracker";
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.error('FAILED TOCONNECT TO MONGODB', err));
app.use("/financial-records", financial_record_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
