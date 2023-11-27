import Container from "../components/shared/Container";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container>
      <div className="flex">
        <div>
          <ul>
            <li>Admin Home</li>
            <li>All Users</li>
            <li>All Articles</li>
          </ul>
        </div>
        <Outlet />
      </div>
    </Container>
  );
};

export default Dashboard;
