import { Helmet } from "react-helmet-async";
import Container from "../../../components/shared/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { useParams } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import usePublishers from "../../../hooks/usePublishers";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Select from "react-select";
import useTags from "../../../hooks/useTags";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const UpdateArticle = () => {
  const { tagsManager } = useTags();
  const { publishers } = usePublishers();
  const [tags, setTags] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const {
    data: singleArticle = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["updateArticle", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/owner/${id}`);
      return res.data;
    },
  });

  //   Update a single article
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const allTags = [];
    tags.forEach((tag) => allTags.push(tag.value));
    const publisher = publishers.find(
      (publisher) => publisher.name === form.publisher.value
    );
    const description = form.description.value;
    const photo = { image: form.image.files[0] };
    let image = "";

    const toastId = toast.loading("Article updating...");
    try {
      if (form.image.files.length) {
        const imgbbRes = await axiosPublic.post(imgbbApiUrl, photo, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (imgbbRes.data.success) {
          // console.log("Image uploaded");
        }
        image = imgbbRes.data.data.display_url;
      } else {
        image = singleArticle?.image;
      }
      const article = {
        title,
        image,
        description,
        publisher: {
          name: publisher.name,
          logo: publisher.image,
        },
        tags: allTags,
        // status: "pending",
      };
      const res = await axiosSecure.put(
        `/articles/${id}?email=${user?.email}`,
        article
      );

      if (res.data?.modifiedCount > 0) {
        toast.success("Article updated successfully", { id: toastId });
        form.reset();
        refetch();
      }
    } catch (error) {
      toast.error(error, { id: toastId });
    }
  };
  if (isPending) return <Loader />;

  return (
    <Container>
      <Helmet>
        <title>Update Article</title>
      </Helmet>
      <section className="max-w-screen-sm mx-auto my-10">
        <form
          onSubmit={handleUpdate}
          encType="multipart/form-data"
          className="p-5 shadow-md rounded-md"
        >
          <h3 className="divider font-semibold text-neutral-800">
            Add Article
          </h3>
          <div className="md:flex gap-5">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Article Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Article Title"
                defaultValue={singleArticle.title}
                className="input input-bordered focus:outline-none w-full"
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <Select
                options={tagsManager}
                isMulti
                name="tags"
                defaultValue={singleArticle?.tags.map((tag) => {
                  return { value: tag, label: tag };
                })}
                className="basic-multi-select"
                classNamePrefix="Select Tags"
                onChange={(chioce) => setTags(chioce)}
              />
            </div>
          </div>
          <div className="md:flex gap-5">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Publisher</span>
              </label>
              <select
                name="publisher"
                className="select select-bordered focus:outline-none w-full"
                defaultValue={
                  singleArticle?.publisher?.name || "Select Publisher"
                }
              >
                {publishers.length > 0 &&
                  publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher.name}>
                      {publisher.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                name="image"
                placeholder="Upload Image"
                className="file-input file-input-bordered focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Article Details</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24"
              placeholder="Write your article details here..."
              defaultValue={singleArticle?.description}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">
              <FaUpload />
              Update Article
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default UpdateArticle;
