import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiSettings,
  FiEdit3,
  FiDollarSign,
  FiLayers,
  FiShoppingCart,
  FiActivity,
  FiAward,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { AuthContext } from "../../Providers/Context/AuthContext";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";
import Loader from "../../Components/Shared/Loader";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();

  // State Management
  const [dbUser, setDbUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  // Role Determination (Source of Truth: MongoDB)
  const isAdmin = dbUser?.role === "admin";

  useEffect(() => {
    const fetchAllProfileData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);

        const dbUserRes = await axiosSecure.get(`/users/${user?.email}`);
        setDbUser(dbUserRes.data);

        setNewName(dbUserRes.data?.name || user?.displayName || "");
        setNewPhoto(dbUserRes.data?.photo || user?.photoURL || "");

        const userRes = await axiosSecure.get(
          `/user-stats?email=${user?.email}`
        );
        setProfileData(userRes.data);

        if (dbUserRes.data?.role === "admin") {
          const adminRes = await axiosSecure.get(`/admin-stats`);
          setAdminStats(adminRes.data);
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        toast.error("Error loading profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfileData();
  }, [user?.email, axiosSecure, user?.displayName, user?.photoURL]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating profile...");

    try {
      await updateProfile(user, {
        displayName: newName,
        photoURL: newPhoto,
      });

      await axiosSecure.patch(`/users/${user?.email}`, {
        name: newName,
        photo: newPhoto,
      });

      toast.success("Profile updated successfully!", { id: loadingToast });
      setIsModalOpen(false);

      const updatedUser = await axiosSecure.get(`/users/${user?.email}`);
      setDbUser(updatedUser.data);
    } catch (err) {
      toast.error("Failed to update profile", { id: loadingToast });
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 lg:p-10 bg-[#fafafa] min-h-screen relative">
      {/*Profile Header Card */}
      <div className="relative bg-white border-2 border-slate-900 rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] mb-10">
        <div
          className={`h-32 bg-gradient-to-r ${
            isAdmin
              ? "from-amber-400 to-orange-500"
              : "from-indigo-600 via-purple-600 to-pink-500"
          }`}
        />

        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="relative group">
              <img
                src={
                  dbUser?.photo ||
                  user?.photoURL ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-[24px] border-4 border-white object-cover bg-slate-100 shadow-xl"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-2 right-2 p-2 bg-indigo-600 rounded-xl text-white border-2 border-white cursor-pointer hover:scale-110 transition-transform"
              >
                <FiEdit3 size={14} />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {dbUser?.name || user?.displayName}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                    isAdmin
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-indigo-100 text-indigo-700 border-indigo-200"
                  }`}
                >
                  {isAdmin ? "System Admin" : "Verified Creator"}
                </span>
              </div>
              <p className="text-slate-500 font-medium mb-6">
                {isAdmin
                  ? "Platform Administrator"
                  : "AI Model Architect & Creative Engineer"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <FiMail className="text-indigo-500" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase italic leading-none mb-1">
                      Email Address
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <FiCalendar className="text-indigo-500" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase italic leading-none mb-1">
                      Account Since
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {dbUser?.createdAt
                        ? new Date(dbUser.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[24px] p-6 text-white relative overflow-hidden">
              <FiAward className="absolute -right-4 -bottom-4 text-white/5 text-8xl" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 italic">
                Individual Metrics
              </h4>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs font-medium text-slate-400 italic">
                    Models Created
                  </span>
                  <span className="text-xl font-black text-indigo-300">
                    {profileData?.modelsCreated || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-xs font-medium text-slate-400 italic">
                    Models Purchased
                  </span>
                  <span className="text-xl font-black text-purple-300">
                    {profileData?.modelsPurchased || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Role Based View (Dashboard) */}
      <div className="grid grid-cols-1 gap-8">
        {isAdmin ? (
          <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]">
            <h2 className="text-xl font-black uppercase flex items-center gap-2">
              <FiShield className="text-amber-500" /> Global Command Center
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="p-6 bg-slate-900 rounded-[24px] text-white">
                <p className="text-3xl font-black">
                  ${adminStats?.totalRevenue || 0}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Total Revenue
                </p>
              </div>
              <div className="p-6 bg-white border-2 border-slate-900 rounded-[24px]">
                <p className="text-3xl font-black">
                  {adminStats?.totalUsers || 0}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                  Active Users
                </p>
              </div>
              <div className="p-6 bg-white border-2 border-slate-900 rounded-[24px]">
                <p className="text-3xl font-black">
                  {adminStats?.totalModels || 0}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                  Total Models
                </p>
              </div>
              <div className="p-6 bg-white border-2 border-slate-900 rounded-[24px]">
                <p className="text-3xl font-black">
                  {adminStats?.totalSales || 0}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">
                  Total Sales
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(99,102,241,1)]">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <FiAward className="text-indigo-500" /> Developer Milestones
            </h2>
            <div className="flex flex-wrap gap-4">
              {["Top Creator", "Verified", "Beta Architect"].map((badge) => (
                <span
                  key={badge}
                  className="px-5 py-3 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-700 font-black text-xs uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Edit Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white border-4 border-slate-900 rounded-[32px] w-full max-w-md p-8 shadow-[20px_20px_0px_0px_rgba(15,23,42,1)]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FiX className="text-slate-900" size={24} />
            </button>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-6">
              Update Profile
            </h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl font-bold"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-900 rounded-2xl font-bold"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <FiCheck size={20} /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
