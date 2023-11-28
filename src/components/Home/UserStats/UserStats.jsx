import Container from "../../shared/Container";
import CountUp from "react-countup";
import { FaUsers, FaUsersGear } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import Title from "../../shared/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../shared/Loader";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";

const UserStats = () => {
  const axiosPublic = useAxiosPublic();
  const [countStart, setCountStart] = useState(false);
  const {
    data: stats = {},
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["userCounts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user-stats");
      return res.data;
    },
  });

  return (
    <Container className="py-20">
      <Title
        heading="Our user statistics"
        subHeading="Valuable Users"
        big
        center
      />
      {isPending || (isLoading && <Loader />)}

      <ScrollTrigger onEnter={() => setCountStart(true)}>
        {countStart && (
          <div className="flex flex-wrap justify-center xl:justify-between gap-5 mt-5">
            {/* All Users */}
            <div className="p-5 shadow-md rounded-xl flex gap-5 items-center justify-center w-72 bg-base-100 hover:rotate-6 duration-200">
              <FaUsers size={100} />
              <div>
                <p className="text-xl font-semibold text-primary">All Users</p>
                <CountUp
                  start={0}
                  end={stats?.count?.allUsers}
                  duration={5}
                  className="text-5xl font-bold text-neutral-700"
                />
              </div>
            </div>
            {/* Normal Users */}
            <div className="p-5 shadow-md rounded-xl flex gap-5 items-center justify-center w-72 bg-base-100 hover:rotate-6 duration-200">
              <TbUsersGroup size={100} />
              <div>
                <p className="text-xl font-semibold text-primary">Normal</p>
                <CountUp
                  start={0}
                  end={stats?.count?.normalUsers}
                  duration={3}
                  className="text-5xl font-bold text-neutral-700"
                />
              </div>
            </div>
            {/* Premium Users */}
            <div className="p-5 shadow-md rounded-xl flex gap-5 items-center justify-center w-72 bg-base-100 hover:rotate-6 duration-200">
              <FaUsersGear size={100} />
              <div>
                <p className="text-xl font-semibold text-primary">Premium</p>

                <CountUp
                  start={0}
                  end={stats?.count?.premiumUsers}
                  duration={2}
                  className="text-5xl font-bold text-neutral-700"
                />
              </div>
            </div>
          </div>
        )}
      </ScrollTrigger>
    </Container>
  );
};

export default UserStats;
