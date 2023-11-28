import { LuLogOut } from "react-icons/lu";
import { FaBook, FaGalacticRepublic, FaUsers } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Drawer = () => {
  const { signOutUser } = useAuth();

  const handleLogOut = async () => {
    await signOutUser();
    toast.success("User logged out");
  };

  return (
    <div className="drawer-side ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <p className="divider">Dashboard</p>
        <li>
          <Link to="/dashboard">
            <FaHome></FaHome>
            Dashboard
          </Link>
        </li>

        <li>
          <NavLink to="/dashboard/all-users">
            <FaUsers></FaUsers>
            All Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-articles">
            <FaBook />
            All Articles
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/all-publishers">
            <FaGalacticRepublic />
            All Publishers
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/add-publisher">
            <FaGalacticRepublic />
            Add Publisher
          </NavLink>
        </li>
        <div className="divider"></div>
        <li>
          <NavLink to="/">
            <FaHome></FaHome>
            Home
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogOut}>
            <LuLogOut color="white" /> Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
