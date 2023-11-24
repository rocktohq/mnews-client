import PropTypes from "prop-types";
const Container = ({ children, className }) => {
  return (
    <div
      className={`max-w-screen-2xl mx-auto xl:px-20 lg:px-16 md:px-10 sm:px-4 px-2 ${
        className && className
      }`}
    >
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
