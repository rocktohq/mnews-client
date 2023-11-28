import { Helmet } from "react-helmet-async";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const AddPublisher = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const handleAddPublisher = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    if (name === "" && !form.photo.files.length)
      return toast.error("All fields are required");
    else if (name === "") return toast.error("Name is required");
    else if (!form.photo.files.length) {
      return toast.error("Photo is required");
    }
    const image = { image: form.photo.files[0] };

    const toastId = toast.loading("Adding the article...");
    try {
      const imgbbRes = await axiosPublic.post(imgbbApiUrl, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgbbRes.data.success) {
        const res = await axiosSecure.post("/publishers", {
          name,
          image: imgbbRes.data.data.display_url,
        });
        if (res.data.insertedId) {
          toast.success("Publisher added successfully", { id: toastId });
          form.reset();
        }
      } else {
        toast.error("Imgbb Problems", { id: toastId });
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Publisher</title>
      </Helmet>
      <form
        onSubmit={handleAddPublisher}
        className="card-body p-5 shadow-md rounded-xl"
      >
        <p className="divider">Add Publisher</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Publisher Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Publisher Name"
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
            <FaPlus />
            Add Publisher
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPublisher;
