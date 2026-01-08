import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./login.jsx";
import { Home } from "./Home.jsx";
import {Inscription} from "./inscription.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar} from './NavBar.jsx'


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inscription" element={<Inscription />}/>
    </Routes>
  </BrowserRouter>
);

