function getCategories() {
  // Implementation here
}

function createCategory(title, photo_url, description) {
  // Implementation here
}

function editCategory(id, title, photo_url, description) {
  // Implementation here
}

function deleteCategory(id) {
  // Implementation here
}

function getSubcategories() {
  // Implementation here
}

function getSubcategoriesByCategoryId(category_id) {
  // Implementation here
}

function createSubcategory(title, photo_url, description) {
  // Implementation here
}

function editSubcategory(id, title, photo_url, description) {
  // Implementation here
}

function deleteSubcategory(id) {
  // Implementation here
}

function getCategoryLookup() {
  // Implementation here
}

module.exports = {
  getCategoryLookup,
  deleteSubcategory,
  editSubcategory,
  getCategories,
  createSubcategory,
  getSubcategoriesByCategoryId,
  getSubcategories,
  deleteCategory,
  editCategory,
  createCategory,
};
