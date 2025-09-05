import React from 'react'
import { FaFileAlt, FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa";


const ViewStudentResources = ({currentSubject}) => {
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
        return <FaFileAlt className="text-gray-600 text-2xl" />;
    }
  };

  

  return (
    <div>
         <h1 className="text-2xl font-semibold mb-6 border-b pb-2">Resources</h1>
         <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {currentSubject.Resources.length === 0 ? (
          <div>
            <p>No resources yet.</p>
          </div>
        ) : (
          currentSubject.Resources.map((ass, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 md:p-8 border border-primaryColor/30 rounded-lg hover:-translate-y-2 duration-300 transition-transform ease-linear"
            >
              <p className="font-medium text-xl">{ass.title}</p>
             

              <div className="mt-4">
                <p className="font-medium">Attached Files:</p>
                <div className="flex items-center gap-2">
                  {ass.fileUrl.map((url, idx) => (
                    <a
                      key={idx}
                      href={url.public_id}
                      download={url.public_id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline mt-1"
                    >
                      {getFileIcon(url.original_name)}
                      <span>{url.original_name}</span>
                    </a>
                  ))}
                </div>
              </div>

              

            

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ViewStudentResources
