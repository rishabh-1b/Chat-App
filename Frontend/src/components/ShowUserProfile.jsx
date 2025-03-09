import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";

function ShowUserProfile({ onClose }) {
  const {authUser} = useAuthContext();
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className="flex flex-col items-center">
        <img src={authUser.profilePic} alt="avatar" className="w-40 h-40 rounded-full" />
          <div className="mt-4 w-full">
            <div className="flex w-full">
              <span className="font-semibold">Name:</span>
              <span className="text-gray-800 ml-2">{authUser.fullName}</span>
            </div>
            <div className="flex w-full mt-2">
              <span className="font-semibold">Username:</span>
              <span className="text-gray-800 ml-2">{authUser.username}</span>
            </div>
            <div className="flex w-full mt-2">
              <span className="font-semibold">Email:</span>
              <span className="text-gray-800 ml-2">{authUser.email}</span>
            </div>
            <div className="flex w-full mt-2">
              <span className="font-semibold">Join On:</span>
              <span className="text-gray-800 ml-2">{`${authUser.joinOn.slice(8, 10)}-${authUser.joinOn.slice(5, 7)}-${authUser.joinOn.slice(0, 4)}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowUserProfile;
