import Container from "../../Container/Container";
import {
  SiReact,
  SiTailwindcss,
  SiNvidia,
  SiOpenai,
  SiMongodb,
  SiFirebase,
  SiPython,
  SiPytorch,
} from "react-icons/si";

const TechStack = () => {
  const technologies = [
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    {
      name: "Tailwind",
      icon: <SiTailwindcss className="text-[#06B6D4]" />,
    },
    {
      name: "NVIDIA",
      icon: <SiNvidia className="text-[#76B900]" />,
    },
    {
      name: "OpenAI",
      icon: <SiOpenai className="text-[#412991]" />,
    },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    {
      name: "Python",
      icon: <SiPython className="text-[#3776AB]" />,
    },
    { name: "PyTorch", icon: <SiPytorch className="text-[#EE4C2C]" /> },
  ];

  return (
    <div className="py-16 bg-base-200 border-b-2 border-gray-300 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Label */}
          <div className="shrink-0">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
              Powering_The_Core
            </h3>
            <p className="text-2xl font-black uppercase italic leading-none">
              Enterprise <br /> <span className="text-indigo-600">Stack</span>
            </p>
          </div>

          {/* Logo Scrolling Container */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
              {technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className={`text-5xl md:text-6xl text-slate-300 transition-all duration-300 cursor-help ${tech.color} hover:scale-110 flex flex-col items-center gap-2`}
                  title={tech.name}
                >
                  {tech.icon}
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400 opacity-0 hover:opacity-100 transition-opacity">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative Marquee Line */}
      <div className="mt-12 bg-slate-900 py-2 rotate-1">
        <p className="text-[10px] font-mono text-white whitespace-nowrap animate-pulse uppercase tracking-[1em] text-center">
          SYSTEM_STABILITY: 100% // NEURAL_LINK: ACTIVE // COMPUTE_NODES: GLOBAL
        </p>
      </div>
    </div>
  );
};

export default TechStack;
