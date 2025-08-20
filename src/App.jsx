import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import authService from "./appwrite/auth";
import { login, logout, setLoading } from "./store/authSlice";
import { Loader, Toaster } from "./components";
import predictionService from "./appwrite/predictionService";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const startedPredictionRef = useRef(false);

  useEffect(() => {
    dispatch(setLoading(true));

    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));

          // compute & save prediction for the user's "today"
          // Non-blocking: we don't wait for it to finish for rendering.
          predictionService
            .computeAndSavePredictionForToday(userData.$id)
            .then(({ computed, doc }) => {
              console.log("Prediction computed:", doc);
            })
            .catch((err) => {
              console.warn("Prediction compute error:", err);
            });
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
