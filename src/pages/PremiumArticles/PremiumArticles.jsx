import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import ArticleCard from "../../components/shared/ArticleCard/ArticleCard";
import Loader from "../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure("/premium-articles");
      return res.data.articles;
    },
  });

  // If Loading
  if (isPending || isLoading) return <Loader />;

  return (
    <Container className="py-10">
      <Helmet>
        <title>mNews | Premium Articles</title>
      </Helmet>
      <Title
        heading={"Premium Articles"}
        subHeading="Read Our Premium Articles"
        big
      />
      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default PremiumArticles;
