import Assignment from "../models/assignmentModel.js";
import AssignmentSubmission from "../models/assignmentSubmissionModel.js";
import Quiz from "../models/quizModel.js";
import QuizSubmission from "../models/quizSubmissionModel.js";
import User from "../models/userModel.js";


export const submitAssignment = async (req, res) => {
    try {

        const {userId} = req.params;



        if(!userId){
            return res.status(400).json({ success: false, message: "User ID is required in params" });
        }

        const { assignmentId, studentId, title, batchName, departmentName, studentName, subjectName, deadline  } = req.body;


        //  check user already submitted
        const existingSubmission = await AssignmentSubmission.findOne({
            where: {
                assignmentId,
                studentId
            }
        });
        if(existingSubmission){
            return res.json({ success: false, message: "You have already submitted this assignment." });
        }
    
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
        lecturerId: assignment.lecturerId,
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


export const submitQuiz = async (req, res) => {
    try {

        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({ success: false, message: "User ID is required in params" });
        }

        const { quizId, studentId, title, batchName, departmentName, studentName, subjectName, deadline  } = req.body;
    
        // Check if the assignment exists
        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
            }

             //  check user already submitted
        const existingSubmission = await QuizSubmission.findOne({
            where: {
                quizId,
                studentId
            }
        });
        if(existingSubmission){
            return res.json({ success: false, message: "You have already submitted this quiz." });
        }

        
    
        // Create submission record
        const submission = await QuizSubmission.create({
        quizId,
        studentId,
        title,
        batchName,
        departmentName,
        studentName,
        subjectName,
        deadline,
        lecturerId: quiz.lecturerId,
        fileUrl: req.fileUrls || [],
        submittedAt: new Date(),
        });
    
        res.status(201).json({
        success: true,
        message: "Quiz submitted successfully.",
        submission,
        });
    } catch (error) {
        console.error("Submit Quiz Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// get assignment submissions of students
export const getAssignmentSubmissions = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({ success: false, message: "User ID is required in params" });
        }

        const submissions = await AssignmentSubmission.findAll({
            include: [
                {
                  model: User,
                  as: "student",
                
                },
                {
                    model: Assignment,
                    as: "assignment",
                }
              ],
           
            order: [["submittedAt", "DESC"]],
        });

        res.json({ success: true, submissions });
    } catch (error) {
        console.error("Fetch Assignment Submissions Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// get quiz submissions of students
export const getQuizSubmissions = async (req, res) => {
    try {
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({ success: false, message: "User ID is required in params" });
        }

        const submissions = await QuizSubmission.findAll({
            include: [
                {
                  model: User,
                  as: "student",
                
                },
                {
                    model: Quiz,
                    as: "quiz",
                }
              ],
           
            order: [["submittedAt", "DESC"]],
        });

        res.json({ success: true, submissions });
    } catch (error) {
        console.error("Fetch Quiz Submissions Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}