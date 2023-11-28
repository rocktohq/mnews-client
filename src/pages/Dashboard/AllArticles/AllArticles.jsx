import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaDollarSign, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/shared/Title";
import { useState } from "react";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [declineId, setDeclineId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: allArticles = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allArticles", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/articles?page=${currentPage}&size=${itemsPerPage}`
      );
      setCount(res.data.articleCount);
      return res.data.articles;
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

  // Pagination
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Modal
  const handleModal = (id) => {
    setDeclineId(id);
    document.getElementById("my_modal_5").showModal();
  };

  // Decline
  const handleDecline = async (e, reason) => {
    e.preventDefault();
    // console.log(reason, declineId);
    const toastId = toast.loading("Declinig article...");
    try {
      const res = await axiosSecure.put(`/admin/articles/${declineId}`, {
        status: "rejected",
        reason,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Article declined!", { id: toastId });
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
      console.log(err.message);
    }

    document.getElementById("my_modal_5").close();
    e.target.reset();
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
                  <td>{article?.dateAdded && article?.dateAdded}</td>
                  <td>{article?.status}</td>
                  <td>{article?.publisher?.name}</td>
                  <td>
                    <td>
                      <button
                        onClick={() => handleMakePremium(article._id)}
                        className="btn btn-ghost"
                      >
                        <FaDollarSign className="text-success" size={18} /> Make
                        Premium
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleStatusChange("published", article._id)
                        }
                        className="btn btn-ghost"
                      >
                        <FaPlus className="text-success" size={18} /> Approve
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleModal(article._id)}
                        className="btn btn-ghost"
                      >
                        <FaMinus className="text-warning" size={18} /> Decline
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="btn btn-ghost"
                      >
                        <FaTrashAlt className="text-error" size={18} /> Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="p-5 shadow w-fit rounded-xl mt-10">
        <p className="mb-3">
          Current Page: <span className="font-semibold">{currentPage + 1}</span>{" "}
        </p>
        <div className="space-x-3">
          <button onClick={handlePrevPage}>Prev</button>
          {pages.map((page) => (
            <button
              className={`${
                currentPage === page ? "btn-secondary" : "btn-primary"
              } btn btn-sm rounded`}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page + 1}
            </button>
          ))}
          <button onClick={handleNextPage}>Next</button>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            name=""
            id=""
            className="border px-3 py-2 rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Write down the reason</h3>
          <form
            onSubmit={(e) => {
              handleDecline(e, e.target.reason.value);
            }}
          >
            <textarea
              name="reason"
              className="textarea textarea-bordered w-full focus:outline-none"
            ></textarea>
            <div className="modal-action">
              <button className="btn btn-primary">Decline</button>
              <span
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn"
              >
                Close
              </span>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllArticles;
