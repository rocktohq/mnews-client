import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import ProfileInfo from "./ProfileInfo";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {
  return (
    <Container>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <ProfileInfo />
        </div>

        {/* Profile Options */}
        <div className="md:col-span-1">
          <UpdateProfile />
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
