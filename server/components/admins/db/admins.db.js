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

const bcrypt = require("bcrypt");

module.exports.postAdminsRegisterDb = async (admin) => {
  const {
    full_name,
    email,
    phone,
    password,
    activation_code,
    address = null,
    profile_photo = null,
    bio = null,
  } = admin;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Validate activation code
    const codeRes = await client.query(
      `SELECT * FROM ActivationCode 
       WHERE code = $1 
       AND is_used = false 
       AND expiry_date > CURRENT_TIMESTAMP
       FOR UPDATE`,
      [activation_code]
    );

    if (codeRes.rows.length === 0) {
      throw new Error("Invalid or expired registration code");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    let insertAdminRes;
    try {
      insertAdminRes = await client.query(
        `INSERT INTO AdminAccount (
          full_name, email, phone, password_hash, 
          address, profile_photo, bio, 
          status, login_attempts
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, full_name, email, phone, status, 
                  login_attempts, created_at, updated_at`,
        [
          full_name, 
          email, 
          phone, 
          hashedPassword, 
          address, 
          profile_photo, 
          bio,
          'active',
          0
        ]
      );
    } catch (err) {
      if (err.message && err.message.includes("duplicate key value violates unique constraint")) {
        throw new Error("Email already registered");
      }
      throw err;
    }

    const newAdmin = insertAdminRes.rows[0];

    // Update activation code
    await client.query(
      `UPDATE ActivationCode 
       SET is_used = $1, used_by = $2 
       WHERE code = $3`,
      [true, newAdmin.id, activation_code]
    );

    await client.query("COMMIT");

    return {
      data: newAdmin,
      messages: ["Admin registered successfully"],
      locations: ["admins.database.js"],
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};