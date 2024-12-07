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
    
      // Basic result checks
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('full_name');
      expect(result.messages).toContain('Admin registered successfully');
    
      // Check the INSERT query content with a more flexible pattern
      const insertQuery = mockClient.query.mock.calls[2][0];
      expect(insertQuery).toMatch(/INSERT INTO AdminAccount/i);
      expect(insertQuery).toMatch(/RETURNING[\s\n]+id[\s\n,]+full_name[\s\n,]+email[\s\n,]+phone[\s\n,]+status[\s\n,]+login_attempts[\s\n,]+created_at[\s\n,]+updated_at/i);
    
      // Verify the parameters separately
      const insertParams = mockClient.query.mock.calls[2][1];
      expect(insertParams).toEqual([
        mockAdmin.full_name,
        mockAdmin.email,
        mockAdmin.phone,
        expect.stringMatching(/^\$2[aby]\$\d{1,2}\$/), // Hashed password
        mockAdmin.address,
        mockAdmin.profile_photo,
        mockAdmin.bio,
        'active',
        0
      ]);
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
        .mockRejectedValueOnce({
          message: "duplicate key value violates unique constraint \"adminaccount_email_key\""
        });

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow("Email already registered");
      
      expect(mockClient.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(mockClient.release).toHaveBeenCalled();
    });

    test("should validate activation code exists and is valid", async () => {
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
          rows: [] // No valid activation codes
        });

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow("Invalid or expired registration code");
      
      expect(mockClient.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(mockClient.release).toHaveBeenCalled();
      
      expect(mockClient.query).toHaveBeenNthCalledWith(2, 
        expect.stringMatching(/SELECT.*WHERE.*is_used.*=.*false.*expiry_date.*>.*CURRENT_TIMESTAMP/s),
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
        [true, expect.any(Number), mockAdmin.activation_code] // matches your parameter order
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
      const params = insertCall[1];
      
      // Check specific optional fields from schema
      expect(params).toContain(null); // address (position 5)
      expect(params).toContain(null); // profile_photo (position 6)
      expect(params).toContain(null); // bio (position 7)
      
      // Required fields should not be null
      expect(params[0]).not.toBeNull(); // full_name
      expect(params[1]).not.toBeNull(); // email
      expect(params[2]).not.toBeNull(); // phone
      expect(params[3]).not.toBeNull(); // password_hash
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
