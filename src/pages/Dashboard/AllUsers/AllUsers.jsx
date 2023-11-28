import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/shared/Title";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users`);
      return res.data;
    },
  });

  // Make Admin
  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be an admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/admin/users/${id}`, {
          role: "admin",
        });

        if (res.data.modifiedCount > 0) {
          toast.success("Admin made successfully");
          refetch();
        }
      }
    });
  };

  if (isPending) return <Loader />;

  return (
    <>
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <Title heading="All Users" center big />
      <div className="mt-5 overflow-x-auto">
        <table className="table table-xs w-full table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 &&
              allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.photo} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-ghost"
                      >
                        <FaPlus className="text-success" size={18} /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
