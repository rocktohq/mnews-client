import { Helmet } from "react-helmet-async";
import Title from "../../../components/shared/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const AllPublishers = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: allPublishers = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allPublishers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/publishers`);
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
        const res = await axiosSecure.delete(`/publishers/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Publisher deleted successfully");
          refetch();
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>All Publishers</title>
      </Helmet>
      <Title heading={`All Publishers`} big center />
      <div className="overflow-x-auto mt-5">
        <table className="table w-full table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Publisher Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPublishers.length > 0 &&
              allPublishers.map((publisher, index) => (
                <tr key={publisher._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={publisher.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{publisher.name}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(publisher._id)}
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
    </>
  );
};

export default AllPublishers;
