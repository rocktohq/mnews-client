import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Container from "../../shared/Container";

const LatestNews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: HeadLines = [], isPending } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosPublic("/trending-articles");
      return res.data;
    },
  });

  return (
    <Container>
      <div className="bg-gray-100 p-4 flex my-8">
        <button className="bg-error rounded-none text-white font-medium text-xl px-6 py-2">
          Latest
        </button>
        {isPending && <span></span>}
        <Marquee
          pauseOnHover={true}
          speed={100}
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          {HeadLines?.map((HeadLine) => (
            <div className="flex items-center" key={HeadLine._id}>
              <Link to={`/articles/${HeadLine._id}`}>
                <p className="hover:text-primary">{HeadLine.title}</p>
              </Link>
              <span className="mx-3 text-gray-400">||</span>
            </div>
          ))}
        </Marquee>
      </div>
    </Container>
  );
};

export default LatestNews;
