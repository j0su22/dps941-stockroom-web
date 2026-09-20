import Link from "next/link";

const links = [
  ["Panel general", "/dashboard"],
  ["Inventario", "/inventario"],
  ["Movimientos", "/movimientos"],
  ["Proyectos", "/proyectos"],
  ["Reportes", "/reportes"],
  ["Usuarios y permisos", "/usuarios"],
];

export default function Sidebar() {
  return (
    <aside>
      <strong>STOCKROOM</strong>
      <nav>
        {links.map(([label, href]) => <p key={href}><Link href={href}>{label}</Link></p>)}
      </nav>
    </aside>
  );
}
