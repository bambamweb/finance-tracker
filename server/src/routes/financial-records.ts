import express, { Request, Response } from 'express';
import financialRecordModel from "../schema/financial-record";

const router = express.Router();

// GET all records by userId
router.get("/getAllByUserID/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const records = await financialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      res.status(404).json({ message: "No records found for the user." });
    } else {
      res.status(200).json(records);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST a new record
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new financialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT update record by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await financialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true });

    if (!record) {
      res.status(404).json({ message: "Record not found" });
    } else {
      res.status(200).json(record);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE record by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const record = await financialRecordModel.findByIdAndDelete(id);

    if (!record) {
      res.status(404).json({ message: "Record not found" });
    } else {
      res.status(200).json(record);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;


