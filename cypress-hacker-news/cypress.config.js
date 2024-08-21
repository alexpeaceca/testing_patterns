const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://news.ycombinator.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}"
  },
  env: {
    /** 2000ms delay between page visits due to rate limitations */
    COMMAND_DELAY: 2000
  },
  retries: {
    runMode: 2,
  }
});
