import { Link } from "react-router";
import Container from "../../../Components/Container/Container";
import logo from "../../../assets/AICraftLogo.png";
import {
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-slate-600 pt-24 pb-12 border-t-8 border-slate-200 relative overflow-hidden p-6">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "matrix(1, 0, 0, 1, 0, 0)",
          background:
            "linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 relative z-10">
          {/* Brand Identity Section */}
          <div className="md:col-span-5 space-y-8">
            <Link to={"/"} className="flex items-center gap-5">
              <div className="p-3 bg-white rounded-none border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <img className="w-10 h-10" src={logo} alt="AI Craft Logo" />
              </div>
              <div>
                <h3 className="text-gray-500 font-black text-2xl tracking-tighter leading-none">
                  AI CRAFT<span className="text-indigo-600">.</span>
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">
                  Revision_09.2026
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-slate-500 font-bold border-l-4 border-slate-200 pl-4">
              Providing enterprise-grade AI model architectures and secure
              deployment solutions. Engineered for high-concurrency distributed
              intelligence.
            </p>

            <div className="flex gap-2">
              {[
                { icon: <FaGithub />, link: "https://github.com/RahidulRIP" },
                { icon: <FaXTwitter />, link: "https://x.com/RahidulIsalm" },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://www.linkedin.com/in/rahidul-islam-pritom/",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h6 className="text-slate-900 font-black uppercase text-[11px] tracking-[0.2em] bg-slate-200 px-2 py-1 inline-block">
              Capabilities
            </h6>
            <nav className="flex flex-col gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
              <Link
                to="/neural-branding"
                className="hover:text-indigo-600 transition-colors"
              >
                Neural Branding
              </Link>
              <Link
                to="/architecture"
                className="hover:text-indigo-600 transition-colors"
              >
                Architecture
              </Link>
              <Link
                to="/market-analysis"
                className="hover:text-indigo-600 transition-colors"
              >
                Market Analysis
              </Link>
              <Link
                to="/documentation"
                className="hover:text-indigo-600 transition-colors"
              >
                Deployment
              </Link>
            </nav>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h6 className="text-slate-900 font-black uppercase text-[11px] tracking-[0.2em] bg-slate-200 px-2 py-1 inline-block">
              Corporate
            </h6>
            <nav className="flex flex-col gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
              <Link
                to="/contactExpert"
                className="hover:text-indigo-600 transition-colors"
              >
                Expert Support
              </Link>
              <Link
                to="/career-node"
                className="hover:text-indigo-600 transition-colors"
              >
                Career Node
              </Link>
            </nav>
          </div>

          <div className="md:col-span-3 md:text-right space-y-6">
            <h6 className="text-slate-900 font-black uppercase text-[11px] tracking-[0.2em] bg-slate-200 px-2 py-1 inline-block">
              Legal Matrix
            </h6>
            <nav className="flex flex-col gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
              <Link
                to="/terms-protocol"
                className="hover:text-indigo-600 transition-colors"
              >
                Terms of Protocol
              </Link>
              <Link
                to="/privacy-encryption"
                className="hover:text-indigo-600 transition-colors"
              >
                Privacy Encryption
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-indigo-600 transition-colors"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            © 2026 AI CRAFT LTD. // [SECURE_CONNECTION_ESTABLISHED]
          </div>

          <div className="flex gap-6 font-mono text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-indigo-600 animate-ping" />
              Status: Active
            </span>
            <span className="bg-slate-900 text-white px-2 py-0.5">
              Uptime: 99.9%
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
