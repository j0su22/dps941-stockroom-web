import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function EquipoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DashboardLayout><h1>Ficha de equipo</h1><p>ID: {id}</p></DashboardLayout>;
}
