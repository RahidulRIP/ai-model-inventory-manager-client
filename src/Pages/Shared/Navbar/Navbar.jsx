import { Link, NavLink } from "react-router";
import Container from "../../../Components/Container/Container";
import { TfiMenuAlt } from "react-icons/tfi";
import logo from "../../../assets/AICraft.png";
import { use, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../../Providers/Context/AuthContext";
import {
  RiLogoutCircleRLine,
  RiDashboard3Line,
  RiMoonLine,
  RiSunLine,
  RiHome4Line,
  RiRobot2Line,
  RiAddCircleLine,
} from "react-icons/ri";
import { FiActivity, FiBookOpen } from "react-icons/fi";

const Navbar = () => {
  const [clickProfile, setClickProfile] = useState(false);
  const { user, signUserOut } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClickProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  This is your current logic - it's "correct" but needs to target the right place
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = () => {
    signUserOut().then(() => setClickProfile(false));
  };

  const navLinkClasses = ({ isActive }) =>
    `relative flex items-center gap-2 px-3 py-2 transition-all duration-300 font-bold text-[13px] tracking-wide hover:text-primary group ${
      isActive ? "text-primary" : "text-base-content/70"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClasses}>
        <RiHome4Line size={18} className="group-hover:animate-pulse" />
        <span>HOME</span>
        {/* Decorative underline for active state */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
      </NavLink>

      <NavLink to="/allModels" className={navLinkClasses}>
        <RiRobot2Line size={18} />
        <span>ALL MODELS</span>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
      </NavLink>

      <NavLink to="/benchmarks" className={navLinkClasses}>
        <FiActivity size={18} />
        <span>BENCHMARKS</span>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
      </NavLink>

      <NavLink to="/docs" className={navLinkClasses}>
        <FiBookOpen size={18} />

        <span>DOCS</span>
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
      </NavLink>

      {user && (
        <NavLink to="/dashboard/addModel" className={navLinkClasses}>
          <RiAddCircleLine size={18} />
          <span>ADD MODEL</span>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-[100] bg-base-100/80 backdrop-blur-md border-b border-base-content/5">
      <Container>
        <div className="navbar h-20 px-0">
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <TfiMenuAlt size={24} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200"
              >
                {links}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-5 group">
              {/* LOGO*/}

              <div className="relative flex-shrink-0">
                <img
                  className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-sm"
                  src={logo}
                  alt="AICraft"
                />
              </div>

              <div className="h-6 w-[1px] bg-slate-300 hidden sm:block"></div>

              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-[12px] font-bold text-gray-500 tracking-widest uppercase opacity-90">
                  Inventory
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-tight leading-none">
                  Management Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex gap-4">{links}</div>

          <div className="navbar-end gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-base-content/70 hover:bg-primary/10 hover:text-primary transition-all"
            >
              {theme === "light" ? (
                <RiMoonLine size={22} />
              ) : (
                <RiSunLine size={22} />
              )}
            </button>

            {!user ? (
              <Link
                to="/signIn"
                className="btn btn-primary btn-md rounded-xl px-8 shadow-lg shadow-primary/20 font-bold border-none hover:scale-105 transition-transform"
              >
                LOGIN
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setClickProfile(!clickProfile)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-base-200 hover:bg-base-300 transition-all border border-base-content/5"
                >
                  <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-primary">
                    <img
                      src={user?.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <TfiMenuAlt size={14} className="text-base-content/50" />
                </button>

                {clickProfile && (
                  <div className="absolute right-0 mt-4 w-72 bg-base-100 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-base-content/5 p-2 animate-in fade-in zoom-in duration-200 z-[110]">
                    <div className="p-4 bg-primary/5 rounded-[20px] mb-2 flex items-center gap-3">
                      <img
                        src={user?.photoURL}
                        className="w-12 h-12 rounded-xl object-cover"
                        alt=""
                      />
                      <div className="overflow-hidden">
                        <p className="font-bold text-sm truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-[11px] text-base-content/60 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <DropdownItem
                        to="/dashboard"
                        icon={<RiDashboard3Line />}
                        label="Dashboard"
                      />
                    </div>

                    <div className="divider my-2 px-4 opacity-50"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all font-bold text-sm"
                    >
                      <RiLogoutCircleRLine size={18} />
                      Logout Account
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

// Helper component for clean code (Seniors love this)
const DropdownItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 text-base-content/80 hover:text-primary transition-all text-sm font-medium"
  >
    <span className="text-lg opacity-70">{icon}</span>
    {label}
  </Link>
);

export default Navbar;
