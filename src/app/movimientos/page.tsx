import MovementsView from "@/components/movements/MovementsView";

export default function MovementsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Movimientos
          </h1>

          <p className="mt-1 text-gray-600">
            Historial de entradas, salidas, devoluciones y traslados.
          </p>
        </div>

        <MovementsView />
      </div>
    </main>
  );
}