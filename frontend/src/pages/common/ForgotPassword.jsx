import React, { useEffect, useRef, useState } from "react";

const ForgotPassword = () => {
  const [askEmail, setAskEmail] = useState(true);
  const [askOtp, setAskOtp] = useState(false);
  const [askNewPassword, setAskNewPassword] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  const sendEmailHandler = (e) => {
    e.preventDefault();
    setAskEmail(false);
    setAskOtp(true);
  };

  const sendOtpHandler = (e) => {
    e.preventDefault();
    setAskOtp(false);
    setAskNewPassword(true);
  };

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP input handlers
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); 

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        // clear current digit
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // move focus back
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, otp.length).split("");
    const newOtp = [...otp];
    paste.forEach((char, i) => {
      if (i < otp.length) newOtp[i] = char.replace(/\D/, "");
    });
    setOtp(newOtp);

    // focus last filled input
    const lastIndex = paste.length >= otp.length ? otp.length - 1 : paste.length;
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className="py-8 md:py-12 flex items-center justify-center w-full h-[calc(100vh-60px)]">
      {askEmail && (
        <form
          onSubmit={sendEmailHandler}
          className="flex flex-col items-center border border-primaryColor/30 rounded-lg p-6 sm:p-8 w-full mx-4 sm:mx-0 sm:w-[400px] gap-4"
        >
          <div className="flex flex-col  gap-2 w-full">
            <label className="font-semibold">Enter your email</label>
            <input
              type="email"
              placeholder="user@lms.ac.lk"
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg mt-2 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Send OTP
          </button>
        </form>
      )}

      {askOtp && (
        <form
          onSubmit={sendOtpHandler}
          className="flex flex-col items-center border border-primaryColor/30 rounded-lg p-6 sm:p-8 w-full mx-4 sm:mx-0 sm:w-[400px] gap-4"
        >
          <p className="text-lg font-medium">Enter your OTP</p>
          <div className="flex gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl border border-primaryColor/50 rounded-md focus:outline-primaryColor"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            {timer > 0
              ? `Resend OTP in ${timer}s`
              : (
                <p>Did not get the otp? <span className="text-primaryColor cursor-pointer hover:underline duration-150 ease-in-out">Resend Otp</span></p>
              )}
          </p>
          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg mt-2 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Verify OTP
          </button>
        </form>
      )}

      {askNewPassword && (
        <form
          className="flex flex-col items-center border border-primaryColor/30 rounded-lg p-6 sm:p-8 w-full mx-4 sm:mx-0 sm:w-[400px] gap-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold">Enter new password</label>
            <input
              type="password"
              placeholder="New password"
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primaryColor py-3 text-white w-full rounded-lg mt-2 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
