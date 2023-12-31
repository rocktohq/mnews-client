import PropTypes from "prop-types";
import { articleSlicer } from "../../../utils/utils";
import usePremium from "../../../hooks/usePremium";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { PiCrownFill } from "react-icons/pi";

const ArticleCard = ({ article }) => {
  const {
    _id,
    title,
    image,
    isPremium: premiumArticle,
    description,
    publisher,
    views,
    tags,
    dateAdded,
  } = article;
  const { isPremium } = usePremium();
  const navigate = useNavigate();

  return (
    <div
      className={`p-5 border-2 hover:shadow-md rounded-xl flex flex-col justify-between space-y-3 ${
        premiumArticle ? "border-secondary" : "border-base-300"
      }`}
    >
      <figure className="relative">
        <img className="rounded-xl w-full h-80 object-cover" src={image} />
        {article.isPremium && (
          <div className="absolute px-3 py-1 bg-black opacity-90 text-white font-bold top-1 left-1 flex items-center gap-2">
            <PiCrownFill className="text-orange-500" />
            Premium
          </div>
        )}
      </figure>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>
          {articleSlicer(description)} &nbsp;{" "}
          <button
            onClick={() => navigate(`/articles/${_id}`)}
            className={`btn rounded-md ${
              premiumArticle && isPremium
                ? "btn-secondary"
                : premiumArticle && !isPremium
                ? "btn-disabled"
                : "btn-primary"
            }`}
          >
            View Full Article
          </button>
        </p>
        <p className="px-4 py-2 bg-slate-100 rounded">
          <span className="font-semibold">Tags: </span>{" "}
          {tags.map((tag) => tag).join(", ")}
        </p>
      </div>
      <div className="py-3 border-1 border-t flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={publisher?.logo}
          />
          <p className="text-neutral-500">{publisher?.name}</p>
        </div>
        <p>{dateAdded && dateAdded}</p>
        <div className="flex items-center gap-2">
          <IoMdEye size={26} />
          <p className="text-neutral-500">{views}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

ArticleCard.propTypes = {
  article: PropTypes.object,
};
