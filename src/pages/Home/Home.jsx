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

const Home = () => {
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
    </>
  );
};

export default Home;
