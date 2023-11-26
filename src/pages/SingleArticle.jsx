import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/shared/Container";
import Loader from "../components/shared/Loader";
import { Helmet } from "react-helmet-async";
import Title from "../components/shared/Title";
import usePremium from "../hooks/usePremium";
import toast from "react-hot-toast";

const SingleArticle = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: article,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  const { isPremium } = usePremium();
  const navigate = useNavigate();

  if (isPending || isLoading) return <Loader />;
  if (article.isPremium && !isPremium) {
    toast.error("You are not premium member!");
    navigate("/");
    return;
  }

  const {
    title,
    // isPremium: premiumArticle,
    tags,
    image,
    description,
    publisher,
    author,
  } = article;

  return (
    <Container className="py-10">
      {isPending && <Loader />}
      <Helmet>
        <title>{`${title}`}</title>
      </Helmet>
      <div>
        <figure className="mb-5">
          <img
            className="rounded-xl w-full md:h-[400px] object-cover"
            src={image}
          />
        </figure>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 shadow-xl rounded-md p-5 space-y-5">
            <Title heading={title} />
            <p>{description}</p>
            <p className="px-4 py-2 bg-slate-50">
              <span className="font-semibold">Tags: </span>{" "}
              {tags.map((tag) => tag).join(", ")}
            </p>
          </div>
          <div className="md:col-span-1 shadow-xl rounded-md p-5">
            <p className="divider">Publisher</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={publisher?.logo}
              />
              <p className="text-neutral-500">{publisher?.name}</p>
            </div>
            <div>
              <p className="divider">Author</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-16 h-16 rounded-md object-cover"
                  src={author?.photo}
                />
                <div>
                  <p className="text-neutral-500">Name: {author?.name}</p>
                  <p className="text-neutral-500">Email: {author?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleArticle;
