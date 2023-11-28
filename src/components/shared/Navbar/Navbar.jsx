import { Link, NavLink } from "react-router-dom";
import Container from "../Container";
import { LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import usePremium from "../../../hooks/usePremium";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { isAdmin } = useAdmin();
  const { isPremium } = usePremium();

  const handleLogOut = async () => {
    await signOutUser();
    toast.success("User logged out");
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          className="hover:text-primary hover:underline duration-300"
          to="/"
        >
          Home
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink
            className="hover:text-primary hover:underline duration-300"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className="hover:text-primary hover:underline duration-300"
          to="/articles"
        >
          All Articles
        </NavLink>
      </li>
      {user?.email && (
        <>
          <li>
            <NavLink
              className="hover:text-primary hover:underline duration-300"
              to="/add-article"
            >
              Add Article
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-primary hover:underline duration-300"
              to="/my-articles"
            >
              My Articles
            </NavLink>
          </li>
        </>
      )}
      {isAdmin || isPremium
        ? ""
        : user?.email && (
            <li>
              <NavLink
                className="hover:text-primary hover:underline duration-300"
                to="/subscription"
              >
                Subscription
              </NavLink>
            </li>
          )}
      {isPremium && (
        <li>
          <NavLink
            className="hover:text-primary hover:underline duration-300"
            to="/premium-articles"
          >
            Premium Articles
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <Container>
      <nav className="navbar bg-base-100 px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden mr-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <p className="text-3xl font-bold text-neutral-600 flex items-center">
              <span className="text-primary">/m</span>
              <span className="hidden md:flex">News</span>
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-3 text-lg">{navLinks}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {user?.email ? (
            <>
              <Link to="/my-profile">
                <img className="h-10 w-10 rounded-full" src={user.photoURL} />
              </Link>
              <button
                onClick={handleLogOut}
                className="btn btn-secondary rounded-md"
              >
                <LuLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary rounded-md">
                  <LuLogIn />
                  Login
                </button>
              </Link>
              <Link to="/register" className="hidden md:flex">
                <button className="btn btn-outline btn-secondary rounded-md">
                  <LuUserPlus />
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
