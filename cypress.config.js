const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
     // implement node event listeners here
      specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
       defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    video: true, // enable video recording
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos", // folder where videos are saved
    videoCompression: 32, // optional compression
    chromeWebSecurity: false,
      setupNodeEvents(on, config) {
    },
  },
});
