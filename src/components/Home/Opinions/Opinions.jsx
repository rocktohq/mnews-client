import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Container from "../../shared/Container";
import Title from "../../shared/Title";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../shared/Loader";
import OpinionCard from "./OpinionCard";

const Opinions = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

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
      <Title heading="Opinions" subHeading="What Users Say" big center />
      {isPending && <Loader />}
      {reviews.length > 0 && (
        <div className="mt-5">
          <Slider {...settings}>
            {reviews.map((review) => (
              <OpinionCard key={review._id} review={review} />
            ))}
          </Slider>
        </div>
      )}
    </Container>
  );
};

export default Opinions;
