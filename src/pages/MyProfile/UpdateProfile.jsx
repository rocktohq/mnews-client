import { Helmet } from "react-helmet-async";
import { LuSettings } from "react-icons/lu";

const UpdateProfile = () => {
  const handleUpdate = (event) => {
    event.preventDefault();
    // const form = event.target;
  };
  return (
    <div>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <form onSubmit={handleUpdate} className="card-body p-5 shadow-md rounded-xl">
        <p className="divider">Update Profile</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="input input-bordered focus:outline-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered focus:outline-none"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">
            <LuSettings />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
