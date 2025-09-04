import Assignment from "../models/assignmentModel.js";
import AssignmentSubmission from "../models/assignmentSubmissionModel.js";


export const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, studentId, title, batchName, departmentName, studentName, subjectName, deadline  } = req.body;
    
        // Check if the assignment exists
        const assignment = await Assignment.findByPk(assignmentId);
        if (!assignment) {
        return res.status(404).json({ success: false, message: "Assignment not found" });
        }
    
        // Create submission record
        const submission = await AssignmentSubmission.create({
        assignmentId,
        studentId,
        title,
        batchName,
        departmentName,
        studentName,
        subjectName,
        deadline,
        
        fileUrl: req.fileUrls || [],
        submittedAt: new Date(),
        });
    
        res.status(201).json({
        success: true,
        message: "Assignment submitted successfully.",
        submission,
        });
    } catch (error) {
        console.error("Submit Assignment Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}