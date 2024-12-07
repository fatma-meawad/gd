// First create the mocks
const mockClient = {
  query: jest.fn(),
  release: jest.fn()
};

const mockPool = {
  connect: jest.fn(() => mockClient)
};

// Then use the mock
jest.mock('../../config/dbconfig.js', () => mockPool);

// Finally require the module that uses the mock
const { postAdminsRegisterDb } = require('../../db/admins.db');

describe('AdminsDatabase', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockClient.query.mockReset();
    mockClient.release.mockReset();
    mockPool.connect.mockReset();
    mockPool.connect.mockResolvedValue(mockClient);
  });

  describe('postAdminsRegisterDb', () => {
    test('should successfully register a new admin with valid data', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
        address: "123 Admin Street",
        profile_photo: "https://example.com/photo.jpg",
        bio: "Test bio"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            email: mockAdmin.email,
            full_name: mockAdmin.full_name,
            status: 'active',
            login_attempts: 0,
            created_at: new Date(),
            updated_at: new Date()
          }]
        })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const result = await postAdminsRegisterDb(mockAdmin);

      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('full_name');
      expect(result.messages).toContain('Admin registered successfully');
    });

    test("should fail when email already exists", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "existing@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockRejectedValueOnce(new Error("duplicate key value violates unique constraint")); // INSERT fails

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow("Email already registered");
      
      expect(mockClient.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(mockClient.release).toHaveBeenCalled();
    });

    test("should validate activation code exists in ActivationCode table", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }); // SELECT returns no rows

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow("Invalid or expired registration code");
      
      expect(mockClient.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(mockClient.release).toHaveBeenCalled();
      
      expect(mockClient.query).toHaveBeenNthCalledWith(2, 
        expect.stringContaining("SELECT * FROM ActivationCode"),
        [mockAdmin.activation_code]
      );
    });

    test("should mark activation code as used after successful registration", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            email: mockAdmin.email,
            full_name: mockAdmin.full_name,
            status: 'active'
          }]
        })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      expect(mockClient.query).toHaveBeenNthCalledWith(4,
        expect.stringContaining("UPDATE ActivationCode"),
        [true, 1, mockAdmin.activation_code]
      );
    });

    test("should use database transaction to ensure data consistency", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT
        .mockResolvedValueOnce({ rows: [] }) // UPDATE
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      expect(mockClient.query).toHaveBeenNthCalledWith(1, "BEGIN");
      expect(mockClient.query).toHaveBeenNthCalledWith(5, "COMMIT");
    });

    test("should rollback transaction on error", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockRejectedValueOnce(new Error("Database error")); // SELECT fails

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow();
      expect(mockClient.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(mockClient.release).toHaveBeenCalled();
    });

    test("should handle optional fields correctly", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        }) // SELECT
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT
        .mockResolvedValueOnce({ rows: [] }) // UPDATE
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      const insertCall = mockClient.query.mock.calls[2];
      expect(insertCall[1]).toContain(null); // address should be null
      expect(insertCall[1]).toContain(null); // profile_photo should be null
      expect(insertCall[1]).toContain(null); // bio should be null
    });

    test("should set created_at and updated_at timestamps", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      const now = new Date();
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        }) // SELECT
        .mockResolvedValueOnce({
          rows: [{
            id: 1,
            email: mockAdmin.email,
            full_name: mockAdmin.full_name,
            created_at: now,
            updated_at: now
          }]
        }) // INSERT
        .mockResolvedValueOnce({ rows: [] }) // UPDATE
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const result = await postAdminsRegisterDb(mockAdmin);
      expect(result.data.created_at).toBeDefined();
      expect(result.data.updated_at).toBeDefined();
    });

    test("should store password as hashed value", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        }) // SELECT
        .mockResolvedValueOnce({
          rows: [{
            id: 1,
            email: mockAdmin.email,
            full_name: mockAdmin.full_name
          }]
        }) // INSERT
        .mockResolvedValueOnce({ rows: [] }) // UPDATE
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      const insertCall = mockClient.query.mock.calls[2];
      expect(insertCall[1][3]).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // bcrypt hash pattern
      expect(insertCall[1][3]).not.toBe(mockAdmin.password);
    });
    test("should set default status as active", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        }) // SELECT
        .mockResolvedValueOnce({
          rows: [{
            id: 1,
            email: mockAdmin.email,
            full_name: mockAdmin.full_name,
            status: 'active'
          }]
        }) // INSERT
        .mockResolvedValueOnce({ rows: [] }) // UPDATE
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const result = await postAdminsRegisterDb(mockAdmin);
      expect(result.data.status).toBe("active");
    });
  });
});
