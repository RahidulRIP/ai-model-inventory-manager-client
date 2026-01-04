import { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  FiBox,
  FiShoppingBag,
  FiTrendingUp,
  FiActivity,
  FiLayers,
  FiUsers,
  FiShield,
  FiDollarSign,
  FiTrash2,
  FiEye,
  FiX,
  FiInfo,
} from "react-icons/fi";
import { AuthContext } from "../../../Providers/Context/AuthContext";
import UseAxiosTokenSecure from "../../../Hooks/UseAxiosTokenSecure";
import Loader from "../../../Components/Shared/Loader";
import Swal from "sweetalert2";

// --- Custom Tooltip for User Charts ---
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl border-2 border-indigo-500 shadow-xl">
        <p className="text-[10px] font-black uppercase tracking-widest mb-1">
          {payload[0].name}
        </p>
        <p className="text-lg font-bold text-indigo-400">
          {payload[0].value} Models
        </p>
      </div>
    );
  }
  return null;
};

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();

  const [stats, setStats] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin Action States
  const [adminActionView, setAdminActionView] = useState(null);
  const [adminData, setAdminData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        // 1. Get user role from MongoDB
        const userRes = await axiosSecure.get(`/users/${user?.email}`);
        setDbUser(userRes.data);

        // 2. Get stats based on role
        if (userRes.data?.role === "admin") {
          const adminRes = await axiosSecure.get("/admin-stats");
          setStats(adminRes.data);
        } else {
          const userStatsRes = await axiosSecure.get(
            `/user-stats?email=${user?.email}`
          );
          setStats(userStatsRes.data);
        }
      } catch (err) {
        console.error("Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.email, axiosSecure]);

  // --- ADMIN SHARED LOGIC ---
  const handleAdminAction = async (action) => {
    setLoading(true);
    try {
      const endpoint =
        action === "models" ? "/admin/all-models" : "/admin/all-purchases";
      const res = await axiosSecure.get(endpoint);
      setAdminData(res.data);
      setAdminActionView(action);
    } catch (err) {
      Swal.fire(
        "Error",
        "Failed to fetch administrative data",
        "error",
        err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    const result = await Swal.fire({
      title: "Confirm Deletion?",
      text: `This will permanently erase this ${type} record!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "DELETE RECORD",
      background: "#ffffff",
      customClass: {
        popup:
          "rounded-[32px] border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
        title: "font-black uppercase",
        confirmButton: "rounded-xl font-bold px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        // Construct the correct endpoint based on the item type
        const endpoint =
          type === "model"
            ? `/admin/delete-model/${id}`
            : `/admin/delete-purchase/${id}`;

        // Execute the DELETE request to the database
        const response = await axiosSecure.delete(endpoint);

        if (response.data.deletedCount > 0 || response.status === 200) {
          // 1. Remove from the current table view
          setAdminData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );

          // 2. Refresh the overall stats (Revenue, Total Models, etc.)
          // so the dashboard cards update without a page refresh
          const adminRes = await axiosSecure.get("/admin-stats");
          setStats(adminRes.data);

          Swal.fire({
            title: "Deleted!",
            text: "The record has been deleted from the database.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error("Delete Error:", err);
        Swal.fire("Error", "Server rejected the deletion request.", "error");
      }
    }
  };

  if (loading) return <Loader />;

  const isAdmin = dbUser?.role === "admin";

  // ADMIN VIEW
  const renderAdminView = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: `$${stats?.totalRevenue || 0}`,
            icon: <FiDollarSign />,
            color: "text-amber-600",
            shadow: "shadow-[6px_6px_0px_0px_rgba(217,119,6,1)]",
          },
          {
            label: "Platform Users",
            value: stats?.totalUsers || 0,
            icon: <FiUsers />,
            color: "text-blue-600",
            shadow: "shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]",
          },
          {
            label: "Global Models",
            value: stats?.totalModels || 0,
            icon: <FiBox />,
            color: "text-indigo-600",
            shadow: "shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]",
          },
          {
            label: "Total Sales",
            value: stats?.totalSales || 0,
            icon: <FiTrendingUp />,
            color: "text-emerald-600",
            shadow: "shadow-[6px_6px_0px_0px_rgba(5,150,105,1)]",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`bg-white border-2 border-slate-900 p-6 rounded-[24px] ${card.shadow}`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center text-xl mb-3 ${card.color}`}
            >
              {card.icon}
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
              {card.label}
            </p>
            <h3 className="text-3xl font-black text-slate-900">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 rounded-[32px] p-8 text-white">
          <h4 className="font-black uppercase text-xl mb-8 flex items-center gap-2">
            <FiActivity className="text-indigo-400" /> Market Growth Pulse
          </h4>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { n: "Start", v: 0 },
                  { n: "Now", v: stats?.totalSales },
                ]}
              >
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  strokeWidth={4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
          <h4 className="font-black uppercase text-xs tracking-widest mb-6 italic text-amber-600">
            Quick Authority
          </h4>
          <div className="space-y-4">
            <button
              onClick={() => handleAdminAction("models")}
              className="w-full py-4 px-6 border-2 border-slate-900 rounded-2xl font-bold text-left hover:bg-slate-900 hover:text-white transition-all flex justify-between items-center"
            >
              All Library Models <FiBox />
            </button>
            <button
              onClick={() => handleAdminAction("purchases")}
              className="w-full py-4 px-6 border-2 border-slate-900 rounded-2xl font-bold text-left hover:bg-slate-900 hover:text-white transition-all flex justify-between items-center"
            >
              Full History Logs <FiShoppingBag />
            </button>
          </div>
        </div>
      </div>

      {adminActionView && (
        <div className="bg-white border-4 border-slate-900 rounded-[32px] overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <h3 className="font-black uppercase tracking-widest flex items-center gap-3">
              <FiShield className="text-amber-400" /> Data Source:{" "}
              {adminActionView}
            </h3>
            <button onClick={() => setAdminActionView(null)}>
              <FiX size={24} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b-2 border-slate-900 uppercase text-[10px] font-black">
                <tr>
                  <th className="p-5">Record</th>
                  <th className="p-5">Entity</th>
                  <th className="p-5 text-right">Ops</th>
                </tr>
              </thead>
              <tbody>
                {adminData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-5 font-bold">
                      {item.name || item.modelName}
                    </td>
                    <td className="p-5 text-xs text-slate-500">
                      {item.createdBy || item.purchased_By}
                    </td>
                    <td className="p-5 text-right flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            item._id,
                            adminActionView === "models" ? "model" : "purchase"
                          )
                        }
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // --- RENDERING USER VIEW (YOUR PROVIDED DESIGN) ---
  const renderUserView = () => {
    const totalFrameworkModels =
      stats?.chartData?.reduce((acc, curr) => acc + curr.value, 0) || 0;
    const comparisonData = [
      {
        name: "Your Stats",
        Created: stats?.modelsCreated || 0,
        Purchased: stats?.modelsPurchased || 0,
      },
    ];
    const statCards = [
      {
        label: "Models Created",
        value: stats?.modelsCreated,
        icon: <FiBox />,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
      },
      {
        label: "Models Purchased",
        value: stats?.modelsPurchased,
        icon: <FiShoppingBag />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      },
      {
        label: "Total Assets",
        value: (stats?.modelsCreated || 0) + (stats?.modelsPurchased || 0),
        icon: <FiLayers />,
        color: "text-purple-600",
        bg: "bg-purple-50",
      },
    ];

    return (
      <div className="animate-in fade-in duration-500">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Control <span className="text-indigo-600">Center</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1 italic">
              Active Session: {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Network Live
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white border-2 border-slate-900 p-6 rounded-[24px] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-5 transition-transform hover:-translate-y-1"
            >
              <div
                className={`p-4 rounded-2xl ${card.bg} ${card.color} text-2xl`}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  {card.label}
                </p>
                <h3 className="text-2xl font-black text-slate-900">
                  {card.value || 0}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(15,23,42,0.05)]">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-indigo-600" /> Framework Diversity
            </h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.chartData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats?.chartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 border-t-2 border-slate-50 pt-6">
              <div className="grid grid-cols-2 gap-3">
                {stats?.chartData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span className="text-[10px] font-black text-slate-700 uppercase truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-slate-900 block">
                        {item.value} units
                      </span>
                      <span className="text-[8px] font-black text-indigo-500 uppercase italic">
                        {((item.value / totalFrameworkModels) * 100).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(15,23,42,0.05)] flex flex-col">
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <FiActivity className="text-indigo-600" /> Asset Comparison
            </h4>
            <div className="h-[300px] mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontWeight: "900",
                      fontSize: "10px",
                      textTransform: "uppercase",
                    }}
                  />
                  <Bar
                    dataKey="Created"
                    fill="#6366f1"
                    radius={[10, 10, 0, 0]}
                    barSize={50}
                  />
                  <Bar
                    dataKey="Purchased"
                    fill="#10b981"
                    radius={[10, 10, 0, 0]}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border-2 border-slate-900 p-8 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(15,23,42,0.05)]">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">
              Latest Acquired Instances
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats?.recentPurchases?.length > 0 ? (
                stats.recentPurchases.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-indigo-500 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200"
                        alt=""
                      />
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                          {new Date(item.timestamp).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-widest">
                        {item.framework}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm font-bold py-10 text-center col-span-2">
                  No recent activity found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-10 bg-[#fafafa] min-h-screen relative">
      {isAdmin && (
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
              Admin <span className="text-amber-500">Command</span> Center
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Root Level Access Verified
            </p>
          </div>
          <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest">
            ENCRYPTED NODE
          </div>
        </header>
      )}

      {isAdmin ? renderAdminView() : renderUserView()}

      {/* GLOBAL DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white border-4 border-slate-900 rounded-[40px] w-full max-w-lg p-8 shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] relative animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
              <FiX size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl border-2 border-indigo-100">
                <FiInfo size={30} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  Record Detail
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                  ID: {selectedItem._id}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Item Identity",
                  value: selectedItem.name || selectedItem.modelName,
                },
                {
                  label: "Primary Entity",
                  value: selectedItem.createdBy || selectedItem.purchased_By,
                },
                {
                  label: "Framework",
                  value: selectedItem.framework || "Universal",
                },
                {
                  label: "Registry Time",
                  value: new Date(selectedItem.timestamp).toLocaleString(),
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-slate-100"
                >
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    {row.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
            >
              Close Instance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
