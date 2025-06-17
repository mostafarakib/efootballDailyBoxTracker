import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Loader } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setLoading(true);
    if (authStatus) {
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
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch, authStatus]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
