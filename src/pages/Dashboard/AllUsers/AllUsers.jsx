import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import { Helmet } from "react-helmet-async";
import Title from "../../../components/shared/Title";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data: allUsers = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users?page=${currentPage}&size=${itemsPerPage}`
      );
      setCount(res.data.userCount);
      return res.data.users;
    },
  });

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
    </>
  );
};

export default AllUsers;
