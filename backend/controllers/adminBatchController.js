import Batch from "../models/batchModel.js";


export const createBatch = async (req, res) => {
    const { batchName, facultyName, departmentName } = req.body;
    if(!batchName || !facultyName || !departmentName) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
       
        
        const newBatch = await Batch.create({ batchName, facultyName, departmentName });

        const batchResponse = {
            id: newBatch.id,
            batchId: newBatch.batchId,
            batchName: newBatch.batchName,
            facultyName: newBatch.facultyName,
            departmentName: newBatch.departmentName,
            createdAt: newBatch.createdAt,
            updatedAt: newBatch.updatedAt
        };

        res.status(201).json({ success: true, message: "Batch created successfully", data: batchResponse });

    } catch (error) {
        console.error("Create Batch error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}

export const getAllBatches = async (req, res) => {
    try {
        const batches = await Batch.findAll();

        const batchResponses = batches.map(batch => ({
            id: batch.id,
            batchId: batch.batchId,
            batchName: batch.batchName,
            facultyName: batch.facultyName,
            departmentName: batch.departmentName,
            createdAt: batch.createdAt,
            updatedAt: batch.updatedAt
        }));

        res.status(200).json({ success: true, batches: batchResponses });
    } catch (error) {
        console.error("Get All Batches error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}