import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../../components/shared/ArticleCard/ArticleCard";

const Articles = () => {
  const axiosSecure = useAxiosSecure();
  // Limit [Koyta Data Show Korte Chan]
  const limit = 2;

  // Data Fetching Function
  const getArticles = async ({ pageParam = 0 }) => {
    const res = await axiosSecure(`/articles?limit=${limit}&page=${pageParam}`);
    return { ...res.data, prevOffset: pageParam };
  };

  // Infinite Query [TanstackQuery]
  const { data, fetchNextPage, hasNextPage, isPending, isLoading } =
    useInfiniteQuery({
      queryKey: ["articles"],
      queryFn: getArticles,
      getNextPageParam: (lastPage) => {
        if (lastPage.prevOffset + limit > lastPage.articlesCount) {
          return false;
        }
        return lastPage.prevOffset + limit;
      },
      onSettled: () => {
        QueryClient.invalidateQueries(["articles"]);
        QueryClient.clear();
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
        <title>mNews | All Articles</title>
      </Helmet>
      <Title heading={"All Articles"} subHeading="Read All Articles" big />
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div className="text-center my-5">Loading...</div>}
        endMessage={<div className="text-center my-5">No more data</div>}
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

export default Articles;
