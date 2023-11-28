import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Subscription = () => {
  const handleSubscription = (e) => {
    e.preventDefault();

    const subPackage = e.target.package.value;
    const price = Number(subPackage);

    if (price == 0) return toast.error("Please select a package");
  };

  return (
    <Container className="py-10">
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
            >
              <option value={0}>Select One</option>
              <option value={1}>1 Minute - 1$</option>
              <option value={5}>5 Days - 5$</option>
              <option value={10}>10 Days - 10$</option>
              <option value={30}>30 Days - 30$</option>
            </select>
            <button className="btn btn-primary w-full">
              <FaCrown /> Buy Now
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Subscription;
