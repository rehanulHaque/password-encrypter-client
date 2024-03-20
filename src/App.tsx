import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import GenerateKey from "./pages/GenerateKey";
import SideBar from "./components/SideBar";
import AddPassword from "./pages/AddPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slices/UserSlice";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import { BiMenu } from "react-icons/bi";


const App = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { isauthenticated } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("passwordToken")!);
    if (token) {
      dispatch(login(token.name));
    }
  });
  return (
    <>
      <ToastContainer />
      <button className="fixed top-5 left-5 cursor-pointer" onClick={() =>setOpenSideBar(!openSideBar)}><BiMenu className="text-3xl"/></button>
      <main>
        <SideBar openSideBar={openSideBar} />
        <div className="p-4 sm:ml-64" onClick={() => setOpenSideBar(false)}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/generate-key" element={<GenerateKey />} />


            {/* Authentication Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isauthenticated={isauthenticated}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/add-password"
              element={
                <PrivateRoute isauthenticated={isauthenticated}>
                  <AddPassword />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isauthenticated={isauthenticated}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
