import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Articles from "../pages/Articles/Articles";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AddArticle from "../pages/User/AddArticle/AddArticle";
import Article from "../pages/Article/Article";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyArticles from "../pages/User/MyArticles/MyArticles";
import UpdateArticle from "../pages/User/UpdateArticle/UpdateArticle";
import AdminRoute from "./AdminRoute";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles/AllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AllPublishers from "../pages/Dashboard/AllPublishers/AllPublishers";

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
        path: "add-article",
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "update-article/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "/articles/:id",
        element: (
          <PrivateRoute>
            <Article />
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
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-articles",
        element: <AllArticles />,
      },
      {
        path: "all-publishers",
        element: <AllPublishers />,
      },
      {
        path: "add-publisher",
        element: <AddPublisher />,
      },
    ],
  },
]);
