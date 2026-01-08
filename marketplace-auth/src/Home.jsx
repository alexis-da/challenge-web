import { NavBar } from "./NavBar.jsx";

export default function Home() {
  return (
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
              <h3 className="text-base font-bold text-gray-800 mb-3">{p.name}</h3>
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-[#1754cf]">{p.price}$</span>
                <button 
                  onClick={() => Add(p)}
                  className="py-1.5 px-3 text-sm rounded-lg bg-[#1754cf] text-white font-semibold shadow-lg shadow-[#1754cf]/25 hover:bg-blue-700 active:scale-[0.98] transition"
                >
                  Contacter
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

