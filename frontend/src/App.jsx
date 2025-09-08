import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddStudent from "./pages/admin/studentManagement/AddStudent";
import ViewStudents from "./pages/admin/studentManagement/ViewStudents";
import AddSubject from "./pages/admin/subjectManagement/AddSubject";
import ViewSubjects from "./pages/admin/subjectManagement/ViewSubjects";
import AddAnnouncement from "./pages/admin/announcementManagement/AddAnnouncement";
import ViewAnnouncements from "./pages/admin/announcementManagement/ViewAnnouncements";
import AddBatch from "./pages/admin/batchManagement/AddBatch";
import ViewBatch from "./pages/admin/batchManagement/ViewBatch";
import AddLecturer from "./pages/admin/lecturerManagement/AddLecturer";
import ViewLecturers from "./pages/admin/lecturerManagement/ViewLecturers";
import LecturerLayout from "./layout/LecturerLayout";
import LecturerDashboard from "./pages/lecturer/LecturerDashboard";
import ViewAssignments from "./pages/lecturer/assignmentManagement/ViewAssignments";
import AddQuiz from "./pages/lecturer/quizManagement/AddQuiz";
import ViewQuiz from "./pages/lecturer/quizManagement/ViewQuiz";
import AddResources from "./pages/lecturer/resourceManagement/AddResources";
import ViewResources from "./pages/lecturer/resourceManagement/ViewResources";
import StudentLayout from "./layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import Login from "./pages/common/Login";
import Navbar from "./components/common/Navbar";
import NotFound from "./pages/common/NotFound";
import StudentManagement from "./pages/admin/studentManagement/StudentManagement";
import SubjectManagement from "./pages/admin/subjectManagement/SubjectManagement";
import AnnouncementManagement from "./pages/admin/announcementManagement/AnnouncementManagement";
import BatchManagement from "./pages/admin/batchManagement/BatchManagement";
import LecturerManagement from "./pages/admin/lecturerManagement/LecturerManagement";
import AddAssignments from "./pages/lecturer/assignmentManagement/AddAssignments";
import AssignmentManagement from "./pages/lecturer/assignmentManagement/AssignmentManagement";
import ResourceManagement from "./pages/lecturer/resourceManagement/ResourceManagement";
import QuizManagement from "./pages/lecturer/quizManagement/QuizManagement";
import PaymentManagement from "./pages/admin/paymentManagement/PaymentManagement";
import AttendanceManagement from "./pages/lecturer/attendanceManagement/AttendanceManagement";
import ForgotPassword from "./pages/common/ForgotPassword";
import  { Toaster } from 'react-hot-toast';
import { AppContext } from "./context/AppContext";
import Loading from "./components/common/Loading";
import ManageProfile from "./pages/common/ManageProfile";
import StudentCurrentSubject from "./pages/student/StudentCurrentSubject";
import ViewAssignmentSubmissions from "./pages/lecturer/assignmentManagement/ViewAssignmentSubmissions";
import ViewQuizSubmissions from "./pages/lecturer/quizManagement/ViewQuizSubmissions";

const App = () => {
  const {loading} = useContext(AppContext)
  if(loading){
    return  <Loading />
  }
  
  return (
    <div className="">
      <Toaster />
      <Navbar />

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-[60px]">
        <Routes>
          {/* ---------------------------------------------------------------------------------------- */}
          {/*  -------------     LOGIN    ------------------------  */}
          {/* ---------------------------------------------------------------------------------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/manage-profile" element={<ManageProfile />} />

          {/* ---------------------------------------------------------------------------------------- */}
          {/*  -------------     ADMIN LAYOUT   ------------------------  */}
          {/* ---------------------------------------------------------------------------------------- */}

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="student-management" element={<StudentManagement />} />
            <Route
              path="student-management/add-student"
              element={<AddStudent />}
            />
            <Route
              path="student-management/view-students"
              element={<ViewStudents />}
            />
            <Route path="subject-management" element={<SubjectManagement />} />
            <Route
              path="subject-management/add-subject"
              element={<AddSubject />}
            />
            <Route
              path="subject-management/view-subjects"
              element={<ViewSubjects />}
            />
            <Route
              path="announcement-management"
              element={<AnnouncementManagement />}
            />
            <Route
              path="announcement-management/add-announcement"
              element={<AddAnnouncement />}
            />
            <Route
              path="announcement-management/view-announcements"
              element={<ViewAnnouncements />}
            />
            <Route path="batch-management" element={<BatchManagement />} />
            <Route path="batch-management/add-batch" element={<AddBatch />} />
            <Route
              path="batch-management/view-batches"
              element={<ViewBatch />}
            />
            <Route
              path="lecturer-management"
              element={<LecturerManagement />}
            />
            <Route
              path="lecturer-management/add-lecturer"
              element={<AddLecturer />}
            />
            <Route
              path="lecturer-management/view-lecturers"
              element={<ViewLecturers />}
            />
            <Route
              path="payment-management"
              element={<PaymentManagement />}
            />
          </Route>

          {/* ---------------------------------------------------------------------------------------- */}
          {/*  -------------     LECTURER LAYOUT   ------------------------  */}
          {/* ---------------------------------------------------------------------------------------- */}

          <Route path="lecturer" element={<LecturerLayout />}>
            <Route index element={<LecturerDashboard />} />
            <Route
              path="assignment-management"
              element={<AssignmentManagement />}
            />
            <Route
              path="assignment-management/add-assignment"
              element={<AddAssignments />}
            />
            <Route
              path="assignment-management/view-assignments"
              element={<ViewAssignments />}
            />
             <Route
              path="assignment-management/view-submissions/:assignmentId"
              element={<ViewAssignmentSubmissions />}
            />
            <Route path="quiz-management" element={<QuizManagement />} />
            <Route path="quiz-management/add-quiz" element={<AddQuiz />} />
            <Route path="quiz-management/view-quizzes" element={<ViewQuiz />} />
            <Route path="quiz-management/view-quizzes/:quizId" element={<ViewQuizSubmissions />} />
            <Route
              path="resource-management"
              element={<ResourceManagement />}
            />
            <Route
              path="resource-management/add-resource"
              element={<AddResources />}
            />
            <Route
              path="resource-management/view-resources"
              element={<ViewResources />}
            />
            <Route
              path="attendance-management"
              element={<AttendanceManagement />}
            />
          </Route>

          {/* ---------------------------------------------------------------------------------------- */}
          {/*  -------------     STUDENT LAYOUT   ------------------------  */}
          {/* ---------------------------------------------------------------------------------------- */}

          <Route path="student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="enrolled-subjects/:subjectId" element={<StudentCurrentSubject />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
