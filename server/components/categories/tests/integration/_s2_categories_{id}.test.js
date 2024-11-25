require('dotenv-flow').config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const {app, initializeApp} = require(ROOT_DIR+"/app");
const baseUrl = process.env.BASE_API_TEST_URL;




//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe('Test suite for /s2/categories/{id}', () => {
 beforeAll(async () => {
  await initializeApp(); // Reuse the initialized app
});

    describe('Test suite for put /s2/categories/{id}', () => {


        test('Test case: /s2/categories/{id} with Request Example: ValidExample', async () => {
          const response = await request(app)
              .put(baseUrl +'/s2/categories/{id}')
               .set('Accept', 'application/json')
              .query({})
              .send({})
              .set('Content-Type', 'application/json');

        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object)); 
           expect(response.body).toHaveProperty("data");
            expect(response.body).toHaveProperty("messages");
            //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
        });
        test('Test case: /s2/categories/{id} with Request Example: InvalidExample', async () => {
          const response = await request(app)
              .put(baseUrl +'/s2/categories/{id}')
               .set('Accept', 'application/json')
              .query({})
              .send({})
              .set('Content-Type', 'application/json');

        
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object)); 
           expect(response.body).toHaveProperty("data");
            expect(response.body).toHaveProperty("messages");
            //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
        });
      
      //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.
      
    });
    describe('Test suite for delete /s2/categories/{id}', () => {


      
      
    });
});
