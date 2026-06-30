import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    const loadUser = async () => {
      try {
        const user = await getCurrentUser();

        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    loadUser();
  }, []);

  return <h2>Signing you in...</h2>;
}