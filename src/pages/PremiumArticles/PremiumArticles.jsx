import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/shared/Container";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import ArticleCard from "../../components/shared/ArticleCard/ArticleCard";
import Loader from "../../components/shared/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const limit = 2;

  // Data Fetching Function
  const getArticles = async ({ pageParam = 0 }) => {
    const res = await axiosSecure(
      `/premium-articles?limit=${limit}&page=${pageParam}`
    );
    return { ...res.data, prevOffset: pageParam };
  };

  // Infinite Query [TanstackQuery]
  const { data, fetchNextPage, hasNextPage, isPending, isLoading } =
    useInfiniteQuery({
      queryKey: ["premiumArticles"],
      queryFn: getArticles,
      getNextPageParam: (lastPage) => {
        if (lastPage.prevOffset + limit > lastPage.articlesCount) {
          return false;
        }
        return lastPage.prevOffset + limit;
      },
    });

  // If Loading
  if (isPending || isLoading) return <Loader />;

  // Merging the Data
  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.articles];
  }, []);

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
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>Loading...☝️</div>}
      >
        {articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default PremiumArticles;
