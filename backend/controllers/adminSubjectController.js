import Subject from "../models/subjectModel.js";


export const createSubject = async (req, res)=> {
    const {batchName, departmentName, facultyName, subjectName, subjectCode, subjectSemester } = req.body
    if(!batchName || !departmentName || !facultyName || !subjectName || !subjectCode || !subjectSemester){
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const newSubject = await Subject.create({batchName, departmentName, facultyName, subjectName, subjectCode, subjectSemester})
        const subjectResponse = {
            id: newSubject.id,
            subjectId: newSubject.subjectId,
            batchName: newSubject.batchName,
            departmentName: newSubject.departmentName,
            facultyName: newSubject.facultyName,
            subjectName: newSubject.subjectName,
            subjectCode: newSubject.subjectCode,
            subjectSemester: newSubject.subjectSemester,
            createdAt: newSubject.createdAt,
            updatedAt: newSubject.updatedAt
        }
        res.status(201).json({success: true, message: "Subject created successfully", subject: subjectResponse})
    } catch (error) {
        console.error("Create Batch error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}