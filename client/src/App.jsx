import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import Resume from "./pages/Resume";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* App Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<Resume />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Resume Preview */}
        <Route path="/view/:resumeId" element={<Preview />} />

      

      </Routes>
    </div>
  );
};

export default App;