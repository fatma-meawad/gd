const schema = require("../schema.json");

module.exports.postBusinessDb = async () => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postBusinessDb not implemented yet"],
    locations: ["business.database.js"]
  };
};

module.exports.getBusinessesDb = async ({ limit, offset }) => {
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
};

/*  Dummy DB function for GET /businesses
    I used it to test GET /businesses, pretending there was data in the DB
    Referenced in server\components\accounts\services\businesses.services.js
    @ Jany
*/
module.exports.getBusinessesDb_dummy = async ({ limit, offset }) => {
  // Simulate a database query with dummy data
  const dummyBusinesses = [
    {
      id: 1,
      title: "Example Business 1",
      image: "http://example.com/image1.png",
      phone: "+1234567890",
      address: "123 Example Street",
      web_address: "http://example1.com",
      description: "An example business description 1",
      main_owner_name: "John Doe",
      main_owner_email: "john.doe@example.com",
      main_owner_phone: "+1234567890",
      created_at: 12345678,
      updated_at: 12345678,
      is_active: true,
      deactivated_at: 0,
    },
    {
      id: 2,
      title: "Example Business 2",
      image: "http://example.com/image2.png",
      phone: "+0987654321",
      address: "456 Another Street",
      web_address: "http://example2.com",
      description: "An example business description 2",
      main_owner_name: "Jane Smith",
      main_owner_email: "jane.smith@example.com",
      main_owner_phone: "+0987654321",
      created_at: 22345678,
      updated_at: 22345678,
      is_active: false,
      deactivated_at: 22345679,
    },
  ];

  // Return empty results without throwing
  const paginatedBusinesses = dummyBusinesses.slice(offset, offset + limit);

  return {
    businesses: paginatedBusinesses,
    pagination_info: {
      limit,
      offset,
      total_items: dummyBusinesses.length,
    },
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
