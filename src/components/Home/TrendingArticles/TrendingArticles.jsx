import Container from "../../shared/Container";
import Title from "../../shared/Title";

const TrendingArticles = () => {
  return (
    <Container className="py-20 bg-cyan-50">
      <Title
        heading="Trending Articles"
        subHeading="People are talking about"
        big
        center
      />
    </Container>
  );
};

export default TrendingArticles;
