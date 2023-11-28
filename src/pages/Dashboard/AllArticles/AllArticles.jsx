import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaDollarSign, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/shared/Title";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allArticles = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/articles`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  // * Change Status
  const handleStatusChange = async (value, id) => {
    // Update Status => PUT request to the Server
    const toastId = toast.loading("Changing status...");
    try {
      const res = await axiosSecure.put(`/admin/articles/${id}`, {
        status: value,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Status changed successfully!", { id: toastId });
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
      console.log(err.message);
    }
  };

  // Make Premium
  const handleMakePremium = async (id) => {
    // Update Status => PUT request to the Server
    const toastId = toast.loading("Making premium...");
    try {
      const res = await axiosSecure.put(`/admin/articles/${id}`, {
        isPremium: true,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("This article is now premium", { id: toastId });
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
      console.log(err.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admin/articles/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Article deleted successfully");
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>All Articles</title>
      </Helmet>
      <Title heading="All Articles" center big />
      <div className="mt-5 overflow-x-auto ">
        <table className="table w-full table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Article Title</th>
              <th>Author Name</th>
              <th>Author Email</th>
              <th>Author Photo</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Publisher</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allArticles.length > 0 &&
              allArticles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={article.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{article.title}</td>
                  <td>{article?.author?.name}</td>
                  <td>{article?.author?.email}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={article.author.photo} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Date</td>
                  <td>{article?.status}</td>
                  <td>{article?.publisher?.name}</td>
                  <td className="w-fit">
                    <button
                      onClick={() => handleMakePremium(article._id)}
                      className="btn btn-ghost"
                    >
                      <FaDollarSign className="text-success" size={18} /> Make
                      Premium
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange("published", article._id)
                      }
                      className="btn btn-ghost"
                    >
                      <FaPlus className="text-success" size={18} /> Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange("rejected", article._id)
                      }
                      className="btn btn-ghost"
                    >
                      <FaMinus className="text-warning" size={18} /> Decline
                    </button>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="btn btn-ghost"
                    >
                      <FaTrashAlt className="text-error" size={18} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticles;
