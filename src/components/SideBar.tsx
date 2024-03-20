import { FaRegUserCircle } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbPassword } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/UserSlice";

const SideBar = ({openSideBar}: {openSideBar: boolean}) => {
  const user = useSelector((state: any) => state.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handelLogout = () => {
    localStorage.removeItem("passwordToken")
    dispatch(logout())
    navigate('/login')
  }
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${openSideBar ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RxDashboard />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/add-password"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <TbPassword />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Add Password
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/generate-key"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoKeyOutline />
              <span className="ms-3">Generate Key</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaRegUserCircle />
              <span className="ms-3">Profile</span>
            </Link>
          </li>
          {user.isauthenticated ? (
            <li>
              <button onClick={handelLogout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <PiSignInBold />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign out</span>
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiSignInBold />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
