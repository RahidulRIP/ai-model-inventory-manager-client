import {
  RiBarChartGroupedLine,
  RiGlobalLine,
  RiPieChart2Line,
  RiArrowRightUpLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";

const MarketAnalysis = () => {
  const statistics = [
    { label: "Market Reach", value: "84+", sub: "Global Nodes" },
    { label: "Model Efficiency", value: "99.2%", sub: "Accuracy Rating" },
    { label: "Annual Growth", value: "215%", sub: "Data Synthesis" },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-12 md:pt-20 pb-20">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black tracking-tighter uppercase mb-4">
              Market <span className="text-indigo-600 underline">Analysis</span>
            </h1>
            <p className="text-lg text-slate-500 font-bold leading-tight">
              Predictive insights into the evolving AI landscape. We track
              neural adoption rates and compute-cost optimization globally.
            </p>
          </div>
          <div className="bg-slate-900 text-white p-4 font-mono text-xs uppercase tracking-tighter">
            Data_Stream: Stable // 2026_Q1
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statistics.map((stat, i) => (
            <div
              key={i}
              className="p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] bg-white"
            >
              <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
                {stat.label}
              </p>
              <h2 className="text-4xl font-black text-slate-900">
                {stat.value}
              </h2>
              <p className="text-sm font-bold text-indigo-600 mt-2">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Dive Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center text-indigo-600 rounded-lg">
                <RiGlobalLine size={24} />
              </div>
              <div>
                <h4 className="font-black uppercase text-slate-900">
                  Global Adoption Metrics
                </h4>
                <p className="text-sm text-slate-500 font-medium">
                  Real-time tracking of distributed intelligence across 14
                  sovereign regions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center text-indigo-600 rounded-lg">
                <RiPieChart2Line size={24} />
              </div>
              <div>
                <h4 className="font-black uppercase text-slate-900">
                  Compute Sector Share
                </h4>
                <p className="text-sm text-slate-500 font-medium">
                  Detailed breakdown of GPU utilization vs. TPU neural
                  processing demand.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-600/10 -rotate-2 rounded-3xl -z-10"></div>
            <div className="border-4 border-slate-900 bg-white p-6 shadow-2xl">
              <div className="h-64 w-full bg-slate-50 flex items-end justify-between gap-2 p-4">
                {/* Visual Representation of a Bar Chart */}
                {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-full bg-indigo-600 border-t-4 border-slate-900 transition-all hover:bg-slate-900"
                  />
                ))}
              </div>

              <p className="text-center mt-4 font-mono text-[10px] font-black uppercase text-slate-400">
                Fig 1.2: Comparative Neural Adoption Velocity (2024-2026)
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketAnalysis;
