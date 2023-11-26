import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Articles from "../pages/Articles/Articles";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyProfile from "../pages/MyProfile/MyProfile";
import ProfileInfo from "../pages/MyProfile/ProfileInfo";
import UpdateProfile from "../pages/MyProfile/UpdateProfile";
import ChangePassword from "../pages/MyProfile/ChangePassword";
import PrivateRoute from "./PrivateRoute";
import SingleArticle from "../pages/SingleArticle";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "articles",
        element: (
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        ),
      },
      {
        path: "/articles/:id",
        element: (
          <PrivateRoute>
            <SingleArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
        children: [
          {
            path: "my-profile",
            element: <ProfileInfo />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
