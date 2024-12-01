import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Feature from "../Guest/pages/Feature";
import HomePage from "../Guest/pages/HomePage";
import ExploreTemplates from "../Guest/pages/ExploreTemplates";
import ContactPage from "../Guest/pages/ContactPage";
import SignUpPage from "../Guest/pages/auth/SignUpPage";
import LoginPage from "../Guest/pages/auth/LoginPage";
import AdminLayout from "../Admin/AdminLayout";
import AdminLogin from "../Admin/Login";
import ProtectedRoute from "./ProtectedRoute";
import Index from "../Admin";
import UserLayout from "../User/UserLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Feature",
        element: <Feature />,
      },
      {
        path: "/Preview",
        element: <ExploreTemplates />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/sign-in",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),

    // children: [
    //   {
    //     path: "",
    //     element: (
    //       <ProtectedRoute>
    //         <AdminLayout />
    //       </ProtectedRoute>
    //     ),
    //   },
    //   // {
    //   //   path:'user/create',
    //   //   element:<NewGreeting />
    //   // },
    //   // {
    //   //   path:'user/template',
    //   //   element:<Greeting />
    //   // }
    // ],
  },
]);
