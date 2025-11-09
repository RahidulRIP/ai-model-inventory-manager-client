import { Link, NavLink, Outlet, useNavigation } from "react-router";
import profile_Img from "../assets/onlyLogo_Building.png";
import Container from "../Components/Container/Container";
import { useEffect, useState } from "react";
import Loader from "../Components/Shared/Loader";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";

const Dashboard = () => {
  const navigation = useNavigation();
  const [openClose, setOpenClose] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || navigation.state === "loading") {
    return <Loader />;
  }
  return (
    <div className="">
      <Container>
        <button
          onClick={() => setOpenClose(!openClose)}
          className="fixed  z-20 flex md:hidden bg-[#f8f8f8] p-2.5 shadow-sm  w-full "
        >
          {openClose ? (
            <RiMenuFoldFill className="size-6 " />
          ) : (
            <RiMenuUnfoldFill className="size-6" />
          )}
        </button>
        <div className="flex  gap-2.5">
          <div
            className={` bg-gray-200 shadow-[6px_0_12px_#00000033] w-2/4 md:w-1/4 min-h-screen pt-[100px] md:pt-20 md:static fixed transition-all duration-1000 ease-in-out  z-10 ${
              openClose ? "left-0" : "-left-[220px]"
            }`}
          >
            <Link to={"/"}>
              <div className="mx-auto w-36 h-36  p-3.5  bg-base-100 rounded-full pt-6">
                <img className="p-2" src={profile_Img} alt="" />
              </div>
              <div className="divider m-2 pt-12  md:pt-22"></div>
            </Link>
            <div className="flex gap-1.5 flex-col pt-6 p-3.5">
              <NavLink to={"profile"}>
                <button className="my-sidebar-button">
                  <FaRegCircleUser size={22} />
                  My Profile
                </button>
              </NavLink>
              <NavLink to={"announcement"}>
                <button className="my-sidebar-button">Announcement</button>
              </NavLink>
            </div>
          </div>
          <div className="md:w-3/4 p-2.5">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
