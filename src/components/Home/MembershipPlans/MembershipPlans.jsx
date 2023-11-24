import { Link } from "react-router-dom";
import Container from "../../shared/Container";
import Title from "../../shared/Title";

const MembershipPlans = () => {
  return (
    <Container className="py-10 bg-slate-50">
      <Title
        heading={`Our Subscription Plans`}
        subHeading={`Choose the best one!`}
        big
        center
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {/* Plan: Bronze */}
        <div className="border-4 border-primary rounded-xl p-5 flex flex-col justify-between gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Bronze</h3>
            <p className="text-xl font-semibold">
              $1<span className="text-neutral-600 text-sm">/1Minute</span>
            </p>
          </div>
          <div>
            <ul>
              <li>- 1 Account</li>
              <li>- Cancel anytime</li>
              <li>- Premium articles</li>
            </ul>
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-primary text-white rounded-md w-full">
                Get Premium Bronze
              </button>
            </Link>
            <p className="text-center">
              <span>*</span> Terms and conditions apply.
            </p>
          </div>
        </div>
        {/* Plan: Silver */}
        <div className="border-4 border-secondary rounded-xl p-5 flex flex-col justify-between gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Silver</h3>
            <p className="text-xl font-semibold">
              $5<span className="text-neutral-600 text-sm">/5Days</span>
            </p>
          </div>
          <div>
            <ul>
              <li>- 1 Account</li>
              <li>- Cancel anytime</li>
              <li>- Premium articles</li>
            </ul>
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-secondary text-white rounded-md w-full">
                Get Premium Silver
              </button>
            </Link>
            <p className="text-center">
              <span>*</span> Terms and conditions apply.
            </p>
          </div>
        </div>
        {/* Plan: Gold */}
        <div className="border-4 border-warning rounded-xl p-5 flex flex-col justify-between gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Gold</h3>
            <p className="text-xl font-semibold">
              $10<span className="text-neutral-600 text-sm">/10Days</span>
            </p>
          </div>
          <div>
            <ul>
              <li>- 1 Account</li>
              <li>- Cancel anytime</li>
              <li>- Premium articles</li>
            </ul>
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-warning text-white rounded-md w-full">
                Get Premium Gold
              </button>
            </Link>
            <p className="text-center">
              <span>*</span> Terms and conditions apply.
            </p>
          </div>
        </div>
        {/* Plan: Platinum */}
        <div className="border-4 border-error rounded-xl p-5 flex flex-col justify-between gap-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Platinum</h3>
            <p className="text-xl font-semibold">
              $30<span className="text-neutral-600 text-sm">/30Days</span>
            </p>
          </div>
          <div>
            <ul>
              <li>- 1 Account</li>
              <li>- Cancel anytime</li>
              <li>- Premium articles</li>
            </ul>
          </div>
          <div>
            <Link to="/">
              <button className="btn btn-error text-white rounded-md w-full">
                Get Premium Platinum
              </button>
            </Link>
            <p className="text-center">
              <span>*</span> Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MembershipPlans;
