import { useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container";
import Loader from "../../shared/Loader";
import Title from "../../shared/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrendingCard from "./TrendingCard";

const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trendingArticles = [], isPending } = useQuery({
    queryKey: ["trendingArticles"],
    queryFn: async () => {
      const res = await axiosPublic("/trending-articles");
      return res.data;
    },
  });
  // console.log(trendingArticles);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

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
        <div className="mt-5">
          <Slider {...settings}>
            {trendingArticles.map((trendingArticle) => (
              <TrendingCard
                key={trendingArticle._id}
                article={trendingArticle}
              />
            ))}
          </Slider>
        </div>
      )}
    </Container>
  );
};

export default TrendingArticles;
