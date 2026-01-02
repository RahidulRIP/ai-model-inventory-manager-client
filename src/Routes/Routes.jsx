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
        path: "addModel",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "modelCardDetails/:id",
        element: (
          <PrivateRoute>
            <ModelCardDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "updateAiModelData/:id",
        element: (
          <PrivateRoute>
            <UpdatePage />
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

      // new add
      {
        path: "documentation",
        Component: Documentation,
      },
      {
        path: "contactExpert",
        Component: ContactExpert,
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
  },
]);

export default router;
