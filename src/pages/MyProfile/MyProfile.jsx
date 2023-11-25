import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Settings from "./Settings";
import { Outlet } from "react-router-dom";

const MyProfile = () => {
  return (
    <Container>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <Settings />
        </div>

        {/* Profile Options */}
        <div className="md:col-span-2">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
