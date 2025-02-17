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
import UserLayout from "../User/UserLayout";
import Create from "../User/pages/Create.jsx";
import Scheduled from "../User/pages/Scheduled.jsx";
import Guestbook from "../User/pages/Guestbook.jsx";
import Index from "../User/pages/Index.jsx";
import Templates from "../User/pages/Templates.jsx";
import Settings from "../User/pages/Settings.jsx";
import Use_template from "../User/pages/Use_template.jsx";
import AdminDashboard from "../Admin/Dashboard";
import AdminUsers from "../Admin/Index";
import GreetingView from "../Guest/GreetingView.jsx";


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
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/whish/:slug",
    element: <GreetingView />,
  },

  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        ),
      },
      {
        path: "scheduled",
        element: (
          <ProtectedRoute>
            <Scheduled />
          </ProtectedRoute>
        ),
      },
      {
        path: "templates",
        element: (
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        ),
      },
      {
        path: "guestbook",
        element: (
          <ProtectedRoute>
            <Guestbook />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "template/:id",
        element: (
          <ProtectedRoute>
            <Use_template />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "users",
            element: (
              <ProtectedRoute requireAdmin={true}>
                <AdminUsers />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
