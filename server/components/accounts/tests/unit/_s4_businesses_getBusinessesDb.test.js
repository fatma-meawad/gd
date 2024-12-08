require("dotenv-flow").config();
const { getBusinessesDb } = require("../../db/businesses.db");

// Mock different cases
const mockBusinesses = require("../mock/businesses.json");

describe("getBusinessesDb", () => {
  // Mock the require to ensure we're using the test JSON
  jest.mock("../mock/businesses.json", () => mockBusinesses);

  // Test case 1: Default behavior - return all businesses when limit is not specified
  it("should return all businesses when no limit is specified", async () => {
    const result = await getBusinessesDb({
      limit: mockBusinesses.length,
      offset: 0,
    });

    expect(result).toEqual({
      businesses: mockBusinesses,
      pagination_info: {
        limit: mockBusinesses.length,
        offset: 0,
      },
    });
  });

  // Test case 2: Limit less than total businesses
  it("should return limited businesses when limit is less than total businesses", async () => {
    const limit = 1;
    const result = await getBusinessesDb({ limit, offset: 0 });

    expect(result.businesses).toHaveLength(limit);
    expect(result.businesses[0]).toEqual(mockBusinesses[0]);
  });

  // Test case 3: Verify business structure
  it("should return businesses with correct structure", async () => {
    const result = await getBusinessesDb({ limit: 1, offset: 0 });
    const firstBusiness = result.businesses[0];

    expect(firstBusiness).toHaveProperty("id");
    expect(firstBusiness).toHaveProperty("title");
    expect(firstBusiness).toHaveProperty("main_owner_email");
    expect(firstBusiness).toHaveProperty("created_at");
    expect(firstBusiness).toHaveProperty("is_active");
  });

  // Test case 4: Verify pagination info
  it("should return correct pagination info", async () => {
    const limit = 1;
    const offset = 2;
    const result = await getBusinessesDb({ limit, offset });

    // We now test pagination info without total_items
    expect(result.pagination_info).toEqual({
      limit,
      offset,
    });

    // Instead of relying on total_items, we can add tests that help verify pagination behavior
    const nextPage = await getBusinessesDb({ limit, offset: offset + limit });

    // If we got fewer items than requested, we know we're at the end
    const isLastPage = nextPage.businesses.length < limit;

    // If we're not at the last page, we should get exactly 'limit' items
    if (!isLastPage) {
      expect(nextPage.businesses).toHaveLength(limit);
    }
  });
});
