// server/components/admins/tests/unit/admins.database.test.js

const { postAdminsRegisterDb } = require('../../db/admins.db');

const mockPool = {
  query: jest.fn()
};

// Mock dbconfig.js before requiring admins.db.js
jest.mock('../../config/dbconfig.js', () => ({
  query: (text, params) => mockPool.query(text, params),
  end: jest.fn()
}));

describe('AdminsDatabase', () => {
  beforeEach(() => {
    mockPool.query.mockReset();
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

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            full_name: mockAdmin.full_name,
            email: mockAdmin.email,
            phone: mockAdmin.phone,
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
      expect(result.data).toHaveProperty('email', mockAdmin.email);
      expect(result.data).toHaveProperty('full_name', mockAdmin.full_name);
      expect(result.messages).toContain('Admin registered successfully');
      expect(result.locations).toContain('admins.database.js');
    });

    test("should fail when email already exists", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "existing@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email (exists), ROLLBACK
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: [{ email: mockAdmin.email }]
        })
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow(
        "Email already registered"
      );

      // Ensure ROLLBACK is called after email exists
      expect(mockPool.query).toHaveBeenLastCalledWith("ROLLBACK", undefined);
    });

    test("should validate activation code exists and is valid", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT Admin
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      // SELECT ActivationCode is at call[2]
      expect(mockPool.query.mock.calls[2][0]).toContain("SELECT * FROM ActivationCode");
      expect(mockPool.query.mock.calls[2][1]).toEqual([
        mockAdmin.activation_code,
      ]);
    });

    test("should mark activation code as used after successful registration", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT Admin
        .mockResolvedValueOnce({ rows: [{ is_used: true }] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      // UPDATE ActivationCode is at call[4]
      expect(mockPool.query.mock.calls[4][0]).toContain("UPDATE ActivationCode");
      expect(mockPool.query.mock.calls[4][1]).toEqual([
        true,
        1,
        mockAdmin.activation_code,
      ]);
    });

    test("should use database transaction to ensure data consistency", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT Admin
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      expect(mockPool.query.mock.calls[0][0]).toContain("BEGIN");
      expect(mockPool.query.mock.calls[5][0]).toContain("COMMIT");
    });

    test("should rollback transaction on error", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode (fails), ROLLBACK
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockRejectedValueOnce(new Error("Database error")) // SELECT ActivationCode fails
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow("Database error");

      // ROLLBACK is at call[3]
      expect(mockPool.query).toHaveBeenLastCalledWith("ROLLBACK", undefined);
    });

    test("should handle optional fields correctly", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
        // Optional fields not provided: address, profile_photo, bio
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT Admin
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const result = await postAdminsRegisterDb(mockAdmin);

      // INSERT is at call[3]
      const insertQueryParams = mockPool.query.mock.calls[3][1];
      // Since address, profile_photo, and bio are optional and not provided, they should be null
      expect(insertQueryParams).toContain(null);
      expect(insertQueryParams).toContain(null);
      expect(insertQueryParams).toContain(null);
    });

    test("should set created_at and updated_at timestamps", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            full_name: mockAdmin.full_name,
            email: mockAdmin.email,
            phone: mockAdmin.phone,
            status: 'active',
            login_attempts: 0,
            created_at: new Date(),
            updated_at: new Date()
          }]
        })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
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
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            full_name: mockAdmin.full_name,
            email: mockAdmin.email,
            phone: mockAdmin.phone,
            status: 'active',
            login_attempts: 0,
            created_at: new Date(),
            updated_at: new Date()
          }]
        })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      // INSERT is at call[3], check its parameters
      const queryCall = mockPool.query.mock.calls[3];
      expect(queryCall[1]).not.toContain(mockAdmin.password); // password should not be plain
      expect(queryCall[1][3]).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // hashed password
    });

    test("should set default status as active", async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234",
      };

      // Queries: BEGIN, SELECT email, SELECT ActivationCode, INSERT admin, UPDATE code, COMMIT
      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ // SELECT email
          rows: []
        })
        .mockResolvedValueOnce({ // SELECT ActivationCode
          rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }]
        })
        .mockResolvedValueOnce({ // INSERT Admin
          rows: [{
            id: 1,
            full_name: mockAdmin.full_name,
            email: mockAdmin.email,
            phone: mockAdmin.phone,
            status: "active",
            login_attempts: 0,
            created_at: new Date(),
            updated_at: new Date()
          }]
        })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE ActivationCode
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const result = await postAdminsRegisterDb(mockAdmin);
      expect(result.data.status).toBe("active");
    });
  });
});
