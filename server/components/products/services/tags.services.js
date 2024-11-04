const tags = require("../db/tags.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getTags = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await tags.getTagsDb(product_id);
    //delete this when you actually implement something.
    result.messages.push("getTags services not implemented yet");
    result.locations.push("tags.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postTags = async () => {
  // Implement your business logic here...

  try {
    let result = await tags.postTagsDb();
    //delete this when you actually implement something.
    result.messages.push("postTags services not implemented yet");
    result.locations.push("tags.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
