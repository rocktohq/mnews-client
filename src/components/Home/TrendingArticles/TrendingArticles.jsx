import { useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container";
import Loader from "../../shared/Loader";
import Title from "../../shared/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ArticleCard from "../../shared/ArticleCard";

const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trendingArticles = [], isPending } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosPublic("/articles?trending=6");
      return res.data;
    },
  });
  // console.log(trendingArticles);

  return (
    <Container className="py-20 bg-cyan-50">
      <Title
        heading="Trending Articles"
        subHeading="People are talking about"
        big
        center
      />
      {isPending && <Loader />}

      {trendingArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {trendingArticles.map((trendingArticle) => (
            <ArticleCard key={trendingArticle._id} article={trendingArticle} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default TrendingArticles;
