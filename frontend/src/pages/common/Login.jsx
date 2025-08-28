import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";

const Login = () => {
  const { organizationName } = useContext(AppContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/student')

    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={submitHandler}
        className="mt-[100px] w-full  sm:w-[400px] md:w-[500px] py-6 px-4 sm:px-6 shadow-[0px_2px_4px_2px] shadow-gray-300 rounded-[15px] sm:rounded-[25px]"
      >
        <h1 className="tracking-wide text-2xl font-semibold">
          Login to {organizationName}
        </h1>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Email</label>
            <input
              type="text"
              placeholder="lms@gmail.com"
              className="p-2 w-full rounded border border-primaryColor/30"
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              className="p-2 w-full rounded border border-primaryColor/30"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-primaryColor py-3 text-white w-full rounded-lg sm:rounded-xl mt-6 cursor-pointer hover:bg-primaryColor/80 duration-300 transition-all ease-in-out">Login</button>
        <Link to={'/forgot-password'} className="hover:text-primaryColor/80 duration-300 transition-all ease-in-out text-sm hover:underline">
        <p  className="mt-4">forgot password?</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
