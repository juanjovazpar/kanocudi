import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import Unauthorized from "./views/Unauthorized/Unauthorized";
import SignIn from "./views/Unauthorized/components/SignIn/SignIn";
import SignUp from "./views/Unauthorized/components/SignUp/SignUp";
import ForgotPassword from "./views/Unauthorized/components/ForgotPassword/ForgotPassword";
import Authorized from "./views/Authorized/Authorized";
import Products from "./views/Products/Products";
import Features from "./views/Features/Features";
import Questions from "./views/Questions/Questions";
import Invitations from "./views/Invitations/Invitations";
import Results from "./views/Results/Results";

export const router = createBrowserRouter([
  {
    // Migrate to Unauthorized view
    path: "/",
    element: <Unauthorized />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    // Migrate to Authorized view
    path: "/hi",
    element: <Authorized />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: ":product_id",
        element: <Features />,
      },
      {
        path: ":product_id/questions",
        element: <Questions />,
      },
      {
        path: ":product_id/invitations",
        element: <Invitations />,
      },
      {
        path: ":product_id/results",
        element: <Results />,
      },
    ],
  },
]);
