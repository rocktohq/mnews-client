import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header/Header";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>mNews | Home</title>
      </Helmet>
      <Header />
      <Container>Hello world</Container>
      <Footer />
    </>
  );
};

export default Home;
