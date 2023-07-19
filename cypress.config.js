const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env:{
        baseUrl: 'https://gorest.co.in/public/v2',
        token: 'Bearer youwilluseyourbearertokenhereinsteadofthistext'
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
