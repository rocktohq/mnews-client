import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div className="p-5 shadow-md rounded-xl">
      <p className="divider">Profile Settings</p>
      <div>
        <ul>
          <li>
            <NavLink to="/my-profile">&#187; My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/my-profile/change-password">
              &#187; Change Password
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-profile/update-profile">
              &#187; Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
