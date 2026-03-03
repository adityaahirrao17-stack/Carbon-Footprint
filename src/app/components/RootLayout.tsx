import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";

export function RootLayout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen">
      {!isLanding && <Navigation />}
      <Outlet />
    </div>
  );
}
