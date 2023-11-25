import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div className="p-5 shadow-md rounded-xl">
      <p className="divider">Profile Settings</p>
      <div>
        <ul>
          <li>
            <NavLink to="/user/my-profile">&#187; My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/user/change-password">&#187; Change Password</NavLink>
          </li>
          <li>
            <NavLink to="/user/update-profile">&#187; Update Profile</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
