import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function AuthCallback() {
  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    login(token);

    navigate("/dashboard");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Logging in...
    </div>
  );
}

export default AuthCallback;