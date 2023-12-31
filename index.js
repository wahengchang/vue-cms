const fs = require('fs');
const path = require('path');
const mainMenu = require('./cli/menu');

(async () => {
  const actionsDir = './cli/actions/';

  // Retrieve files in the ./cli/actions/ directory
  const actionFiles = fs.readdirSync(actionsDir);

  // Create options array dynamically
  const options = actionFiles.map((file) => {
    const actionModule = require(path.join(__dirname, actionsDir, file));

    return {
      name: path.basename(file, path.extname(file)), // Remove file extension
      value: actionModule, // Assuming the module exports a function
    };
  });

  // Add an "Exit" option
  options.push({
    name: 'Exit',
    value: null,
  });

  // Call the mainMenu function with the dynamically created options
  mainMenu(options);
})();
