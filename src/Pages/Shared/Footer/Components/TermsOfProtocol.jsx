import {
  RiShieldKeyholeLine,
  RiFileLockLine,
  RiSpam3Line,
  RiInformationLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";

const TermsOfProtocol = () => {
  const sections = [
    {
      icon: <RiShieldKeyholeLine />,
      title: "01. Access License",
      content:
        "Users are granted a non-exclusive, non-transferable license to access AI model architectures for legitimate development purposes. Any commercial redistribution of raw weights is prohibited.",
    },
    {
      icon: <RiSpam3Line />,
      title: "02. Usage Constraints",
      content:
        "Automated scraping, adversarial attacks on model weights, or reverse-engineering of the neural stack is strictly prohibited and monitored by our security protocol.",
    },
    {
      icon: <RiFileLockLine />,
      title: "03. Data Sovereignty",
      content:
        "All inference data remains the property of the end-user. Data is processed in volatile memory and encrypted via AES-256 protocols before reaching distributed nodes.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-slate-900 text-white p-10 border-b-8 border-indigo-600 mb-12 shadow-[10px_10px_0px_0px_rgba(79,70,229,0.3)]">
            <h1 className="text-5xl font-black uppercase tracking-tighter italic">
              Terms of <span className="text-indigo-400">Protocol</span>
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase">
                v4.2.0
              </span>
              <p className="font-mono text-[10px] opacity-60 uppercase tracking-widest">
                Established: 2026.01.03 // System_Time: Active
              </p>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="grid gap-6">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="group flex flex-col md:flex-row gap-6 p-8 border-2 border-slate-200 hover:border-slate-900 transition-all bg-white hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
              >
                <div className="text-4xl text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase mb-3 text-slate-900">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed italic">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Footer */}
          <div className="mt-12 p-8 border-4 border-dashed border-slate-200 rounded-2xl flex items-center gap-6 bg-slate-50">
            <RiInformationLine
              size={40}
              className="text-slate-400 hidden sm:block"
            />
            <p className="text-xs font-black text-slate-400 uppercase leading-tight">
              By utilizing the AICraft platform, you automatically agree to
              these terms. Violations result in immediate node disconnection and
              API key revocation.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsOfProtocol;
