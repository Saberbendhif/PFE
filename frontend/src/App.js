import React from "react";
import Auth from "./components/Authentification/Auth";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/homepage/homepage";
function App() {
    
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
          <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    );
}

export default App;
