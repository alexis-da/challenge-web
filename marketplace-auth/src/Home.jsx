import { NavBar } from "./NavBar.jsx";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context.jsx";
import { Stars } from "./Stars.jsx";

export function Home() {
  const [posts, setPosts] = useState([]);
  const userContext = useContext(UserContext);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des posts:", error);
      });
  }, []);

  function fetchUsers(userId) {
    fetch("http://127.0.0.1:8000/users/" + userId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      });
  }

  const handleContact = (listing) => {
    console.log("Contacter pour:", listing.Title);
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#f6f6f8]">
      <NavBar className="w-[90vw]" />
      <div className="max-w-6xl mx-auto bg-[#f6f6f8] rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden p-6">
        <div className="grid grid-cols-3 gap-4">
          {posts.map(
            (p) => (
              fetchUsers(p.user_id),
              (
                <article
                  key={p.id}
                  className="bg-white rounded-lg border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <img
                    src={"https://picsum.photos/900/900?random=" + p.id}
                    alt={p.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-800 mb-3">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {p.description}
                    </p>
                    <div className="flex flex-col items-center justify-between gap-2">
                      <span className="text-lg font-bold text-[#1754cf]">
                        {p.price}€
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
                            <h2 className="text-xl font-bold mb-4">
                              Laisser un avis
                            </h2>
                            <div className="mb-4">
                              <Stars
                                iconSize={40}
                                onRatingChange={setSelectedRating}
                                defaultRating={selectedRating}
                              />
                            </div>
                            {selectedRating > 0 && (
                              <p className="text-sm text-gray-600 mb-4">
                                Vous avez sélectionné {selectedRating} étoile
                                {selectedRating > 1 ? "s" : ""}
                              </p>
                            )}
                            <button
                              className="rounded-xl bg-sky-500 px-5 py-3 text-white font-semibold hover:bg-sky-400 w-full"
                              onClick={() => {
                                console.log(
                                  "Rating sélectionné:",
                                  selectedRating
                                );
                                setOpen(false);
                                setSelectedRating(0);
                              }}
                            >
                              {selectedRating > 0
                                ? "Soumettre l'avis"
                                : "Fermer"}
                            </button>
                          </div>
                        </div>
                      )}
                      <p className="rounded-xl bg-sky-500 px-5 py-3 text-white font-semibold hover:bg-sky-400">
                        {p.user_email}
                      </p>
                    </div>
                  </div>
                </article>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
