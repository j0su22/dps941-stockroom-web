export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <input
        type="text"
        placeholder="Buscar equipo, serie, proyecto..."
        className="w-full max-w-md rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
      />
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>Grupo Dtech</span>
        <span className="text-gray-300">|</span>
        <span>Sistema de inventario</span>
      </div>
    </header>
  );
}