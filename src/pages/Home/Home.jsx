import { Helmet } from "react-helmet-async";
import UserStats from "../../components/Home/UserStats/UserStats";
import Founder from "../../components/Home/Founder/Founder";
import MobileApp from "../../components/Home/MobileApp/MobileApp";
import Publishers from "../../components/Home/Publishers/Publishers";
import MembershipPlans from "../../components/Home/MembershipPlans/MembershipPlans";
import TrendingArticles from "../../components/Home/TrendingArticles/TrendingArticles";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import Opinions from "../../components/Home/Opinions/Opinions";
import LatestNews from "../../components/Home/LatestNews/LatestNews";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const clearTimer = setTimeout(() => {
      setShowOffer(true);
    }, 10000);

    return () => clearTimeout(clearTimer);
  }, []);

  if (showOffer) {
    document.getElementById("offerModal").showModal();
  }

  return (
    <>
      <Helmet>
        <title>mNews | Home</title>
      </Helmet>

      {/* Latest News */}
      <LatestNews />

      {/* Hero Section */}
      <HeroSection />

      {/* Trending Articles */}
      <TrendingArticles />

      {/* Membership Plans */}
      <MembershipPlans />

      {/* Publishers */}
      <Publishers />

      {/* Stats */}
      <UserStats />

      {/* Opinions */}
      <Opinions />

      {/* Founder */}
      <Founder />

      {/* Mobile Application */}
      <MobileApp />

      {/* Offer Modal */}
      <dialog id="offerModal" className="modal">
        <div className="modal-box w-11/12 max-w-lg">
          <h3 className="font-bold text-2xl text-center">
            Big Offer! Super Offer
          </h3>
          <p className="py-4 text-center">
            We are providing a limited offer for our valuable users. Buy our
            premium subscription now!
          </p>
          <div className="text-center">
            <Link to="/subscription">
              <button className="btn rounded btn-primary">
                <FaCrown size={20} /> Go to Subscription Page
              </button>
            </Link>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
