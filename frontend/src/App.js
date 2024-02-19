import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Orders } from "./components/Orders";
import { Cart } from "./components/Cart";
import { Error } from "./components/Error";
import { Product } from "./components/Product";
import { AdminLogin } from "./components/AdminLogin";
import { AdminHome } from "./components/AdminHome";
import { AdminSignup } from "./components/AdminSignup";
import { AdminAddProduct } from "./components/AdminAddProduct";
import { AdminUpdateProduct } from "./components/AdminUpdateProduct";
import { AdminList } from "./components/AdminList";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
  return (
    <div>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/signup",
        element: <Signup />,
      },
      {
        path: "/user/home",
        element: <Home />,
      },
      {
        path: "/user/cart",
        element: <Cart />,
      },
      {
        path: "/user/orders",
        element: <Orders />,
      },
      {
        path: "/user/product/:productId",
        element: <Product />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/signup",
        element: <AdminSignup />,
      },
      {
        path: "/admin/home",
        element: <AdminHome />,
      },
      {
        path: "/admin/add-product",
        element: <AdminAddProduct />,
      },
      {
        path: "/admin/update-product/:productId",
        element: <AdminUpdateProduct />,
      },
      {
        path: "/admin/admins-list",
        element: <AdminList />,
      },
    ],
    errorElement: <Error />,
  },
]);

root.render(<RouterProvider router={appRouter} />);
