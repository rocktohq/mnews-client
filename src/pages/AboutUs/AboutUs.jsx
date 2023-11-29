import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import Map from "./Map";
import aboutImage from "../../assets/images/about.webp";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <Container className={`py-10 bg-slate-50`}>
      <Helmet>
        <title>mNews - About Us</title>
      </Helmet>
      <Title
        heading={`About Us`}
        subHeading={`Learn all about Us`}
        big
        center
      />
      <div className="mt-10 flex flex-col-reverse lg:flex-row justify-between items-center gap-5">
        <div className="lg:w-1/2">
          <Title
            heading={`We are the helping hands to show your articles to the word`}
          ></Title>
          <address className="mt-5">
            <p>
              A-3, Monir Plaza, <br />
              2nd Floor Khilkhet, <br />
              Dhaka-1229, Bangladesh
            </p>
          </address>
          <div className="mt-5">
            <div>
              <p className="mb-2 font-bold">Email:</p>
              <p>admin@m-news.web.app</p>
            </div>
            <div>
              <p className="mb-2 font-bold">Phone:</p>
              <p>+8801711223344</p>
              <p>+8801712233445</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img className="w-full lg:h-96 object-cover" src={aboutImage} />
        </div>
      </div>

      <div className="mt-10">
        <Map />
      </div>
    </Container>
  );
};

export default AboutUs;
