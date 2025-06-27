import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthLayout } from "./components";
import NotFound from "./pages/NotFound";
import GameBoxTrackingCalendar from "./pages/GameBoxTrackingCalendar";
import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/gameBoxTracker",
        element: (
          <AuthLayout authentication>
            <GameBoxTrackingCalendar />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      // Catch-all route for 404 Not Found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
