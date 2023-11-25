import PropTypes from "prop-types";
import Rating from "react-rating";

const OpinionCard = ({ review }) => {
  return (
    <div className="border-2 rounded-md hover:shadow-md duration-200 bg-base-100 h-[250px] p-3 flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="space-y-3">
          <img
            className="h-28 w-28 rounded-full object-contain"
            src={review?.image}
          />
          <h2 className="text-xl font-bold mb-3">{review?.name}</h2>
        </div>
        <div className="p-5">
          <p className="text-neutral-600 text-justify">{review.comment}</p>
        </div>
      </div>
      <div className="text-center">
        <Rating initialRating={review?.rating} readonly={true} />
      </div>
    </div>
  );
};

export default OpinionCard;

OpinionCard.propTypes = {
  review: PropTypes.object,
};
