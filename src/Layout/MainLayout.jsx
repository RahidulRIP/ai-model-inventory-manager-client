import { Outlet, useNavigation } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import Loader from "../Components/Shared/Loader";

const MainLayout = () => {
  const navigation = useNavigation();

  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <div className="flex-1 p-2.5 md:p-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
