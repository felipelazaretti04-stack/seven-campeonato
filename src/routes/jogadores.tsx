import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/jogadores")({ component: PlayersLayout });
function PlayersLayout() {
  return <Outlet />;
}
