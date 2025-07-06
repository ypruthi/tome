import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import AuthCallback from "./AuthCallback";
import CoursePage from "@/components/custom/coursePage";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,          
      children: [
        { 
          path: "/", 
          element: <Dashboard /> },
        {
          path: "/auth/callback",
          element: <AuthCallback />,
        },
        { path: 
          "/courses/:courseId", 
          element: <CoursePage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
