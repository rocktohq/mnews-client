import PropTypes from "prop-types";
import { PiCrownFill } from "react-icons/pi";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { articleSlicer } from "../../../utils/utils";

const TrendingCard = ({ article }) => {
  return (
    <div className="border-2 rounded-md hover:shadow-md duration-200 bg-base-100 flex flex-col justify-between h-[550px] mx-5">
      <figure className="relative">
        <img className="rounded-t-md" src={article?.image} />
        {article.isPremium && (
          <div className="absolute px-3 py-1 bg-black opacity-90 text-white font-bold top-1 left-1 flex items-center gap-2">
            <PiCrownFill className="text-orange-500" />
            Premium
          </div>
        )}
      </figure>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-3">{article?.title}</h2>
        <p className="text-neutral-600 text-justify">
          {articleSlicer(article?.description)}
          &nbsp;
          <Link to={`/articles/${article._id}`}>
            <button className="btn btn-primary rounded-md btn-sm">
              Read More
            </button>
          </Link>
        </p>
      </div>
      <div className="p-5 border-1 border-t flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={article?.publisher?.logo}
          />
          <p className="text-neutral-500">{article?.publisher?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <IoMdEye size={26} />
          <p className="text-neutral-500">{article?.views}</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;

TrendingCard.propTypes = {
  article: PropTypes.object,
};
