import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import AddSubject from "./pages/admin/AddSubject";
import ViewSubjects from "./pages/admin/ViewSubjects";
import AddAnnouncement from "./pages/admin/AddAnnouncement";
import ViewAnnouncements from "./pages/admin/ViewAnnouncements";
import AddBatch from "./pages/admin/AddBatch";
import ViewBatch from "./pages/admin/ViewBatch";
import AddLecturer from "./pages/admin/AddLecturer";
import ViewLecturers from "./pages/admin/ViewLecturers";
import LecturerLayout from "./layout/LecturerLayout";
import LecturerDashboard from "./pages/lecturer/LecturerDashboard";
import ViewAssignments from "./pages/lecturer/ViewAssignments";
import AddQuiz from "./pages/lecturer/AddQuiz";
import ViewQuiz from "./pages/lecturer/ViewQuiz";
import AddResources from "./pages/lecturer/AddResources";
import ViewResources from "./pages/lecturer/ViewResources";
import StudentLayout from "./layout/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";

const App = () => {
  return (
    <div>
      <Routes>
        {/* ---------------------------------------------------------------------------------------- */}
        {/*  -------------     ADMIN LAYOUT   ------------------------  */}
        {/* ---------------------------------------------------------------------------------------- */}

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="view-students" element={<ViewStudents />} />
          <Route path="add-subject" element={<AddSubject />} />
          <Route path="view-subjects" element={<ViewSubjects />} />
          <Route path="add-announcement" element={<AddAnnouncement />} />
          <Route path="view-announcements" element={<ViewAnnouncements />} />
          <Route path="add-batch" element={<AddBatch />} />
          <Route path="view-batches" element={<ViewBatch />} />
          <Route path="add-lecturer" element={<AddLecturer />} />
          <Route path="view-lecturers" element={<ViewLecturers />} />
        </Route>

        {/* ---------------------------------------------------------------------------------------- */}
        {/*  -------------     LECTURER LAYOUT   ------------------------  */}
        {/* ---------------------------------------------------------------------------------------- */}

        <Route path="lecturer" element={<LecturerLayout />}>
          <Route index element={<LecturerDashboard />} />
          <Route path="add-assignment" element={<AddStudent />} />
          <Route path="view-assignments" element={<ViewAssignments />} />
          <Route path="add-quiz" element={<AddQuiz />} />
          <Route path="view-quiz" element={<ViewQuiz />} />
          <Route path="add-resourses" element={<AddResources />} />
          <Route path="view-resourses" element={<ViewResources />} />
        </Route>

        {/* ---------------------------------------------------------------------------------------- */}
        {/*  -------------     STUDENT LAYOUT   ------------------------  */}
        {/* ---------------------------------------------------------------------------------------- */}

        <Route path="student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
