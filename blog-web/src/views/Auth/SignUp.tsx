import React from "react";

import { signUp } from "../../apiServices/auth/authApi";
import { useMutation } from "@tanstack/react-query";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export const SingUp = () => {
  const [name, setName] = React.useState<any>("");
  const [userName, setUserName] = React.useState<any>("");
  const [email, setEmail] = React.useState<any>("");
  const [password, setPassword] = React.useState<any>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !userName || !email || !password) {
      alert("empty fields please fill all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password should be aleast 7 characters long");
      return;
    }
    mutate({ name, userName, email, password });
  };

  const { mutate } = useMutation({
    mutationFn: signUp, // Call the signUp function (which wraps the axios call)
    onSuccess: (apiData:any) => {
      console.log(apiData.status);
      if (apiData.status === 201) {
        alert(apiData.message);
        navigate("/signIn");
      } else alert(apiData.error);
    },
    onError: (error:any) => {
      console.error("Sign-up failed:", error);
    },
  });

  return (
    <div className="h-screen bg-blue-400 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8 space-y-4">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Sign Up
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            For="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SingUp;
