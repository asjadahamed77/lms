import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import {
    FaFilePdf,
    FaFileWord,
    FaFileImage,
    FaFileAlt,
    FaDownload,
  } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';


const AnnouncementsPage = () => {
    const {announcements, user, loading} = useContext(AppContext)

    const navigate = useNavigate();

    console.log(announcements);

    const getFileNameFromUrl = (url) => {
        try {
          return decodeURIComponent(url.split("/").pop().split("?")[0]);
        } catch {
          return "file";
        }
      };
    
 // return icon based on extension
 const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return <FaFilePdf className="text-red-600 text-xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600 text-xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-green-600 text-xl" />;
      default:
        return <FaFileAlt className="text-gray-600 text-xl" />;
    }
  };
  
    
    if(loading){
        return <Loading />
    }
  return user && (
    <div className="py-8 md:py-12">
         <button
        onClick={() => navigate("/student")}
        className="flex items-center gap-1 text-sm cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>
      <h1 className="text-2xl font-semibold mb-6">Announcements</h1>
      {announcements.length === 0 ? (
            <p>No announcements available.</p>
        ) : (
            <div className="mb-6 grid md:grid-cols-2  w-full  gap-8">
            {announcements.map((announcement,index) => (
                <div key={index} className=" border border-primaryColor/30 p-4 md:p-6 rounded-lg  w-full md:w-auto flex-shrink-0 ">
                <h2 className="font-medium text-lg">{announcement.title}</h2>
                <p className='text-sm text-primaryColor/80 my-4'>{announcement.description}</p>


                <div className="flex flex-wrap gap-4 mt-2 mb-4">
                    {announcement.fileUrl.length > 0 ? (
                      announcement.fileUrl.map((file, idx) => {
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


                <p className="text-primaryColor/70">
                    Posted on: {new Date(announcement.createdAt).toLocaleString()}
                </p>
               
                </div>
            ))}
            
            </div>
        )}
    </div>
  )
}

export default AnnouncementsPage
