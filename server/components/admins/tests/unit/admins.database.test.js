const { postAdminsRegisterDb } = require('../../db/admins.db');

const mockPool = {
  query: jest.fn()
};

jest.mock('../../config/dbconfig.js', () => ({
    pool: mockPool
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

      mockPool.query.mockResolvedValue({
        rows: [{
          id: 1,
          email: mockAdmin.email,
          full_name: mockAdmin.full_name
        }]
      });

      const result = await postAdminsRegisterDb(mockAdmin);

      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('full_name');
      expect(result.messages).toContain('Admin registered successfully');
    });

    test('should fail when email already exists', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "existing@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query.mockRejectedValue(new Error('duplicate key value violates unique constraint'));

      await expect(postAdminsRegisterDb(mockAdmin))
        .rejects
        .toThrow('Email already registered');
    });

    test('should validate activation code exists in ActivationCode table', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] });

      await postAdminsRegisterDb(mockAdmin);
      
      expect(mockPool.query.mock.calls?.[0]?.[0]).toContain('SELECT * FROM ActivationCode');
      expect(mockPool.query.mock.calls?.[0]?.[1]).toEqual([mockAdmin.activation_code]);
    });

    test('should mark activation code as used after successful registration', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com", 
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, is_used: false, expiry_date: new Date(Date.now() + 86400000) }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ is_used: true }] });

      await postAdminsRegisterDb(mockAdmin);

      expect(mockPool.query.mock.calls?.[2]?.[0]).toContain('UPDATE ActivationCode');
      expect(mockPool.query.mock.calls?.[2]?.[1]).toEqual([true, 1, mockAdmin.activation_code]);
    });

    test('should use database transaction to ensure data consistency', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890", 
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [] }) // UPDATE activation code
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      await postAdminsRegisterDb(mockAdmin);

      expect(mockPool.query.mock.calls?.[0]?.[0]).toContain('BEGIN');
      expect(mockPool.query.mock.calls?.[4]?.[0]).toContain('COMMIT');
    });

    test('should rollback transaction on error', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123", 
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockRejectedValueOnce(new Error('Database error'))
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK

      await expect(postAdminsRegisterDb(mockAdmin)).rejects.toThrow();
      
      expect(mockPool.query.mock.calls[2][0]).toContain('ROLLBACK');
    });

    test('should handle optional fields correctly', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const result = await postAdminsRegisterDb(mockAdmin);

      const insertQueryParams = mockPool.query.mock.calls?.[1]?.[1];
      expect(insertQueryParams).toContain(null);
    });

    test('should set created_at and updated_at timestamps', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query
        .mockResolvedValueOnce({ rows: [{ is_used: false, expiry_date: new Date(Date.now() + 86400000) }] })
        .mockResolvedValueOnce({ 
          rows: [{
            id: 1,
            created_at: expect.any(Date),
            updated_at: expect.any(Date)
          }]
        });

      const result = await postAdminsRegisterDb(mockAdmin);

      expect(result.data.created_at).toBeDefined();
      expect(result.data.updated_at).toBeDefined();
    });

    test('should store password as hashed value', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123",
        activation_code: "ABCD1234"
      };

      mockPool.query.mockResolvedValue({
        rows: [{
          id: 1,
          email: mockAdmin.email,
          full_name: mockAdmin.full_name
        }]
      });

      await postAdminsRegisterDb(mockAdmin);

      const queryCall = mockPool.query.mock.calls?.[0];
      expect(queryCall?.[1]).not.toContain(mockAdmin.password);
      expect(queryCall?.[1]?.[3]).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
    });

    test('should set default status as active', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecureP@ss123", 
        activation_code: "ABCD1234"
      };

      mockPool.query.mockResolvedValue({
        rows: [{
          id: 1,
          email: mockAdmin.email,
          full_name: mockAdmin.full_name,
          status: 'active'
        }]
      });

      const result = await postAdminsRegisterDb(mockAdmin);
      expect(result.data.status).toBe('active');
    });

  });
});