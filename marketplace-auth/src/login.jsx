import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark font-display p-4">
      <div className="w-full max-w-105 bg-white dark:bg-[#1A202C] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button
            aria-label="Retour"
            className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Marketplace
          </h2>

          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="px-8 pb-10 pt-2">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold mb-2">Bienvenue</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connectez-vous pour continuer
            </p>
          </div>

          {/* Tabs */}
          <div className="flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8">
            <button className="flex-1 py-2.5 rounded-[0.6rem] bg-white dark:bg-gray-700 text-primary font-bold shadow-sm text-sm ring-1 ring-black/5 dark:ring-white/10">
              Se connecter
            </button>
            <button className="flex-1 py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              S'inscrire
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email ou Pseudo
              </label>
              <div className="relative group mt-1.5">
                <input
                  type="text"
                  placeholder="exemple@email.com"
                  className="w-full py-3.5 pl-4 pr-12 rounded-xl bg-background-light dark:bg-gray-800 shadow-inner outline-none focus:ring-2 focus:ring-primary transition"
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
                  mail
                </span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Mot de passe
              </label>
              <div className="relative group mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  className="w-full py-3.5 pl-4 pr-12 rounded-xl bg-background-light dark:bg-gray-800 shadow-inner outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-xs font-semibold text-primary hover:text-blue-700"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full mt-2 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Connexion
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <span className="px-4 bg-white dark:bg-[#1A202C]">
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-4">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <span className="text-sm font-bold">{provider}</span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-[10px] text-gray-400 dark:text-gray-500 max-w-70 mx-auto">
            En vous connectant, vous acceptez nos{" "}
            <a className="underline hover:text-gray-600" href="#">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a className="underline hover:text-gray-600" href="#">
              Politique de confidentialité
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
