import Login from "../pages/Login";
import {
    createBrowserRouter
  } from "react-router-dom";
import Register from "../pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
    {
      path: "/connections",
      element: <ConnectionLayout />,
    },
  ]);