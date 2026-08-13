import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Workflow from "../pages/workflows/Workflow";
import WorkflowBuilder from "../pages/workflowbuilder/workflowbuilder";
import Executions from "../pages/execution/Execution";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../pages/notfound/NotFound";
import Profile from "../pages/profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/workflows" element={<Workflow />} />

          <Route path="/workflows/:workflowId" element={<WorkflowBuilder />} />

          <Route path="/executions" element={<Executions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
