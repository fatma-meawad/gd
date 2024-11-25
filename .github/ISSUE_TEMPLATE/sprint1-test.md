---
name:  sprint1-test
about: Any task that is not directly from the product backlog. It doesn't have to be technical
title: 'Squad-ID: Sprint1 GET /path/'
labels:
  - Sprint1
  - Test
---


---


#### Testing



- [ ] Add the issue to the board to `to do` or `in progress`. Add the issue attributes and attach it to sprint 1 iteration. Then create a branch from the issue.

- [ ] Identify the end point you will work with and add the content to the issue. 

- [ ]  Add the endpoint to the `kollabe board` [here](https://kollabe.com/room?roomKey=0967b46aaa3d449ea2fe06be909096bd).

### Linting

- [ ]  Start by linting the openapi yaml. Check the [linter tool notes here](https://fuzzy-journey-v7y6oy5.pages.github.io/project/sprint1/openapi.html#the-linter). 

    **tips**
      1. All Objects in requests or responses (business, sellers, admins, categories), should be added to the **Components/schemas** part. Then reference them using **$ref**
      1. All paths should have a tag 
      1. All paths should have a default error 
      1. All operations should have an operationId that is exactly the same name of its controller 
      1. Remove creation (created_at) and update (updated_at) timestamps from post operation. Do this on the server and use DB (now()).
- [ ] You must fix the **errors** in the list related to you.
  

- [ ] Check your endpoint in Swagger UI (http://localhost:5000/swagger/docs) after fixing the yaml. 

- [ ] Improve your sequence diagram based on the changes to your yaml and attach it to the issue. It can be added in the markdown directly or as an image. 


### Improving and Writing Tests

- [ ] Fix any issues in your generated tests.

        1. schema validation tests should pass (because validator checks them)
        1. Any other checks fail (no code yet)

- [ ] Check all the possible checks you need. This is discussed in the requirements [here](https://fuzzy-journey-v7y6oy5.pages.github.io/project/sprint1).

- [ ]  Create **unit tests** for your **db functions**. Some references are in the task but I am happy to see your approach :)

- [ ]  When ready, move your issue to review and  create a pull request of your work. 
- [ ]  Ask for review in your Squad channel and another one in the common channel.
