import Container from "../../components/shared/Container";
import { Link, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Subscription = () => {
  const [seleted, setSelected] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubscription = async (e) => {
    e.preventDefault();

    const subPackage = e.target.package.value;
    const price = Number(subPackage);

    if (price == 0) return toast.error("Please select a package");
    const packageInfo = {
      email: user?.email,
      price: price,
      duration: price === 1 ? 60 : price * 24 * 60,
      //   startTime: Date.now(),
    };

    // console.log(packageInfo);

    const res = await axiosSecure.post("/payments", packageInfo);
    if (
      res.data.insertedId ||
      res.data.modifiedCount > 0 ||
      res.data.matchedCount > 0
    ) {
      navigate("/payment");
    }
  };

  return (
    <Container className="py-10">
      <Helmet>
        <title>mNews | Subscription</title>
      </Helmet>
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Buy Our Premium Subscription
            </h1>
            <p className="mb-5">
              Buy and unlock all premium articles from our articles archive.
            </p>
            <Link to="/subscription">
              <button className="btn btn-primary">Get Subscription</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 shadow-md p-5 rounded-xl mx-auto max-w-md">
        <h2 className="text-xl font-semibold text-center">Choose a Package</h2>
        <div className="mt-5">
          <form onSubmit={handleSubscription} className="space-y-3">
            <select
              name="package"
              className="input input-bordered focus:outline-none w-full"
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value={0}>Select One</option>
              <option value={1}>1 Minute - 1$</option>
              <option value={5}>5 Days - 5$</option>
              <option value={10}>10 Days - 10$</option>
              <option value={30}>30 Days - 30$</option>
            </select>
            <button
              className={`btn btn-primary w-full`}
              disabled={seleted > 0 ? "" : "disabled"}
            >
              <FaCrown /> Buy Now
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Subscription;
