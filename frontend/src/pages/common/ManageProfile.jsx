import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/common/Loading";

const ManageProfile = () => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8 md:py-12 flex flex-col items-start w-full ">
      <h1 className="text-3xl text-wrap sm:text-4xl min-w-full font-medium">
        Hello, {user.nameWithInitials}
      </h1>
      <div className="w-full flex mt-6 flex-col gap-4">
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Full Name</p>
          <p className="text-primaryColor/80">{user.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Name with initials</p>
          <p className="text-primaryColor/80">{user.nameWithInitials}</p>
        </div>
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Registration Number</p>
          <p className="text-primaryColor/80">{user.registrationNumber}</p>
        </div>
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Gmail</p>
          <p className="text-primaryColor/80">{user.email}</p>
        </div>
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Role</p>
          <p className="text-primaryColor/80 capitalize">{user.role}</p>
        </div>
        {user.facultyName && (
          <div className="flex flex-col">
            <p className="sm:text-lg font-medium">Faculty</p>
            <p className="text-primaryColor/80 capitalize">
              {user.facultyName}
            </p>
          </div>
        )}
        {user.departmentName && (
          <div className="flex flex-col">
            <p className="sm:text-lg font-medium">Department</p>
            <p className="text-primaryColor/80 capitalize">
              {user.departmentName}
            </p>
          </div>
        )}
        {user.batchName && (
          <div className="flex flex-col">
            <p className="sm:text-lg font-medium">Batch</p>
            <p className="text-primaryColor/80 capitalize">{user.batchName}</p>
          </div>
        )}
        {user.role === "lecturer" && (
          <div>
            {user.lecturerSubjects.length > 0 ? (
              <div className="flex flex-col">
                <p className="sm:text-lg font-medium">Assigned Subjects</p>
                <div className="text-primaryColor/80  grid sm:grid-cols-2 gap-6 mt-2  w-fit">
                  {user.lecturerSubjects.map((subject, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-[250px] p-2 border border-primaryColor/40 rounded-lg hover:-translate-y-2 duration-300 transition-all transform"
                    >
                      <p>
                        Subject: <span>{subject.subjectName}</span>
                      </p>
                      <p>
                        Subject Code: <span>{subject.subjectCode}</span>
                      </p>
                      <p>
                        Batch: <span>{subject.batchName}</span>
                      </p>
                      <p>
                        Semester: <span>0{subject.subjectSemester}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="font-medium text-primaryColor/80">
                  No Subjects Assigned yet.
                </p>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col">
          <p className="sm:text-lg font-medium">Created</p>
          <p className="text-primaryColor/80">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
