import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noFooter =
    location.pathname.includes("articles") ||
    location.pathname.includes("premium-articles");

  return (
    <>
      <Header />
      <Outlet />
      {noFooter || <Footer />}
    </>
  );
};

export default Main;
