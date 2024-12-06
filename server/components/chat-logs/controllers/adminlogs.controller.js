const asyncHandler = require("express-async-handler");
const adminlogs = require("../services/adminlogs.services");
const AppError = require("../../../utils/error");

// Helper function to format error responses
function formatErrorResponse(statusCode, errorMessages, locations = []) {
  return {
    errors: [
      {
        status: "error",
        errors: errorMessages,
        locations: locations,
      },
    ],
  };
}

// adminlogs GET /adminlogs
exports.getAdminlogs = asyncHandler(async (req, res) => {
  const options = {
    admin_id: req.query.admin_id ? parseInt(req.query.admin_id, 10) : undefined,
    keyword: req.query.keyword || undefined,
    date_range: req.query.date_range || undefined,
    sort_by: req.query.sort_by || undefined,
    order: req.query.order || undefined,
  };

  const errors = [];

  // Validate admin_id if provided
  if (options.admin_id !== undefined && isNaN(options.admin_id)) {
    errors.push("Invalid admin_id format");
  }

  // Validate keyword if provided
  if (options.keyword && options.keyword.length > 100) {
    errors.push("Keyword exceeds maximum length of 100 characters");
  }

  // Validate date_range if provided
  if (
    options.date_range &&
    !/^\d{4}-\d{2}-\d{2}:\d{4}-\d{2}-\d{2}$/.test(options.date_range)
  ) {
    errors.push("date_range must be in format YYYY-MM-DD:YYYY-MM-DD");
  }

  // Validate sort_by if provided
  const validSortBy = ["date", "keyword", "admin_id"];
  if (options.sort_by && !validSortBy.includes(options.sort_by)) {
    errors.push("Invalid sort_by value");
  }

  // Validate order if provided
  const validOrder = ["asc", "desc"];
  if (options.order && !validOrder.includes(options.order)) {
    errors.push("Invalid order value");
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json(formatErrorResponse(400, errors, ["getAdminlogs"]));
  }

  // Call the service function
  const logs = await adminlogs.getAdminlogs(options);

  // If no logs found, return 404
  if (!logs || logs.length === 0) {
    return res
      .status(404)
      .json(
        formatErrorResponse(
          404,
          ["No logs found for the specified criteria."],
          ["getAdminlogs"]
        )
      );
  }

  res.status(200).json({
    data: logs,
  });
});
