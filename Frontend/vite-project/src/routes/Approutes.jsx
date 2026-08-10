import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Workflow from "../pages/workflows/Workflow";
import WorkflowBuilder from "../pages/workflowbuilder/workflowbuilder";
import Executions from "../pages/execution/Execution";
const Approutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/workflows" element={<Workflow />} />

        <Route path="/workflows/:workflowId" element={<WorkflowBuilder />} />

        <Route path="/executions" element={<Executions />} />
      </Routes>
    </div>
  );
};

export default Approutes;
