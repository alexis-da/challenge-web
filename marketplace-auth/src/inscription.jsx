import { useState } from "react";
import { Link } from "react-router-dom";

export function Inscription() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("connexion");

  function createUser(data) {
    fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
        city: data.city,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(
              err.detail || "Erreur lors de la création de l'utilisateur"
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Utilisateur créé:", data);
        // Rediriger ou afficher un message de succès
      })
      .catch((error) => {
        console.error("Erreur:", error.message);
        alert(error.message); // Afficher l'erreur à l'utilisateur
      });
  }

  return (
    <div className="w-full bg-[#f6f6f8] rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Bienvenue</h1>
        <p className="text-sm text-gray-500">Connectez-vous pour continuer</p>
      </div>
      {/* Content */}
      <div className="px-8 pb-10 pt-2 w-[70vw] ml-[15vw]">
        {/* Tabs */}
        <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8">
          <Link
            to="/"
            className="flex-1 py-2.5 rounded-[0.6rem] text-center text-sm font-semibold  text-gray-500 hover:text-gray-700 shadow-sm ring-1 ring-black/5"
          >
            Se connecter
          </Link>

          <button
            onClick={() => setActiveTab("inscription")}
            className="flex-1 py-2.5 rounded-[0.6rem] text-sm bg-white text-[#1754cf] font-bold shadow-sm ring-1 ring-black/5"
          >
            S'inscrire
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              first_name: formData.get("first_name"),
              last_name: formData.get("last_name"),
              pseudo: formData.get("pseudo"),
              email: formData.get("email"),
              password: formData.get("password"),
              city: formData.get("city"),
            };
            console.log(data);
            createUser(data);
          }}
        >
          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Voineaux"
              className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[##1754cf] transition"
            />
          </div>

          {/*Prenom */}
          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Prenom
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Gael"
              className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[##1754cf] transition"
            />
          </div>

          {/*Pseudo */}
          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Pseudo
            </label>
            <input
              type="text"
              name="pseudo"
              placeholder="Drago"
              className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[##1754cf] transition"
            />
          </div>
          {/*Email */}

          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
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
                name="password"
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

          {/*city*/}
          <div className="flex flex-col gap-3">
            <label className="ml-1 text-sm font-semibold text-gray-700">
              Ville
            </label>
            <input
              type="text"
              name="city"
              placeholder="Bordeaux"
              className="w-[90%] py-3.5 pl-4 pr-12 rounded-xl bg-background-light shadow-inner outline-none focus:ring-2 focus:ring-[##1754cf] transition"
            />
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
        <footer className="mt-5 text-center text-[10px] text-gray-400 max-w-70 mx-auto">
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
