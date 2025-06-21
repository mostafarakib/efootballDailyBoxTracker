import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout, setLoading } from "./store/authSlice";
import { Loader, Toaster } from "./components";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(setLoading(true));

    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
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
