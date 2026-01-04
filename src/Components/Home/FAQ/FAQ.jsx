import { useState } from "react";
import { RiArrowRightSLine, RiShieldCheckLine } from "react-icons/ri";
import Container from "../../Container/Container";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      id: "SEC_01",
      question: "How secure are my custom weights?",
      answer:
        "We utilize AES-256-GCM encryption. Your models are isolated in private neural silos, ensuring zero-leakage architecture across all distributed nodes.",
    },
    {
      id: "DEP_02",
      question: "Can I deploy to my own hardware?",
      answer:
        "Yes. Every model includes a Dockerized manifest for edge deployment on NVIDIA Jetson or private cloud clusters with one-click synchronization.",
    },
    {
      id: "AUTH_03",
      question: "What is Creator Verification?",
      answer:
        "Our protocol validates the architect's signature against the model hash. This prevents spoofing and ensures you are using genuine optimized weights.",
    },
    {
      id: "DATA_04",
      question: "Do you support custom datasets?",
      answer:
        "Connect your MongoDB or S3 buckets. Our pipeline supports automated fine-tuning, allowing architectures to evolve with your proprietary data stream.",
    },
  ];

  return (
    <div className="pb-24 md:pb-44 bg-base-200 text-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row border-2 md:border-4 border-indigo-500 shadow-[10px_10px_0px_0px_rgba(79,70,229,0.2)] md:shadow-[20px_20px_0px_0px_rgba(79,70,229,0.2)]">
          <div className="w-full lg:w-2/5 p-6 md:p-12 bg-slate-800 border-b-2 lg:border-b-0 lg:border-r-4 border-indigo-500">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 md:ml-4 font-mono text-[10px] md:text-xs text-indigo-400 uppercase tracking-widest truncate">
                Help_Protocol.exe
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-none mb-4 md:mb-6">
              Neural <br className="hidden md:block" />{" "}
              <span className="text-indigo-400">Queries</span>
            </h2>

            <div className="space-y-4 md:space-y-6 mt-6 md:mt-12">
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <RiShieldCheckLine className="text-indigo-400 text-xl md:text-2xl shrink-0" />
                <p className="text-[10px] md:text-xs font-mono text-slate-400">
                  Status:{" "}
                  <span className="text-green-500 font-bold">Encrypted</span>
                  <br />
                  Integrity: 100%
                </p>
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium italic">
                <span className="hidden lg:inline">
                  "Hover over a protocol to decrypt."
                </span>
                <span className="lg:hidden">
                  "Tap a protocol below to decrypt."
                </span>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-3/5 bg-slate-900 flex flex-col">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`group border-b border-slate-800 last:border-b-0 cursor-pointer transition-all duration-300 ${
                  activeIndex === idx ? "bg-indigo-600/10" : "bg-transparent"
                }`}
              >
                <div className="p-5 md:p-8 flex items-start gap-4 md:gap-6">
                  <span
                    className={`font-mono text-[10px] md:text-sm mt-1 transition-colors ${
                      activeIndex === idx ? "text-indigo-400" : "text-slate-600"
                    }`}
                  >
                    {faq.id}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-sm md:text-lg font-black uppercase transition-all ${
                          activeIndex === idx
                            ? "text-white translate-x-1 md:translate-x-2"
                            : "text-slate-400"
                        }`}
                      >
                        {faq.question}
                      </h3>
                      <RiArrowRightSLine
                        className={`transition-transform duration-300 shrink-0 ${
                          activeIndex === idx
                            ? "rotate-90 text-indigo-400"
                            : "text-slate-700"
                        }`}
                        size={20}
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeIndex === idx
                          ? "max-h-[300px] mt-4 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed bg-slate-950 p-3 md:p-4 border-l-2 border-indigo-500">
                        <span className="text-indigo-400 mr-2 font-mono">
                          &gt;
                        </span>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
