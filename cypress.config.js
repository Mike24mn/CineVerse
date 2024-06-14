const { defineConfig } = require("cypress");
const { resetTestDatabase, executeSqlFile } = require('./cypress/__utils__/db-setup.js')
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          // Makes it so we can use this within tests to get visibility:
          //   cy.task("log", "some thing to log...");
          console.log(message +'\n\n');
          return null;
        },
      })
      on('before:run', async (details) => {
        await resetTestDatabase()
        await executeSqlFile('./tests.sql')
      })
      on('after:run', async (results) => {
        // results will look something like this when run via `cypress run`:
        // {
        //   totalDuration: 81,
        //   totalSuites: 0,
        //   totalTests: 1,
        //   totalFailed: 0,
        //   totalPassed: 1,
        //   totalPending: 0,
        //   totalSkipped: 0,
        //   browserName: 'electron',
        //   browserVersion: '59.0.3071.115',
        //   osName: 'darwin',
        //   osVersion: '16.7.0',
        //   cypressVersion: '3.1.0',
        //   config: {
        //     projectId: '1qv3w7',
        //     baseUrl: 'http://example.com',
        //     viewportWidth: 1000,
        //     viewportHeight: 660,
        //     // ... more properties...
        //   }
        //   // ... more properties...
        //   }
        // }
        // results will be undefined in interactive mode
        if (results) {
          // Deletes the build folder that the test run
          // generates. Only works if we supply a callback
          // function:
          fs.rmdir('build', {recursive: true}, () => {})
        
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed'
          )
        }
      })
    },
    baseUrl: 'http://localhost:5002',
    
  }
});
