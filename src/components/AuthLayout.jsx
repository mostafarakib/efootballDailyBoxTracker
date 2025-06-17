import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
    // authService
    //   .getCurrentUser()
    //   .then((userData) => {
    //     if (userData) {
    //       // User is logged in
    //       dispatch(login(userData));
    //       // User is logged in but trying to access login/signup page
    //       if (!authentication && authStatus !== authentication) {
    //         navigate("/");
    //       }
    //     } else {
    //       // User is not logged in
    //       dispatch(logout());
    //       if (authentication && authStatus !== authentication) {
    //         // User is not logged in but trying to access protected route
    //         navigate("/login");
    //       }
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [authStatus, navigate, authentication, dispatch]);

  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
}

export default AuthLayout;
