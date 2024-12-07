const { pool } = require("../config/dbconfig");

// This function builds a dynamic query based on the provided options.
module.exports.getAdminlogsDb = async (options) => {
  let query = `SELECT id, action_type, admin_id, message_id, action_time, details FROM Log`;
  const conditions = [];
  const params = [];

  // Filter by admin_id if provided
  if (options.admin_id !== undefined) {
    params.push(options.admin_id);
    conditions.push(`admin_id = $${params.length}`);
  }

  // Filter by keyword if provided (case-insensitive substring match)
  if (options.keyword) {
    params.push(`%${options.keyword}%`);
    conditions.push(`details ILIKE $${params.length}`);
  }

  // Filter by date_range if provided
  if (options.date_range) {
    const [startDate, endDate] = options.date_range.split(":");
    params.push(startDate);
    params.push(endDate);
    conditions.push(`action_time BETWEEN $${params.length - 1} AND $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  // Handle sorting
  if (options.sort_by) {
    let sortColumn;
    if (options.sort_by === "date") {
      sortColumn = "action_time";
    } else if (options.sort_by === "keyword") {
      sortColumn = "details";
    } else if (options.sort_by === "admin_id") {
      sortColumn = "admin_id";
    }

    const sortOrder = options.order === "desc" ? "desc" : "asc";
    query += ` ORDER BY ${sortColumn} ${sortOrder}`;
  }

  // Limit results to 1000 as per spec
  query += ` LIMIT 1000`;

  const result = await pool.query(query, params);
  return result.rows;
};
