import express, { Request, Response } from 'express';
import financialRecordModel from "../schema/financial-record";

const router = express.Router();

// GET all records by userId
router.get("/getAllByUserID:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId
    const records = await financialRecordModel.find({userId:userId});
    if (records.length === 0) {
       res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records)

  } catch (err) {
    res.status(500).send(err);
  }
});

// POST a new record
router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new financialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT update record by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await financialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true });

        if (!record)  res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE record by ID
router.delete("/:id", async (req: Request, res: Response) : Promise<void> => {
    try {
        const id = req.params.id;
        const record = await financialRecordModel.findByIdAndDelete(id);
        if (!record)  res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
