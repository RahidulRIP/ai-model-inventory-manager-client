import AboutAIModels from "../../Components/Home/AboutAIModels/AboutAIModels";
import AIModels from "../../Components/Home/AIModels/AIModels";
import Banner from "../../Components/Home/Banner/Banner";
import FAQ from "../../Components/Home/FAQ/FAQ";
import GetStarted from "../../Components/Home/GetStarted/GetStarted";
import LiveMetrics from "../../Components/Home/LiveMetrics/LiveMetrics";
import ModelCategories from "../../Components/Home/ModelCategories/ModelCategories";
import TechStack from "../../Components/Home/TechStack/TechStack";

const Home = () => {
  return (
    <div className="bg-base-200">
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
        <TechStack />
      </section>
      <section>
        <ModelCategories />
      </section>
      <section>
        <FAQ />
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

// bg-[#fafafa]
