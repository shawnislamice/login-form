import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainlAyout from "./Mainlayout/MainlAyout.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import HeroRegister from "./components/HeroRegister.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainlAyout></MainlAyout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },{
        path: "/register-hero",
        element: <HeroRegister></HeroRegister>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
