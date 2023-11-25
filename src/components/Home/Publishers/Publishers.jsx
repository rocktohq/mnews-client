import usePublishers from "../../../hooks/usePublishers";
import Container from "../../shared/Container";
import Title from "../../shared/Title";
import PublisherCard from "./PublisherCard";

const Publishers = () => {
  const { publishers } = usePublishers();

  return (
    <Container className="py-20 bg-cyan-50">
      <Title
        heading="Our Publishers"
        subHeading="Checkout our publisher"
        big
        center
      />
      {publishers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5">
          {publishers.map((publisher) => (
            <PublisherCard key={publisher._id} publisher={publisher} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Publishers;
