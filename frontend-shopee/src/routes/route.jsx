import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/(Non-Auth)/Login";
import { checkLogin, preventAuth } from "../helpers/guardHelper";
import MainLayout from "../components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    loader: preventAuth,
    element: <Login />,
  },
  {
    path: "/",
    loader: checkLogin,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>,
      },
    ],
  },
]);

export default router;
