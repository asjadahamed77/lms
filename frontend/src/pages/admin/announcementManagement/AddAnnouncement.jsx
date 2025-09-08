import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { IoChevronBackSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { createAnnouncement } from "../../../service/announcementService";
import Loading from "../../../components/common/Loading";

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const { loading, setLoading, getAnnouncements } = useContext(AppContext);
  const [filePreviews, setFilePreviews] = useState([]); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: [],
  });

  // handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle file input (image/pdf/doc)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: files,
    }));

    // preview logic
    const previews = files.map((file) => {
      if (file.type.startsWith("image/")) {
        return { type: "image", url: URL.createObjectURL(file), name: file.name };
      } else if (file.type === "application/pdf") {
        return { type: "pdf", name: file.name };
      } else if (
        file.type ===
          "application/msword" || // .doc
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
      ) {
        return { type: "doc", name: file.name };
      } else {
        return { type: "other", name: file.name };
      }
    });

    setFilePreviews(previews);
  };

  const submitHandler =  async (e) => {
    e.preventDefault();
    

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.files && formData.files.length > 0) {
      for (let i = 0; i < formData.files.length; i++) {
        form.append("files", formData.files[i]);
      }
    }
    setLoading(true);
    try {
    const response = await createAnnouncement(form);
    
    if(response.success){
      setLoading(false);
      toast.success(response.message);
      getAnnouncements()
    }
    } catch (error) {
      toast.error("Failed to create announcement");
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  if(loading){
    return <Loading />
  }

  return (
    <div className="py-8 md:py-12">
      <button
        onClick={() => navigate("/admin/announcement-management")}
        className="flex items-center gap-1 text-sm mb-6 cursor-pointer text-primaryColor/80 border border-transparent hover:border-primaryColor/80 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-primaryColor/10"
      >
        <IoChevronBackSharp />
        <p>Back</p>
      </button>

      <div className="w-full sm:w-3/4 md:w-1/2 mx-auto border rounded-xl border-primaryColor/30 px-2 sm:px-4 md:px-6 py-8">
        <h1 className="text-2xl font-semibold">Add Announcement</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Announcement Title</label>
            <input
              type="text"
              placeholder="IEEE Conference 2025"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Announcement Description</label>
            <textarea
              rows={4}
              placeholder="IEEE Conference 2025 will be held ...."
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 w-full rounded border border-primaryColor/30 resize-none"
              required
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label htmlFor="announcementFiles" className="cursor-pointer">
              <p className="font-semibold mb-1">Attach Files (Image / PDF / DOC)</p>

              {filePreviews.length === 0 ? (
                <div className="p-6 w-full rounded border border-primaryColor/30 flex items-center justify-center">
                  <RiImageAddFill className="text-4xl text-primaryColor/30" />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filePreviews.map((file, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-32 h-20 object-cover rounded border border-primaryColor/30"
                        />
                      ) : file.type === "pdf" ? (
                        <FaFilePdf className="text-4xl text-red-500" />
                      ) : file.type === "doc" ? (
                        <FaFileWord className="text-4xl text-blue-500" />
                      ) : (
                        <span className="text-gray-500">📎</span>
                      )}
                      <p className="text-sm">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              className="hidden"
              id="announcementFiles"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg mt-4 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Add Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;
