import React from "react";
// import { useNavigate } from "react-router-dom";
import logo_light_purple from "/images/logo_light_purple.png";
import Login from "./Login.jsx";

const LandingPage = () => {
  // const navigate = useNavigate();
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-[#FCEBFB] text-black px-48">
      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-8 py-4 pt-10 bg-[#FCEBFB] top-0 z-50 ">
        <div className="flex items-center gap-2">
          {/* Replace this with your actual logo */}
          <img
            src={logo_light_purple}
            alt="logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-3xl font-bold">StartupPilot</h1>
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1">
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 rounded-full bg-[#FCEBFB] text-black font-semibold hover:bg-purple-300 transition"
          >
            Login
          </button>

          {showLogin && <Login onClose={() => setShowLogin(false)} />}

          <button className="px-5 py-2 rounded-full bg-[#A874F4] hover:bg-[#925FE6] text-white transition">
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center text-center px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mt-20">
          Built to solve. Designed to scale
        </h2>

        <p className="text-sm md:text-2xl mt-3 max-w-xl text-gray-700 text-poppins">
          A platform that helps{" "}
          <span className="text-[#904ce2]">early-stage startups </span>
          build, test, and launch their product ideas.
        </p>

        <button className="mt-8 px-8 rounded-xl bg-[#b998fc] hover:bg-[#a88def] text-white shadow transition">
          Get Started
        </button>
      </section>

      {/* FEATURES GRID */}
      <section className="px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-20">
        {/* CARD 1 */}
        <div className="bg-[#9B5DE5] bg-opacity-70 p-6 rounded-xl shadow w-96 text-white">
          <h3 className="font-semibold text-xl mb-2">
            Personalized Startup Roadmap
          </h3>
          <p className="text-lg text-white">
            The app breaks down the startup journey into clear, actionable
            stages-ideation, market research, MVP building, marketing, and
            launch-tailored to the user's idea type.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#E9C6FA] p-6 rounded-xl shadow w-96 text-black">
          <h3 className="font-semibold text-xl mb-2">
            Team & Co-founder Matching
          </h3>
          <p className="text-lg text-black">
            Users can connect with others who have complementary skills or
            shared interests, making it easier to build a strong founding team
            around a validated idea.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#E9C6FA] p-6 rounded-xl shadow w-96 text-black">
          <h3 className="font-semibold text-xl mb-2">
            Progress Tracker & Milestone Planner
          </h3>
          <p className="text-lg text-black">
            Users can monitor their startup’s progress using smart goal-setting
            and milestone tracking, with reminders and tips to stay on track
            throughout the journey.
          </p>
        </div>

        {/* CARD 4 */}
        <div className="bg-[#9B5DE5] bg-opacity-70 p-6 rounded-xl shadow w-96 text-white">
          <h3 className="font-semibold text-xl mb-2">
            Idea Validation with AI Feedback
          </h3>
          <p className="text-lg text-white">
            Users can submit their raw startup ideas and instantly get
            AI-generated insights on feasibility, target audience, market
            trends, and improvement suggestions.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full text-center py-6 border-t bg-[#e4b7fa]">
        <div className="text-xs text-gray-500 flex justify-center gap-6">
          <p>Built to solve. Designed to scale</p>
          <p>@StartupPilot</p>
          <p>Terms</p>
          <p>Security</p>
          <p>Privacy</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
