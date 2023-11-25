import useAuth from "../../hooks/useAuth";

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <div className="flex gap-5 items-center p-5 shadow-md rounded-xl">
      <figure>
        <img src={user?.photoURL} />
      </figure>
      <div>
        <h4>{user?.displayName}</h4>
        <p>
          Email: <span>{user?.email}</span>
        </p>
        <p>
          <span>Premium Member</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
