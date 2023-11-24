import PropTypes from "prop-types";

const Title = ({ center, big, heading, subHeading }) => {
  return (
    <div className={`border-primary ${center && "text-center"}`}>
      <h2 className={`${big ? "text-3xl" : "text-2xl"} font-bold uppercase`}>
        {heading && heading}
      </h2>
      <p className={`${big ? "text-lg" : "text-md"} text-neutral-600`}>
        {subHeading && subHeading}
      </p>
    </div>
  );
};

export default Title;

Title.propTypes = {
  big: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  center: PropTypes.bool,
};
