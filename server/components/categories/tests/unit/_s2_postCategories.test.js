const { postCategoriesDb } = require("../../db/categories.db");
const mockCategories = require("../../db/mock/postCategories.json");

describe("postCategoriesDb", () => {
  // Mock the test json for testing
  jest.mock("../../db/mock/postCategories.json", () => mockCategories);

  // Test case 1: return default result
  test("return default result", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toEqual({
      id: 123,
      title: "Food",
      photo_url: "https://url.com/photo.jpg",
      description: "This is something you can eat.",
      is_deleted: false,
    });
  });

  // Test case 2: should have property 'id'
  test("should have property 'id'", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toHaveProperty("id");
  });

  // Test case 3: should have property 'title'
  test("should have property 'title'", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toHaveProperty("title");
  });

  // Test case 4: should have property 'photo_url'
  test("should have property 'photo_url'", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toHaveProperty("photo_url");
  });

  // Test case 5: should have property 'description'
  test("should have property 'description'", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toHaveProperty("description");
  });

  // Test case 6: should have property 'is_deleted'
  test("should have property 'is_deleted'", async () => {
    const result = await postCategoriesDb(
      mockCategories.title,
      mockCategories.photo_url,
      mockCategories.description
    );

    expect(result.messages[0]).toHaveProperty("is_deleted");
  });
});
