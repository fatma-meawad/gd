const schema = require("../schema.json");
const AppError = require("../../../utils/error"); // Assuming error handler is used for consistent error responses

module.exports.postBusinessesDb = async (businessData) => {
  try {
    // Mock success response with a fixed new_id value
    return { new_id: "12345" }; // Simulate successful database entry
  } catch (error) {
    throw new AppError("Database insertion error", 500); // Mock error for testing error handling
  }
};


module.exports.getBusinessesDb = async ({ limit, offset }) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
  */

  /* This throws an error during lint, error  'pool' is not defined, so we'll put it aside for now
  try {
    // Build the SQL query with pagination
    const query = `
      SELECT 
        id,
        title,
        image,
        phone,
        address,
        web_address,
        description,
        main_owner_name,
        main_owner_email,
        main_owner_phone,
        created_at,
        updated_at,
        is_active,
        COALESCE(deactivated_at, 0) as deactivated_at
      FROM BusinessAccount
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    // Get total count for pagination
    const countQuery = 'SELECT COUNT(*) as total FROM BusinessAccount';
    
    // Execute both queries
    const [results, countResult] = await Promise.all([
      pool.query(query, [limit, offset]),
      pool.query(countQuery)
    ]);

    // Format the response according to the schema
    return {
      businesses: results.rows,
      pagination_info: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total_items: parseInt(countResult.rows[0].total)
      }
    };
  } catch (error) {
    throw new Error(`Database error in getBusinessesDb: ${error.message}`);
  }
  */

  // We will use a mock data file for now, to simulate db data: server\components\accounts\db\mock\businesses.json
  return {
    businesses: mockBusinesses,
  };
};

module.exports.putBusinessByIdDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putBusinessByIdDb not implemented yet"],
    locations: ["business.database.js"],
  };
};

module.exports.getBusinessByBusinessIdLocationIdDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getBusinessByBusinessIdLocationIdDb not implemented yet"],
    locations: ["business.database.js"],
  };
};

module.exports.postBusinessByBusinessIdSellersDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postBusinessByBusinessIdSellersDb not implemented yet"],
    locations: ["business.database.js"],
  };
};

module.exports.postBusinessByBusinessIdBySellerIdSellersDb = async (
  options
) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: [
      "postBusinessByBusinessIdBySellerIdSellersDb not implemented yet",
    ],
    locations: ["business.database.js"],
  };
};

module.exports.getBusinessByBusinessIdSellersExportDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getBusinessByBusinessIdSellersExportDb not implemented yet"],
    locations: ["business.database.js"],
  };
};

module.exports.postBusinessByBusinessIdSellersImportDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postBusinessByBusinessIdSellersImportDb not implemented yet"],
    locations: ["business.database.js"],
  };
};
