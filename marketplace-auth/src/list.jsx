

const Pizzas = [
  { id: 1, name: "Pizza Reine", price: 9.99, img: "/assets/reine.jpg" },
  { id: 2, name: "Hawaïenne", price: 12.0, img: "/assets/hawaiien.jpg" },
  { id: 3, name: "Margherita", price: 8.99, img: "/assets/marguerita.avif" },
  { id: 4, name: "Napolitaine", price: 8.99, img: "/assets/napolitaine.avif" },
  { id: 5, name: "Calzone", price: 8.99, img: "/assets/calzone.jpg" },
  { id: 6, name: "Diavola", price: 8.99, img: "/assets/diavola.avif" },
  { id: 7, name: "Pepperoni", price: 8.99, img: "/assets/peperoni.webp" },
  { id: 8, name: "Saumon Crème", price: 8.99, img: "/assets/saumon.jpg" },
 

]

export function Pizza({ addToCart }) {
  function Add(p) {
    addToCart(p)
  }

  return (
    <div className="pizza-grid">
      {Pizzas.map((p) => (
        <article className="pizza-card" key={p.id}>
          <img className="pizza-img" src={p.img} alt={p.name} />
          <div className="pizza-body">
            <h3 className="pizza-name">{p.name}</h3>
            <div className="pizza-footer">
              <span className="pizza-price">{p.price}$</span>
              <button className="pizza-btn" onClick={() => Add(p)}>
                Acheter
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
