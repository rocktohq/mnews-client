import { Helmet } from "react-helmet-async";
import { LuSettings } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Imgbb API
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // const navigate = useNavigate();

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const photo = { image: form.photo.files[0] };

    // Upadting Profile
    const toastId = toast.loading("Updating profile...");
    // if (form.photo.files.length) {}
    try {
      const imgbbRes = await axiosPublic.post(imgbbApiUrl, photo, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgbbRes.data.success) {
        try {
          await updateUserProfile(name, imgbbRes.data.data.display_url);
          await axiosSecure.put(`/users/${user?.email}`, {
            name,
            photo: imgbbRes.data.data.display_url,
          });

          toast.success("Profile updated", { id: toastId });
          // navigate("/my-profile");
          window.location.reload();
        } catch (error) {
          toast.error(error.message, { id: toastId });
          // console.log("Updating", error);
        }
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
      // console.log("Imgbb", error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <form
        onSubmit={handleUpdate}
        className="card-body p-5 shadow-md rounded-xl"
      >
        <p className="divider">Update Profile</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            defaultValue={user?.displayName}
            className="input input-bordered focus:outline-none"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            name="photo"
            className="file-input file-input-bordered focus:outline-none"
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
