import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<NavBar />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
