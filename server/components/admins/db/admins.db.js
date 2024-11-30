module.exports.postAdminsLoginDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postAdminsLoginDb not implemented yet"],
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
    data: {
      id: "admin-123",
      email: admin.email,
      full_name: admin.full_name,
    },
    messages: ["postAdminsRegisterDb not implemented yet"],
    locations: ["admins.database.js"],
  };
}
