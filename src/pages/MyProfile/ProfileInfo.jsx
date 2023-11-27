import useAuth from "../../hooks/useAuth";
import usePremium from "../../hooks/usePremium";

const ProfileInfo = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium();

  return (
    <div className="flex gap-5 items-center p-5 shadow-md rounded-xl">
      <figure>
        <img
          className="w-28 h-28 rounded-full object-cover"
          src={user?.photoURL}
        />
      </figure>
      <div>
        <h4 className="font-semibold">{user?.displayName}</h4>
        <p>
          Email: <span>{user?.email}</span>
        </p>
        <p>
          {isPremium ? (
            <span className="text-white bg-orange-600 px-3 py-1">
              Premium Member
            </span>
          ) : (
            <span className="to-base-300">Normal User</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
