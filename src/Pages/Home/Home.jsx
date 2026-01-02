import AboutAIModels from "../../Components/Home/AboutAIModels/AboutAIModels";
import AIModels from "../../Components/Home/AIModels/AIModels";
import Banner from "../../Components/Home/Banner/Banner";
import GetStarted from "../../Components/Home/GetStarted/GetStarted";

const Home = () => {
  return (
    <div className="bg-[#fafafa]">
      <section>
        <Banner />
      </section>
      <section>
        <AIModels />
      </section>
      <section>
        <AboutAIModels />
      </section>
      <section>
        <GetStarted />
      </section>
    </div>
  );
};

export default Home;
