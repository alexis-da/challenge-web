import { NavBar } from "./NavBar.jsx";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context.jsx";
import { Stars } from "./Stars.jsx";

export function UserPosts() {
  const [posts, setPosts] = useState([]);
  const userContext = useContext(UserContext);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/posts/user_posts/${userContext.user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des posts:", error);
      });
  }, []);

  const deletePost = (postId) => {
    fetch(`http://127.0.0.1:8000/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'annonce");
        }
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Erreur:", error.message);
        alert(error.message);
      });
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#f6f6f8]">
      <NavBar className="w-[90vw]" />
      <div className="max-w-6xl mx-auto bg-[#f6f6f8] rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden p-6">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((p) => (
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
                    onClick={() => deletePost(p.id)}
                    className="rounded-xl bg-red-500 px-5 py-3 text-white font-semibold hover:bg-red-400"
                  >
                    Supprimer
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
