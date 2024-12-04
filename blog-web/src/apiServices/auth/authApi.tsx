const baseURL = "http://localhost:8000";
import axios from "axios";

import { User } from "./types/authInterfaces";
export const signUp = async ({ name, userName, email, password }: User) => {
  try {
    const res = await axios.post(`${baseURL}/auth/sign-up`, {
      name: name,
      username: userName,
      email: email,
      password: password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ loginId, password }: User) => {
  try {
    axios.defaults.withCredentails = true;

    const res = await axios.post(
      `${baseURL}/auth/sign-in`,
      {
        loginId,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.status === 200) {
      //store token in local
      localStorage.setItem(
        "isLogin",
        JSON.stringify({
          islogin: true,
          token: res.data.token,
          username: res.data.data.userDb.username,
          userId: res.data.data.userDb._id,
        })
      );
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  const res = await axios.post(`${baseURL}/auth/logout`, {
    withCredentials: true,
  });
  console.log(res);
};
