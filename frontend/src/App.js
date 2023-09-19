import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./Routes.js"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
