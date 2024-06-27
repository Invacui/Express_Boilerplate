const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Adjust the path as per your project structure
const User = require('../models/User'); // Adjust the path as per your project structure
const dotenv = require('dotenv');
dotenv.config({ path: './Private.env' });
let token;
// Define a test user data
const testUser = {
  email: 'testuser@example.com',
  name: 'John Doe',
  age: 25,
  city: 'New York',
  zipCode: '10001'
};

// Connect to MongoDB before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

// Clear users collection in MongoDB after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Disconnect from MongoDB after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User API - Create User', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/auth/worko/user')
      .send(testUser)
      .expect(201);
      token = response.body.token; 
    // Assert that the response body contains the expected properties
    expect(response.body.user).toHaveProperty('id'); // Check 'user.id' instead of just 'id'
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.user.name).toBe(testUser.name);
    expect(response.body.user.age).toBe(testUser.age);
    expect(response.body.user.city).toBe(testUser.city);
    expect(response.body.user.zipCode).toBe(testUser.zipCode);
  });


  it('should fetch all users', async () => {
    try {
      // Create a test user in the database
      await User.create(testUser);

      const response = await request(app)
        .get('/auth/worko/user')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1); // Assuming one user is returned
    } catch (err) {
      console.error('Error fetching all users:', err.message);
      throw err; // Rethrow the error to fail the test immediately
    }
  });

  it('should fetch a user by ID', async () => {
    try {
      // Create a test user in the database
      const createdUser = await User.create(testUser);

      const response = await request(app)
        .get(`/auth/worko/user/${createdUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.email).toBe(testUser.email);
      expect(response.body.name).toBe(testUser.name);
      expect(response.body.age).toBe(testUser.age);
      expect(response.body.city).toBe(testUser.city);
      expect(response.body.zipCode).toBe(testUser.zipCode);
    } catch (err) {
      console.error('Error fetching user by ID:', err.message);
      throw err; // Rethrow the error to fail the test immediately
    }
  });

  it('should update a user by ID', async () => {
    try {
      // Create a test user in the database
      const createdUser = await User.create(testUser);
      
      const updatedUserData = {
        name: 'Updated Name',
        age: 30,
        city: 'San Francisco',
        zipCode: '94103'
      };
  
      const response = await request(app)
        .put(`/auth/worko/user/${createdUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUserData)
        .expect(200);
  
      // Assert the updated user properties
      expect(response.body.email).toBe(testUser.email); // Ensure email remains unchanged
      expect(response.body.name).toBe(updatedUserData.name);
      expect(response.body.age).toBe(updatedUserData.age);
      expect(response.body.city).toBe(updatedUserData.city);
      expect(response.body.zipCode).toBe(updatedUserData.zipCode);
    } catch (err) {
      console.error('Error updating user by ID:', err.message);
      throw err; // Rethrow the error to fail the test immediately
    }
  });
  
  
  it('should partially update a user by ID', async () => {
    try {
      // Create a test user in the database
      const createdUser = await User.create(testUser);
      
      const updatedFields = {
        age: 30,
        city: 'San Francisco'
      };
  
      const response = await request(app)
        .patch(`/auth/worko/user/${createdUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedFields)
        .expect(200);
  
      // Assert the updated user properties
      expect(response.body.email).toBe(testUser.email); // Ensure email remains unchanged
      expect(response.body.name).toBe(testUser.name); // Ensure other fields remain unchanged
      expect(response.body.age).toBe(updatedFields.age);
      expect(response.body.city).toBe(updatedFields.city);
      expect(response.body.zipCode).toBe(testUser.zipCode); // Ensure zipCode remains unchanged
    } catch (err) {
      console.error('Error partially updating user by ID:', err.message);
      throw err; // Rethrow the error to fail the test immediately
    }
  });
  
  it('should delete a user by ID', async () => {
    try {
      // Create a test user in the database
      const createdUser = await User.create(testUser);
  
      // Ensure the user is created before attempting to delete
      expect(createdUser).toBeDefined();
  
      const response = await request(app)
        .delete(`/auth/worko/user/${createdUser._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
  
      // Assert the response message or any other expected outcome
      expect(response.body.message).toBe('User not found');
    } catch (err) {
      console.error('Error deleting user by ID:', err.message);
      throw err; // Rethrow the error to fail the test immediately
    }
  });
  
});

  