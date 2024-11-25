require('dotenv-flow').config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const {app, initializeApp} = require(ROOT_DIR+"/app");
const baseUrl = process.env.BASE_API_TEST_URL;




//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe('Test suite for /s1/admins/login', () => {
 beforeAll(async () => {
  await initializeApp(); // Reuse the initialized app
});

    describe('Test suite for post /s1/admins/login', () => {


        test('Test case: /s1/admins/login with Request Example: ValidExample', async () => {
          const response = await request(app)
              .post(baseUrl +'/s1/admins/login')
               .set('Accept', 'application/json')
              .query({})
              .send({})
              .set('Content-Type', 'application/json');

        
        expect(response.status).toBe(500);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object)); 
            expect(response.body).toHaveProperty("errors");
            //TODO: assert the exact error messages to assert why the request failed.
        });
        test('Test case: /s1/admins/login with Request Example: InvalidExample', async () => {
          const response = await request(app)
              .post(baseUrl +'/s1/admins/login')
               .set('Accept', 'application/json')
              .query({})
              .send({})
              .set('Content-Type', 'application/json');

        
        expect(response.status).toBe(500);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object)); 
            expect(response.body).toHaveProperty("errors");
            //TODO: assert the exact error messages to assert why the request failed.
        });
      
      //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.
      
    });
});
