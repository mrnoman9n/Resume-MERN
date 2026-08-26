import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Login API এখানে call করবে
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="
          relative
          z-10
          w-full
          sm:w-87.5
          text-center
          bg-white/6
          border
          border-white/10
          rounded-2xl
          px-8
        "
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          Login
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Please sign in to continue
        </p>

        {/* Email */}
        <div
          className="
            flex items-center
            w-full
            mt-6
            bg-white/5
            ring-2
            ring-white/10
            focus-within:ring-green-500/60
            h-12
            rounded-full
            overflow-hidden
            pl-6
            gap-2
            transition-all
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>

          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="
              w-full
              bg-transparent
              text-white
              placeholder-white/60
              border-none
              outline-none
            "
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div
          className="
            flex items-center
            mt-4
            w-full
            bg-white/5
            ring-2
            ring-white/10
            focus-within:ring-green-500/60
            h-12
            rounded-full
            overflow-hidden
            pl-6
            gap-2
            transition-all
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              width="18"
              height="11"
              x="3"
              y="11"
              rx="2"
              ry="2"
            />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="
              w-full
              bg-transparent
              text-white
              placeholder-white/60
              border-none
              outline-none
            "
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot password */}
        <div className="mt-4 text-left">
          <button
            type="button"
            className="text-sm text-green-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="
            mt-4
            w-full
            h-11
            rounded-full
            text-white
            bg-green-600
            hover:bg-green-500
            transition
          "
        >
          Login
        </button>

        {/* Signup */}
        <p className="text-gray-400 text-sm mt-3 mb-11">
          Don't have an account?

          <Link
            to="/signup"
            className="text-green-400 hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </form>

      {/* Soft Backdrop */}
      <div className="fixed inset-0 -z-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-20
            -translate-x-1/2
            w-245
            h-115
            bg-linear-to-tr
            from-green-800/35
            to-transparent
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-12
            bottom-10
            w-105
            h-55
            bg-linear-to-bl
            from-green-700/35
            to-transparent
            rounded-full
            blur-2xl
          "
        />
      </div>

    </div>
  );
};

export default Login;
