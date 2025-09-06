import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { AppContext } from "../../../context/AppContext";
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt, FaDownload } from "react-icons/fa";
import { deleteResource } from "../../../service/resourceService";
import toast from "react-hot-toast";
import Loading from "../../../components/common/Loading";

const ViewResources = () => {
  const navigate = useNavigate();
  const { resources, loading, setLoading, getLecturerResourcesDetails } = useContext(AppContext);


  

  const [resourceToDelete, setResourceToDelete] = useState(null);


  const getFileNameFromUrl = (url) => {
    try {
      return decodeURIComponent(url.split("/").pop().split("?")[0]);
    } catch {
      return "file";
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-600 text-2xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600 text-2xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-green-600 text-2xl" />;
      default:
        return <FaFileAlt className="text-gray-600 text-2xl" />; // generic file icon
    }
  };

  const deleteResourceHandler = async (resourceId) => {
    setLoading(true);
    const response = await deleteResource(resourceId);
    if (response.success) {
      toast.success(response.message);
      getLecturerResourcesDetails();
      setLoading(false);
      setResourceToDelete(null);

    } else {
      toast.error(response.message || "Failed to delete resource");
      setLoading(false);
    }
  };

  if(loading){
    return <Loading />
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/lecturer/resource-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer  text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <p>
          <IoChevronBackSharp className="" />
        </p>
        <p>Back</p>
      </button>
      {/* Display All Resources */}
      <div>
        <h1 className="text-2xl font-semibold">All Resources</h1>
        {resources.length === 0 ? (
          <p className="text-center mt-8 text-gray-500">
            No resources found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {resources.map((ass, index) => (
              <div
                key={index}
                className="border border-primaryColor/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
              >
                <h1 className="font-medium text-xl">
                  {ass.title} - {ass.Subject?.subjectCode}
                </h1>
                <p className="text-sm mt-2">Batch - {ass.batchName}</p>
             

                {/* Attached Files */}
                <div className="mt-4">
                  <p className="text-primaryColor/85 font-medium">
                    Attached Files
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {ass.fileUrl.length > 0 ? (
                      ass.fileUrl.map((file, idx) => {
                       
                        const fileName =
                          typeof file === "string"
                            ? getFileNameFromUrl(file)
                            : file.original_name ||
                              getFileNameFromUrl(file.url);

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded"
                          >
                            {getFileIcon(fileName)}

                            <a
                             href={file.public_id}
                             download={file.public_id}
                              target="_blank"
                              className="text-primaryColor hover:text-blue-700 inline-flex gap-2"
                              title="Download file"
                            >
                              <span className="text-sm max-w-[150px] truncate">
                                {fileName}
                              </span>
                              <FaDownload />
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm">No files attached</p>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid sm:grid-cols-2 sm:gap-4 mt-4">
                 
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <p className="text-sm text-gray-600">Created At</p>
                    <p>{new Date(ass.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4">
                  
                  <button
                    onClick={() => setResourceToDelete(ass)}
                    className="bg-red-500 text-white text-sm rounded hover:bg-red-400 duration-300 transition-all ease-linear py-2.5 px-8 cursor-pointer"
                  >
                    Delete Resource
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
       {/* Confirmation Modal */}
       {resourceToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{resourceToDelete.title}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setResourceToDelete(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteResourceHandler(resourceToDelete.resourceId)
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

export default ViewResources;
