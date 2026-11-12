import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/jogos")({ component: GamesLayout });
function GamesLayout() {
  return <Outlet />;
}
