import type { SavedReport } from "@/types/report";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function SavedReportsTable({ reports }: { reports: SavedReport[] }) {
  if (reports.length === 0) {
    return <p className="text-sm text-gray-400 py-6 text-center">No hay reportes guardados todavía.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-100">
            <th className="py-2 font-medium">Reporte</th>
            <th className="py-2 font-medium">Periodicidad</th>
            <th className="py-2 font-medium">Destinatarios</th>
            <th className="py-2 font-medium">Última generación</th>
            <th className="py-2 font-medium">Formato</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b border-gray-50">
              <td className="py-3 font-medium text-gray-900">{report.name}</td>
              <td className="py-3 text-gray-600">{report.frequency}</td>
              <td className="py-3 text-gray-600">{report.recipients} personas</td>
              <td className="py-3 text-gray-600">{formatDate(report.lastGenerated)}</td>
              <td className="py-3">
                <div className="flex gap-1">
                  {report.formats.map((f) => (
                    <span key={f} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}