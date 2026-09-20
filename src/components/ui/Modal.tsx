export default function Modal({ children, open }: { children: React.ReactNode; open: boolean }) {
  if (!open) return null;
  return <div role="dialog" aria-modal="true">{children}</div>;
}
