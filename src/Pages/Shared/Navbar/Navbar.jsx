import { Link, NavLink } from "react-router";
import Container from "../../../Components/Container/Container";
import { TfiMenuAlt } from "react-icons/tfi";
import logo from "../../../assets/AICraft.png";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/Context/AuthContext";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const [clickProfile, setClickProfile] = useState(false);
  const { user, signUserOut } = use(AuthContext);
  const [themeColor, setThemeColor] = useState(true);

  const links = (
    <>
      <li>
        <NavLink to={"/"}>HOME</NavLink>
      </li>
      <li>
        <NavLink to={"/allModels"}>ALL MODELS</NavLink>
      </li>

      <>
        <li>
          <NavLink to={"/addModel"}>ADD MODEL</NavLink>
        </li>
        <li>
          <NavLink to={"/myModelsPage"}>MY MODELS</NavLink>
        </li>
        <li>
          <NavLink to={"/myModelsPurchasePage"}>MY MODEL PURCHASE</NavLink>
        </li>
      </>
    </>
  );
  const handleLogout = () => {
    signUserOut()
      .then(() => {
        setClickProfile(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    const themeDocument = document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      return themeDocument.setAttribute("data-theme", `${theme}`);
    } else {
      return themeDocument.setAttribute("data-theme", `${theme}`);
    }
  }, [localStorage.getItem("theme")]);

  const handleThemeChange = () => {
    if (themeColor) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="bg-base-100 shadow-sm relative">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <TfiMenuAlt size={26} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-2xs p-2 shadow  font-medium"
              >
                {links}
              </ul>
            </div>
            <div className="w-52">
              <Link to={"/"}>
                <img className="size-full" src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 font-medium">{links}</ul>
          </div>

          <div className="navbar-end gap-6">
            {user?.email ? (
              ""
            ) : (
              <>
                <Link
                  to="/signIn"
                  className="btn btn-outline btn-primary text-base font-medium"
                >
                  Login
                </Link>
              </>
            )}

            {/* theme  */}
            {user && (
              <div>
                <input
                  onChange={() => setThemeColor(!themeColor)}
                  onClick={handleThemeChange}
                  checked={
                    localStorage.getItem("theme") === "dark" ? true : false
                  }
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller absolute top-7.5 right-20"
                />
              </div>
            )}

            {user && (
              <div className="relative">
                <div
                  onClick={() => setClickProfile(!clickProfile)}
                  className="w-11 h-11 rounded-full border-2 border-primary cursor-pointer overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {user && clickProfile && (
                  <div className="absolute right-0 mt-3 w-fit bg-base-200 rounded-xl shadow-lg border border-base-300 z-50 animate-fadeIn">
                    <div className="p-4 space-y-3 w-64">
                      <h3 className="font-semibold text-base text-primary">
                        {user?.displayName}
                      </h3>
                      <h3 className=" text-base font-medium">{user?.email}</h3>
                      <h3>
                        <Link
                          to={"/myModelsPurchasePage"}
                          className="my-button w-full"
                        >
                          Model Purchase
                        </Link>
                      </h3>
                      <h3>
                        <Link to={"/myModelsPage"} className="my-button w-full">
                          Models Page
                        </Link>
                      </h3>
                      <hr className="border-base-300" />
                      <button
                        onClick={handleLogout}
                        className="text-sm text-error btn btn-ghost w-full"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
