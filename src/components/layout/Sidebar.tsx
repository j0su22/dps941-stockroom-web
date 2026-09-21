"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUsers } from "@/data/mockData";

const NAV_SECTIONS: { title: string; items: { label: string; href: string; badge?: number }[] }[] = [
  {
    title: "OPERACIÓN",
    items: [
      { label: "Panel general", href: "/dashboard" },
      { label: "Inventario", href: "/inventario" },
      { label: "Movimientos", href: "/movimientos" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "Alertas", href: "/alertas", badge: 7 },
    ],
  },
  { title: "ANÁLISIS", items: [{ label: "Reportes", href: "/reportes" }] },
  {
    title: "ADMINISTRACIÓN",
    items: [
      { label: "Usuarios y permisos", href: "/usuarios" },
      { label: "Configuración", href: "/configuracion" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentUser = mockUsers[0]; // TODO: reemplazar por el usuario autenticado real

  return (
    <aside className="bg-[#1B2A6B] text-white flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex items-center gap-2 px-5 py-6">
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-red-500" />
          </span>
          <div>
            <p className="font-bold leading-none">STOCKROOM</p>
            <p className="text-xs text-blue-200">Grupo Dtech</p>
          </div>
        </div>

        <nav className="px-3 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-[11px] tracking-wide text-blue-300 px-2 mb-2">{section.title}</p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = pathname?.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          active ? "bg-amber-400 text-[#1B2A6B] font-semibold" : "text-blue-100 hover:bg-white/10"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge ? (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge}</span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-2">
          <span className="w-8 h-8 rounded-full bg-amber-400 text-[#1B2A6B] font-semibold flex items-center justify-center">
            {currentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
          <div>
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-blue-200">Supervisora</p>
          </div>
        </div>
      </div>
    </aside>
  );
}