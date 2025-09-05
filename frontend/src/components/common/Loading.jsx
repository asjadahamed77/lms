import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/60   flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-[5px] border-white border-t-transparent border-b-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
