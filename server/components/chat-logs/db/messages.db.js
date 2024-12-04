const pool = require("../config/dbconfig");

module.exports.postMessagesDb = async (
  sender_id,
  recipient_id,
  thread,
  content
) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/

  // Return the newly inserted message
  return {
    messages: ["Message saved successfully"],
    locations: ["messages.database.js"],
    data: {
      id: 1,
      sender_id: 5,
      recipient_id: 6,
      thread: "Test Thread",
      content: "This is a test message",
      time: "2024-11-08T19:18:53Z",
    },
  };
};

module.exports.getMessagesByThreadDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getMessagesByThreadDb not implemented yet"],
    locations: ["messages.database.js"],
  };
};

module.exports.deleteMessagesByThreadIdDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["deleteMessagesByThreadIdDb not implemented yet"],
    locations: ["messages.database.js"],
  };
};

module.exports.patchMessagesByThreadIdDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["patchMessagesByThreadIdDb not implemented yet"],
    locations: ["messages.database.js"],
  };
};

module.exports.getMessagesHistoryByAdminIdDb = async (receiver_id) => {
  /*try {
    const query = `
      SELECT 
        m.id AS message_id,
        m.sender_id,
        m.recipient_id,
        m.thread,
        m.content,
        m.time,
        m.is_important
      FROM Message m
      JOIN Log l ON m.id = l.message_id
      WHERE l.admin_id = $1
      ORDER BY m.time DESC;
    `;


    // execute the query
    const result = await pool.query(query, [admin_id]);

    //return result if there are any messages
    if (result.rows.length > 0) {
      return {
        messages: result.rows,
        locations: ['messages.database.js'],
      };
    } else {
      return {
        messages: ['No messages found for this admin'],
        locations: ['messages.database.js'],
      };
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    return {
      messages: ['Error retrieving messages'],
      locations: ['messages.database.js'],
    };
  }*/

  return {
    messages: ["getMessagesHistoryByAdminIdDb not implemented yet"],
    locations: ["messages.database.js"],
  };
};

module.exports.postMessagesReplyByThreadIdDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postMessagesReplyByThreadIdDb not implemented yet"],
    locations: ["messages.database.js"],
  };
};
