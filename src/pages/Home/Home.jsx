import { Helmet } from "react-helmet-async";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header/Header";
import UserStats from "../../components/Home/UserStats/UserStats";
import Founder from "../../components/Home/Founder/Founder";
import MobileApp from "../../components/Home/MobileApp/MobileApp";
import Publishers from "../../components/Home/Publishers/Publishers";
import MembershipPlans from "../../components/Home/MembershipPlans/MembershipPlans";
import TrendingArticles from "../../components/Home/TrendingArticles/TrendingArticles";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import Opinions from "../../components/Home/Opinions/Opinions";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>mNews | Home</title>
      </Helmet>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Trending Articles */}
      <TrendingArticles />

      {/* Membership Plans */}
      <MembershipPlans />

      {/* TODO: Publishers */}
      <Publishers />

      {/* Stats */}
      <UserStats />

      {/* TODO: Opinions */}
      <Opinions />

      {/* Founder */}
      <Founder />

      {/* Mobile Application */}
      <MobileApp />

      <Footer />
    </>
  );
};

export default Home;
