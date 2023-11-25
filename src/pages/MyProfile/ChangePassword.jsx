import { Helmet } from "react-helmet-async";
import { LuSettings2 } from "react-icons/lu";

const ChangePassword = () => {
  const handleChangePassword = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <form
        onSubmit={handleChangePassword}
        className="card-body p-5 shadow-md rounded-xl"
      >
        <p className="divider">Change Password</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="input input-bordered focus:outline-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            className="input input-bordered focus:outline-none"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            <LuSettings2 />
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
