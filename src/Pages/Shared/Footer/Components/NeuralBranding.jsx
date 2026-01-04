import { RiRobot2Line, RiPencilRuler2Line, RiPulseLine } from "react-icons/ri";
import Container from "../../../../Components/Container/Container";

const NeuralBranding = () => {
  const features = [
    {
      icon: <RiRobot2Line size={30} />,
      title: "Generative Identity",
      desc: "AI-driven logo and asset generation tailored to model architecture.",
    },
    {
      icon: <RiPencilRuler2Line size={30} />,
      title: "Dynamic Typography",
      desc: "Fluid scaling systems based on neural network density visualizations.",
    },
    {
      icon: <RiPulseLine size={30} />,
      title: "Pulse Synchronization",
      desc: "Branding that reacts in real-time to system performance metrics.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-12 md:pt-20">
      <Container>
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl font-black tracking-tighter mb-6">
            NEURAL <span className="text-primary">BRANDING</span>
          </h1>
          <p className="text-xl text-base-content/70 leading-relaxed">
            The intersection of visual identity and artificial intelligence. We
            engineer brands that think, evolve, and adapt to the digital
            landscape.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 border-2 border-base-content/10 rounded-3xl hover:border-primary/50 transition-all group"
            >
              <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-base-content/60 font-medium leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Demo Section */}
        <div className="bg-primary/5 rounded-[40px] p-12 border border-primary/10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-primary rounded-full animate-pulse mb-8 opacity-20" />
          <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">
            Active Synthesis
          </h2>
          <p className="max-w-lg text-base-content/70 font-bold italic">
            "Design is no longer static. It is a living parameter within the
            neural stack."
          </p>
        </div>
      </Container>
    </div>
  );
};

export default NeuralBranding;
