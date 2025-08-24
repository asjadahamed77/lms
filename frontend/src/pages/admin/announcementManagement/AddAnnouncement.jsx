import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { IoChevronBackSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";

const AddAnnouncement = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
   
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

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
              className="p-2 w-full rounded border border-primaryColor/30 resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label htmlFor="announcementImageUrl" className="cursor-pointer">
              <p className="font-semibold mb-1">Announcement Image</p>

              {!imagePreview ? (
                <div className="p-6 w-full rounded border border-primaryColor/30 flex items-center justify-center">
                  <RiImageAddFill className="text-4xl text-primaryColor/30" />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded border border-primaryColor/30"
                  />
                </div>
              )}
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="announcementImageUrl"
              onChange={handleImageChange}
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
