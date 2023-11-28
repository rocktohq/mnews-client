import PropTypes from "prop-types";
import { BiSearch } from "react-icons/bi";
import useTags from "../../hooks/useTags";
import usePublishers from "../../hooks/usePublishers";
const SearchFilter = ({ setSearch, setPublisher, setTag }) => {
  const { tagsManager } = useTags();
  const { publishers } = usePublishers();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    setPublisher("");
    setTag("");
  };

  const handlePublisher = (publisher) => {
    setPublisher(publisher);
    setSearch("");
    setTag("");
  };

  const handleTag = (tag) => {
    setTag(tag);
    setPublisher("");
    setSearch("");
  };
  return (
    <div className="my-5 flex flex-col md:flex-row md:justify-between items-center gap-5">
      <form onSubmit={handleSearch} className="flex items-center join">
        <input
          className="input input-bordered join-item focus:outline-none"
          placeholder="Search here..."
          type="search"
          name="search"
        />
        <button className="btn btn-primary join-item rounded-r-full">
          <BiSearch className="text-lg" />
        </button>
      </form>
      <div className="flex justify-center items-center gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Filter by Publisher</span>
          </label>
          <select
            name="publisher"
            className="select select-bordered focus:outline-none w-full"
            onChange={(e) => handlePublisher(e.target.value)}
          >
            <option disabled selected value="">
              Select Publisher
            </option>
            {publishers.length > 0 &&
              publishers.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Filter by Tag</span>
          </label>
          <select
            name="tag"
            className="select select-bordered focus:outline-none w-full"
            onChange={(e) => handleTag(e.target.value)}
          >
            <option disabled selected value="">
              Select Tag
            </option>
            {tagsManager.length > 0 &&
              tagsManager.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.value}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;

SearchFilter.propTypes = {
  setSearch: PropTypes.func,
  setPublisher: PropTypes.func,
  setTag: PropTypes.func,
};
