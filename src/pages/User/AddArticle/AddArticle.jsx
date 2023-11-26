import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import Container from "../../../components/shared/Container";
import useTags from "../../../hooks/useTags";
import Select from "react-select";
import usePublishers from "../../../hooks/usePublishers";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const AddArticle = () => {
  const { tagsManager } = useTags();
  const { publishers } = usePublishers();
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleAddArticle = async (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const allTags = [];
    tags.forEach((tag) => allTags.push(tag.value));
    const publisher = publishers.find(
      (publisher) => publisher._id === form.publisher.value
    );
    const description = form.description.value;
    const image = { image: form.image.files[0] };

    console.log(publisher);
    // Validations
    if (title === "" && allTags.length === 0 && publisher === "" && description)
      return toast.error("All fields are required");
    else if (title === "") return toast.error("Article title is required");
    else if (allTags.length === 0) return toast.error("Please select tags");
    else if (publisher === "") return toast.error("Please select publisher");
    else if (description === "")
      return toast.error("Please provide description");

    //   Try to Upload the Image
    const toastId = toast.loading("Adding the article...");
    try {
      const imgbbRes = await axiosPublic.post(imgbbApiUrl, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgbbRes.data.success) {
        try {
          const article = {
            title,
            image: imgbbRes.data.data.display_url,
            publisher: {
              name: publisher.name,
              logo: publisher.image,
            },
            tags: allTags,
            author: {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL,
            },
            views: 0,
            status: "pending",
          };

          const res = await axiosSecure.post("/articles", article);
          if (res.data.insertedId) {
            toast.success("Article added successfully", { id: toastId });
            form.reset();
          }
        } catch (error) {
          toast.error(error.message, { id: toastId });
        }
      }
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Add Article</title>
      </Helmet>
      <section className="max-w-screen-sm mx-auto my-10">
        <form
          onSubmit={handleAddArticle}
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
              >
                <option disabled selected value="">
                  Select Publisher
                </option>
                {publishers.length > 0 &&
                  publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher._id}>
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
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">
              <FaPlus />
              Add Article
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default AddArticle;
