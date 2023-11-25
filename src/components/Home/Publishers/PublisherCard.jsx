import PropTypes from "prop-types";

const PublisherCard = ({ publisher }) => {
  return (
    <div className="p-3 border bg-base-100 hover:bg-gray-100 flex flex-col justify-center items-center gap-5 rounded-xl">
      <img className="w-28 h-28 rounded-md" src={publisher.image} />
      <h3 className="text-xl font-bold">{publisher.name}</h3>
    </div>
  );
};

export default PublisherCard;

PublisherCard.propTypes = {
  publisher: PropTypes.object,
};
