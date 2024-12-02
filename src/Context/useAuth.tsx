import { createContext, useEffect, useState } from "react";
import { UserProfile } from "./User"
import { useNavigate } from "react-router-dom";
import { animalAPI, loginAPI, registerAPI, editAPI } from "./Auth";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  editUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log(axios.defaults.headers.common["Authorization"]);
    }
    setIsReady(true);
  }, []);

  const editUser = async (email: string, username: string, password: string) => {
    await editAPI(email, username, password).then((res) => {
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.userName,
          email: res?.data.email
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        toast.success("Bienvenido! " + userObj.userName + " :)");
        navigate("/dashboard");
      }
    }).catch((e) => toast.warning("Error del servidor :("));
  };

  const registerUser = async (email: string, username: string, password: string) => {
    await registerAPI(email, username, password).then((res) => {
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.userName,
          email: res?.data.email
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        toast.success("Bienvenido! " + userObj.userName + " :)");
        navigate("/dashboard");
      }
    }).catch((e) => toast.warning("Error del servidor :("));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password).then((res) => {
      if (res && res.data?.token) {
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.userName,
          email: res?.data.email,
        };
        console.log(res.data?.token);
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        toast.success("Bienvenido! :)");
        navigate("/dashboard");
      } else {
        toast.error("Datos de login incorrectos :(");
        navigate("/login");
      }
    }).catch((e) => {
      console.log("error");
      toast.warning("Error del servidor");
    });
  };
  const isLoggedIn = () => {
    return !!user;
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/")
  };

  return (
    <UserContext.Provider value={{ user, token, editUser, registerUser, loginUser, logout, isLoggedIn }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
