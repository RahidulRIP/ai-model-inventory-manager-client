import {
  RiUserAddLine,
  RiCodeSSlashLine,
  RiSettings4Line,
  RiTeamLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";
import toast from "react-hot-toast";

const CareerNode = () => {
  const positions = [
    {
      title: "Neural Architect",
      type: "Remote / Full-time",
      dept: "Engineering",
      icon: <RiCodeSSlashLine />,
      salary: "$140k - $210k",
    },
    {
      title: "AI Ethics Lead",
      type: "Hybrid / London",
      dept: "Legal Matrix",
      icon: <RiSettings4Line />,
      salary: "$120k - $180k",
    },
    {
      title: "Compute Ops Engineer",
      type: "On-site / NY",
      dept: "Deployment",
      icon: <RiTeamLine />,
      salary: "$130k - $195k",
    },
  ];

  const handleApply = (jobTitle) => {
    toast.success(
      <span>
        Application for{" "}
        <span className="text-teal-400 font-bold">{jobTitle}</span> sent to the
        stack!
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 pt-12 md:pt-20 pb-20">
      <Container>
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="bg-indigo-600 text-white px-3 py-1 text-xs font-black uppercase tracking-[0.3em]">
              Human Capital
            </span>
            <h1 className="text-6xl font-black tracking-tighter uppercase mt-4 leading-none">
              Career <span className="text-indigo-600 italic">Node</span>
            </h1>
            <p className="text-slate-500 font-bold mt-6 text-lg leading-tight">
              We are expanding our neural network. Join a team of architects
              building the next generation of distributed intelligence.
            </p>
          </div>
          <div className="border-8 border-slate-900 p-8 shadow-[15px_15px_0px_0px_rgba(79,70,229,1)] bg-white text-center">
            <RiUserAddLine size={50} className="mx-auto mb-4 text-indigo-600" />
            <h3 className="font-black text-2xl uppercase italic">
              Join the Stack
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-2 tracking-widest uppercase">
              Current Openings: 03
            </p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 mb-8 border-b-2 border-slate-100 pb-2">
            Active_Vacancies
          </h2>
          {positions.map((job, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="flex items-center gap-6">
                <div className="text-2xl p-3 bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white">
                  {job.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase leading-none">
                    {job.title}
                  </h4>
                  <p className="text-xs font-bold opacity-60 mt-1 uppercase tracking-widest">
                    {job.dept} // {job.type}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between">
                <span className="font-mono text-sm font-black">
                  {job.salary}
                </span>
                <button
                  onClick={() => handleApply(job.title)}
                  className="px-6 py-2 border-2 border-current font-black text-xs uppercase hover:bg-indigo-600 hover:border-indigo-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 border-l-4 border-indigo-600">
            <h5 className="font-black uppercase text-sm mb-2">Equity Model</h5>
            <p className="text-xs text-slate-500 font-medium">
              Profit-sharing benchmarks tied to model performance and enterprise
              growth.
            </p>
          </div>
          <div className="p-6 border-l-4 border-indigo-600">
            <h5 className="font-black uppercase text-sm mb-2">Neural Health</h5>
            <p className="text-xs text-slate-500 font-medium">
              Comprehensive medical coverage including mental health and
              bio-hacking stipends.
            </p>
          </div>
          <div className="p-6 border-l-4 border-indigo-600">
            <h5 className="font-black uppercase text-sm mb-2">
              Infinite Learning
            </h5>
            <p className="text-xs text-slate-500 font-medium">
              Annual budget for AI research, conferences, and specialized
              hardware.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CareerNode;
