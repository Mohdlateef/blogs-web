import { User } from "./types/authInterfaces";
import { API } from "..";
import toast from "react-hot-toast";

export const signUp = async ({ name, userName, email, password }: User) => {
  type Error = {
    status: string,
    message: string,
  }

  try {
    const res = await API.post(
      `/auth/sign-up`,
      {
        name: name,
        username: userName,
        email: email,
        password: password,
      },
      {
        params: null,
        headers: null,
      }
    );
    return res;
  } catch (error) {
    toast.error(error.message);
  }
};

export const signIn = async ({ loginId, password }: User) => {
  try {
    const res = await API.post(
      `/auth/sign-in`,
      {
        loginId,
        password,
      },
      {
        params: {
          userId: null,
        },
      }
    );

    if (res.data.status === 200) {
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
  } catch (error: Error) {
    return error
  }
};

export const logout = async () => {
  const res = await API.post(`/auth/logout`, {
    withCredentials: true,
  });
  console.log(res);
};
