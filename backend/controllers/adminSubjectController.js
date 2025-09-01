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

export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();

        const subjectResponses = subjects.map(subject => ({
            id: subject.id,
            subjectId: subject.subjectId,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            subjectSemester: subject.subjectSemester,
            facultyName: subject.facultyName,
            departmentName: subject.departmentName,
            batchName: subject.batchName,
            createdAt: subject.createdAt

        }))

        res.status(200).json({success: true, subjects: subjectResponses})
    } catch (error) {
        console.error("Get All Subjects error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}

// export const getSubjectById = async (req, res) => {
//     const {batchId} = req.params;
//     try {
//         const subject = await Subject.findOne({where: {batchId}});
//         if(!subject){
//             return res.status(404).json({success: false, message: "Subject not found"})
//         }
//         res.status(200).json({success: true, subject})
//     } catch (error) {
//         console.error("Get Subject By Id error:", error);
//         res.status(500).json({ success: false, message: error.message || "Internal server error" });
//     }
// }

export const deleteSubject = async (req, res) => {
    const {subjectId} = req.params;
    
    
    
    try {
        const subject = await Subject.findOne({where: {subjectId}});
       
        
        if(!subject){
            return res.status(404).json({success: false, message: "Subject not found"})
        }
        await subject.destroy();
        res.status(200).json({success: true, message: "Subject deleted successfully"})
    } catch (error) {
        console.error("Delete Subject error:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}