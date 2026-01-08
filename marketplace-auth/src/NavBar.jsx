import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-6 pb-2  w-full bg-[#f6f6f8]">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-[#1754cf]">
          ReGear
        </h2>
        <nav>
          <Link to="/home">Acceuil</Link>
        </nav>
      </div>
    </div>
  );
}
