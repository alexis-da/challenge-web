import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context.jsx";

export function NavBar() {
  const userContext = useContext(UserContext);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-6 pt-6 pb-2  w-full bg-[#f6f6f8]">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-[#1754cf]">
          ReGear
        </h2>
        <nav className="flex items-center gap-4">
          <Link to="/home">Accueil</Link>
          {userContext.user ? (
            <button className="cursor-pointer" onClick={() => userContext.setUser(null)}>
              Déconnexion
            </button>
          ) : (
            <Link to="/">Connexion</Link>
          )}
          <Link to="/postCreation">Créer une annonce</Link>
          <Link to ="/userPosts">Mes annonces</Link>
        </nav>
      </div>
    </div>
  );
}
