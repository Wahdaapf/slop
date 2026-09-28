import { PlayTestApp } from "@/components/PlayTestApp";

type PageProps = {
  params: Promise<{ path?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { path = [] } = await params;
  const role = path[0] ?? "developer";
  const section = path[1] ?? "dashboard";

  return <PlayTestApp role={role} section={section} />;
}
