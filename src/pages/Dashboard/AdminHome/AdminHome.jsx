import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader";
import Title from "../../../components/shared/Title";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: stats = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      const users = await axiosPublic.get("/user-stats");
      return { publishers: res.data, userStats: users.data };
    },
  });

  const options = {
    title: "Publisher Statistics",
  };

  if (isPending || isLoading) return <Loader />;

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Title heading="Publishers Statistics" big center />
      <div className="max-w-md mx-auto overflow-hidden mt-5">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={stats.publishers}
          options={options}
        />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="max-w-md mx-auto overflow-hidden">
          <Chart
            chartType="PieChart"
            data={stats.publishers}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="max-w-md mx-auto overflow-hidden">
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={stats.userStats.stats}
            options={{ title: "User Statistics" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
