export default function ChantiersList({ chantiers, onDelete }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {chantiers.map((c) => (
        <div
          key={c.id}
          className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{c.nom}</h3>
            <p className="text-gray-600">{c.ville}</p>
          </div>
          <button
            onClick={() => onDelete(c.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
