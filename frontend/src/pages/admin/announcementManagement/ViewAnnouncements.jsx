import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { deleteAnnouncement } from "../../../service/announcementService";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";

const ViewAnnouncements = () => {
  const { announcements, loading, setLoading, getAnnouncements } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const announcementHandler = (announcement) => {
    if (announcement) {
      setSelectedAnnouncement(announcement);
      setShowPopup(true);
    } else {
      setSelectedAnnouncement(null);
      setShowPopup(false);
    }
  };

  const deleteAnnouncementHandler = async (announcementId) => {
    setLoading(true);
    const response = await deleteAnnouncement(announcementId);
    if (response.success) {
      toast.success(response.message);
      getAnnouncements();
      setLoading(false);
      setAnnouncementToDelete(null);
    }else{
      toast.error(response.message || "Failed to delete announcement");
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/announcement-management")}
        className="flex items-center gap-1 text-sm cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <h1 className="text-2xl font-semibold mt-4">All Announcements</h1>

      <div className="overflow-x-auto mt-8 border border-primaryColor/30">
        <table className="min-w-full">
          <thead className="bg-blue-100">
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
                <td className="p-2">
                  #{announcement.announcementId.substring(0, 8)}
                </td>
                <td className="p-2">{announcement.title}</td>
                <td className="p-2">
                  {new Date(announcement.createdAt).toLocaleString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => announcementHandler(announcement)}
                    className="px-3 py-1 bg-primaryColor text-white rounded-md text-sm hover:bg-primaryColor/80 duration-300 transition-all ease-linear cursor-pointer"
                  >
                    View Announcement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup View Announcement */}
      {showPopup && selectedAnnouncement && (
        <div className="w-screen h-screen fixed inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="w-full mx-4 sm:mx-0 sm:w-[500px] max-h-[calc(100vh-300px)] bg-white p-4 sm:p-8 overflow-y-auto rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-xl">Announcement Details</h1>
              <p
                onClick={() => announcementHandler(null)}
                className="text-2xl font-bold cursor-pointer"
              >
                <IoCloseSharp />
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <p className="font-medium sm:text-lg">Announcement ID</p>
                <p className="text-sm">
                  #{selectedAnnouncement.announcementId}
                </p>
              </div>

              <div>
                <p className="font-medium sm:text-lg">Title</p>
                <p className="text-sm">{selectedAnnouncement.title}</p>
              </div>

              <div>
                <p className="font-medium sm:text-lg">Description</p>
                <p className="text-sm">{selectedAnnouncement.description}</p>
              </div>

              {/* Files */}
              {selectedAnnouncement.fileUrl &&
                Array.isArray(selectedAnnouncement.fileUrl) &&
                selectedAnnouncement.fileUrl.length > 0 && (
                  <div>
                    <p className="font-medium sm:text-lg mb-2">Attachments</p>
                    <div className="flex flex-col gap-3">
                      {selectedAnnouncement.fileUrl.map((file, i) => {
                        // if file is an object, get the actual URL
                        const fileUrl =
                          typeof file === "string" ? file : file.url;

                        const isImage =
                          fileUrl.endsWith(".jpg") ||
                          fileUrl.endsWith(".png") ||
                          fileUrl.endsWith(".jpeg");
                        const isPdf = fileUrl.endsWith(".pdf");
                        const isDoc =
                          fileUrl.endsWith(".doc") || fileUrl.endsWith(".docx");

                        return (
                          <div key={i} className="flex items-center gap-3">
                            {isImage ? (
                              <img
                                src={fileUrl}
                                alt={`file-${i}`}
                                className="w-32 h-20 object-cover rounded border border-primaryColor/30"
                              />
                            ) : isPdf ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-red-600 underline"
                              >
                                <FaFilePdf className="text-2xl" />{" "}
                                {file.original_name}
                              </a>
                            ) : isDoc ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 underline"
                              >
                                <FaFileWord className="text-2xl" />{" "}
                                {file.original_name}
                              </a>
                            ) : (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-gray-600"
                              >
                                📎 {file.original_name}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              <div>
                <p className="font-medium sm:text-lg">Created</p>
                <p className="text-sm">
                  {new Date(selectedAnnouncement.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={() => announcementHandler(null)}
                  className="bg-primaryColor text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
                >
                  Close
                </button>
                <button   onClick={() => setAnnouncementToDelete(selectedAnnouncement)} className="bg-red-500 text-white text-sm rounded-lg py-2.5 cursor-pointer hover:bg-red-400 duration-300 transition-all ease-in-out">
                  Delete Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Confirmation Modal */}
       {announcementToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{announcementToDelete.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAnnouncementToDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteAnnouncementHandler(announcementToDelete.announcementId)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAnnouncements;
