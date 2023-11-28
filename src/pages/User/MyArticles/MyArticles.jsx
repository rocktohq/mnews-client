import { Helmet } from "react-helmet-async";
import Container from "../../../components/shared/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/shared/Loader";
import Title from "../../../components/shared/Title";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reason, setReason] = useState("");

  const {
    data: myArticles = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-articles?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  const handleShowReason = (message) => {
    setReason(message);
    document.getElementById("my_modal_5").showModal();
  };

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
        const res = await axiosSecure.delete(
          `/articles/${id}?email=${user?.email}`
        );
        if (res.data.deletedCount > 0) {
          toast.success("Article deleted successfully");
          refetch();
        }
      }
    });
  };

  return (
    <Container className="py-10">
      <Helmet>
        <title>My Articles</title>
      </Helmet>
      <Title heading="My Articles" />
      <div className="overflow-x-auto mt-5">
        {myArticles.length > 0 ? (
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Article Title</th>
                <th>Show Details</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myArticles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={article.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{article.title}</td>
                  <td>
                    <Link to={`/articles/${article._id}`}>
                      <button className="btn btn-ghost">Show Article</button>
                    </Link>
                  </td>
                  <td className="font-medium">
                    {article.status === "rejected" ? (
                      <>
                        <span className="mr-2">Rejected</span>
                        <span
                          onClick={() => handleShowReason(article?.reason)}
                          className="btn"
                        >
                          View Reson
                        </span>
                      </>
                    ) : (
                      article.status
                    )}
                  </td>
                  <td>{article.isPremium ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/update-article/${article._id}`}>
                      <button className="btn btn-ghost">
                        <FaEdit className="text-secondary" size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="btn btn-ghost"
                    >
                      <FaTrashAlt className="text-error" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-xl font-bold text-center my-5">
            Your do not have any article
          </p>
        )}
      </div>
      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rejection reason</h3>
          <p className="py-4">{reason && reason}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </Container>
  );
};

export default MyArticles;
