// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CREDENTIALS = [
//   { username: "alice", password: "password123", displayName: "Alice" },
//   { username: "bob", password: "qwerty123", displayName: "Bob" },
//   { username: "carol", password: "letmein", displayName: "Carol" },
// ];

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [error, setError] = React.useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     const found = CREDENTIALS.find(
//       (c) => c.username === username && c.password === password
//     );

//     if (!found) {
//       setError("Invalid username or password");
//       return;
//     }

//     try {
//       sessionStorage.setItem("sp_logged_in", "1");
//     } catch {}

//     try {
//       window.dispatchEvent(new Event("sp-login"));
//     } catch {}

//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ECE9FF] via-[#F7F0FF] to-[#E5F3FF] p-6 relative overflow-hidden">

//       {/* Soft floating circles in background */}
//       <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl"></div>
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-300/20 rounded-full blur-3xl"></div>

//       {/* Login Card */}
//       <div className="relative z-10 max-w-md w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-white/40">
//         <div className="flex flex-col items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Sign in to access your StartupPilot Dashboard
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Username</label>
//             <input
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="alice"
//               className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white/70 shadow-sm"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="•••••••"
//               className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white/70 shadow-sm"
//             />
//           </div>

//           {error && (
//             <div className="text-sm text-red-600 text-center">{error}</div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
//           >
//             Sign In
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               setUsername("");
//               setPassword("");
//               setError("");
//             }}
//             className="w-full text-sm text-gray-600 hover:text-gray-800 mt-1"
//           >
//             Clear Fields
//           </button>
//         </form>

//         <div className="mt-8 text-xs text-gray-500 text-center">
//           <p className="mb-1">Demo Accounts</p>
//           <div className="flex justify-center gap-4 opacity-90">
//             <div>alice / password123</div>
//             <div>bob / qwerty123</div>
//             <div>carol / letmein</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from "react";
import { useNavigate } from "react-router-dom";

const CREDENTIALS = [
  { username: "vedikaJ24", password: "#vedikaJ24" },
  { username: "anshdeep28", password: "#vedikaJ24" },
];

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const found = CREDENTIALS.find(
      (c) => c.username === username && c.password === password
    );

    if (!found) {
      setError("Invalid username or password");
      return;
    }

    sessionStorage.setItem("sp_logged_in", "1");
    window.dispatchEvent(new Event("sp-login"));

    onClose?.(); // close modal
    navigate("/dashboard"); // ✅ redirect to dashboard
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal wrapper */}
      <div className="bg-white flex rounded-3xl shadow-2xl overflow-hidden w-[900px]">

        {/* left Banner */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 text-white flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <h1 className="text-3xl font-extrabold">Vedika!!</h1>
        </div>

        {/* Right Login Content */}
        <div className="w-1/2 p-8 flex flex-col justify-center gap-5">
          <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col gap-3">
            <div className="flex justify-center">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-[75%] px-4 py-3 rounded-xl border bg-purple-50 border-purple-200 focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-[75%] px-4 py-3 rounded-xl border bg-purple-50 border-purple-200 focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {error && (
              <p className="text-center text-red-600 text-sm">{error}</p>
            )}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-[40%] py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition"
                    >
                    Sign In
                </button>
            </div>
          </form>
        
         <div className="flex justify-center">
            <button
            onClick={onClose}
            className="mt-4 w-[40%] text-sm bg-white "
          >
            Close
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Login;