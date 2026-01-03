import AboutAIModels from "../../Components/Home/AboutAIModels/AboutAIModels";
import AIModels from "../../Components/Home/AIModels/AIModels";
import Banner from "../../Components/Home/Banner/Banner";
import GetStarted from "../../Components/Home/GetStarted/GetStarted";
import LiveMetrics from "../../Components/Home/LiveMetrics/LiveMetrics";

const Home = () => {
  return (
    <div className="bg-[#fafafa]">
      <section>
        <Banner />
      </section>
      <section>
        <AIModels />
      </section>
      <section className="border-b-2 border-gray-300">
        <AboutAIModels />
      </section>
      <section>
        <LiveMetrics />
      </section>
      <section>
        <GetStarted />
      </section>
    </div>
  );
};

export default Home;
