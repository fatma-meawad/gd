const { postAdminsRegister } = require('../../services/admins.services');
const adminsDb = require('../../db/admins.db');
const bcrypt = require('bcrypt');

// Mock the database layer
jest.mock('../../db/admins.db');

// Mock bcrypt
jest.mock('bcrypt');

describe('AdminsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postAdminsRegister', () => {
    test('should successfully register admin with valid data', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "ABCD1234",
        address: "123 Street",
        profile_photo: "photo.jpg",
        bio: "Test bio"
      };

      const mockHashedPassword = '$2b$10$hashedpassword';
      const mockDbResponse = {
        data: {
          id: 1,
          full_name: mockAdmin.full_name,
          email: mockAdmin.email,
          phone: mockAdmin.phone
        },
        messages: ["Admin registered successfully"],
        locations: ["admins.database.js"]
      };

      bcrypt.hash.mockResolvedValue(mockHashedPassword);
      adminsDb.postAdminsRegisterDb.mockResolvedValue(mockDbResponse);

      const result = await postAdminsRegister(mockAdmin);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockAdmin.password, 10);
      expect(adminsDb.postAdminsRegisterDb).toHaveBeenCalledWith({
        ...mockAdmin,
        password_hash: mockHashedPassword
      });
      expect(result.data).toEqual(mockDbResponse.data);
      expect(result.locations).toContain('admins.service.js');
    });

    test('should handle email already registered error', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "existing@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "ABCD1234"
      };

      bcrypt.hash.mockResolvedValue('hashedpassword');
      adminsDb.postAdminsRegisterDb.mockRejectedValue(
        new Error("Email already registered")
      );

      await expect(postAdminsRegister(mockAdmin)).rejects.toMatchObject({
        statusCode: 409,
        errors: ["Email already registered"]
      });
    });

    test('should handle invalid activation code error', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "INVALID"
      };

      bcrypt.hash.mockResolvedValue('hashedpassword');
      adminsDb.postAdminsRegisterDb.mockRejectedValue(
        new Error("Invalid or expired registration code")
      );

      await expect(postAdminsRegister(mockAdmin)).rejects.toMatchObject({
        statusCode: 400,
        errors: ["Invalid or expired registration code"]
      });
    });

    test('should handle unexpected errors', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "ABCD1234"
      };

      bcrypt.hash.mockResolvedValue('hashedpassword');
      adminsDb.postAdminsRegisterDb.mockRejectedValue(
        new Error("Unexpected error")
      );

      await expect(postAdminsRegister(mockAdmin)).rejects.toMatchObject({
        statusCode: 500,
        errors: ["Unexpected error"]
      });
    });

    test('should handle password hashing error', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "ABCD1234"
      };

      bcrypt.hash.mockRejectedValue(new Error("Hashing failed"));

      await expect(postAdminsRegister(mockAdmin)).rejects.toMatchObject({
        statusCode: 500,
        errors: ["Hashing failed"]
      });
    });

    test('should properly format response with locations', async () => {
      const mockAdmin = {
        full_name: "John Smith",
        email: "john@example.com",
        phone: "+1234567890",
        password: "SecurePass123!",
        activation_code: "ABCD1234"
      };

      const mockDbResponse = {
        data: { id: 1 },
        messages: ["Admin registered successfully"],
        locations: ["admins.database.js"]
      };

      bcrypt.hash.mockResolvedValue('hashedpassword');
      adminsDb.postAdminsRegisterDb.mockResolvedValue(mockDbResponse);

      const result = await postAdminsRegister(mockAdmin);

      expect(result.locations).toEqual([
        "admins.database.js",
        "admins.service.js"
      ]);
    });
  });
});