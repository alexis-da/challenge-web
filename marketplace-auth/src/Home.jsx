import { Stars } from "./Stars.jsx";
import { NavBar } from "./NavBar.jsx";
import { useState } from "react";
import "./index.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Listings = [
  {
    Id: 1,
    Title: "Je crée un site web moderne et responsive",
    Description:
      "Je conçois un site web professionnel en HTML, CSS et JavaScript, optimisé pour mobile, rapide et adapté à votre activité.",
    Price: 250.0,
    City: "Bordeaux",
    Photo: "/assets/web-dev.jpg",

    CreatedAt: "2026-01-08T10:00:00",
  },
  {
    Id: 2,
    Title: "Je développe une application React ",
    Description:
      "Création d'une application React moderne avec composants réutilisables, gestion d'état et design responsive.",
    Price: 400.0,
    City: "Bordeaux",
    Photo: "/assets/react-app.jpg",

    CreatedAt: "2026-01-08T10:00:00",
  },
  {
    Id: 3,
    Title: "Je corrige vos bugs JavaScript et React",
    Description:
      "Débogage rapide et efficace de vos projets JavaScript ou React. Analyse du code, corrections et explications incluses.",
    Price: 60.0,
    City: "Paris",
    Photo: "/assets/debug-js.jpg",

    CreatedAt: "2026-01-08T10:00:00",
  },
  {
    Id: 4,
    Title: "Je réalise un shooting photo professionnel",
    Description:
      "Shooting photo professionnel pour portraits, événements ou réseaux sociaux. Retouches incluses et rendu haute qualité.",
    Price: 180.0,
    City: "Bordeaux",
    Photo: "/assets/shooting-photo.jpg",

    CreatedAt: "2026-01-08T10:00:00",
  },
  {
    Id: 5,
    Title: "Je retouche vos photos comme un pro",
    Description:
      "Retouches photo avancées (lumière, couleurs, peau, cadrage) sur Lightroom et Photoshop pour un rendu professionnel.",
    Price: 40.0,
    City: "Lyon",
    Photo: "/assets/photo-retouch.jpg",

    CreatedAt: "2026-01-08T10:00:00",
  },
  {
    Id: 6,
    Title: "Je crée votre portfolio développeur ",
    Description:
      "Portfolio moderne et personnalisé pour développeurs ou photographes, design soigné, rapide et optimisé SEO.",
    Price: 220.0,
    City: "Bordeaux",
    Photo: "/assets/portfolio.jpg",
    CreatedAt: "2026-01-08T10:00:00",
  },
];




export function Home() {
  const handleContact = (listing) => {
    console.log("Contacter pour:", listing.Title);
  };
  const [open, setOpen] = useState(false);



  return (
    <div className="bg-[#f6f6f8]">
      <NavBar />
      <div className="max-w-6xl mx-auto bg-[#f6f6f8] rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden p-6">
        <div className="grid grid-cols-3 gap-4">
          {Pizzas.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-lg border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-[#1754cf]">
                    {listing.Price}€
                  </span>
                  <button
                    onClick={() => setOpen(true)}
                    className="rounded-xl bg-sky-500 px-5 py-3 text-white font-semibold hover:bg-sky-400"
                  >
                    Laisser un avis
                  </button>
                  {open && (
                    <div
                      className="fixed inset-0 bg-white/10 backdrop-blur-xs  flex items-center justify-center"
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className="bg-[#f6f6f8] p-6 rounded-xl w-80 text-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h2>Laisser un avis</h2>
                        <Stars iconSize={100}></Stars>
                      <button
                      className="rounded-xl bg-sky-500 px-5 py-3 text-white font-semibold hover:bg-sky-400"
                      onClick={()=>setOpen(false)}
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => handleContact(listing)}
                    className="rounded-xl bg-sky-500 px-5 py-3 text-white font-semibold hover:bg-sky-400"                >
                  Contacter
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
    </div>
  );
}
