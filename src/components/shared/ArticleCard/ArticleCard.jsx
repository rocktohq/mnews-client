import PropTypes from "prop-types";
import { articleSlicer } from "../../../utils/utils";
import usePremium from "../../../hooks/usePremium";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

const ArticleCard = ({ article }) => {
  const {
    _id,
    title,
    image,
    isPremium: premiumArticle,
    description,
    publisher,
    views,
  } = article;
  const { isPremium } = usePremium();
  const navigate = useNavigate();

  return (
    <div className="p-5 shadow-md rounded-xl flex flex-col justify-between space-y-3">
      <figure>
        <img className="rounded-xl" src={image} />
      </figure>
      <div>
        <h2>{title}</h2>
        <p>
          {articleSlicer(description)} &nbsp;{" "}
          <button
            onClick={() => navigate(`/articles/${_id}`)}
            className={`btn rounded-md ${
              premiumArticle && isPremium
                ? "btn-primary"
                : premiumArticle && !isPremium
                ? "btn-disabled"
                : "btn-primary"
            }`}
          >
            View Full Article
          </button>
        </p>
      </div>
      <div className="p-5 border-1 border-t flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={publisher?.logo}
          />
          <p className="text-neutral-500">{publisher?.name}</p>
        </div>
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
