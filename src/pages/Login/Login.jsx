import { Helmet } from "react-helmet-async";
import Header from "../../components/shared/Header/Header";
import Footer from "../../components/shared/Footer/Footer";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { googleSignIn } = useAuth();
  const handleLogin = (event) => {
    event.preventDefault();
  };

  const handleGoogleLogin = () => {
    const toastId = toast.loading("Login in user...");
    googleSignIn()
      .then((data) => {
        if (data?.user?.email) {
          toast.success("Login successful", { id: toastId });
        }
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <>
      <Helmet>
        <title>mNews | Login</title>
      </Helmet>
      <Header />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="my-5">
              Please login to get access of unlimited features of our eManage
              website.
            </p>
            <figure className="hidden lg:block">
              <img className="w-3/6 mx-auto rounded-2xl" src="" alt="Login" />
            </figure>
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body pb-0">
              <p className="divider">User Login</p>
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
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="mt-2">
                » Need an account?{" "}
                <Link
                  state="/"
                  to="/register"
                  className="hover:underline text-primary"
                >
                  Register here
                </Link>
                .
              </p>
            </form>
            <div className="card-body pt-0">
              <span className="divider">OR</span>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-primary btn-outline"
              >
                <FaGoogle /> Login with Google
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
