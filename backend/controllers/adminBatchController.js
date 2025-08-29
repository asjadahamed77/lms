import Batch from "../models/batchModel.js";


export const createBatch = async (req, res) => {
    const { batchName, facultyName, departmentName } = req.body;
    if(!batchName || !facultyName || !departmentName) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // check if faculty or department already exists
        const existingFaculty = await Batch.findOne({ where: { facultyName } });
        if(existingFaculty) {
            return res.status(409).json({ message: "Faculty already exists" });
        }
        const existingDepartment = await Batch.findOne({ where: { departmentName } });
        if(existingDepartment) {
            return res.status(409).json({ message: "Department already exists" });
        }

        const newBatch = await Batch.create({ batchName, facultyName, departmentName });

        const batchResponse = {
            id: newBatch.id,
            batchID: newBatch.batchID,
            batchName: newBatch.batchName,
            facultyName: newBatch.facultyName,
            departmentName: newBatch.departmentName,
            createdAt: newBatch.createdAt,
            updatedAt: newBatch.updatedAt
        };

        res.status(201).json({ success: true, message: "Batch created successfully", data: batchResponse });

    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}