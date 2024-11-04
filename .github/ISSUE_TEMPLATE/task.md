---
name:  sprint0
about: Any task that is not directly from the product backlog. It doesn't have to be technical
title: 'Testing and Validating the endpoints'
labels: Sprint-0
---

---


Tasks
---
- [ ] Add the end points you will work on here in the description area above. Those should be the end points you have created in milestone 1. If you have less than two endpoints. Please contact me.
- [ ] Add the related stories numbers as well. Stories related to your endpoints 
- [ ] In the summary attribute of your endpoint in yaml file, add "author: @your name"
- [ ] Test your end points: run the server using `npm start` . This command will enforce the openapi validator. Use one success example and at least one failure example in your testing. Use something better than the generated examples.
- [ ] Document your examples and results (use the logs in the terminal or the interface to note the request and the response)
- [ ] Now test 2 endpoints from other squads with Validator (npm start). Add your name to their endpoint summaries as "reviewer:@yourname"

In your issue document the following:

[ ] the logs and example of testing. Can be a link to a file
[ ] What did the Validator highlight as missing for you? What are you planning to change?
[ ] Are you happy about the functionality of your endpoint? or do you need to modify them.

- [ ] Move this issue on the board from testing - enhancing

- [ ] Pick only one high priority endpoint from  your work. Clean up the yaml for it.
- [ ] Remove the 500 error and use the default error response shared in the task
- [ ] Any response should have a content area, not just description
- [ ] Turn your objects in yaml into schemas.
- [ ] Add formatting and constraints to your schema objects 
- [ ] Check the input and output parameters of services and db functions. Make sure they are taking in the correct input and producing the correct output.  
- [ ] A db function and a service function shouldn't have empty input parameters. 
- [ ] Do you need to make modification to the init.db
- [ ] After modifying, test your end points again with the same example as before. Is everything working well.
- [ ] Create a pull requset of your modification. Remember to update.
