# To Do Application
Build a full-stack "To Do" Application in TypeScript. 

### Background

Models:
```.ts
enum TodoStatusEnum {
  Active = 'Active', // the todo has is not completed
  Inactive = 'Inactive', // the todo is completed
  Archived = 'Archived', // the todo is archived (bonus)
}

interface Todo {
  title: string; // the title of the todo
  status: TodoStatusEnum; // the status of the todo
  lastUpdatedAt: number // a unix timestamp representing the time the todo was last updated
  createdAt: number; // a unix timestamp representing the time the todo was created
}
```


### Front-end 
The front-end should run as its own process. You're free to bootstrap the project however you like, but we recommend using a tool like [create-react-app](https://github.com/facebook/create-react-app). The front-end should make HTTP requests to the backend 

##### Requirements
- [ ] The user can create a todo with a title via a form.
- [ ] The user can view a table of todos.
- [ ] The user can edit the status and title of a to do via the todo table.
- [ ] The user can delete a todo via the todo table
- [ ] The user can archive a todo (Bonus)
- [ ] The user user can view a table of arhchived todos at the `/archived` endpoint (Bonus Task)

##### Tools
1. [React](https://github.com/facebook/react)
2. [Redux](https://github.com/reduxjs/redux.git)
3. [styled-components](https://github.com/styled-components/styled-components)
4. [Apollo GraphQL](https://github.com/apollographql/apollo-client)(Bonus)

### Back-end
The back-end should run as its own process.

##### Tools
- [ ] [Express](https://github.com/expressjs/express) or [Koa](https://github.com/koajs/koa)

##### Tools


### Operations
- [ ] Provide a single `make run` command that will install all dependencies and start the applications
- [ ] Provide a single `make build` command that builds the both the frontend and backend applications into Docker images and tags them as `latest` (Bonus Task)
- [ ] Provide a single `make docker-run` command that builds both applications as Docker containers and runs them in a manner that allows them to communicate (Bonus Task)

