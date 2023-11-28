// import Container from "../components/shared/Container";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer/Drawer";
import { FaHamburger } from "react-icons/fa";

const Dashboard = () => {
  return (
    // <Container>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content lg:space-x-5">
          <div className="lg:flex gap-5">
            <label
              htmlFor="my-drawer-2"
              className="btn drawer-button lg:hidden"
            >
              <FaHamburger />
            </label>{" "}
            <span className="lg:hidden">Admin Panel</span>
          </div>
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
        <Drawer />
      </div>
    // </Container>
  );
};

export default Dashboard;
