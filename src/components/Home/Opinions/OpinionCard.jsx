import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const OpinionCard = ({ review }) => {
  return (
    <div className="border-2 rounded-md hover:shadow-md duration-200 bg-base-100 h-[350px] p-3 flex flex-col justify-between mx-2">
      <div className="flex flex-col justify-between">
        <div className="flex items-center text-center gap-2">
          <img
            className="h-16 w-16 md:h-28 md:w-28 rounded-full object-contain"
            src={review?.image}
          />
          <div className="text-center">
            <h2 className="md:text-xl font-bold mb-3">{review?.name}</h2>
            <StarRatings
              rating={parseFloat(review?.rating)}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor="#fc7914"
            />
          </div>
        </div>
        <div className="p-5">
          <p className="text-neutral-600 text-justify">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default OpinionCard;

OpinionCard.propTypes = {
  review: PropTypes.object,
};
