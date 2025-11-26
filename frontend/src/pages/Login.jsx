import React from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [adminUsername, setAdminUsername] = React.useState("");
  const [adminPassword, setAdminPassword] = React.useState("");
  const [userUsername, setUserUsername] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [adminError, setAdminError] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [adminLoading, setAdminLoading] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(false);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminLoading(true);
    try {
      const resp = await http.post('/auth/login', { username: adminUsername, password: adminPassword, requestedRole: 'ADMIN' });
      const { token, user } = resp.data;
      if (token) {
        localStorage.setItem('sp_token', token);
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      sessionStorage.setItem('sp_user', JSON.stringify(user));
      sessionStorage.setItem('sp_user_role', user.role);
      sessionStorage.setItem('sp_logged_in', '1');
      window.dispatchEvent(new Event('sp-login'));
      onClose?.();
      navigate('/dashboard');
    } catch (err) {
      setAdminError(err?.response?.data?.error?.message || 'Login failed');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserError("");
    setUserLoading(true);
    try {
      const resp = await http.post('/auth/login', { username: userUsername, password: userPassword, requestedRole: 'USER' });
      const { token, user } = resp.data;
      if (token) {
        localStorage.setItem('sp_token', token);
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      sessionStorage.setItem('sp_user', JSON.stringify(user));
      sessionStorage.setItem('sp_user_role', user.role);
      sessionStorage.setItem('sp_logged_in', '1');
      window.dispatchEvent(new Event('sp-login'));
      onClose?.();
      navigate('/dashboard');
    } catch (err) {
      setUserError(err?.response?.data?.error?.message || 'Login failed');
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden w-[1200px] max-h-[650px] flex flex-col">

        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-white p-8 text-center shadow-md">
          <h1 className="text-4xl font-extrabold">Welcome to StartupPilot</h1>
          <p className="text-indigo-100 text-lg mt-1">
            Manage your startups, projects, and teams with ease
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 w-10 h-10 rounded-full bg-white text-indigo-600 shadow-lg hover:bg-indigo-50 hover:scale-105 transition flex items-center justify-center"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Main Login Container */}
        <div className="flex flex-row w-full h-full divide-x">

          {/* LEFT: ADMIN */}
          <div className="w-1/2 p-10 bg-gradient-to-br from-purple-100 via-purple-50 to-white flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-purple-300 text-white rounded-full text-sm font-semibold mb-4 shadow">
              ADMIN
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Administrator Login</h2>
            <p className="text-gray-600 text-sm mb-6">
              Full control over startups, projects, and management
            </p>

            <form onSubmit={handleAdminSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="adminuser"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="•••••••"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-300"
                />
              </div>

              {adminError && (
                <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                  {adminError}
                </div>
              )}

              <button
                disabled={adminLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {adminLoading ? "Signing in..." : "Sign In as Admin"}
              </button>
            </form>
          </div>

          {/* RIGHT: USER */}
          <div className="w-1/2 p-10 bg-gradient-to-br from-blue-100 via-cyan-50 to-white flex flex-col justify-center">
            <div className="inline-block px-4 py-2 bg-blue-300 text-white rounded-full text-sm font-semibold mb-4 shadow">
              USER
            </div>

            <h2 className="text-2xl font-bold text-gray-900">User Login</h2>
            <p className="text-gray-600 text-sm mb-6">
              View startups, projects, and manage tasks
            </p>

            <form onSubmit={handleUserSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  value={userUsername}
                  onChange={(e) => setUserUsername(e.target.value)}
                  placeholder="testuser"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="•••••••"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {userError && (
                <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                  {userError}
                </div>
              )}

              <button
                disabled={userLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {userLoading ? "Signing in..." : "Sign In as User"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
