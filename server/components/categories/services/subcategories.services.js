const subcategories = require("../db/subcategories.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getSubcategories = async () => {
  // Implement your business logic here...

  try {
    let result = await subcategories.getSubcategoriesDb();
    //delete this when you actually implement something.
    result.messages.push("getSubcategories services not implemented yet");
    result.locations.push("subcategories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postSubcategories = async () => {
  // Implement your business logic here...

  try {
    let result = await subcategories.postSubcategoriesDb();
    //delete this when you actually implement something.
    result.messages.push("postSubcategories services not implemented yet");
    result.locations.push("subcategories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getSubcategoriesByCategoryId = async (category_id) => {
  // Implement your business logic here...

  try {
    let result = await subcategories.getSubcategoriesByCategoryIdDb(
      category_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "getSubcategoriesByCategoryId services not implemented yet"
    );
    result.locations.push("subcategories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putSubcategoriesById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await subcategories.putSubcategoriesByIdDb(id);
    //delete this when you actually implement something.
    result.messages.push("putSubcategoriesById services not implemented yet");
    result.locations.push("subcategories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.deleteSubcategoriesById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await subcategories.deleteSubcategoriesByIdDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "deleteSubcategoriesById services not implemented yet"
    );
    result.locations.push("subcategories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
