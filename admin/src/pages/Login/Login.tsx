const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="text-center text-4xl font-bold text-slate-900">
          WeatherGuard
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Weather Alert Admin Panel
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-10 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;