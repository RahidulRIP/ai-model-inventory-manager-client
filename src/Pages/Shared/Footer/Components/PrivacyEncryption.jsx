import {
  RiFingerprintLine,
  RiLockPasswordLine,
  RiEyeOffLine,
  RiShieldUserLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";

const PrivacyEncryption = () => {
  const protocols = [
    {
      icon: <RiLockPasswordLine />,
      title: "End-to-End Encryption",
      desc: "All model interactions are shielded via AES-256-GCM. We never store raw prompts in plaintext.",
    },
    {
      icon: <RiEyeOffLine />,
      title: "Zero-Knowledge Architecture",
      desc: "Our engineers cannot access your proprietary training weights. Your intelligence stays yours.",
    },
    {
      icon: <RiFingerprintLine />,
      title: "Identity Anonymization",
      desc: "User metadata is stripped and replaced with temporary hash tokens during inference cycles.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1">
              <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-6">
                Privacy <br />
                <span className="text-indigo-600 italic">Encryption</span>
              </h1>
              <p className="text-slate-500 font-bold text-lg leading-tight border-l-4 border-slate-900 pl-4">
                We treat privacy as a cryptographic constant. In the world of
                AI, your data is your most valuable asset.
              </p>
            </div>
            <div className="w-48 h-48 bg-slate-900 flex items-center justify-center text-white shadow-[12px_12px_0px_0px_rgba(79,70,229,1)]">
              <RiShieldUserLine size={100} />
            </div>
          </div>

          {/* Protocol Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {protocols.map((p, idx) => (
              <div
                key={idx}
                className="p-8 border-2 border-slate-900 bg-white hover:bg-indigo-50 transition-colors"
              >
                <div className="text-3xl text-indigo-600 mb-4">{p.icon}</div>
                <h3 className="text-lg font-black uppercase mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Disclosure */}
          <div className="mt-16 bg-slate-900 text-white p-8 font-mono text-[11px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              [ENCRYPTED_DATA_STREAM]
            </div>
            <h4 className="text-indigo-400 font-black mb-4 uppercase text-sm">
              Data Handling Protocol
            </h4>
            <p className="mb-4 opacity-80">
              &gt; COOKIE_USAGE: We only use functional tokens to maintain your
              session state. <br />
              &gt; THIRD_PARTY: We never sell or share your model data with
              external LLM providers. <br />
              &gt; RETENTION: Logs are purged automatically every 24 hours
              unless otherwise specified.
            </p>
            <div className="pt-4 border-t border-slate-700">
              STATUS: COMPLIANT WITH GLOBAL PRIVACY STANDARDS // 2026
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyEncryption;
