import Workflow from "../models/workflow.model.js";

const createWorkflow = async (workflowData, userId) => {
  const workflow = await Workflow.create({
    ...workflowData,
    owner: userId,
  });

  return workflow;
};

const getMyWorkflows = async (userId) => {
  const [workflows, total] = await Promise.all([
    Workflow.find({ owner: userId }).sort({ createdAt: -1 }),
    Workflow.countDocuments({ owner: userId }),
  ]);

  return {
    total,
    workflows,
  };
};

const getWorkflowById = async (workflowId, userId) => {
  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow;
};

const updateWorkflow = async (workflowId, userId, updateData) => {
  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  Object.assign(workflow, updateData);

  await workflow.save();

  return workflow;
};

const deleteWorkflow = async (workflowId, userId) => {
  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  await workflow.deleteOne();

  return;
};

export default {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};
