import { Helmet } from "react-helmet-async";
import Header from "../../components/shared/Header/Header";
import Footer from "../../components/shared/Footer/Footer";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Imgbb API
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const Login = () => {
  const { signUpUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (event) => {
    event.preventDefault();

    //* Data from User Input
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = { image: form.photo.files[0] };

    // * Validations
    // If all fields are empty
    if (name === "" && photo === "" && email === "" && password === "") {
      return toast.error("All fields are required!");
    }
    // If name field is empty
    else if (name === "") {
      return toast.error("Please provide your name!");
    }
    // If photo field is empty
    else if (photo === "") {
      return toast.error("Please upload your photo!");
    }

    // If email field is empty
    else if (email === "") {
      return toast.error("Please provide your email!");
    }
    // If email field is not valid
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return toast.error("Please provide an valid email!");
    }
    // If password field is empty
    else if (password === "") {
      return toast.error("Password is required!");
    }
    // If password length is less than 6
    else if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long!");
    }
    // If password does not have atleast one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      return toast.error("Password must have an uppercase letter!");
    }
    // If password does not have atleast one special character
    else if (!/[!@#$%^&*]/.test(password)) {
      return toast.error("Password must have a special character!");
    }

    const toastId = toast.loading("Registering user...");
    try {
      const imgbbRes = await axiosPublic.post(imgbbApiUrl, photo, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      //   console.log(imgbbRes.data.data.display_url);

      if (imgbbRes.data.success) {
        try {
          await signUpUser(email, password);
          await updateUserProfile(name, imgbbRes.data.data.display_url);
          toast.success("Registration success", { id: toastId });
          //   navigate("/");
        } catch (error) {
          toast.error(error.message, { id: toastId });
        }
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>mNews | Register</title>
      </Helmet>
      <Header />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="my-5">
              Please login to get access of unlimited features of our eManage
              website.
            </p>
            <figure className="hidden lg:block">
              <img className="w-3/6 mx-auto rounded-2xl" src="" alt="Login" />
            </figure>
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form
              onSubmit={handleRegister}
              encType="multipart/form-data"
              className="card-body pb-0"
            >
              <p className="divider">User Registration</p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
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
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="mt-2">
                » Already have an account?{" "}
                <Link
                  state="/"
                  to="/login"
                  className="hover:underline text-primary"
                >
                  Login here
                </Link>
                .
              </p>
            </form>
            <div className="card-body pt-0">
              <span className="divider">OR</span>
              <button className="btn btn-primary btn-outline">
                <FaGoogle /> Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
