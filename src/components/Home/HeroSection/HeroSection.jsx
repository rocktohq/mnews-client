import Typewriter from "typewriter-effect";
import bannerImage from "../../../assets/images/banner.png";
import Container from "../../shared/Container";
const HeroSection = () => {
  return (
    <Container className="py-20">
      <div className="flex flex-col md:flex-row gap-5 md:justify-between md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-2xl lg:text-5xl font-bold text-neutral-600 overflow-hidden">
            {`Articles Unleashed:`}
            <span className="text-primary">
              <Typewriter
                options={{
                  strings: [
                    "Publish Your Articles",
                    "Read the Latest Articles",
                    "Subscribe for Premium Articles",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                }}
              />
            </span>
          </h1>
          <p className="text-gray-500 mt-8">
            {`Welcome to mNews, where news takes center stage, and you're the author of your information journey. Dive into a world of limitless stories, where you can read the latest headlines, publish your own news, and unlock premium content as a valued member. Elevate your news consumption to a premium level with exclusive insights and in-depth analysis, available only to our premium users. Join us at mNews and empower yourself with the news that matters. Your source, your stories, your premium experience awaits.`}
          </p>
        </div>
        <figure className="md:w-1/2">
          <img className="w-full rounded-xl" src={bannerImage} />
        </figure>
      </div>
    </Container>
  );
};

export default HeroSection;
