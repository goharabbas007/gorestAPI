const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
        baseUrl: 'https://gorest.co.in/public/v2',
        token: 'Bearer 436aa09186c1f54f23d3facb6c6a6645933127a58ed95f08cf54952381ecfe1f'
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 6000,
    compilerOptions: {
        types: ["Cypress"]
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
