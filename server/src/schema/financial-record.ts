import mongoose from "mongoose";

interface FinancialRecord {
    userID: String;
    date: Date;
    description: String;
    amount:number;
    category: String;
    paymentMethod:String;
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userID:{ type: String, required: true},
    date: { type: Date, required: true},
    description: { type: String, required: true},
    amount:{ type: Number, required: true},
    category: { type: String, required: true},
    paymentMethod:{ type: String, required: true}
});

const financialRecordModel =mongoose.model<FinancialRecord>("FinancialRecord",financialRecordSchema);

export default financialRecordModel;