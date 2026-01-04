import {
  RiServerLine,
  RiNodeTree,
  RiShieldFlashLine,
  RiCloudLine,
} from "react-icons/ri";
import Container from "../../../../Components/Container/Container";

const Architecture = () => {
  const layers = [
    {
      icon: <RiNodeTree />,
      title: "Neural Layer",
      tech: "Transformer-based LLMs, CNNs",
      desc: "Core processing units utilizing attention mechanisms for complex data synthesis.",
    },
    {
      icon: <RiServerLine />,
      title: "Infrastructure",
      tech: "Distributed GPU Clusters",
      desc: "High-concurrency hardware orchestration ensuring sub-100ms latency across nodes.",
    },
    {
      icon: <RiShieldFlashLine />,
      title: "Security Matrix",
      tech: "AES-256 / SSL / SOC2",
      desc: "End-to-end encryption for model weights and real-time data ingestion.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-12 md:pt-20 pb-20">
      <Container>
        {/* Header */}
        <div className="border-l-8 border-primary pl-6 mb-16">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
            System <span className="text-primary">Architecture</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 tracking-widest uppercase text-sm">
            Core Engine Specification // v4.0.2
          </p>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-1 gap-1">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row items-start md:items-center gap-8 p-10 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-8 bg-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]"
            >
              <div className="p-5 bg-slate-900 text-white text-3xl">
                {layer.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black uppercase">
                    {layer.title}
                  </h3>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-black rounded-full">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-slate-600 font-medium max-w-2xl italic">
                  {layer.desc}
                </p>
              </div>
              <div className="hidden lg:block">
                <RiCloudLine className="text-slate-200" size={60} />
              </div>
            </div>
          ))}
        </div>

        {/* System Diagram Placeholder */}
        <div className="mt-12 p-1 md:p-12 border-2 border-dashed border-slate-300 rounded-[40px] text-center">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-[0.5em]">
            [ Diagram_Interface_Loading... ]
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Architecture;
