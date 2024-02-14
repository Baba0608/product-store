import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login } from "./src/components/Login";
import { Signup } from "./src/components/Signup";
import { Home } from "./src/components/Home";
import { Orders } from "./src/components/Orders";
import { Cart } from "./src/components/Cart";
import { Error } from "./src/components/Error";
import { Product } from "./src/components/Product";
import { AdminLogin } from "./src/components/AdminLogin";
import { AdminHome } from "./src/components/AdminHome";
import { AdminSignup } from "./src/components/AdminSignup";
import { AdminAddProduct } from "./src/components/AdminAddProduct";
import { AdminUpdateProduct } from "./src/components/AdminUpdateProduct";
import { AdminList } from "./src/components/AdminList";

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
