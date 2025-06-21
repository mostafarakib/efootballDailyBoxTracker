import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!loading) {
      if (authentication && !authStatus) {
        navigate("/login", { replace: true });
        return;
      } else if (!authentication && authStatus) {
        navigate("/", { replace: true });
        return;
      } else {
        setAuthCheckComplete(true);
      }
    }
  }, [authStatus, navigate, authentication, loading]);

  if (loading || !authCheckComplete) {
    return <Loader />;
  }
  return <>{children}</>;
}

export default AuthLayout;
