import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email,password)
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border-2 border-emerald-400 p-10 rounded-3xl">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="text-white border-2 border-emerald-400 bg-black p-4 rounded-xl "
            type="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-white border-2 border-emerald-400 bg-black p-4 rounded-xl placeholder:white"
            required
            type="password"
            placeholder="Enter your password"
          />
          <button className="text-emerald-200 border-2 p-4 rounded-3xl w-[10rem] mt-4 active:scale-95">
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
