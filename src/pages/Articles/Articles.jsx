import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "../../components/shared/ArticleCard/ArticleCard";

const Articles = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], isPending } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  return (
    <Container className="py-10">
      <Helmet>
        <title>mNews | All Articles</title>
      </Helmet>
      <Title heading={"All Articles"} subHeading="Read All Articles" big />
      {isPending && <Loader />}

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

export default Articles;
