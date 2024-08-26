const { defineConfig } = require("cypress");
require('dotenv').config()

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
    /**
     * API
     */
    apiUrl: "https://hacker-news.firebaseio.com/v0",
    /** 2000ms delay between page visits due to rate limitations */
    COMMAND_DELAY: 2000,
    /**
     * Users
     */
    USER_BASIC: process.env.USER_BASIC,
    USER_BASIC_PASS: process.env.USER_BASIC_PASS,
    /**
     * Test Data
     */
    // News API
    NEWSAPI_API_KEY: process.env.NEWSAPI_API_KEY

  },
  retries: {
    runMode: 2,
  }
});
