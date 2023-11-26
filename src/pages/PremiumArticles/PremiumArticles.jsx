import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import ArticleCard from "../../components/shared/ArticleCard/ArticleCard";
import Loader from "../../components/shared/Loader";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { data: premiumArticles = [],isPending } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-articles");
      return res.data;
    },
  });
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
      {isPending && <Loader/>}
      
      {premiumArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {premiumArticles.map((premiumArticle) => (
            <ArticleCard key={premiumArticle._id} article={premiumArticle} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default PremiumArticles;
