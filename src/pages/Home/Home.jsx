import { Helmet } from "react-helmet-async";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header/Header";
import UserStats from "../../components/Home/UserStats";
import Founder from "../../components/Home/Founder";
import MobileApp from "../../components/Home/MobileApp";
import Publishers from "../../components/Home/Publishers";
import MembershipPlans from "../../components/Home/MembershipPlans";
import TrendingArticles from "../../components/Home/TrendingArticles";
import HeroSection from "../../components/Home/HeroSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>mNews | Home</title>
      </Helmet>
      <Header />

      {/* TODO: Hero Section */}
      <HeroSection />

      {/* TODO: Trending Articles */}
      <TrendingArticles />

      {/* TODO: Membership Plans */}
      <MembershipPlans />

      {/* TODO: Publishers */}
      <Publishers />

      {/* TODO: Stats */}
      <UserStats />

      {/* TODO: Founder */}
      <Founder />

      {/* TODO: Mobile Application */}
      <MobileApp />

      <Footer />
    </>
  );
};

export default Home;
