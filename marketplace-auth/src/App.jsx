import { useEffect, useState } from "react";
import { UserContext } from "./context.jsx";
import Login from "./login.jsx";
import { Home } from "./Home.jsx";
import { Inscription } from "./inscription.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";
import { PostCreation } from "./postCreation.jsx";
import { UserPosts } from "./userPost.jsx";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={user ? <Home /> : <Login />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/postCreation" element={<PostCreation />} />
          <Route path="/userPosts" element={<UserPosts />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
