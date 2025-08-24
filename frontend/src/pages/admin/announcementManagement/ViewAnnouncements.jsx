import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const ViewAnnouncements = () => {
  const { announcements } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const announcementHandler = (announcement) => {
    setShowPopup(!showPopup);
    setSelectedAnnouncement(announcement);
  };
  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/student-management")}
        className="flex items-center gap-1 text-sm  cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      <h1 className="text-2xl font-semibold mt-4">All Announcements</h1>
      <div className="overflow-x-auto mt-8  border border-primaryColor/30">
        <table className="min-w-full ">
          <thead className="bg-blue-100 text-start">
            <tr>
              <th className="text-start p-2">Announcement ID</th>
              <th className="text-start p-2">Announcement Title</th>
              <th className="text-start p-2">Created</th>

              <th className="text-start p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="text-start p-2">
                  #{announcement.announcementId.substring(0, 8)}
                </td>
                <td className="text-start p-2">
                  {announcement.announcementTitle}
                </td>
                <td className="text-start p-2">
                  {new Date(announcement.createdAt).toLocaleString()}
                </td>

                <td className="text-start p-2">
                  <button
                    onClick={() => announcementHandler(announcement)}
                    className="px-3 py-1  bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                  >
                    View Announcement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Popup View Student */}
      {showPopup && selectedAnnouncement && (
        <div
          className={` w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center`}
        >
          <div className="w-full mx-4 sm:mx-0 sm:w-[500px] max-h-[calc(100vh-300px)] bg-white z-20 p-4 sm:p-8 h-fit overflow-y-auto rounded-lg ">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Announcement Details</h1>
              <p
                onClick={announcementHandler}
                className="text-2xl font-bold cursor-pointer "
              >
                <IoCloseSharp />
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <p className="font-medium sm:text-lg ">Announcement ID</p>
                <p className="text-sm">
                  #{selectedAnnouncement.announcementId}
                </p>
              </div>

              <div>
                <p className="font-medium sm:text-lg ">Announcement Title</p>
                <p className="text-sm">
                  {selectedAnnouncement.announcementTitle}
                </p>
              </div>
              <div>
                <p className="font-medium sm:text-lg ">
                  Announcement Description
                </p>
                <p className="text-sm">
                  {selectedAnnouncement.announcementDescription}
                </p>
              </div>

              <div>
              <p className="font-medium sm:text-lg ">Image</p>
              <img src={selectedAnnouncement.announcementImageUrl} alt="Preview" className="w-full h-auto" />
              </div>

              <div>
                <p className="font-medium sm:text-lg ">Created</p>
                <p className="text-sm">
                  {" "}
                  {new Date(selectedAnnouncement.createdAt).toLocaleString()}
                </p>
              </div>
             
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={announcementHandler}
                  className="bg-primaryColor text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
                >
                  Close
                </button>
                <button
                  onClick={announcementHandler}
                  className="bg-red-500 text-white text-sm rounded-lg py-2.5   cursor-pointer hover:bg-red-400 duration-300 transition-all ease-in-out"
                >
                  Delete Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAnnouncements;
