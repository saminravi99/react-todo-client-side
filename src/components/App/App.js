import "./App.css";
import React, { createContext } from "react";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useToken from "../hooks/useToken";
import RequireAuth from "../RequireAuth/RequireAuth";
import Tasks from "../Tasks/Tasks";

export const AllContext = createContext();

function App() {
  //React Firebase Hook
  const [authUser] = useAuthState(auth);

  //Custom Hook For creating JWT Token For Social Login, Email Password Login And SignUp
  const [token] = useToken(authUser);
  console.log(token);

  return (
    <AllContext.Provider value={{}}>
      <div>
        <div>
          <Header></Header>
        </div>
        <Toaster></Toaster>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tasks" element={<RequireAuth><Tasks></Tasks></RequireAuth>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </AllContext.Provider>
  );
}

export default App;
