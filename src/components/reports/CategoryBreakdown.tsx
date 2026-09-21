import type { CategoryStock } from "@/types/report";

export default function CategoryBreakdown({ categories, total }: { categories: CategoryStock[]; total: number }) {
  return (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</p>
        <p className="text-xs text-gray-500">equipos</p>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {categories.map((cat) => (
          <li key={cat.category} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cat.color }} />
              {cat.category}
            </span>
            <span className="font-semibold text-gray-900">{cat.units.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}