import {
  Link,
  NavLink,
  Outlet,
  useNavigation,
  useNavigate,
} from "react-router"; // Added useNavigate
import profile_Img from "../assets/AICraftLogo.png";
import { use, useEffect, useState } from "react";
import Loader from "../Components/Shared/Loader";
import {
  RiMenu4Line,
  RiCloseLine,
  RiSettings4Line,
  RiAddCircleLine,
  RiStackLine,
  RiTimeLine,
  RiLogoutBoxRLine, // Added Logout Icon
} from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";

import { FaHome } from "react-icons/fa";
// Import your axios hook
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/Context/AuthContext";
import UseAxiosTokenSecure from "../Hooks/UseAxiosTokenSecure";

const DashboardLayout = () => {
  const { user, signUserOut } = use(AuthContext); // Added logOut
  const axiosSecure = UseAxiosTokenSecure();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dbUser, setDbUser] = useState(null); // State for MongoDB user data

  // Fetch MongoDB User Data for Role
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user?.email}`)
        .then((res) => setDbUser(res.data))
        .catch((err) => console.error("Nav fetch error:", err));
    }
  }, [user?.email, axiosSecure]);

  // Logout Handler
  const handleLogout = () => {
    signUserOut().then(() => {
      toast.success("Logged out");
      navigate("/signIn");
    });
  };

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (navigation.state === "loading") return <Loader />;

  const navLinkStyles = ({ isActive }) =>
    `relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group ${
      isActive
        ? "bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]"
        : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans text-slate-900">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex p-0 md:p-4 lg:p-6 gap-0 md:gap-6">
        <aside
          className={`
            fixed md:sticky top-0 md:top-6 left-0 z-[70]
            h-screen md:h-[calc(100vh-3rem)] 
            w-72 bg-white/80 backdrop-blur-xl border-r md:border border-white/20
            md:rounded-[32px] shadow-2xl shadow-slate-200/50
            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          <div className="p-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <img
                  className="w-9 h-9 object-contain"
                  src={profile_Img}
                  alt="Logo"
                />
              </div>
              <span className="font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
                AICraft
              </span>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <RiCloseLine size={28} />
            </button>
          </div>

          <nav className="px-4 mt-6 space-y-3">
            <NavLink to="profile" className={navLinkStyles}>
              <FaRegCircleUser size={22} />
              <span className="font-bold tracking-wide">My Profile</span>
              <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-[.active]:opacity-100 shadow-glow" />
            </NavLink>

            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkStyles} end>
                  <FaHome size={18} />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/dashboard/addModel" className={navLinkStyles}>
                  <RiAddCircleLine size={18} />
                  <span>ADD MODEL</span>
                </NavLink>
                <NavLink to="/dashboard/myModelsPage" className={navLinkStyles}>
                  <RiStackLine size={18} />
                  <span>MY MODELS</span>
                </NavLink>
                <NavLink
                  to="/dashboard/myModelsPurchasePage"
                  className={navLinkStyles}
                >
                  <RiTimeLine size={18} />
                  <span>HISTORY</span>
                </NavLink>
              </>
            )}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[24px] p-5 text-white overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all" />
              <p className="text-xs font-semibold text-indigo-300 mb-1">
                PRO PLAN
              </p>
              <p className="text-sm font-medium mb-3">Unlock AI Insights</p>
              <Link to={"/dashboard/UpgradeCard"}>
                <button className="w-full py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full">
          <header
            className={`
            sticky top-0 z-50 flex items-center justify-between px-6 py-4
            transition-all duration-300
            ${
              scrolled
                ? "bg-white/70 backdrop-blur-md shadow-sm border-b"
                : "bg-transparent"
            }
          `}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-100"
              >
                <RiMenu4Line size={24} />
              </button>
              <h2 className="hidden md:block font-extrabold text-xl text-slate-800 tracking-tight">
                Dashboard Overview
              </h2>
            </div>

            {/* RIGHT SIDE NAVBAR - NOW FUNCTIONAL */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="p-3 text-slate-500 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-none hover:shadow-sm"
              >
                <RiSettings4Line size={22} />
              </button>

              <div className="h-10 w-[1px] bg-slate-200 mx-2" />

              <div
                onClick={handleLogout}
                className="flex items-center gap-3 cursor-pointer group relative"
                title="Click to Logout"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-[11px] font-black uppercase text-indigo-500 tracking-tighter">
                    {dbUser?.role === "admin"
                      ? "System Admin"
                      : "Premium Member"}
                  </p>
                </div>
                <div className="relative w-11 h-11 rounded-2xl bg-indigo-100 border-2 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
                  <img
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${user?.displayName}&background=4F46E5&color=fff`
                    }
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  {/* Logout Overlay on Hover */}
                  <div className="absolute inset-0 bg-indigo-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <RiLogoutBoxRLine className="text-white" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-2.5 md:p-8">
            <div className="min-h-[70vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// import { Link, NavLink, Outlet, useNavigation } from "react-router";
// import profile_Img from "../assets/AICraftLogo.png";
// import { use, useEffect, useState } from "react";
// import Loader from "../Components/Shared/Loader";
// import {
//   RiMenu4Line,
//   RiCloseLine,
//   RiLayoutGridLine,
//   RiMegaphoneLine,
//   RiSettings4Line,
//   RiAddCircleLine,
//   RiStackLine,
//   RiTimeLine,
// } from "react-icons/ri";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { AuthContext } from "../Providers/Context/AuthContext";
// import { FaHome } from "react-icons/fa";

// const DashboardLayout = () => {
//   const { user } = use(AuthContext);
//   const navigation = useNavigation();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Monitor scroll to change header appearance
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (navigation.state === "loading") return <Loader />;

//   const navLinkStyles = ({ isActive }) =>
//     `relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group ${
//       isActive
//         ? "bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)]"
//         : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
//     }`;

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] font-sans text-slate-900">
//       {/* Visible on Mobile*/}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] md:hidden transition-opacity duration-300"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <div className="flex p-0 md:p-4 lg:p-6 gap-0 md:gap-6">
//         {/* THE FLOATING SIDEBAR */}
//         <aside
//           className={`
//             fixed md:sticky top-0 md:top-6 left-0 z-[70]
//             h-screen md:h-[calc(100vh-3rem)]
//             w-72 bg-white/80 backdrop-blur-xl border-r md:border border-white/20
//             md:rounded-[32px] shadow-2xl shadow-slate-200/50
//             transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
//             ${
//               isSidebarOpen
//                 ? "translate-x-0"
//                 : "-translate-x-full md:translate-x-0"
//             }
//           `}
//         >
//           <div className="p-8 flex items-center justify-between">
//             <Link to="/" className="flex items-center gap-3 group">
//               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
//                 <img
//                   className="w-9 h-9 object-contain" // Removed invert and brightness-0
//                   src={profile_Img}
//                   alt="Logo"
//                 />
//               </div>
//               <span className="font-black text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
//                 AICraft
//               </span>
//             </Link>
//             <button
//               className="md:hidden"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <RiCloseLine size={28} />
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <nav className="px-4 mt-6 space-y-3">
//             <NavLink to="profile" className={navLinkStyles}>
//               <FaRegCircleUser size={22} />
//               <span className="font-bold tracking-wide">My Profile</span>
//               {/* Decorative dot for active state */}
//               <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-[.active]:opacity-100 shadow-glow" />
//             </NavLink>

//             {user && (
//               <>
//                 <NavLink to="/dashboard" className={navLinkStyles} end>
//                   <FaHome size={18} />
//                   <span>Home</span>
//                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
//                 </NavLink>
//                 <NavLink to="/dashboard/addModel" className={navLinkStyles}>
//                   <RiAddCircleLine size={18} />
//                   <span>ADD MODEL</span>
//                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
//                 </NavLink>

//                 <NavLink to="/dashboard/myModelsPage" className={navLinkStyles}>
//                   <RiStackLine size={18} />
//                   <span>MY MODELS</span>
//                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
//                 </NavLink>

//                 <NavLink
//                   to="/dashboard/myModelsPurchasePage"
//                   className={navLinkStyles}
//                 >
//                   <RiTimeLine size={18} />
//                   <span>HISTORY</span>
//                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-[.active]:w-full"></span>
//                 </NavLink>
//               </>
//             )}
//           </nav>

//           {/* Exceptional "Upgrade" Card */}
//           <div className="absolute bottom-6 left-6 right-6">
//             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[24px] p-5 text-white overflow-hidden relative group">
//               <div className="absolute -right-4 -top-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all" />
//               <p className="text-xs font-semibold text-indigo-300 mb-1">
//                 PRO PLAN
//               </p>
//               <p className="text-sm font-medium mb-3">Unlock AI Insights</p>
//               <Link to={"/dashboard/UpgradeCard"}>
//                 <button className="w-full py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
//                   Upgrade Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </aside>

//         {/* 3. MAIN CONTENT AREA */}
//         <main className="flex-1 w-full">
//           {/* Top Navbar */}
//           <header
//             className={`
//             sticky top-0 z-50 flex items-center justify-between px-6 py-4
//             transition-all duration-300
//             ${
//               scrolled
//                 ? "bg-white/70 backdrop-blur-md shadow-sm border-b"
//                 : "bg-transparent"
//             }
//           `}
//           >
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="md:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-100"
//               >
//                 <RiMenu4Line size={24} />
//               </button>
//               <h2 className="hidden md:block font-extrabold text-xl text-slate-800 tracking-tight">
//                 Dashboard Overview
//               </h2>
//             </div>

//             <div className="flex items-center gap-3">
//               <button className="p-3 text-slate-500 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-none hover:shadow-sm">
//                 <RiSettings4Line size={22} />
//               </button>
//               <div className="h-10 w-[1px] bg-slate-200 mx-2" />
//               <div className="flex items-center gap-3 cursor-pointer group">
//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-bold text-slate-800 leading-tight">
//                     Alex Harrison
//                   </p>
//                   <p className="text-[11px] font-medium text-slate-400">
//                     Premium Member
//                   </p>
//                 </div>
//                 <div className="w-11 h-11 rounded-2xl bg-indigo-100 border-2 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
//                   <img
//                     src="https://ui-avatars.com/api/?name=Alex+H&background=4F46E5&color=fff"
//                     alt="User"
//                   />
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page Content */}
//           <div className="p-2.5 md:p-8">
//             <div className="min-h-[70vh]">
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
