import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ReegisterPage from "./components/RegisterPage/ReegisterPage";
import firebase from './firebase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ChatPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<ReegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
