# Todo-list-app

This is a todo-list application implemented using vite + React + Typescript and, tested using vitest and react-testing-library. 

---

## Running the application

To run the application:

1.) Clone the repo and change to the repo's directory <br />

2.) Ensure that you have node 18 and install the packages <br />
```npm install```

3.) Before starting the application in your localhost, comment the base attribute in ```vite.config.ts```. Also, ensure that **axios is being imported from "axios" and not from "src/test/axiosTestConfig.ts" in ```/src/utils/apiCalls.ts```**. Now, start the application in the terminal <br />
```npm run dev```

4.) For testing, ensure that **axios is being imported from "src/test/axiosTestConfig.ts" and not from "axios" in ```/src/utils/apiCalls.ts```**. To run the test cases and display the test coverage<br />
```npm run test-ui``` and ```npm run coverage```