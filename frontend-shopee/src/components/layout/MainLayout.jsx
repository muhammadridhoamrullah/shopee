import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <h1>This Is Main Layout</h1>

      <Outlet />
    </div>
  );
}
