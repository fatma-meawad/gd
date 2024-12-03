const asyncHandler = require("express-async-handler");
const adminlogs = require("../services/adminlogs.services");
const AppError = require("../../../utils/error");

// GET /adminlogs
exports.getAdminlogs = asyncHandler(async (req, res) => {
  const options = {
    admin_id: req.query.admin_id ? parseInt(req.query.admin_id, 10) : undefined,
    keyword: req.query.keyword || undefined,
    date_range: req.query.date_range || undefined,
    sort_by: req.query.sort_by || undefined,
    order: req.query.order || undefined,
  };

  // Validate admin_id if provided
  if (options.admin_id !== undefined && isNaN(options.admin_id)) {
    return res.status(400).json({ error: "Invalid admin_id format" });
  }

  // Validate date_range if provided
  if (
    options.date_range &&
    !/^\d{4}-\d{2}-\d{2}:\d{4}-\d{2}-\d{2}$/.test(options.date_range)
  ) {
    return res
      .status(400)
      .json({ error: "date_range must be in format YYYY-MM-DD:YYYY-MM-DD" });
  }

  // Validate sort_by if provided
  const validSortBy = ["date", "keyword", "admin_id"];
  if (options.sort_by && !validSortBy.includes(options.sort_by)) {
    return res.status(400).json({ error: "Invalid sort_by value" });
  }

  // Validate order if provided
  const validOrder = ["asc", "desc"];
  if (options.order && !validOrder.includes(options.order)) {
    return res.status(400).json({ error: "Invalid order value" });
  }

  // Call the service function
  const logs = await adminlogs.getAdminlogs(options);
  // If no logs found, return 404
  if (!logs || logs.length === 0) {
    return res
      .status(404)
      .json({ error: "No logs found for the specified criteria." });
  }

  res.status(200).json(logs);
});

// POST /adminlogs
exports.postAdminlogs = asyncHandler(async (req, res) => {
  const { admin_id, action_type, message_id, action_time, details } = req.body;

  // Validate required fields
  if (admin_id === undefined || action_type === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required fields: admin_id or action_type" });
  }

  // Validate data types
  if (typeof admin_id !== "number") {
    return res.status(400).json({ error: "admin_id must be a number" });
  }

  if (typeof action_type !== "string") {
    return res.status(400).json({ error: "action_type must be a string" });
  }

  // Validate action_time if provided
  if (action_time && isNaN(Date.parse(action_time))) {
    return res.status(400).json({ error: "Invalid action_time format" });
  }

  // Construct logData object
  const logData = {
    admin_id,
    action_type,
    message_id,
    action_time,
    details,
  };

  // Call the service function
  const result = await adminlogs.postAdminlogs(logData);

  res.status(200).json(result);
});
