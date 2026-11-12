import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/times")({ component: TeamsLayout });
function TeamsLayout() {
  return <Outlet />;
}
