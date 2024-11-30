const categories = require("../db/categories.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getCategories = async () => {
  // Implement your business logic here...

  try {
    let result = await categories.getCategoriesDb();
    //delete this when you actually implement something.
    result.messages.push("getCategories services not implemented yet");
    result.locations.push("categories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postCategories = async (title, photo_url, description) => {
  // Implement your business logic here...

  try {
    let result = await categories.postCategoriesDb(title, photo_url, description);

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putCategoriesById = async (
  id,
  title,
  photo_url,
  description
) => {
  // Implement your business logic here...

  try {
    let result = await categories.putCategoriesByIdDb(
      id,
      title,
      photo_url,
      description
    );
    //delete this when you actually implement something.
    result.messages.push("putCategoriesById services not implemented yet");
    result.locations.push("categories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.deleteCategoriesById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await categories.deleteCategoriesByIdDb(id);
    //delete this when you actually implement something.
    result.messages.push("deleteCategoriesById services not implemented yet");
    result.locations.push("categories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getCategoriesProducts = async (
  categoryId,
  businessAccountId
) => {
  // Implement your business logic here...

  try {
    let result = await categories.getCategoriesProductsDb(
      categoryId,
      businessAccountId
    );
    //delete this when you actually implement something.
    result.messages.push("getCategoriesProducts services not implemented yet");
    result.locations.push("categories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getCategoriesLookups = async () => {
  // Implement your business logic here...

  try {
    let result = await categories.getCategoriesLookupsDb();
    //delete this when you actually implement something.
    result.messages.push("getCategoriesLookups services not implemented yet");
    result.locations.push("categories.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
