import { useEffect, useState } from "react";
import Container from "../../shared/Container";
import CountUp from "react-countup";
import { FaUsers, FaUsersGear } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import Title from "../../shared/Title";

const UserStats = () => {
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const userStatsFromDatabase = [500, 200, 100];
    setUserStats(userStatsFromDatabase);
  }, []);

  return (
    <Container className="py-20">
      <Title
        heading="Our user statistics"
        subHeading="Valuable Users"
        big
        center
      />
      <div className="flex flex-wrap justify-center xl:justify-between gap-5 mt-5">
        {/* All Users */}
        <div className="p-5 shadow-md rounded-xl flex gap-5 items-center justify-center w-72 bg-base-100 hover:rotate-6 duration-200">
          <FaUsers size={100} />
          <div>
            <p className="text-xl font-semibold text-primary">All Users</p>
            <CountUp
              start={0}
              end={userStats[0]}
              duration={2}
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
              end={userStats[1]}
              duration={2}
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
              end={userStats[2]}
              duration={1}
              className="text-5xl font-bold text-neutral-700"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserStats;
