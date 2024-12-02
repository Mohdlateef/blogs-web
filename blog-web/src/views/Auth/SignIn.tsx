import React, { useContext } from "react";
import { signIn } from "../../apiServices/auth/authApi";
// import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
// import userContext from "../../globalvaribles/context/userIdContext";
import userContext from "../../context/userIdContext";




const SignIn = () => {


  const [loginId, setLoginId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const user:any=useContext(userContext)
  const handleSubmit = () => {
    if (!loginId || !password) {
      alert("empty fields");
      return;
    }

    mutate({ loginId, password });
  };
  const { mutate } = useMutation({
    mutationFn: signIn, // Call the signUp function (which wraps the axios call)
    onSuccess: (apiData:any) => {
      // console.log(apiData.data._id);
      console.log(apiData.data.userDb._id,30);

      if (apiData.status === 200) {
        alert(apiData.message);
         user.setUserId(apiData.data.userDb._id)
        navigate("/");
      } else alert(apiData.message);
    },
    onError: (error:any) => {
      console.error("Sign-up failed:", error);
    },
  });

  return (
    <div className="h-screen bg-blue-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Sign In
        </h2>

        <input
          type="email"
          className="w-full p-3 mb-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Email or Username"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>

        <div className="text-center mt-4 text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <NavLink to="/signup" className="text-blue-600 hover:text-blue-700">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
