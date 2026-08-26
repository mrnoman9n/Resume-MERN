import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <section
        className="
          relative flex flex-col items-center
          max-md:px-2
          bg-black text-white text-sm
          pb-28 pt-8
          bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/green-gradient-bg.svg)]
          bg-top bg-no-repeat
        "
      >

        {/* Navbar */}
        <nav
          className="
            flex items-center border mx-4
            w-full max-w-4xl
            justify-between
            border-slate-700
            px-4 py-2.5
            rounded-full text-white
          "
        >

          {/* Logo */}
          <Link to="/">
            <img
              src="/logo-black-bg.svg"
              alt="logo"
            />
          </Link>

          {/* Navigation Menu */}
          <div
            className={`
              max-md:absolute
              max-md:bg-black/50
              max-md:backdrop-blur
              max-md:top-0
              transition-all duration-300
              max-md:h-full
              max-md:w-full
              max-md:z-10
              max-md:justify-center
              flex-col md:flex-row
              flex items-center gap-2

              ${menuOpen ? "max-md:left-0" : "max-md:-left-full"}
            `}
          >

            {/* Home */}
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 transition-transform duration-200 hover:scale-110 ${
                  isActive
                    ? "border border-white/10 bg-white/10 font-medium rounded-full"
                    : ""
                }`
              }
            >
              Home
            </NavLink>

            {/* Feature */}
            <a
              href="#feature"
              onClick={() => setMenuOpen(false)}
              className="
                px-4 py-2
                transition-transform duration-200
                hover:scale-110
              "
            >
              Feature
            </a>

            {/* Testimonial */}
            <a
              href="#testimonial"
              onClick={() => setMenuOpen(false)}
              className="
                px-4 py-2
                transition-transform duration-200
                hover:scale-110
              "
            >
              Testimonial
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="
                px-4 py-2
                transition-transform duration-200
                hover:scale-110
              "
            >
              Contact
            </a>

            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="
                md:hidden
                bg-gray-800
                hover:bg-black
                text-white
                p-2
                rounded-md
                aspect-square
                font-medium
                transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
          >
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Contact Us */}
          <Link
            to="/login"
            className="
              hidden md:block
              bg-green-600
              hover:bg-green-700
              hover:scale-105
              duration-200
              text-white
              px-4 py-2
              rounded-full
              transition-transform
            "
          >
            LOGIN
          </Link>

        </nav>

        {/* Community */}
        <div
          className="
            flex flex-wrap items-center justify-center
            p-1.5 mt-24
            rounded-full
            border border-green-900
            bg-green-700/15
            text-xs
          "
        >
          <div className="flex items-center">

            <img
              className="size-7 rounded-full border-3 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt="userImage1"
            />

            <img
              className="size-7 rounded-full border-3 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt="userImage2"
            />

            <img
              className="size-7 rounded-full border-3 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
              alt="userImage3"
            />

          </div>

          <p className="-translate-x-2">
            Trusted by 1000+ job seekers
          </p>
        </div>

        {/* Heading */}
        <h1
          className="
            text-4xl md:text-6xl
            text-center
            font-semibold
            max-w-4xl
            mt-5
            bg-gradient-to-r
            from-white
            to-[#748298]
            text-transparent
            bg-clip-text
          "
        >
          Land your dream job with AI-powered resumes
        </h1>

        {/* Description */}
        <p
          className="
            text-slate-300
            md:text-base
            max-md:px-2
            text-center
            max-w-2xl
            mt-3
          "
        >
          Create, edit and download professional resumes with
          AI-powered assistance.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-8 text-sm">

          {/* Get Started */}
          <Link
            to="/signup"
            className="
              px-6 py-2.5
              bg-green-600
              hover:bg-green-700
              transition
              rounded-full
            "
          >
            Get Started
          </Link>

          {/* Learn More */}
          <a
            href="#feature"
            className="
              flex items-center gap-2
              bg-white/10
              border border-white/15
              rounded-full
              px-6 py-2.5
              hover:bg-white/15
              transition
            "
          >
            <span>Learn More</span>

            <svg
              className="mt-0.5"
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.25.5 4.75 4l-3.5 3.5"
                stroke="currentColor"
                strokeOpacity=".4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

        </div>

        {/* Company Logos */}
        <div
          className="
            flex flex-wrap
            items-center
            justify-center
            gap-14
            mt-14
            max-md:px-2
          "
        >
          {/* Company logos */}
        </div>

      </section>
    </>
  );
};

export default Hero;