import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import RoutesErrorPage from "../Components/Error/RouterErrorPage";
import Banner from "../Components/Home/Banner/Banner";
import AllModels from "../Pages/AllModels/AllModels";

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
]);

export default router;
