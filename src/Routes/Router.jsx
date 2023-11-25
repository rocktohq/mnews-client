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
        path: "my-profile",
        element: <MyProfile />,
        children: [
          { path: "/my-profile", element: <ProfileInfo /> },
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
        path: "articles",
        element: <Articles />,
      },
      {
        path: "premium-articles",
        element: <PremiumArticles />,
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
