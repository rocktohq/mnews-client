import Container from "../../shared/Container";
import Title from "../../shared/Title";
import newsApp from "../../../assets/images/newsapp.png";
import appStore from "../../../assets/images/appstore.png";
import playStore from "../../../assets/images/playstore.png";

const MobileApp = () => {
  return (
    <Container className="py-20 bg-cyan-50">
      <Title
        heading={"Browse Smoothly from Anywhere"}
        subHeading={"Download Mobile Apps!"}
        big
        center
      />
      <div className="flex flex-col md:flex-row gap-5 mt-5 md:justify-between md:items-center">
        <div className="md:w-1/2">
          <div className="space-y-2 mb-10">
            <h3 className="text-xl font-semibold">
              No more worries about browsing news
            </h3>
            <p className="text-neutral-600">
              Brows our news portal easily from your phone; just install our
              mobile application. As simple as that.
            </p>
          </div>
          <div className="space-y-2">
            <img src={appStore} alt="AppStore" />
            <img src={playStore} alt="PlayStore" />
          </div>
        </div>
        <div className="md:w-1/2">
          <img className="" src={newsApp} alt="NewsApp" />
        </div>
      </div>
    </Container>
  );
};

export default MobileApp;
