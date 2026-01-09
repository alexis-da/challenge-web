import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./context.jsx";
import { NavBar } from "./NavBar.jsx";

export function PostCreation() {
  const [categories, setCategories] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories:", error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const postData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      city: formData.get("city"),
      user_id: userContext.user.id,
      category_id: parseInt(formData.get("category_id")),
    };
    console.log(postData);
    fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            const errorMessage = err.detail
              ? typeof err.detail === "string"
                ? err.detail
                : JSON.stringify(err.detail)
              : "Erreur lors de la création de l'annonce";
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Annonce créée:", data);
        alert("Annonce créée avec succès !");
      })
      .catch((error) => {
        console.error("Erreur:", error.message);
        alert(error.message);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <NavBar />
      <h1
        style={{
          color: "#333",
          marginBottom: "30px",
          fontSize: "2.5em",
          textAlign: "center",
        }}
      >
        Création d'une Annonce
      </h1>
      <form
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Titre de l'annonce
          </label>
          <input
            type="text"
            name="title"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Prix
          </label>
          <input
            type="number"
            name="price"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Ville
          </label>
          <input
            type="text"
            name="city"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Catégorie
          </label>
          <select
            name="category_id"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              backgroundColor: "white",
            }}
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option>Chargement...</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Créer l'annonce
        </button>
      </form>
    </div>
  );
}
