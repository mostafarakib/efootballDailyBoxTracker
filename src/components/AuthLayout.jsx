import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus !== authentication) {
      navigate("/", { replace: true });
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
}

export default AuthLayout;
