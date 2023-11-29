import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import Map from "./Map";
import aboutImage from "../../assets/images/about.webp";

const AboutUs = () => {
  return (
    <Container className={`py-10 bg-slate-50`}>
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
              B-25, Mannan Plaza, <br />
              4th Floor Khilkhet, <br />
              Dhaka-1229, Bangladesh
            </p>
          </address>
          <div className="mt-5">
            <p>Email: admin@m-news.web.app</p>
            <p>Phone: +8801711223344</p>
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
