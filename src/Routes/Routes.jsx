import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import RoutesErrorPage from "../Components/Error/RouterErrorPage";
import Banner from "../Components/Home/Banner/Banner";
import AllModels from "../Pages/AllModels/AllModels";
import AddModel from "../Pages/AddModel/AddModel";
import PrivateRoute from "./PrivateRoute";
import ModelCardDetails from "../Components/Cards/ModelCardDetails";
import UpdatePage from "../Pages/UpdatePage/UpdatePage";
import MyModelsPage from "../Pages/MyModelsPage/MyModelsPage";
import MyModelsPurchasePage from "../Pages/MyModelsPurchasePage/MyModelsPurchasePage";
import DashboardLayout from "../Layout/DashboardLayout";
import Documentation from "../Components/Home/Documentation/Documentation";
import ContactExpert from "../Components/Home/Documentation/ContactExpert/ContactExpert";
import UserHome from "../Dashboard/UserDashboard/UserHome/UserHome";
import UpgradeCard from "../Dashboard/Components/UpgradeCard";
import MyProfile from "../Dashboard/Components/MyProfile";
import Benchmarks from "../Pages/Benchmarks/Benchmarks";
import Docs from "../Pages/Docs/Docs";
import NeuralBranding from "../Pages/Shared/Footer/Components/NeuralBranding";
import Architecture from "../Pages/Shared/Footer/Components/Architecture";
import MarketAnalysis from "../Pages/Shared/Footer/Components/MarketAnalysis";
import CareerNode from "../Pages/Shared/Footer/Components/CareerNode";
import TermsOfProtocol from "../Pages/Shared/Footer/Components/TermsOfProtocol";
import PrivacyEncryption from "../Pages/Shared/Footer/Components/PrivacyEncryption";
import CookiePolicy from "../Pages/Shared/Footer/Components/CookiePolicy";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: "true",
        Component: Home,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: "signIn",
        Component: SignIn,
      },
      {
        path: "allModels",
        Component: AllModels,
      },

      {
        path: "modelCardDetails/:id",
        element: <ModelCardDetails />,
      },
      {
        path: "updateAiModelData/:id",
        element: (
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        ),
      },

      // new add
      {
        path: "documentation",
        Component: Documentation,
      },
      {
        path: "contactExpert",
        Component: ContactExpert,
      },
      {
        path: "/benchmarks",
        element: <Benchmarks />,
      },
      {
        path: "/docs",
        element: <Docs />,
      },
      // footer
      {
        path: "neural-branding",
        Component: NeuralBranding,
      },
      {
        path: "architecture",
        Component: Architecture,
      },
      {
        path: "market-analysis",
        Component: MarketAnalysis,
      },
      {
        path: "career-node",
        Component: CareerNode,
      },
      {
        path: "terms-protocol",
        Component: TermsOfProtocol,
      },
      {
        path: "privacy-encryption",
        Component: PrivacyEncryption,
      },
      {
        path: "cookie-policy",
        Component: CookiePolicy,
      },
    ],
  },
  {
    path: "banner",
    Component: Banner,
  },

  {
    path: "*",
    Component: RoutesErrorPage,
  },
  // dashboard routes
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        Component: UserHome,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "addModel",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "myModelsPage",
        element: (
          <PrivateRoute>
            <MyModelsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "myModelsPurchasePage",
        element: (
          <PrivateRoute>
            <MyModelsPurchasePage />
          </PrivateRoute>
        ),
      },

      {
        path: "UpgradeCard",
        Component: UpgradeCard,
      },
    ],
  },
]);

export default router;
