import {
  RiShieldFlashLine,
  RiSettings5Line,
  RiFocus2Line,
  RiFacebookCircleLine,
  //   RiCookieLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";
import { MdOutlineLocalPolice } from "react-icons/md";

const CookiePolicy = () => {
  const cookieTypes = [
    {
      icon: <RiShieldFlashLine />,
      title: "Essential Tokens",
      status: "Required",
      desc: "These are mandatory for security, authentication, and maintaining your secure session across nodes.",
    },
    {
      icon: <RiSettings5Line />,
      title: "Preference Logic",
      status: "Functional",
      desc: "Used to remember your theme selection (Dark/Light) and local dashboard configuration settings.",
    },
    {
      icon: <RiFocus2Line />,
      title: "Analytics Sync",
      status: "Optional",
      desc: "Anonymized data that helps us optimize model inference speeds and server load balancing.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-12 md:pt-20 pb-20">
      <Container>
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b-4 border-slate-900 pb-10">
            <div className="w-20 h-20 bg-indigo-600 text-white flex items-center justify-center rounded-none shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <MdOutlineLocalPolice size={30} />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
                Cookie <span className="text-indigo-600 italic">Policy</span>
              </h1>
              <p className="text-slate-500 font-bold mt-2 uppercase text-xs tracking-[0.2em]">
                Protocol: Session_Management // Revision_2026.1
              </p>
            </div>
          </div>

          {/* Cookie Description Grid */}
          <div className="grid gap-4">
            {cookieTypes.map((cookie, idx) => (
              <div
                key={idx}
                className="group p-6 border-2 border-slate-900 bg-gray-600 hover:bg-slate-900 text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="text-3xl text-indigo-400">{cookie.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black uppercase text-lg">
                      {cookie.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 border border-current font-black uppercase">
                      {cookie.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium opacity-70 italic">
                    {cookie.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Management Section */}
          <div className="mt-16 p-10 bg-indigo-50 border-4 border-indigo-600 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black uppercase mb-4">
                Managing Your Matrix
              </h2>
              <p className="text-sm text-slate-600 font-bold leading-relaxed mb-6">
                You can control and disable optional cookies through your
                browser settings. However, disabling Essential Tokens will
                result in complete loss of access to protected AICraft dashboard
                routes.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CookiePolicy;
