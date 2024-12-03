const pool = require("../config/dbconfig");

module.exports.postAdminsLoginDb = async (credentials) => {
  /**
    Database query logic for admin login:
    1- Validate the provided email and password against stored credentials.
    2- Track login attempts and handle account blocking if needed.
    3- Return the appropriate data for successful login or errors.
  */
  return {
    data: {
      admin_id: 123,
    },
    messages: ["loginAdminDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.putAdminsByIdDeactivateDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putAdminsByIdDeactivateDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.putAdminsByIdProfileDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putAdminsByIdProfileDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.getAdminsDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getAdminsDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.postAdminsStatusNotificationsDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postAdminsStatusNotificationsDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.getAdminsPasswordResetDb = async (token) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getAdminsPasswordResetDb not implemented yet"],
    locations: ["admins.database.js"],
    data: {}, // admin_id, reset_token, ip_adress
  };
};

module.exports.putAdminsPasswordResetDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putAdminsPasswordResetDb not implemented yet"],
    locations: ["admins.database.js"],
  };
};

module.exports.postAdminsPasswordResetDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postAdminsPasswordResetDb not implemented yet"],
    locations: ["admins.database.js"],

    data: {}, //email, ip_adress (optional)
  };
};

module.exports.postAdminsRegisterDb = async (admin) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    data: {},
    messages: ["postAdminsRegisterDb not implemented yet"],
    locations: ["admins.database.js"],
  };
}
