import Container from "../../shared/Container";
import Title from "../../shared/Title";
import founderImage from "../../../assets/images/founder.jpg";
const Founder = () => {
  return (
    <Container padding="py-10">
      <Title heading={"About Founder"} subHeading={"Founder's Speech"} big />
      <div className="flex flex-col md:flex-row gap-5 md:items-center mt-5">
        <figure className="md:w-1/2">
          <img
            className="w-4/5 h-4/5 md:w-96 md:h-96 rounded-full mx-auto md:mx-0"
            src={founderImage}
            alt="Founder"
          />
        </figure>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold">
            {`Insights from the Visionary: Founder's Corner`}
          </h3>
          <p>{`Step into the mind of our trailblazing founder as they share compelling perspectives, unveil the ethos driving mNews, and reflect on the journey that brought us here. In the Founder Speech section, discover the inspirations, challenges, and aspirations that shape the heartbeat of our news community. Gain exclusive access to the wisdom and foresight that fuels mNews' commitment to delivering impactful stories and fostering a space for informed discussions. Welcome to a space where the visionary spirit of mNews comes to life.`}</p>
        </div>
      </div>
    </Container>
  );
};

export default Founder;
