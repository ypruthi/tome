import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import AuthCallback from "./AuthCallback";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,          
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/auth/callback",
          element: <AuthCallback />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
