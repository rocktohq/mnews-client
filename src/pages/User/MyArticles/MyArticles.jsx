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

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myArticles = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myArticles"],
    queryFn: async () => {
      const res = await axiosSecure(`/my-articles?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

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
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Article Title</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.length > 0 &&
              myArticles.map((article, index) => (
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
                  <td className="font-medium">{article.status}</td>
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
      </div>
    </Container>
  );
};

export default MyArticles;
