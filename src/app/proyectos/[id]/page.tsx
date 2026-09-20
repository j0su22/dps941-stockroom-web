import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function ProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DashboardLayout><h1>Detalle de proyecto</h1><p>ID: {id}</p></DashboardLayout>;
}
