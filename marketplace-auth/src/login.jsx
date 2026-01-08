import { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "./Auth.jsx";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("connexion");


  return (
    <div className="w-full bg-[#f6f6f8] rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-[#1754cf]">
          ReGear
        </h2>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Bienvenue</h1>
        <p className="text-sm text-gray-500">Connectez-vous pour continuer</p>
      </div>
      {/* Content */}
      <div className="px-8 pb-10 pt-2 w-[70vw] ml-[15vw]">
        {/* Tabs */}
        <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab("connexion")}
            className={`flex-1 py-2.5 rounded-[0.6rem] text-sm font-semibold ring-black/5 ${
              activeTab === "connexion"
                ? "bg-white text-[#1754cf]"
                : "text-gray-500 hover:text-gray-700 font-bold"
            }`}
          >
            Se connecter
          </button>

              <Link to="/inscription" className="flex-1 py-2.5 rounded-[0.6rem] text-center text-sm font-semibold  text-gray-500 hover:text-gray-700 font-bold font-bold shadow-sm ring-1 ring-black/5">S'inscrire</Link>

            

        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const try_login = {
            email: formData.get("email"),
            password: formData.get("password"),
          };
          console.log(Auth(try_login));
        }}>
          {/* Email */}
          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[##1754cf] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Mot de passe
            </label>
            <div className="flex justify-between items-center mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[#1754cf] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-[40vw] ml-[12vw] mt-2 py-4 rounded-xl bg-[#1754cf] text-white font-bold shadow-lg shadow-[#1754cf]/25 hover:bg-blue-700 active:scale-[0.98] transition"
          >
            Connexion
          </button>
        </form>
        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-gray-400 max-w-70 mx-auto">
          En vous connectant, vous acceptez nos{" "}
          <a className="underline hover:text-gray-600" href="#">
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a className="underline hover:text-gray-600" href="#">
            Politique de confidentialité
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
