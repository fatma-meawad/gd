const schema = require("../schema.json");
const AppError = require("../../../utils/error"); // Assuming error handler is used for consistent error responses
const mockBusinesses = require("./mock/businesses.json");

module.exports.postBusinessesDb = async (businessData) => {
  try {
    // Example condition to demonstrate reachability
    if (businessData) {
      return { new_id: "12345" }; // Simulate successful database entry
    } else {
      throw new AppError("Invalid business data", 400);
    }
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

  const businesses = mockBusinesses.slice(offset, offset + limit);
  const totalItems = mockBusinesses.length;

  // We will use a mock data file for now, to simulate db data: server\components\accounts\db\mock\businesses.json
  return {
    businesses,
    pagination_info: {
      limit: parseInt(limit),
      offset: parseInt(offset),
      total_items: totalItems
    }
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
